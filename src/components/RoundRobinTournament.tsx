import { Contestant } from '@/types/Contestant';
import { TournamentDetails } from '@/types/TournamentDetails';
import React, { useMemo } from 'react';
import '../styles/roundRobinTournament.scss';

type Props = {
    tournamentData: TournamentDetails
}

interface TournamentContestant extends Contestant {
    points: number,
    position?: number
}



const RoundRobinTournament: React.FC<Props> = ({tournamentData}) => {

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
                        {tournamentData.rounds?.length > 0 ? 
                        <div className='round-robin-tournament-draw-wrapper'>
                            <p>Draw fixtures</p>
                            <button>Begin draw</button>
                        </div>
                        :
                        <div className='round-robin-tournament-rounds-content'>

                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoundRobinTournament;