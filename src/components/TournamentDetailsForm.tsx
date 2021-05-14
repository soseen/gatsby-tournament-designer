import { TournamentDetails } from '../types/TournamentDetails';
import React, { ChangeEvent, useMemo, useState, useEffect } from 'react';
import '../styles/tournamentDetailsForm.scss'
import { BsCheck } from "react-icons/bs";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

type Props = {
    tournamentDetails: TournamentDetails,
    setTournamentDetails: (tournamentDetails: TournamentDetails) => void
}

type TiebreakRule = {
    name: string,
    priority: number,
    desc: string
}

const TournamentDetailsForm: React.FC<Props> = ({tournamentDetails, setTournamentDetails}) => {

    let tiebreakRulesDefault: TiebreakRule[] = [
        {
            name: 'Head to head',
            priority: 1,
            desc: 'direct score between players'
        },
        {
            name: 'Sonneborn-Berger',
            priority: 2,
            desc: 'added scores of the opponents beaten by a player and if possible half the scores of players he drew with'
        },
        {
            name: 'Most wins',
            priority: 3,
            desc: 'highest number of wins determines a champion'
        },
        {
            name: 'Score differential',
            priority: 4,
            desc: 'all points scored by a player subtracted by points against'
        },
        {
            name: 'Tiebreak game',
            priority: 5,
            desc: 'additional game to determine a winner'
        },
        {
            name: 'Coin toss',
            priority: 6,
            desc: 'good old way to settle the score'
        }
    ]

    const [tiebreakRules, setTiebreakRules] = useState<TiebreakRule[]>(tiebreakRulesDefault);

    useEffect(() => {

        let tiebreakOptions = tiebreakRulesDefault.slice(0);
        console.log(tiebreakOptions);

        if(!tournamentDetails.includeScore) {
            tiebreakOptions = tiebreakOptions.filter(to => to.name !== 'Score differential' && to.name !== 'Most wins');
        }
        if(!tournamentDetails.allowDraws) {
            tiebreakOptions = tiebreakOptions.filter(to => to.name !== 'Most wins');
        }

        tiebreakOptions = tiebreakOptions.map((tOption, index) => (
            {...tOption, priority: index + 1}
        ))

        setTiebreakRules(tiebreakOptions);
        
    }, [tournamentDetails.includeScore, tournamentDetails.allowDraws])

    // const tiebreakRules: TiebreakRule[] = useMemo(() => {

    //     let tiebreakOptions: TiebreakRule[] = [
    //         {
    //             name: 'Head to head',
    //             priority: 1,
    //         },
    //         {
    //             name: 'Buchholz system',
    //             priority: 2,
    //         },
    //         {
    //             name: 'Most wins',
    //             priority: 3,
    //         },
    //         {
    //             name: 'Score differential',
    //             priority: 4,
    //         },
    //         {
    //             name: 'Tiebreak game',
    //             priority: 5,
    //         },
    //         {
    //             name: 'Coin toss',
    //             priority: 6,
    //         }
    //     ]
        
    //     if(!tournamentDetails.includeScore) {
    //         tiebreakOptions = tiebreakOptions.filter(to => to.name !== 'Score differential' && to.name !== 'Most wins');
    //     }
    //     if(!tournamentDetails.allowDraws) {
    //         tiebreakOptions = tiebreakOptions.filter(to => to.name !== 'Most wins');
    //     }

    //     tiebreakOptions = tiebreakOptions.map((tOption, index) => (
    //         {...tOption, priority: index + 1}
    //     ))

    //     return tiebreakOptions
    // }, [tournamentDetails.includeScore, tournamentDetails.allowDraws]);

    const moveUp = (index: number) => {

        let tiebreakOptions = tiebreakRules.slice(0);

        if(index > 0) {
            [tiebreakOptions[index], tiebreakOptions[index - 1] ] = [tiebreakOptions[index - 1], tiebreakOptions[index] ]
        }

        tiebreakOptions = tiebreakOptions.map((tOption, index) => (
            {...tOption, priority: index + 1}
        ))
        
        setTiebreakRules(tiebreakOptions);
    }

    const moveDown = (index: number) => {

        let tiebreakOptions = tiebreakRules.slice(0);

        if(index < tiebreakOptions.length) {
            [tiebreakOptions[index], tiebreakOptions[index + 1] ] = [tiebreakOptions[index + 1], tiebreakOptions[index] ]
        }

        tiebreakOptions = tiebreakOptions.map((tOption, index) => (
            {...tOption, priority: index + 1}
        ))
        
        setTiebreakRules(tiebreakOptions);
    }


        return (
            <div className='tournament-details-form-wrapper'>
                <div className='tournament-details-form'>
                    <div className='tournament-details-form-checkboxes-wrapper'>
                        <div className='tournament-details-form-checkbox'>
                            <button title='Games can be drawn' className={tournamentDetails.allowDraws ? 'input-checkbox input-checkbox-selected' : 'input-checkbox'} name="allow-draws" onClick={() => setTournamentDetails({...tournamentDetails, allowDraws: !tournamentDetails.allowDraws})}><BsCheck /></button>
                            <p className='checkbox-label'>Allow draws</p>
                        </div>
                        <div className='tournament-details-form-checkbox'>
                            <button title='Everyone plays each other twice' className={tournamentDetails.double ? 'input-checkbox input-checkbox-selected' : 'input-checkbox'} name="double-rounds" onClick={() => setTournamentDetails({...tournamentDetails, double: !tournamentDetails.double})}><BsCheck /></button>
                            <p className='checkbox-label'>Double rounds</p>
                        </div>
                        <div className='tournament-details-form-checkbox'>
                            <button title='Besides determining a winner include a game score' className={tournamentDetails.includeScore ? 'input-checkbox input-checkbox-selected' : 'input-checkbox'} name="include score" onClick={() => setTournamentDetails({...tournamentDetails, includeScore: !tournamentDetails.includeScore})}><BsCheck /></button>
                            <p className='checkbox-label'>Include score</p>
                        </div>
                    </div>
                    <div className='tournament-details-form-points-wrapper'>
                        <div className='tournament-details-form-input'>
                            <label htmlFor='input-win-points'>Points per win</label>
                            <input type='number' name='input-win-points' autoComplete='off' onChange={(event: ChangeEvent<HTMLInputElement>) => setTournamentDetails({...tournamentDetails, pointsPerWin: parseInt(event.target.value)})} value={tournamentDetails.pointsPerWin ? tournamentDetails.pointsPerWin : ''}></input>
                        </div>
                        <div className='tournament-details-form-input'>
                            <label htmlFor='input-draw-points'>Points per draw</label>
                            <input type='number' name='input-draw-points' autoComplete='off' disabled={tournamentDetails.allowDraws ? false : true} onChange={(event: ChangeEvent<HTMLInputElement>) => setTournamentDetails({...tournamentDetails, pointsPerDraw: parseInt(event.target.value)})} value={tournamentDetails.allowDraws ? tournamentDetails.pointsPerDraw : ''}></input>
                        </div>
                    </div>
                    <div className={tournamentDetails.includeScore ? 'tournament-details-match-format-wrapper' : 'tournament-details-match-format-wrapper tournament-details-match-format-wrapper-hidden'}>
                        <label>Match format</label>
                        <div className='tournament-details-match-format-buttons'>
                            <button className={tournamentDetails.bestOf === 1 ? 'tournament-details-match-format-button tournament-details-match-format-button-active' : 'tournament-details-match-format-button'} title='Best out of 1 match' onClick={() => setTournamentDetails({...tournamentDetails, bestOf: 1})}>Bo1</button>
                            <button className={tournamentDetails.bestOf === 2 ? 'tournament-details-match-format-button tournament-details-match-format-button-active' : 'tournament-details-match-format-button'} title='Best out of 2 matchs' onClick={() => setTournamentDetails({...tournamentDetails, bestOf: 2})}>Bo2</button>
                            <button className={tournamentDetails.bestOf === 3 ? 'tournament-details-match-format-button tournament-details-match-format-button-active' : 'tournament-details-match-format-button'} title='Best out of 3 matchs' onClick={() => setTournamentDetails({...tournamentDetails, bestOf: 3})}>Bo3</button>
                            <button className={tournamentDetails.bestOf === 5 ? 'tournament-details-match-format-button tournament-details-match-format-button-active' : 'tournament-details-match-format-button'} title='Best out of 5 matchs' onClick={() => setTournamentDetails({...tournamentDetails, bestOf: 5})}>Bo5</button>
                            <button className={tournamentDetails.bestOf === 7 ? 'tournament-details-match-format-button tournament-details-match-format-button-active' : 'tournament-details-match-format-button'} title='Best out of 7 matchs' onClick={() => setTournamentDetails({...tournamentDetails, bestOf: 7})}>Bo7</button>
                        </div>
                    </div>
                    <div className='tournament-details-tiebreak-rules-wrapper'>
                        <label>Tiebreak rules</label>
                        {tiebreakRules.map((tiebreakRule, index) => {
                            return(
                            <div key={index} className='tiebreak-rule-box' title={tiebreakRule.desc}>
                                <p className='tiebreak-rule-name'>{tiebreakRule.name}</p>
                                <div className='tiebreak-rule-arrows'>
                                    {tiebreakRule.priority !== 1 &&
                                        <button title='Move up' onClick={() => moveUp(index)}><FiChevronUp/></button>
                                    }
                                    {tiebreakRule.priority != tiebreakRules.length &&
                                        <button title='Move down' onClick={() => moveDown(index)}><FiChevronDown /></button>
                                    }
                                </div>
                            </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        );
    }

export default TournamentDetailsForm;