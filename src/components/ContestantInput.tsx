import React, { ChangeEvent } from 'react';
import 'styles/contestantInput.scss'
import { Contestant } from '../types/Contestant'


type Props = {
    index: number,
    name: string
    setContestants: (contestants: Contestant[]) => void,
    contestants: Contestant[]
}

const ContestantInput: React.FC<Props> = ({index, name, setContestants, contestants}) => {

    const handleChange = ({
        target: { value, name },
    }: ChangeEvent<HTMLInputElement>): void => {
        
        const newContestants = contestants.slice(0);

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
        setContestants(newContestants);
    };
        return (
            <div key={index} className='contestant-input-wrapper'>
                <label htmlFor={`contestant-${index}`}>{`Contestant ${index + 1}`}</label>
                <input id={`contestant-${index}`} type='text' name={`contestant-${index}`} autoComplete='off' onChange={handleChange} value={name} placeholder='name...'></input>
            </div>
        );
}

export default ContestantInput;