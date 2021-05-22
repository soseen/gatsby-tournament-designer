import React, { useEffect, useState } from 'react'
import { RouteComponentProps, useParams } from '@reach/router';
import Layout from './Layout';
import { useSelector } from 'react-redux';
import { State } from '@/state/state';
import { TournamentDetails } from '../types/TournamentDetails'
import '../styles/tournamentView.scss';


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
                            <p>{tournamentData.name}</p>
                        </div>
                    }
                </div>
            </Layout>
        )
}

export default TournamentView;