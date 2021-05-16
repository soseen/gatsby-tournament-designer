import { actionCreators, State } from '@/state/state';
import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'styles/contestantInput.scss'
import { Contestant } from '../types/Contestant'


type Props = {
    index: number,
    name: string
    setContestants: (contestants: Contestant[]) => void,
    contestants: Contestant[]
}

const ContestantInput: React.FC<Props> = ({index, name, setContestants, contestants}) => {

    const dispatch = useDispatch();

    const { updateParticipants } = bindActionCreators(actionCreators, dispatch);
    const state = useSelector((state: State) => state.tournamentDetails)


    const handleChange = ({
        target: { value, name },
    }: ChangeEvent<HTMLInputElement>): void => {
        
        const newContestants = state.participants.slice(0);

        newContestants[index] = { name: value };
        if (index + 1 === newContestants.length) {
            newContestants.push({ name: '' });  
        }
        while (
            newContestants[newContestants.length - 1].name === '' &&
            newContestants[newContestants.length - 2].name === '' &&
            newContestants.length > 2
        ) {
            newContestants.pop();
        }
        updateParticipants(newContestants);
    };
        return (
            <div key={index} className='contestant-input-wrapper'>
                <label htmlFor={`contestant-${index}`}>{`Contestant ${index + 1}`}</label>
                <input id={`contestant-${index}`} type='text' name={`contestant-${index}`} autoComplete='off' onChange={handleChange} value={name} placeholder='name...'></input>
            </div>
        );
}

export default ContestantInput;