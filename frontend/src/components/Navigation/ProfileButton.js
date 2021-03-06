import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from "react-router-dom";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push("/")
    };

    return (
        <>
            <div className="profile__button">
                <button onClick={openMenu}>
                    <i className="fas fa-user-circle" />
                </button>
            </div>
            {showMenu && (
                <div className="dropdown">
                    <ul className="profile-dropdown">
                        <li>{user.username}</li>
                        <li>{user.email}</li>
                        <li>
                            <button className="open__nav" id="logout" onClick={logout}>Log Out</button>
                        </li>
                    </ul>
                    <div>
                        <NavLink className="nav__link" to="/album">Albums</NavLink>
                    </div>
                </div>

            )}
        </>
    );
}

export default ProfileButton;