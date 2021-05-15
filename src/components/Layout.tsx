import React from 'react'
import Navbar from './Navbar'
import '../styles/Layout.scss';
import { Provider } from "react-redux";
import { store } from '../state/store'

type Props = {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({children}) => {

    return (
        <div className='layout'>
            <Provider store={store}>
                <Navbar />
                <div className='content'>
                    {children}
                </div>
            </Provider>

        </div>
    )
}

export default Layout
