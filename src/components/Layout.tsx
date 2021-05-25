import React, { useCallback, useEffect } from 'react'
import Navbar from './Navbar'
import '../styles/Layout.scss';
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from '../state/store'
import { graphql, useStaticQuery } from 'gatsby';
import { actionCreators, State } from '@/state/state';
import { bindActionCreators } from 'redux';
import { TournamentIcon } from '@/types/TournamentIcon';
import ClipLoader from 'react-spinners/ClipLoader';
import { axios } from '../axios/axios';
import { TournamentDetails } from '@/types/TournamentDetails';

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
                        gatsbyImageData(layout: CONSTRAINED, width: 100, quality: 100)
                    }
                }
            }
        }
    }
    `);

    const dispatch = useDispatch();

    const { addTournamentIcons, loadTournaments, setIsFetchingData } = bindActionCreators(actionCreators, dispatch)

    const state = useSelector((state: State) => state)

    const fetchTournamentsData = useCallback(async() => {
        setIsFetchingData(true);
        const tournamentsResponse: any = await axios.get('/tournaments').catch(err => console.log(err));

        if(tournamentsResponse?.data){
            let tournamentsData: TournamentDetails[] = tournamentsResponse.data

            const tournamentIconsData: TournamentIcon[] = data.allFile.edges.map(({node}, index) => 
                    (
                        {
                            img: node.childImageSharp.gatsbyImageData, 
                            id: index + 1,
                            name: node.base
                        }
                    )
                )
            
            tournamentsData = tournamentsData.map((tournament) => ({...tournament, icon: tournamentIconsData?.find(icon => icon.id === tournament.iconId)}))           

            loadTournaments(tournamentsData)
        }
        setIsFetchingData(false);
    }, [])


    useEffect(() => {
        
        if(!state?.tournamentsData) {
            fetchTournamentsData()
        }

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
                <div className='fetching-spinner'>
                    <ClipLoader color='#be0546' loading={state.isFetchingData} size={40} />
                </div>
                <Navbar />
                <div className='content'>
                    {children}
                </div>
            </Provider>
        </div>
    )
}

export default Layout
