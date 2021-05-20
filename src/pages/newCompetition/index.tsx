import React from 'react';
import Layout from '../../components/Layout'
import '../../styles/newTournament.scss'
import { StaticImage } from "gatsby-plugin-image"
import { BiPlus, BiMinus } from "react-icons/bi";
import { Link } from 'gatsby';
import { useDispatch } from 'react-redux';
import { selectFormat, setTournament } from '@/state/actions/actionCreators';
import { tournamentDetailsInit } from '../../data/tournamentDetailsInit';
import { TournamentDetails } from '@/types/TournamentDetails';

const newCompetition: React.FC = () => {

    const dispatch = useDispatch();

    const setNewTournament = (formatName: string) => {

        let newTournament: TournamentDetails = {...tournamentDetailsInit, format: formatName}

        dispatch(setTournament(newTournament));
    }
        
    return (
        <Layout>
            <div className='new-tournament-wrapper'>
                <div className='new-tournament-main'>
                <div className='new-tournament-header'>
                    <h1>New Competition</h1>
                </div>
                <label>Choose format</label>
                <div className='new-tournament-formats-wrapper'>
                    <div className='new-tournament-format-card-wrapper'>
                        <div className='new-tournament-format-card'>
                            <div className='new-tournament-format-img'>
                                <StaticImage
                                            src="../../img/format-rr.png"
                                            alt="Round-Robin"
                                            placeholder="tracedSVG"
                                            layout="fixed"
                                            width={60}
                                            height={60}
                                            quality={100}
                                />
                            </div>
                            <div className='new-tournament-format-title'>
                                <h3>Round-Robin</h3>
                            </div>
                            <div className='new-tournament-format-desc-wrapper'>
                                <div className='new-tournament-format-desc'>
                                    <p>Each contestant plays against all other participants. The champion is determined based on the most points at the end. Typically known for being used in football leagues as well as chess tournaments</p>
                                    
                                </div>
                                <div className='new-tournament-format-features'>
                                        <p><span className='adv'><BiPlus /></span> everyone plays the same opponents</p>
                                        <p><span className='adv'><BiPlus /></span> easy way of ranking all the participants</p>
                                        <p><span className='dis'><BiMinus /></span> requires a lot of games to be played</p>
                                </div>
                            </div>
                            <Link activeClassName='route-active' to='/newCompetition/newRoundRobin'><button title='select Round-Robin' className='select-format-btn' onClick={() => setNewTournament('round-robin')}>Select</button></Link>
                        </div>
                    </div>
                    <div className='new-tournament-format-card-wrapper'>
                        <div className='new-tournament-format-card'>
                            <div className='new-tournament-format-img'>
                                <StaticImage
                                            src="../../img/format-el1.png"
                                            alt="Single Elim"
                                            placeholder="tracedSVG"
                                            layout="fixed"
                                            width={60}
                                            height={60}
                                            quality={100}
                                />
                            </div>
                            <div className='new-tournament-format-title'>
                                <h3>Single Elimination</h3>
                            </div>
                            <div className='new-tournament-format-desc-wrapper'>
                                <div className='new-tournament-format-desc'>
                                    <p>Contestants are drawn against each other. Winner advances to play in the next round while loser is eliminated. Very popular playoff format </p>
                                    
                                </div>
                                <div className='new-tournament-format-features'>
                                        <p><span className='adv'><BiPlus /></span> requires the least amount of games to determine a champion</p>
                                        <p><span className='adv'><BiPlus /></span> every single game matters</p>
                                        <p><span className='dis'><BiMinus /></span> very much reliant on seeding</p>
                                        <p><span className='dis'><BiMinus /></span> no room for mistakes</p>
                                </div>

                            </div>
                            <button title='select Single Elimination' className='select-format-btn' onClick={() => setNewTournament('single-elimination')}>Select</button>
                        </div>

                    </div>
                    <div className='new-tournament-format-card-wrapper'>
                        <div className='new-tournament-format-card'>
                            <div className='new-tournament-format-img'>
                                <StaticImage
                                            src="../../img/format-el2.png"
                                            alt="Double Elim"
                                            placeholder="tracedSVG"
                                            layout="fixed"
                                            width={60}
                                            height={60}
                                            quality={100}
                                />
                            </div>
                            <div className='new-tournament-format-title'>
                                <h3>Double Elimination</h3>
                            </div>
                            <div className='new-tournament-format-desc-wrapper'>
                                <div className='new-tournament-format-desc'>
                                    <p>Divided into winner's and looser's bracket. Losing a game means dropping into looser's bracket for the remainder of the tournament. Second lose equals elimination. </p>
                                    
                                </div>
                                <div className='new-tournament-format-features'>
                                        <p><span className='adv'><BiPlus /></span> not as punishing as single elimination format </p>
                                        <p><span className='adv'><BiPlus /></span> doesn't require a lot of games</p>
                                        <p><span className='dis'><BiMinus /></span> can be difficult to understand</p>
                                </div>

                            </div>
                            <button title='select Double Elimination' className='select-format-btn' onClick={() => setNewTournament('double-elimination')}>Select</button>
                        </div>

                    </div>
                    <div className='new-tournament-format-card-wrapper'>
                        <div className='new-tournament-format-card'>
                            <div className='new-tournament-format-img'>
                                <StaticImage
                                            src="../../img/format-swiss.png"
                                            alt="Swiss"
                                            placeholder="tracedSVG"
                                            layout="fixed"
                                            width={60}
                                            height={60}
                                            quality={100}
                                />
                            </div>
                            <div className='new-tournament-format-title'>
                                <h3>Swiss System</h3>
                            </div>
                            <div className='new-tournament-format-desc-wrapper'>
                                <div className='new-tournament-format-desc'>
                                    <p>Contestants are matched against each other based on their current score. This system is similar to round-robin but requires considerably fewer games to be played. </p>
                                    
                                </div>
                                <div className='new-tournament-format-features'>
                                        <p><span className='adv'><BiPlus /></span> all players are ranked</p>
                                        <p><span className='adv'><BiPlus /></span> relatively equal pairings in terms of skill</p>
                                        <p><span className='dis'><BiMinus /></span> often the winner is known before the final rounds</p>
                                </div>

                            </div>
                            <Link activeClassName='route-active' to='/newCompetition/newSwiss'><button title='select Swiss' className='select-format-btn' onClick={() => setNewTournament('swiss')}>Select</button></Link>
                        </div>

                    </div>
                </div>
                </div>
            </div>
        </Layout>
    );
}

export default newCompetition;