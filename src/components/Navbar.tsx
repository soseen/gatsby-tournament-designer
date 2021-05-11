import React, { useState } from 'react'
import { Link } from "gatsby"
import '../styles/Navbar.scss'
import { StaticImage } from "gatsby-plugin-image"
import { BiMenuAltRight } from "react-icons/bi";
import { FaBars } from "react-icons/fa";

const Navbar: React.FC = () => {

    const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState<Boolean>(false)

    return (
        <header>
            <div className='navbar-wrapper'>
                <div className='navbar'>
                    <Link to='/'>
                        <a className='logo'>
                            <StaticImage
                                src="../img/td-logo.png"
                                alt="Logo"
                                placeholder="blurred"
                                layout="fixed"
                                width={140}
                                height={35}
                                quality={100}
                            />
                        </a>
                    </Link>
                    <ul className='links'>
                        <Link activeClassName='route-active' to='/newTournament'><li><a>New Competition</a></li></Link>
                        <Link activeClassName='route-active' to='/tournaments'><li><a>Tournaments</a></li></Link>
                    </ul>
                    <button className='hamburger' name='menu'onClick={() => setIsHamburgerMenuOpen(!isHamburgerMenuOpen)}><FaBars /></button>
                </div>
            </div>
            <div className={isHamburgerMenuOpen ? 'hamburger-menu hamburger-menu-active' : 'hamburger-menu'}>
                    <ul className='links'>
                        <Link to='/newTournament'><li><a onClick={() => setIsHamburgerMenuOpen(false)}>New Competition</a></li></Link>
                        <Link to='/tournaments'><li><a onClick={() => setIsHamburgerMenuOpen(false)}>Tournaments</a></li></Link>
                    </ul>
                </div>
        </header>
        
    )
}

export default Navbar