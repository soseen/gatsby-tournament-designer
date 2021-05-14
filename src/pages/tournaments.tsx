import React from 'react';
import Layout from '../components/Layout'
import '../styles/tournaments.scss'

const tournaments: React.FC = () => {
        
    return (
        <Layout>
            <div className='tournaments-wrapper'>
                Tournaments
            </div>
        </Layout>
    );
}

export default tournaments;