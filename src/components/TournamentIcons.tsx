import React from 'react';
import { TournamentIcon } from '../types/TournamentIcon'
import { GatsbyImage } from 'gatsby-plugin-image';
import { graphql, Link, useStaticQuery } from 'gatsby';
import '../styles/TournamentIcons.scss';
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '@/state/state';


type Props = {
    selectedIcon: TournamentIcon,
    setSelectedIcon: (selectedIcon: TournamentIcon) => void
}

const TournamentIcons: React.FC<Props> = ({selectedIcon, setSelectedIcon}) => {

    const dispatch = useDispatch();

    const { updateIcon } = bindActionCreators(actionCreators, dispatch)

    const state = useSelector((state: State) => state.tournamentDetails)

    const data = useStaticQuery(graphql`
        query {
            allFile(filter: {relativeDirectory: {eq: "tournamentIcons"}}) {
                edges {
                    node {
                        base
                        childImageSharp {
                            gatsbyImageData(layout: CONSTRAINED, width: 60, quality: 100)
                        }
                    }
                }
            }
        }
    `);

    
    const selectTournamentIcon = (id: number) => {
        setSelectedIcon(tournamentIconsData.find(icon => icon.id === id))
    }


    const tournamentIconsData: TournamentIcon[] = data.allFile.edges.map(({node}, index) => 
        (
            {
                img: node.childImageSharp.gatsbyImageData, 
                id: index,
                name: node.base,
                selected: false
            }
        )
    );

        return (
            <div className='tournament-icons-wrapper'>
                <h4>Choose Tournament Icon</h4>
                <h2>{state.iconId}</h2>
                {tournamentIconsData.map(({id, img, name}) => (
                    <button key={id} className={selectedIcon?.id === id ? 'tournament-icon tournament-icon-selected' : 'tournament-icon'} onClick={() => updateIcon(id)}>
                        <GatsbyImage image={img} alt={name}></GatsbyImage>
                    </button>
                ))}
            </div>
        );
    }

export default TournamentIcons;