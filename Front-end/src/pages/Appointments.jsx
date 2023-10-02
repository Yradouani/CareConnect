import React from 'react';
import Navbar from '../components/Navbar';
import axios from '../api/axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Footer from '../components/Footer';


//Icons
import { CgDanger } from "react-icons/cg";
import { BsCheckLg } from "react-icons/bs";
import { ImCross } from "react-icons/im";

const Appointments = () => {
    const user = useSelector((state) => state.userReducer.user);
    const userId = user.id;
    const [isLoading, setIsLoading] = useState(true);
    const [dateAppointment, setDateAppointment] = useState("today");
    const [modal, setOpenModal] = useState(false);
    const [appointments, setAppointments] = useState('');
    const [pastAppointments, setPastAppointments] = useState([]);
    const [currentAppointments, setCurrentAppointments] = useState([]);
    const [futureAppointments, setFutureAppointments] = useState([]);

    const [dateOfAppointment, setDateOfAppointment] = useState('');
    const [validDateOfAppointment, setValidDateOfAppointment] = useState(false);
    const [dateOfAppointmentFocus, setDateOfAppointmentFocus] = useState(false);

    const [timeOfAppointment, setTimeOfAppointment] = useState('');
    const [validTimeOfAppointment, setValidTimeOfAppointment] = useState(false);
    const [timeOfAppointmentFocus, setTimeOfAppointmentFocus] = useState(false);

    const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
    const TIME_REGEX = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;


    useEffect(() => {
        const isDateOfAppointment = DATE_REGEX.test(dateOfAppointment);
        const isNotPassed = isNotYetPassed(dateOfAppointment);
        setValidDateOfAppointment(isDateOfAppointment && isNotPassed);
        //eslint-disable-next-line
    }, [dateOfAppointment])

    useEffect(() => {
        const isTimeOfAppointment = TIME_REGEX.test(timeOfAppointment);
        setValidTimeOfAppointment(isTimeOfAppointment);
        //eslint-disable-next-line
    }, [timeOfAppointment])

    useEffect(() => {
        getAllAppointmentsOfOneDoctor();
        //eslint-disable-next-line
    }, [userId]);

    useEffect(() => {

        console.log(appointments)
        const pastAppointments = [];
        const currentAppointments = [];
        const futureAppointments = [];
        const currentDate = new Date();
        if (appointments.length > 0) {
            appointments.forEach(appointment => {
                const appointmentDate = new Date(appointment.dateOfAppointment);

                if (appointmentDate < currentDate) {
                    pastAppointments.push(appointment);
                } else if (appointmentDate.toDateString() === currentDate.toDateString()) {
                    currentAppointments.push(appointment);
                } else {
                    futureAppointments.push(appointment);
                }
            })

            setPastAppointments(pastAppointments);
            setCurrentAppointments(currentAppointments);
            setFutureAppointments(futureAppointments);
        }
        // eslint-disable-next-line
    }, [appointments]);

    function isNotYetPassed(dateOfAppointment) {
        const appointmentDate = new Date(dateOfAppointment);
        const currentDate = new Date();

        currentDate.setHours(currentDate.getHours() + 1);
        if (appointmentDate >= currentDate) {
            return true;
        } else {
            return false
        }
    }

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

    const openModal = async () => {
        setOpenModal(true)
    }
    const closeModal = async () => {
        setOpenModal(false)
    }

    const getAllAppointmentsOfOneDoctor = async () => {
        try {
            const response = await axios.get(
                `/rendez-vous/${userId}`,
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            setAppointments(Object.entries(response.data))
        } catch (err) {
            console.error('Erreur lors de la récupération des rendez-vous :', err);
        }
    }

    const handleAddAppointment = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "/ajouter-un-rendez-vous",
                JSON.stringify({
                    dateOfAppointment,
                    timeOfAppointment,
                    doctor_id: userId
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    // withCredentials: true
                }
            );
            setOpenModal(false);
            setDateOfAppointment('');
            setTimeOfAppointment('');
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
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
                        className={dateAppointment === "past" ? "appointments-header__nav-item item-active" : "appointments-header__nav-item"}
                        onClick={() => setDateAppointment("past")}
                    >Passés
                    </div>
                    <div
                        className={dateAppointment === "today" ? "appointments-header__nav-item item-active" : "appointments-header__nav-item"}
                        onClick={() => setDateAppointment("today")}
                    >Aujourd'hui
                    </div>
                    <div
                        className={dateAppointment === "future" ? "appointments-header__nav-item item-active" : "appointments-header__nav-item"}
                        onClick={() => setDateAppointment("future")}
                    >À venir
                    </div>
                </div>
            </header>
            <div className='appointments-main'>
                {user.role === "doctor" ? (
                    <div
                        className='appointments-main__button'
                        onClick={() => openModal()}
                    >
                        <button>Ouvrir un nouveau créneau</button>
                    </div>
                ) : ""}
                {dateAppointment === "today" ? (
                    currentAppointments.length > 0 ? (
                        <div>
                            mes rendez-vous d'aujourd'hui
                        </div>
                    ) : (
                        <div>
                            Vous n'avez aucun rendez-vous aujourd'hui
                        </div>
                    )
                ) : (
                    ""
                )}
                {dateAppointment === "future" ? (
                    futureAppointments.length > 0 ? (
                        <div>
                            {futureAppointments.map(appointment => (
                                <div>
                                    {appointment.dateOfAppointment}
                                    {appointment.timeOfAppointment}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            Vous n'avez aucun futurs rendez-vous
                        </div>
                    )
                ) : (
                    ""
                )}
                {dateAppointment === "past" ? (
                    pastAppointments.length > 0 ? (
                        <div>
                            mes rendez-vous passés
                        </div>
                    ) : (
                        <div>
                            Vous n'avez aucun rendez-vous passés
                        </div>
                    )
                ) : (
                    ""
                )}
            </div>
            {modal ? (
                <div className='appointments__modal'>
                    <h2>Ouvrir un créneau</h2>
                    <form onSubmit={e => handleAddAppointment(e)}>
                        <label htmlFor="appointment-date">
                            <span className={validDateOfAppointment ? "valid" : "hide"}>
                                <BsCheckLg />
                            </span>
                            <span className={validDateOfAppointment || !dateOfAppointment ? "hide" : "invalid"}>
                                <ImCross />
                            </span>
                            Date du rendez-vous :*
                        </label>
                        <input
                            type="date"
                            name="appointment-date"
                            required
                            id="appointment-date"
                            aria-invalid={validDateOfAppointment ? "false" : "true"}
                            aria-describedby="datenote"
                            onChange={(e) => setDateOfAppointment(e.target.value)}
                            onFocus={() => setDateOfAppointmentFocus(true)}
                            onBlur={() => setDateOfAppointmentFocus(false)}
                        />
                        <div id="datenote" className={dateOfAppointmentFocus && dateOfAppointment && !validDateOfAppointment ? "instructions" : "offscreen"}>
                            <CgDanger className='danger' />
                            Date invalide (ne peut pas être antérieure à la date actuelle)
                        </div>

                        <label htmlFor="appointment-time">
                            <span className={validTimeOfAppointment ? "valid" : "hide"}>
                                <BsCheckLg />
                            </span>
                            <span className={validTimeOfAppointment || !timeOfAppointment ? "hide" : "invalid"}>
                                <ImCross />
                            </span>
                            Heure du rendez-vous :*</label>
                        <input
                            type="time"
                            name="appointment-time"
                            id="appointment-time"
                            required
                            aria-invalid={validTimeOfAppointment ? "false" : "true"}
                            aria-describedby="timenote"
                            onChange={(e) => setTimeOfAppointment(e.target.value)}
                            onFocus={() => setTimeOfAppointmentFocus(true)}
                            onBlur={() => setTimeOfAppointmentFocus(false)}
                        />
                        <div id="timenote" className={timeOfAppointmentFocus && timeOfAppointment && !validTimeOfAppointment ? "instructions" : "offscreen"}>
                            <CgDanger className='danger' />
                            Heure invalide (veuillez respectez le format HH-MM)
                        </div>

                        <input type="submit" value="Valider" />
                        <button
                            onClick={() => closeModal()}
                        >Annuler</button>
                    </form>
                </div>
            ) : ""}
            <Footer />
        </div>
    );
};

export default Appointments;