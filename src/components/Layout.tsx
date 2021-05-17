import React, { useEffect } from 'react'
import Navbar from './Navbar'
import '../styles/Layout.scss';
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from '../state/store'
import { graphql, useStaticQuery } from 'gatsby';
import { actionCreators, State } from '@/state/state';
import { bindActionCreators } from 'redux';
import { TournamentIcon } from '@/types/TournamentIcon';

type Props = {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({children}) => {

    const data = useStaticQuery(graphql`
    query {
        allFile(filter: {relativeDirectory: {eq: "tournamentIcons"}}) {
            edges {
                node {
                    base
                    childImageSharp {
                        gatsbyImageData(layout: CONSTRAINED, width: 60, quality: 100)
                    }
                }
            }
        }
    }
    `);

    const dispatch = useDispatch();

    const { addTournamentIcons } = bindActionCreators(actionCreators, dispatch)

    const state = useSelector((state: State) => state)


    useEffect(() => {
        if(state?.tournamentIcons) {
            const tournamentIconsData: TournamentIcon[] = data.allFile.edges.map(({node}, index) => 
                (
                    {
                        img: node.childImageSharp.gatsbyImageData, 
                        id: index + 1,
                        name: node.base
                    }
                )
            )

            addTournamentIcons(tournamentIconsData);
        }

    }, [])

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
