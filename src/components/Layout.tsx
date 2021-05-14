import React from 'react'
import Navbar from './Navbar'
import '../styles/Layout.scss';

type Props = {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({children}) => {

    return (
        <div className='layout'>
            <Navbar />
            <div className='content'>
                {children}
            </div>
            
        </div>
    )
}

export default Layout
