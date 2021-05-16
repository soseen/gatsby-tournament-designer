import { TournamentDetails } from '../types/TournamentDetails';
import React, { ChangeEvent, useMemo, useState, useEffect } from 'react';
import '../styles/tournamentDetailsForm.scss'
import { BsCheck } from "react-icons/bs";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '@/state/state';
import { tiebreakRulesDefault } from '../data/tiebreakRulesDefault';



const TournamentDetailsForm: React.FC = () => {

    const dispatch = useDispatch();
    const { updatePointsWin, updatePointsDraw, updateAllowDraws, updateDoubleRounds, updateIncludePoints, updateBestOf, updateTiebreakRules } = bindActionCreators(actionCreators, dispatch)

    const state = useSelector((state: State) => state.tournamentDetails)

    useEffect(() => {

        let tiebreakOptions = tiebreakRulesDefault.slice(0);

        if(!state.includeScore) {
            tiebreakOptions = tiebreakOptions.filter(to => to.name !== 'Score differential' && to.name !== 'Most wins');
        }
        if(!state.allowDraws) {
            tiebreakOptions = tiebreakOptions.filter(to => to.name !== 'Most wins');
        }

        tiebreakOptions = tiebreakOptions.map((tOption, index) => (
            {...tOption, priority: index + 1}
        ))

        updateTiebreakRules(tiebreakOptions);
        
    }, [state.includeScore, state.allowDraws])

    const moveUp = (index: number) => {

        let tiebreakOptions = state.tiebreakRules.slice(0);

        if(index > 0) {
            [tiebreakOptions[index], tiebreakOptions[index - 1] ] = [tiebreakOptions[index - 1], tiebreakOptions[index] ]
        }

        tiebreakOptions = tiebreakOptions.map((tOption, index) => (
            {...tOption, priority: index + 1}
        ))
        
        updateTiebreakRules(tiebreakOptions);
    }

    const moveDown = (index: number) => {

        let tiebreakOptions = state.tiebreakRules.slice(0);

        if(index < tiebreakOptions.length) {
            [tiebreakOptions[index], tiebreakOptions[index + 1] ] = [tiebreakOptions[index + 1], tiebreakOptions[index] ]
        }

        tiebreakOptions = tiebreakOptions.map((tOption, index) => (
            {...tOption, priority: index + 1}
        ))
        
        updateTiebreakRules(tiebreakOptions);
    }


        return (
            <div className='tournament-details-form-wrapper'>
                <div className='tournament-details-form'>
                    <div className='tournament-details-form-checkboxes-wrapper'>
                        <div className='tournament-details-form-checkbox'>
                            <button title='Games can be drawn' className={state.allowDraws ? 'input-checkbox input-checkbox-selected' : 'input-checkbox'} name="allow-draws" onClick={() => updateAllowDraws(!state.allowDraws)}><BsCheck /></button>
                            <p className='checkbox-label'>Allow draws</p>
                        </div>
                        <div className='tournament-details-form-checkbox'>
                            <button title='Everyone plays each other twice' className={state.double ? 'input-checkbox input-checkbox-selected' : 'input-checkbox'} name="double-rounds" onClick={() => updateDoubleRounds(!state.double)}><BsCheck /></button>
                            <p className='checkbox-label'>Double rounds</p>
                        </div>
                        <div className='tournament-details-form-checkbox'>
                            <button title='Besides determining a winner include a game score' className={state.includeScore ? 'input-checkbox input-checkbox-selected' : 'input-checkbox'} name="include score" onClick={() => updateIncludePoints(!state.includeScore)}><BsCheck /></button>
                            <p className='checkbox-label'>Include score</p>
                        </div>
                    </div>
                    <div className='tournament-details-form-points-wrapper'>
                        <div className='tournament-details-form-input'>
                            <label htmlFor='input-win-points'>Points per win</label>
                            <input type='number' name='input-win-points' autoComplete='off' onChange={(event: ChangeEvent<HTMLInputElement>) => updatePointsWin(parseInt(event.target.value))} value={state.pointsPerWin ? state.pointsPerWin : ''}></input>
                        </div>
                        <div className='tournament-details-form-input'>
                            <label htmlFor='input-draw-points'>Points per draw</label>
                            <input type='number' name='input-draw-points' autoComplete='off' disabled={state.allowDraws ? false : true} onChange={(event: ChangeEvent<HTMLInputElement>) => updatePointsDraw(parseInt(event.target.value))} value={state.allowDraws ? state.pointsPerDraw : ''}></input>
                        </div>
                    </div>
                    <div className={state.includeScore ? 'tournament-details-match-format-wrapper' : 'tournament-details-match-format-wrapper tournament-details-match-format-wrapper-hidden'}>
                        <label>Match format</label>
                        <div className='tournament-details-match-format-buttons'>
                            <button className={state.bestOf === 1 ? 'tournament-details-match-format-button tournament-details-match-format-button-active' : 'tournament-details-match-format-button'} title='Best out of 1 match' onClick={() => updateBestOf(1)}>Bo1</button>
                            <button className={state.bestOf === 2 ? 'tournament-details-match-format-button tournament-details-match-format-button-active' : 'tournament-details-match-format-button'} title='Best out of 2 matchs' onClick={() => updateBestOf(2)}>Bo2</button>
                            <button className={state.bestOf === 3 ? 'tournament-details-match-format-button tournament-details-match-format-button-active' : 'tournament-details-match-format-button'} title='Best out of 3 matchs' onClick={() => updateBestOf(3)}>Bo3</button>
                            <button className={state.bestOf === 5 ? 'tournament-details-match-format-button tournament-details-match-format-button-active' : 'tournament-details-match-format-button'} title='Best out of 5 matchs' onClick={() => updateBestOf(5)}>Bo5</button>
                            <button className={state.bestOf === 7 ? 'tournament-details-match-format-button tournament-details-match-format-button-active' : 'tournament-details-match-format-button'} title='Best out of 7 matchs' onClick={() => updateBestOf(7)}>Bo7</button>
                        </div>
                    </div>
                    <div className='tournament-details-tiebreak-rules-wrapper'>
                        <label>Tiebreak rules</label>
                        {state.tiebreakRules.map((tiebreakRule, index) => {
                            return(
                            <div key={index} className='tiebreak-rule-box' title={tiebreakRule.desc}>
                                <p className='tiebreak-rule-name'>{tiebreakRule.name}</p>
                                <div className='tiebreak-rule-arrows'>
                                    {tiebreakRule.priority !== 1 &&
                                        <button title='Move up' onClick={() => moveUp(index)}><FiChevronUp/></button>
                                    }
                                    {tiebreakRule.priority != state.tiebreakRules.length &&
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