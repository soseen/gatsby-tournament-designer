import React from 'react';
import Layout from '../components/Layout';
import '../styles/global.scss'

const App: React.FC = () => {

    return(
        <Layout>
            <div>Hello world!</div>
            <div className='wrapper'>
            </div>
        </Layout>
    );
}

export default App

