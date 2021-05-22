import { TournamentDetails } from '@/types/TournamentDetails'
import { GatsbyImage } from 'gatsby-plugin-image'
import { RouteComponentProps } from '@reach/router';
import './../styles/tournamentItem.scss'
import React from 'react'
import { Link } from 'gatsby';

interface Props extends RouteComponentProps  {
    tournament: TournamentDetails
}

const TournamentItem: React.FC<Props> = ({tournament}) => {
        return (
                <div key={tournament.id} className='tournament-item'>
                    <div className='tournament-item-header'>
                        <div className='tournament-icon'>
                            <GatsbyImage image={tournament.icon.img} alt={tournament.icon.name}></GatsbyImage>
                        </div>
                        <div className='tournament-name'>
                            <h3>{tournament.name}</h3>
                            <p>{tournament.format}</p>
                        </div>
                        <Link to={`/tournament/${tournament.id}`}><button title='Display tournament details'>Display</button></Link>
                    </div>
                    <div className='tournament-item-description'>
                    </div>
                </div>
        )
}

export default TournamentItem