import React from 'react'
import Navbar from './Navbar'

type Props = {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({children}) => {
    // const data = useStaticQuery(
    //     graphql`
    //         query Logo {
    //             file(relativePath: {eq: "deer.png"}) {
    //                 childImageSharp {
    //                     fluid {
    //                     ...GatsbyImageSharpFluid
    //                     }
    //                 }
    //             }
    //         }
    //     `
    // )
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
