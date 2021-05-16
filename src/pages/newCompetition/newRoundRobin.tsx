import ContestantInput from '@/components/ContestantInput';
import { Link } from 'gatsby';
import React, { useState, ChangeEvent } from 'react';
import Layout from '../../components/Layout';
import TournamentIcons from '../../components/TournamentIcons';
import TournamentDetailsForm from '../../components/TournamentDetailsForm'
import '../../styles/newRoundRobin.scss'
import { Contestant } from '../../types/Contestant';
import { TournamentIcon } from '../../types/TournamentIcon'
import { TournamentDetails } from '../../types/TournamentDetails'
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '@/state/state';

const newRoundRobin: React.FC = () => {

    const dispatch = useDispatch();

    const { updateName } = bindActionCreators(actionCreators, dispatch)

    const state = useSelector((state: State) => state.tournamentDetails)
    
    const tournamentDetailsInit = {
        name: '',
        participants: [],
        pointsPerWin: 3,
        pointsPerDraw: 1,
        bestOf: null,
        finalsBestOf: null,
        allowDraws: true,
        includeScore: true,
        tournamentIconId: null
    }

    const [contestants, setContestants] = useState<Contestant[]>([
        { name: '' },
        { name: '' },
    ]);
    const [selectedIcon, setSelectedIcon] = useState<TournamentIcon | null>(null)
    const [tournamentDetails, setTournamentDetails] = useState<TournamentDetails>(tournamentDetailsInit)

        
    return (
        <Layout>
            <div className='new-rr-wrapper'>
                <div className='new-rr-main'>
                    <div className='new-rr-header'>
                        <h1>Round-Robin Format</h1>
                        <Link to='/newCompetition'><button>Back</button></Link>
                    </div>
                    <div className='new-rr-tournament-name'>
                        <label htmlFor='tournament-name-input'>Tournament Name</label>
                        <input type='text' name='tournament-name-input' className='tournament-name-input' autoComplete='off' placeholder='name...' value={state.name} onChange={(event: ChangeEvent<HTMLInputElement>) => updateName(event.target.value)}></input>
                    </div>
                    <TournamentIcons selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />
                    <div className='new-rr-panel'>
                        <div className='new-rr-participants-wrapper'>
                            <h4>Add Participants</h4>
                            <div className='new-rr-participants'>
                                {state.participants.map(({ name }, index) => (
                                    <ContestantInput key={index} index={index} name={name} contestants={contestants} setContestants={setContestants} />
                                ))
                                }
                            </div>
                        </div>
                        <div className='new-rr-edit-info-wrapper'>
                            <h4>Specify Rules</h4>
                            <TournamentDetailsForm />
                        </div>
                    </div>
                    <button className='submit-tournament-button'>Submit</button>
                </div>
            </div>
        </Layout>
    );
}

export default newRoundRobin;