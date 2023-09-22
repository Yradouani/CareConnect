import React, { useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUsers, FaPowerOff } from "react-icons/fa";
import { AiFillDashboard, AiOutlineSearch } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/user.action';

const Navbar = () => {
    const user = useSelector((state) => state.userReducer.user);
    const [openModal, setOpenModal] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(user)
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);
    // const deconnection = () => {
    //     dispatch(logout());
    //     navigate('/');
    // };

    return (
        <div className='navbar'>
            {openModal ? (
                <div className='open-modal'>
                    <span>Êtes-vous sûr de vouloir vous déconnecter ?</span>
                    <div className='btn-container'>
                        {/* <button onClick={() => deconnection()}>Valider ma déconnexion</button> */}
                        <button onClick={() => setOpenModal(false)}>Annuler</button>
                    </div>
                </div>
            ) : ""}
            <img src="../../logo.png" alt="logo" className='logo' />
            {/* <div id="search_field">
                <AiOutlineSearch />
                <input type="text" name="search" id="search_field_input" placeholder="Rechercher" maxlength="20" />
            </div> */}
            <ul>
                <li className='navbar__name'>{user?.firstname} {user?.lastname}</li>
                <NavLink to="/rendez-vous" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li><MdDateRange /> Mes rendez-vous</li>
                </NavLink>
                <NavLink onClick={() => setOpenModal(true)}>
                    <li><FaPowerOff /> Déconnexion</li>
                </NavLink>
            </ul>
        </div>
    );
};

export default Navbar;