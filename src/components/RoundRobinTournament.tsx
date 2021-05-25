import { axios } from '@/axios/axios';
import { actionCreators, State } from '@/state/state';
import { Contestant } from '@/types/Contestant';
import { Match } from '@/types/Match';
import { Round } from '@/types/Round';
import { TournamentDetails } from '@/types/TournamentDetails';
import { TournamentsResponse } from '@/types/TournamentsResponse';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { match } from 'assert';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../styles/roundRobinTournament.scss';

type Props = {
    tournamentData: TournamentDetails
}

interface TournamentContestant extends Contestant {
    points: number,
    position?: number
}

type RoundData = {
    round: number,
    match: number,
    homeSide: Contestant,
    awaySide: Contestant
}

type roundResponse = {
    data: Round
}

type TournamentResponse = {
    data: TournamentDetails[]
}


const RoundRobinTournament: React.FC<Props> = ({tournamentData}) => {

    const dispatch = useDispatch();
    const { setIsFetchingData, updateTournaments } = bindActionCreators(actionCreators, dispatch)
    const state = useSelector((state: State) => state)



    const [currentRound, setCurrentRound] = useState(null);

    const contestants: TournamentContestant[] = useMemo(()=> {
        let newContestants = tournamentData.participants.map((contestant) => (
            {
                ...contestant, 
                points: contestant.wins * tournamentData.pointsPerWin
            }
        ))

        newContestants = newContestants.sort((a,b) => a.name.localeCompare(b.name));

        newContestants = newContestants.sort((a,b) => a.points - b.points).map((contestant, index) => (
            {
                ...contestant,
                position: index + 1
            }
        ));

        newContestants.sort((a,b) => a.name.localeCompare(b.name));

        return newContestants;
    }
    ,[tournamentData])

    let tournamentRounds = useMemo(() => {

        let newRounds = state.tournamentsData.find(t => t.id === tournamentData.id).rounds?.sort((a,b) => a.no - b.no).map((round) => {

            let newMatches = round.matches.map((match) => {
                let homeSideContestant = contestants.find(c => c.id === match.homeSideId)
                let awaySideContestant = contestants.find(c => c.id === match.awaySideId)
                match = {...match, 
                    homeSide: homeSideContestant ? homeSideContestant : null, 
                    awaySide: awaySideContestant ? awaySideContestant : null
                }
                return match;
            })

            return {...round, matches: newMatches}
        })


        return newRounds
    }, [state.tournamentsData])

    
    useEffect(() => {

        if(tournamentRounds?.length > 0) {
            let currentRound = tournamentRounds.find(tr => !tr.isFinished);
            setCurrentRound(currentRound);
        }
    }, [tournamentRounds])


    const shuffleArray = (array: TournamentContestant[]) => {

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    const bergerTable = (teams, useDummy=false, dummy={}): RoundData[][] => {
         
        //ALGORITHM FROM https://www.npmjs.com/package/tournament-organizer
        if (!Array.isArray(teams)) 
            teams = Array.from({ length: teams }).map((_, i) => i);
        else 
            teams = [...teams];
        if (teams.length % 2 !== 0)
            teams.push(dummy);
    
        const n = teams.length;
        const numberOfRounds = n-1;
        const gamesPerRound = n/2;
    
        let columnA = teams.slice(0, gamesPerRound);
        let columnB = teams.slice(gamesPerRound);
        const fixed = teams[0];
    
        return Array.from({length: numberOfRounds}).map((_, i): RoundData[] => {
            let gameCount = 1;
            let round = Array.from({length: gamesPerRound}).reduce((acc: RoundData[], _, k) => {
                if (useDummy || (columnA[k] !== dummy && columnB[k] !== dummy)) {
                    acc.push({
                        round: i+1,
                        match: gameCount,
                        homeSide: columnA[k],
                        awaySide: columnB[k]
                    }); 
                    gameCount++;
                }
                return acc;
            }, []) as RoundData[];
    
            columnA = [fixed, columnB.shift(), ...columnA.slice(1)];
            columnB.push(columnA.pop());
            return round;
        });
    }

    const drawFixtures = async () => {

        if(!state.isFetchingData){
            setIsFetchingData(true);

            let participants = shuffleArray(contestants);

            let roundsData: RoundData[][] = bergerTable(participants, true, null);

            for(let i=0; i<roundsData.length; i++){
                const roundResponse = await axios.post('/rounds', {no: i + 1, tournamentId: tournamentData.id}).catch(err => console.log(err)) as roundResponse
                let roundId = roundResponse?.data.id
                let matchPromises = []

                if(roundId){
                    roundsData[i].forEach((match) => {
                        matchPromises.push(axios.post('/matches', {homeSideId: match.homeSide ? match.homeSide.id : null, awaySideId: match.awaySide ? match.awaySide.id : null, roundId: roundId}).catch(err => console.log(err)))
                    })

                    try {
                        await Promise.all(matchPromises)
                    } catch (error) {
                        console.log(error);
                        return; 
                    }
                }
            }

        let tournamentStarted = {...tournamentData, isStarted: true}
        
        await axios.put(`/tournaments/${tournamentData.id}`, {tournamentStarted: tournamentStarted}).catch(err => console.log(err))
        
        const tournamentResponse = await axios.get(`/tournaments/${tournamentData.id}`).catch(err => console.log(err)) as TournamentResponse

        let updatedTournament = {...tournamentResponse.data[0], icon: state.tournamentIcons.find(icon => icon.id === tournamentData.iconId)}

        updateTournaments(updatedTournament)
        setIsFetchingData(false)
        }
        
    }

    const switchRound = (direction: string) => {

        if(direction === 'next'){
            let nextRound = tournamentRounds.find(round => round.no === currentRound.no + 1)
            if(nextRound) {
                setCurrentRound(nextRound)
            }
        }else if(direction === 'previous'){
            let previousRound = tournamentRounds.find(round => round.no === currentRound.no - 1)
            if(previousRound) {
                setCurrentRound(previousRound)
            }
        }
    }

    return (
        <div className='round-robin-tournament-wrapper'>
            <div className='round-robin-tournament-main'>
                <div className='round-robin-tournament-table-wrapper'>
                    <h4>Standings</h4>
                    <table className='round-robin-tournament-table'>
                        <thead>
                            <tr>
                                <th title='position'>P</th>
                                <th title='name' className='name'>Name</th>
                                <th title='wins'>W</th>
                                {tournamentData.allowDraws &&
                                <th title='draws'>D</th>
                                }
                                <th title='loses'>L</th>
                                {tournamentData.includeScore &&
                                <th title='points for'>PF</th>
                                }
                                {tournamentData.includeScore &&
                                <th title='points against'>PA</th>
                                }
                                <th title='total score'>T</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contestants.map((contestant) => {
                                return(
                                    <tr key={contestant.id}>
                                        <td className={contestant.position === 1 ? 'first' : ''}>{contestant.position}</td>
                                        <td className='name'>{contestant.name}</td>
                                        <td>{contestant.wins}</td>
                                        {tournamentData.allowDraws && 
                                        <td>{contestant.draws}</td>
                                        }
                                        <td>{contestant.loses}</td>
                                        {tournamentData.includeScore && 
                                        <td>0</td>
                                        }
                                        {tournamentData.includeScore && 
                                        <td>0</td>
                                        }
                                        <td>{contestant.points}</td>
                                    </tr>
                                )
                            })}
                        </tbody>       
                    </table>
                </div>
                <div className='round-robin-tournament-rounds-wrapper'>
                    <h4>Fixtures</h4>
                    <div className='round-robin-tournament-rounds'>
                        {tournamentData.isStarted ? 
                        <div className='round-robin-tournament-rounds-content'>
                            <div className='rounds-header'>
                                <button className='switch-round-btn' title='previous round' onClick={() => switchRound('previous')}><IoIosArrowBack /></button>
                                <p>{`Round ${currentRound?.no}`}</p>
                                <button className='switch-round-btn' title='next round' onClick={() => switchRound('next')}><IoIosArrowForward /></button>
                            </div>
                            {currentRound?.matches.map((match: Match) => {
                                return(
                                    <div key={match.id} className='match-item'>
                                        <div className='match-contestant'>
                                            <p>{match.homeSide?.name}</p>
                                        </div>
                                        <div className='match-score-wrapper'>
                                            <p className='match-score'>{match?.scoreHome}</p>
                                            <p>-</p>
                                            <p className='match-score'>{match?.scoreAway}</p>
                                        </div>
                                        <div className='match-contestant'>
                                            <p>{match.awaySide?.name}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        :
                        <div className='round-robin-tournament-draw-wrapper'>
                            <p>Draw fixtures</p>
                            <button title='Begin draw' onClick={drawFixtures}>Begin draw</button>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoundRobinTournament;