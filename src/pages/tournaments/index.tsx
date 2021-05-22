import { State } from '@/state/state';
import { TournamentDetails } from '@/types/TournamentDetails';
import TournamentItem from '../../components/TournamentItem'
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/Layout'
import '../../styles/tournaments.scss';
import { compareDesc, parseISO } from 'date-fns';

const tournaments: React.FC = () => {

    const state = useSelector((state: State) => state)

    const tournamentsData = useMemo(() => {

        if(state.tournamentsData){
            let tournaments: TournamentDetails[] = state.tournamentsData;

            tournaments = tournaments.sort((a, b) => compareDesc(parseISO(a.createdAt),parseISO(b.createdAt)))
            return tournaments
        }
        else {
            return null;
        }
        
    }, [state.tournamentsData])
        
    return (
        <Layout>
            <div className='tournaments-wrapper'>
                <div className='tournaments-main'>
                    <div className='tournaments-header'>
                        <h1>Tournaments</h1>
                    </div>
                    <div className='tournaments-list-wrapper'>
                            {tournamentsData?.map((tournament) => {
                                return(
                                    <TournamentItem key={tournament.id} tournament={tournament}/>
                                )
                            })}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default tournaments;