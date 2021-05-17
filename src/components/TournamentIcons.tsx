import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import '../styles/TournamentIcons.scss';
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '@/state/state';


const TournamentIcons: React.FC = () => {

    const dispatch = useDispatch();

    const { updateIcon } = bindActionCreators(actionCreators, dispatch)

    const state = useSelector((state: State) => state)

        return (
            <div className='tournament-icons-wrapper'>
                <h4>Choose Tournament Icon</h4>
                {state.tournamentIcons.map((icon) => (
                    <button key={icon.id} className={state.tournamentDetails?.icon === icon.id ? 'tournament-icon tournament-icon-selected' : 'tournament-icon'} onClick={() => updateIcon(icon.id)}>
                        <GatsbyImage image={icon.img} alt={icon.name}></GatsbyImage>
                    </button>
                ))}
            </div>
        );
    }

export default TournamentIcons;