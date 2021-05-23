import React, { useEffect, useState } from 'react'
import { RouteComponentProps, useParams } from '@reach/router';
import Layout from './Layout';
import RoundRobinTournament from './RoundRobinTournament';
import { useSelector } from 'react-redux';
import { State } from '@/state/state';
import { TournamentDetails } from '../types/TournamentDetails'
import '../styles/tournamentView.scss';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';


const TournamentView: React.FC<RouteComponentProps> = () => {

    const state = useSelector((state: State) => state.tournamentsData);
    const params = useParams()
    const [tournamentData, setTournamentData] = useState<TournamentDetails | null>(null);

    useEffect(() => {
        if(state) {
            setTournamentData(state.find(tournament => tournament.id === parseInt(params.id)))
        }
    }, [state])


        return (
            <Layout>
                <div className='tournament-wrapper'>
                    {tournamentData && 
                        <div className='tournament-main'>
                            <div className='tournament-header'>
                                <div className='tournament-icon'>
                                    <GatsbyImage image={tournamentData.icon.img} alt={tournamentData.icon.name} />
                                </div>
                                <h1>{tournamentData.name}</h1>
                                <Link to='/tournaments'><button title='back'>Back</button></Link>
                            </div>
                            {tournamentData.format === 'round-robin' &&
                                    <RoundRobinTournament tournamentData={tournamentData} />
                            }
                        </div>
                    }
                </div>
            </Layout>
        )
}

export default TournamentView;