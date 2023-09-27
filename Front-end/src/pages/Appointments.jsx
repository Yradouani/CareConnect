import React from 'react';
import Navbar from '../components/Navbar';
import axios from '../api/axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Footer from '../components/Footer';

const Appointments = () => {
    const user = useSelector((state) => state.userReducer.user);
    const [isLoading, setIsLoading] = useState(true);
    const [dateAppointment, setDateAppointment] = useState("today");

    const dateFormateur = (date) => {
        let days = Math.floor((new Date() - new Date(date)) / (1000 * 3600 * 24))

        if (days === 0) {
            return "Aujourd'hui";
        } else if (days > 1) {
            return "Passé";
        } else {
            return "À venir"
        }

    }

    const addAppointment = async () => {
        console.log("coucou")
    }
    
    useEffect(() => {
        console.log(dateAppointment);
        //eslint-disable-next-line
    }, [dateAppointment])
    // if (isLoading) {
    //     return <Loader />;
    // }

    return (
        <div className='appointments'>
            <Navbar />
            <header className='appointments-header'>
                <h1>Mes rendez-vous</h1>
                <div className='appointments-header__nav'>
                    <div
                        className={dateAppointment === "future" ? "appointments-header__nav-item item-active" : "appointments-header__nav-item"}
                        onClick={() => setDateAppointment("future")}
                    >À venir
                    </div>
                    <div
                        className={dateAppointment === "today" ? "appointments-header__nav-item item-active" : "appointments-header__nav-item"}
                        onClick={() => setDateAppointment("today")}
                    >Aujourd'hui
                    </div>
                    <div
                        className={dateAppointment === "past" ? "appointments-header__nav-item item-active" : "appointments-header__nav-item"}
                        onClick={() => setDateAppointment("past")}
                    >Passés
                    </div>
                </div>
            </header>
            <div className='appointments-main'>
                {user.role === "doctor" ? (
                    <div
                        className='appointments-main__button'
                        onClick={() => addAppointment()}
                    >
                        <button>Ouvrir un nouveau créneau</button>
                    </div>
                ) : ""}
                {dateAppointment === "today" ? (
                    "Today"
                ) : (
                    ""
                )}
                {dateAppointment === "future" ? (
                    "Futur"
                ) : (
                    ""
                )}
                {dateAppointment === "past" ? (
                    "Passés"
                ) : (
                    ""
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Appointments;