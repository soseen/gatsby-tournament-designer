import ContestantInput from '@/components/ContestantInput';
import { Link } from 'gatsby';
import React, { useState, ChangeEvent } from 'react';
import Layout from '../../components/Layout';
import TournamentIcons from '../../components/TournamentIcons';
import TournamentDetailsForm from '../../components/TournamentDetailsForm'
import '../../styles/newRoundRobin.scss'
import { Contestant } from '../../types/Contestant';
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '@/state/state';
import { axios } from '../../axios/axios';


const newRoundRobin: React.FC = () => {

    const dispatch = useDispatch();
    const { updateName, setIsFetchingData, loadTournaments } = bindActionCreators(actionCreators, dispatch)
    const state = useSelector((state: State) => state.tournamentDetails)

    const [validationMessage, setValidationMessage] = useState<string | null>(null);
    
    const [contestants, setContestants] = useState<Contestant[]>([
        { name: '' },
        { name: '' },
    ]);

    const validateForm = (): boolean => {
 
    let tournamentDetails = state;

        if(tournamentDetails.name === ''){
            setValidationMessage('Please set the name of your tournament')
            return false
        } 
        else if (!tournamentDetails.iconId){
            setValidationMessage('Choose one of the available icons for your tournament')
            return false
        }
        else if(tournamentDetails?.participants[0].name === '' || tournamentDetails?.participants[1].name === ''){
            setValidationMessage('At least 2 contestants are required to carry out the tournament')
            return false
        }
        else if (tournamentDetails.participants.filter(participant => participant.name === '')?.length > 1){
            setValidationMessage('At least one of the contestants has no name set up')
            return false
        }
        else if ([...new Set(tournamentDetails.participants.map(p => p.name))].length !== tournamentDetails.participants.map(p => p.name).length){
            setValidationMessage('You need to enter unique names of the participants')
            return false
        }
        else if (tournamentDetails?.includeScore && !tournamentDetails.bestOf){
            setValidationMessage('Please choose a match format from the available options')
            return false
        }
        else {
            setValidationMessage(null);
            return true
        }
    }

    const submitTournament = async () => {

        setIsFetchingData(true);

        let isFormValid = validateForm()

        if(isFormValid){

            try {
                let promises = []

                const newTournament: any = await axios.post(`/tournaments`, state).catch(err => console.log(err))

                let tournamentId = newTournament.data.id;

                let tournamentContestants = state.participants.filter(p => p.name !== '').map((participant) => ( {...participant, tournamentId}));

                tournamentContestants.forEach(tournamentContestant => {
                    promises.push(axios.post('/contestants', tournamentContestant).catch(err => console.log(err)))
                });


                for(let i = 1; i<tournamentContestants.length; i++) {
                    promises.push(axios.post('/rounds', {no: i, tournamentId}).catch(err => console.log(err)))
                }

                state.tiebreakRules.forEach(tiebreakRule => {
                    promises.push(axios.post('/tiebreakRules', {...tiebreakRule, tournamentId}).catch(err => console.log(err)))
                })

                try {
                    const promiseResponse = await Promise.all(promises); 
                    console.log(promiseResponse);
                } catch (error) {
                    console.log(error);
                    return; 
                }

                const tournamentsResponse: any = await axios.get('/tournaments').catch(err => console.log(err));
                loadTournaments(tournamentsResponse.data)

            } catch (error) {
                console.log(error);
                setIsFetchingData(false);
                return; 
            }   
        }

        setIsFetchingData(false);

    }

        
    return (
        <Layout>
            <div className='new-rr-wrapper'>
                <div className='new-rr-main'>
                    <div className='new-rr-header'>
                        <h1>Round-Robin Format</h1>
                        <Link to='/newCompetition'><button>Back</button></Link>
                    </div>
                    {validationMessage && 
                        <div className='new-rr-tournament-validation-wrapper'>
                        <p>{validationMessage}</p>
                        </div>
                    }
                    <div className='new-rr-tournament-name'>
                        <label htmlFor='tournament-name-input'>Tournament Name</label>
                        <input type='text' name='tournament-name-input' className='tournament-name-input' autoComplete='off' placeholder='name...' value={state.name} onChange={(event: ChangeEvent<HTMLInputElement>) => updateName(event.target.value)}></input>
                    </div>
                    <TournamentIcons />
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
                    <button className='submit-tournament-button' onClick={submitTournament}>Submit</button>
                </div>
            </div>
        </Layout>
    );
}

export default newRoundRobin;