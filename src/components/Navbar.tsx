import React, { useState } from 'react'
import { Link } from "gatsby"
import '../styles/Navbar.scss'
import { StaticImage } from "gatsby-plugin-image"
import { FaBars } from "react-icons/fa";

const Navbar: React.FC = () => {

    const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState<Boolean>(false)

    return (
        <header>
            <div className='navbar-wrapper'>
                <div className='navbar'>
                    <Link to='/'>
                        <div className='logo'>
                            <StaticImage
                                src="../img/td-logo.png"
                                alt="Logo"
                                placeholder="tracedSVG"
                                layout="fixed"
                                width={140}
                                height={35}
                                quality={100}
                            />
                        </div>
                    </Link>
                    <ul className='links'>
                        <Link activeClassName='route-active' to='/newCompetition'><li><p>New Competition</p></li></Link>
                        <Link activeClassName='route-active' to='/tournaments'><li><p>Tournaments</p></li></Link>
                    </ul>
                    <button className='hamburger' name='menu'onClick={() => setIsHamburgerMenuOpen(!isHamburgerMenuOpen)}><FaBars /></button>
                </div>
            </div>
            <div className={isHamburgerMenuOpen ? 'hamburger-menu hamburger-menu-active' : 'hamburger-menu'}>
                    <ul className='links'>
                        <Link to='/newCompetition'><li><p onClick={() => setIsHamburgerMenuOpen(false)}>New Competition</p></li></Link>
                        <Link to='/tournaments'><li><p onClick={() => setIsHamburgerMenuOpen(false)}>Tournaments</p></li></Link>
                    </ul>
                </div>
        </header>
        
    )
}

export default Navbar