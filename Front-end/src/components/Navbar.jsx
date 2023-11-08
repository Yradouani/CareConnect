import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaPowerOff } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/user.action';
import { cleanAppointments } from '../actions/appointment.action';

const Navbar = () => {
    const user = useSelector((state) => state.userReducer.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);
    const deconnection = () => {
        dispatch(logout());
        dispatch(cleanAppointments());
        navigate('/');
    };

    return (
        <div className='navbar'>
            <NavLink to="/accueil">
                <img src="../../logo.png" alt="logo" className='logo' />
            </NavLink>
            <ul className='navbar__desktop'>
                <NavLink to="/profil" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li className='navbar__desktop-profil'>
                        <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="dl-icon mr-8 dl-icon-xsmall" data-icon-name="regular/user" data-design-system="oxygen" data-design-system-component="Icon"><path d="M9.125 9.125h-2.25A4.116 4.116 0 0 0 2.75 13.25c0 .422.328.75.75.75h9c.398 0 .75-.328.75-.75a4.131 4.131 0 0 0-4.125-4.125Zm-5.25 3.75a3.016 3.016 0 0 1 3-2.625h2.25a3.01 3.01 0 0 1 2.977 2.625H3.875ZM8 8c1.64 0 3-1.336 3-3 0-1.64-1.36-3-3-3-1.664 0-3 1.36-3 3 0 1.664 1.336 3 3 3Zm0-4.875A1.88 1.88 0 0 1 9.875 5 1.866 1.866 0 0 1 8 6.875 1.851 1.851 0 0 1 6.125 5c0-1.031.82-1.875 1.875-1.875Z"></path></svg>
                        <span className='navbar__desktop-profil-name'>{user?.firstname} {user?.lastname}</span>
                    </li>
                </NavLink>
                <NavLink to="/rendez-vous" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li><MdDateRange /> Mes rendez-vous</li>
                </NavLink>
                <NavLink onClick={() => deconnection()}>
                    <li><FaPowerOff /> Déconnexion</li>
                </NavLink>
            </ul>
            <ul className='navbar__mobile'>
                <li>
                    <NavLink to="/accueil" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-icon-name="solid/house" data-design-system-component="Icon"><path d="M14.727 8c0 .422-.352.75-.75.75h-.75l.023 3.75v.562c0 .54-.422.938-.938.938h-1.875a.912.912 0 0 1-.937-.938V11a.771.771 0 0 0-.75-.75h-1.5a.755.755 0 0 0-.75.75v2.063a.925.925 0 0 1-.938.937H3.688a.912.912 0 0 1-.938-.938V8.75H2A.74.74 0 0 1 1.25 8c0-.21.07-.398.234-.563l6-5.226A.705.705 0 0 1 8 2a.8.8 0 0 1 .492.188l5.977 5.25c.187.164.281.351.258.562Z"></path></svg>
                        <span>Accueil</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/rendez-vous" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M6.5 2.75v.75h3v-.75c0-.398.328-.75.75-.75.398 0 .75.352.75.75v.75h1.125c.61 0 1.125.516 1.125 1.125V5.75H2.75V4.625c0-.61.492-1.125 1.125-1.125H5v-.75c0-.398.328-.75.75-.75.398 0 .75.352.75.75ZM2.75 6.5h10.5v6.375c0 .633-.516 1.125-1.125 1.125h-8.25a1.11 1.11 0 0 1-1.125-1.125V6.5ZM4.625 8a.385.385 0 0 0-.375.375v2.25c0 .21.164.375.375.375h2.25a.385.385 0 0 0 .375-.375v-2.25A.403.403 0 0 0 6.875 8h-2.25Z"></path></svg>
                        <span>Rendez-vous</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profil" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" class="btn header__avatar" aria-hidden="true"><path d="M12,1C5.9,1,1,5.9,1,12s4.9,11,11,11s11-4.9,11-11S18.1,1,12,1z M12,4.3c1.8,0,3.3,1.5,3.3,3.3s-1.5,3.3-3.3,3.3S8.7,9.4,8.7,7.6S10.2,4.3,12,4.3z M12,19.9c-2.8,0-5.2-1.4-6.6-3.5c0-2.2,4.4-3.4,6.6-3.4c2.2,0,6.6,1.2,6.6,3.4C17.2,18.5,14.8,19.9,12,19.9z"></path></svg>
                        <span>Mon profil</span>
                    </NavLink>
                </li>
            </ul>
            <NavLink onClick={() => deconnection()} className="navbar__mobile-deconnection">
                <li><FaPowerOff /></li>
            </NavLink>
        </div >
    );
};

export default Navbar;