import React from 'react';
import Layout from '../components/Layout';
import '../styles/global.scss'

type Data = {
    data: {
        file: {
            childImageSharp: {
                fluid: {
                    aspectRatio: number,
                    base64: string,
                    sizes: string,
                    src: string,
                    srcSet: string
                }
            }
        }
    }
}

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

