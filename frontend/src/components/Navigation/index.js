import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const [navOpen, setNavOpen] = useState(false);

    const handleNav = () => setNavOpen(!navOpen);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <div>
                    <NavLink className="nav__link" to="/login">Log In</NavLink>
                </div>
                <div>
                    <NavLink className="nav__link" to="/signup">Sign Up</NavLink>
                </div>
            </>
        );
    }

    return (
        <>
            <button onClick={handleNav} className="button" hidden={navOpen}>Navigation</button>
            {navOpen &&
                <nav className="nav">
                <button onClick={handleNav} className="open__nav ">Close</button>
                <NavLink className="nav__link" exact to="/">Home</NavLink>
                {isLoaded && sessionLinks}
            </nav>}
        </>
    );
}

export default Navigation;