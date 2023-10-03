import React from 'react';
import Navbar from '../components/Navbar';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Footer from '../components/Footer';
import { addAppointment, deleteAppointmentInStore } from '../actions/appointment.action';
import Swal from 'sweetalert2';
import { BsTrash } from "react-icons/bs";


//Icons
import { CgDanger } from "react-icons/cg";
import { BsCheckLg } from "react-icons/bs";
import { ImCross } from "react-icons/im";

const Appointments = () => {
    const user = useSelector((state) => state.userReducer.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const appointments = useSelector((state) => state.appointmentReducer.appointment);
    const dispatch = useDispatch();
    const userId = user.id;
    const uniqueDays = [];
    const [isLoading, setIsLoading] = useState(true);
    const [dateAppointment, setDateAppointment] = useState("today");
    const [modal, setOpenModal] = useState(false);
    const [pastAppointments, setPastAppointments] = useState('');
    const [currentAppointments, setCurrentAppointments] = useState('');
    const [futureAppointments, setFutureAppointments] = useState('');

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
        const isNotPassed = isNotYetPassed(dateOfAppointment, timeOfAppointment);
        setValidTimeOfAppointment(isTimeOfAppointment && isNotPassed);
        //eslint-disable-next-line
    }, [dateOfAppointment, timeOfAppointment])

    useEffect(() => {
        const pastAppointments = [];
        const currentAppointments = [];
        const futureAppointments = [];
        const currentDate = new Date();
        if (appointments.length > 0) {
            appointments.forEach(appointment => {
                const appointmentDate = new Date(appointment.dateOfAppointment);
                if (
                    appointmentDate.getFullYear() === currentDate.getFullYear() &&
                    appointmentDate.getMonth() === currentDate.getMonth() &&
                    appointmentDate.getDate() === currentDate.getDate()
                ) {
                    currentAppointments.push(appointment);
                } else if (appointmentDate < currentDate) {
                    pastAppointments.push(appointment);
                } else {
                    futureAppointments.push(appointment);
                }
            })
            setPastAppointments(pastAppointments);
            setCurrentAppointments(currentAppointments);
            setFutureAppointments(futureAppointments);
        }

        appointments.forEach(appointment => {
            const day = appointment.dateOfAppointment;
            if (!uniqueDays.includes(day)) {
                uniqueDays.push(day);
            }
        });
        console.log(uniqueDays)
        // eslint-disable-next-line
    }, [appointments]);

    const isNotYetPassed = (dateOfAppointment, timeOfAppointment = null) => {
        const appointmentDate = new Date(dateOfAppointment);
        const currentDate = new Date();
        const appointmentDay = appointmentDate.getDate();
        const appointmentMonth = appointmentDate.getMonth();
        const appointmentYear = appointmentDate.getFullYear();

        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        if (appointmentYear === currentYear && appointmentMonth === currentMonth && appointmentDay === currentDay && timeOfAppointment) {
            const currentHour = currentDate.getHours();
            const tab = timeOfAppointment.split(":");
            const appointmentHour = tab[0]
            if ((currentHour + 1) <= appointmentHour) {
                return true
            } else {
                return false;
            }
        } else if (
            (appointmentYear > currentYear) ||
            (appointmentYear === currentYear &&
                (appointmentMonth > currentMonth ||
                    (appointmentMonth === currentMonth && appointmentDay >= currentDay)))
        ) {
            return true;
        } else {
            return false;
        }
    }

    const openModal = async () => {
        setOpenModal(true)
    }
    const closeModal = async () => {
        setOpenModal(false)
    }

    const deleteAppointment = async (id) => {
        try {
            const response = await axios.post(
                `/annuler-un-rendez-vous/${id}`,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log(response.data)

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Créneau supprimer avec succès',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            dispatch(deleteAppointmentInStore(id))
        } catch (err) {
            console.log(err);

            if (err.response.status === 404) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ce créneau est introuvable',
                    text: 'Veuillez supprimer un autre créneau',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur lors de la suppression du créneau',
                    text: 'Veuillez réessayer.',
                });
            }
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
            setDateAppointment("today")
            console.log(response.data)

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Créneau ouvert avec succès',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            dispatch(addAppointment(response.data))
        } catch (err) {
            console.log(err);

            if (err.response.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ce créneau est déjà ouvert',
                    text: 'Veuillez choisir une autre date/heure',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur lors de l\'ajout du rendez-vous',
                    text: 'Veuillez réessayer.',
                });
            }
        }
    }

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
                        <div className='appointments-main__container'>
                            {
                                currentAppointments.map((appointment) => (
                                    <div key={appointment.id} className={`appointments-main__container-item ${appointment.available ? 'available' : 'unavailable'}`}>
                                        <div >
                                            <div className='appointments-main__container-date'>{appointment.dateOfAppointment}</div>
                                            <div className='appointments-main__container-time'>{appointment.timeOfAppointment}</div>
                                            <div>{appointment.available ? "disponible" : "réservé"}</div>
                                        </div>
                                        <BsTrash
                                            onClick={() => deleteAppointment(appointment.id)}
                                        />
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div className='appointments-main__container'>
                            Vous n'avez aucun rendez-vous aujourd'hui
                        </div>
                    )
                ) : (
                    ""
                )}
                {dateAppointment === "future" ? (
                    futureAppointments.length > 0 ? (
                        <div className='appointments-main__container'>
                            {futureAppointments.map((appointment) => (
                                <div key={appointment.id} className={`appointments-main__container-item ${appointment.available ? 'available' : 'unavailable'}`}>
                                    <div >
                                        <div className='appointments-main__container-date'>{appointment.dateOfAppointment}</div>
                                        <div className='appointments-main__container-time'>{appointment.timeOfAppointment}</div>
                                        <div>{appointment.available ? "disponible" : "réservé"}</div>
                                    </div>
                                    <BsTrash
                                        onClick={() => deleteAppointment(appointment.id)}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='appointments-main__container'>
                            Vous n'avez aucun futurs rendez-vous
                        </div>
                    )
                ) : (
                    ""
                )}
                {dateAppointment === "past" ? (
                    pastAppointments.length > 0 ? (
                        <div className='appointments-main__container'>
                            {pastAppointments.map((appointment) => (
                                <div key={appointment[1].id} className="appointments-main__container-item unavailable">
                                    <div className='appointments-main__container-date'>{appointment.dateOfAppointment}</div>
                                    <div className='appointments-main__container-time'>{appointment.timeOfAppointment}</div>
                                    <div>passé</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='appointments-main__container'>
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
                            Date du rendez-vous* :
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
                            Heure du rendez-vous* :</label>
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
                            Heure invalide (au moins une heure après l'heure actuelle)
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