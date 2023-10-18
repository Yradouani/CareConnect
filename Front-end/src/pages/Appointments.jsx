import React from 'react';
import Navbar from '../components/Navbar';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Footer from '../components/Footer';
import { addAppointment, deleteAppointmentInStore, setAppointments } from '../actions/appointment.action';
import Swal from 'sweetalert2';
import { BsTrash } from "react-icons/bs";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/fr';


//Icons
import { CgDanger } from "react-icons/cg";
import { BsCheckLg } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import CardAppointment from '../components/CardAppointment';

const Appointments = ({ user }) => {
    // const user = useSelector((state) => state.userReducer.user);

    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (!user) {
    //         navigate('/');
    //     }
    // }, [user, navigate]);

    useEffect(() => {
        const getAllAppointments = async () => {
            try {
                const response = await axios.get(
                    `/rendez-vous/${user.id}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${user.token}`
                        }
                    }
                );

                const tab = [];
                Object.entries(response.data).forEach(item => {
                    tab.push(item[1])
                })
                dispatch(setAppointments(tab));
            } catch (err) {
                console.error('Erreur lors de la récupération des rendez-vous :', err);
            }
        }
        getAllAppointments();
        // eslint-disable-next-line
    }, []);
    const appointments = useSelector((state) => state.appointmentReducer.appointment);
    moment.locale('fr');
    const localizer = momentLocalizer(moment);
    const events = appointments?.map((appointment, index) => {
        const dateOfAppointment = new Date(appointment.dateOfAppointment);
        const timeOfAppointment = appointment.timeOfAppointment;
        const [hours, minutes] = timeOfAppointment.split(':');
        dateOfAppointment.setHours(hours);
        dateOfAppointment.setMinutes(minutes);

        const endDateOfAppointment = new Date(appointment.dateOfAppointment)
        const endTimeOfAppointment = appointment.endTimeOfAppointment;
        const [endhours, endminutes] = endTimeOfAppointment.split(':');
        endDateOfAppointment.setHours(endhours);
        endDateOfAppointment.setMinutes(endminutes);

        const checkDate = isDateTimeInPast(appointment.dateOfAppointment, appointment.timeOfAppointment)
        console.log(appointment.patient_id)
        console.log(checkDate)
        const eventClassName = (!appointment.patient_id && checkDate) ? 'available' : 'unavailable';
        return {
            id: appointment.id,
            title: "",
            start: dateOfAppointment,
            end: endDateOfAppointment,
            className: eventClassName,
        };
    });

    const getValidRange = () => {
        const today = new Date();
        const startHour = 8;
        const endHour = 20;
        const validStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), startHour, 0, 0);
        const validEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), endHour, 0, 0);

        return [validStart, validEnd];
    };

    const customMessages = {
        today: "Aujourd'hui",
        next: "Semaine suivante",
        previous: "Semaine précédente",
        week: "Semaine",
        day: "Jour",
        date: "Date",
        time: "Heure",
        event: "Événement",
    };

    const customFormats = {
        dayFormat: (date, culture, localizer) =>
            localizer.format(date, 'dddd', culture),
        dayRangeHeaderFormat: ({ start, end }, culture, localizer) => {
            const formattedStart = localizer.format(start, 'D MMMM', culture);
            const formattedEnd = localizer.format(end, 'D MMMM', culture);
            return `Semaine du ${formattedStart} au ${formattedEnd}`;
        },
    };

    const validRange = getValidRange();
    const dispatch = useDispatch();
    const userId = user?.id;
    const uniqueDays = [];
    const [isLoading, setIsLoading] = useState(true);
    const [dateAppointment, setDateAppointment] = useState("today");
    const [modal, setOpenModal] = useState(false);
    const [pastAppointments, setPastAppointments] = useState('');
    const [currentAppointments, setCurrentAppointments] = useState('');
    const [futureAppointments, setFutureAppointments] = useState('');
    const [newAppointments, setNewAppointments] = useState('');

    const [dateOfAppointment, setDateOfAppointment] = useState('');
    const [validDateOfAppointment, setValidDateOfAppointment] = useState(false);
    const [dateOfAppointmentFocus, setDateOfAppointmentFocus] = useState(false);

    const [timeOfAppointment, setTimeOfAppointment] = useState('');
    const [validTimeOfAppointment, setValidTimeOfAppointment] = useState(false);
    const [timeOfAppointmentFocus, setTimeOfAppointmentFocus] = useState(false);

    const [endTimeOfAppointment, setEndTimeOfAppointment] = useState('');
    const [validEndTimeOfAppointment, setValidEndTimeOfAppointment] = useState(false);
    const [endTimeOfAppointmentFocus, setEndTimeOfAppointmentFocus] = useState(false);

    const [duration, setDuration] = useState('');
    const [validDuration, setValidDuration] = useState(false);
    const [durationFocus, setDurationFocus] = useState(false);

    const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
    const TIME_REGEX = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    const NUMBER_REGEX = /^[0-9]{1,3}$/;

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
        const isEndTimeOfAppointment = TIME_REGEX.test(endTimeOfAppointment);
        setValidEndTimeOfAppointment(isEndTimeOfAppointment);
        //eslint-disable-next-line
    }, [endTimeOfAppointment])

    useEffect(() => {
        console.log(newAppointments)
        //eslint-disable-next-line
    }, [newAppointments])

    useEffect(() => {
        const isDuration = NUMBER_REGEX.test(duration);
        console.log(isDuration)
        const isCheckDuration = checkDuration(dateOfAppointment, timeOfAppointment, endTimeOfAppointment, duration)
        setValidDuration(isDuration && isCheckDuration);
        //eslint-disable-next-line
    }, [dateAppointment, timeOfAppointment, endTimeOfAppointment, duration])

    useEffect(() => {
        const pastAppointments = [];
        const currentAppointments = [];
        const futureAppointments = [];
        const currentDate = new Date();
        if (appointments?.length > 0) {
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

        appointments?.forEach(appointment => {
            const day = appointment.dateOfAppointment;
            if (!uniqueDays.includes(day)) {
                uniqueDays.push(day);
            }
        });
        // eslint-disable-next-line
    }, [appointments]);

    function isDateTimeInPast(dateString, timeString) {
        const currentDateTime = new Date();
        const dateToCheck = new Date(dateString);
        const [hours, minutes] = timeString.split(':').map(Number);
        dateToCheck.setHours(parseInt(hours, 10))
        dateToCheck.setMinutes(parseInt(minutes, 10))

        return dateToCheck > currentDateTime;
    }

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

    //Function to check if the duration of appointment is correct and cut slot into appointments
    const checkDuration = (dateAppointment, start, end, duration) => {
        const startdate = new Date(dateAppointment)
        const [starthours, startminutes] = start.split(':');
        startdate.setHours(parseInt(starthours, 10));
        startdate.setMinutes(parseInt(startminutes, 10));
        const startMinutes = parseInt(starthours, 10) * 60 + parseInt(startminutes, 10);

        const enddate = new Date(dateAppointment)
        const [endhours, endminutes] = end.split(':');
        enddate.setHours(parseInt(endhours, 10));
        enddate.setMinutes(parseInt(endminutes, 10));
        const endMinutes = parseInt(endhours, 10) * 60 + parseInt(endminutes, 10);

        if (startdate >= enddate) {
            return false;
        }

        const durationMin = parseInt(duration);

        const newAppointmentsTab = [];

        let currentStartTime = startdate;
        if ((endMinutes - startMinutes) % durationMin === 0) {
            while (currentStartTime < enddate) {
                const currentEndTime = new Date(currentStartTime);
                currentEndTime.setMinutes(currentEndTime.getMinutes() + durationMin);

                newAppointmentsTab.push({
                    startTime: currentStartTime,
                    endTime: currentEndTime,
                });

                currentStartTime = currentEndTime;
            }
            setNewAppointments(newAppointmentsTab)
        }

        return (endMinutes - startMinutes) % durationMin === 0;
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
                JSON.stringify({
                    role: user.role
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                    },
                }
            );

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

        const promises = newAppointments.map(async (newAppointment) => {
            console.log(newAppointment)

            const starthours = newAppointment.startTime.getHours();
            const startminutes = newAppointment.startTime.getMinutes();
            const formattedStartTime = `${starthours.toString().padStart(2, '0')}:${startminutes.toString().padStart(2, '0')}`;

            const endhours = newAppointment.endTime.getHours();
            const endminutes = newAppointment.endTime.getMinutes();
            const formattedEndTime = `${endhours.toString().padStart(2, '0')}:${endminutes.toString().padStart(2, '0')}`;

            try {
                const response = await axios.post(
                    "/ajouter-un-rendez-vous",
                    JSON.stringify({
                        dateOfAppointment,
                        timeOfAppointment: formattedStartTime,
                        endTimeOfAppointment: formattedEndTime,
                        doctor_id: userId,
                        role: user.role
                    }),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${user.token}`
                        },
                    }
                );
                setOpenModal(false);
                setDateOfAppointment('');
                setTimeOfAppointment('');
                setDateAppointment("today")
                console.log(response.data)
                dispatch(addAppointment(response.data))
                return true;
            } catch (err) {
                console.log(err);
                return false
            }
        })

        const results = await Promise.all(promises);

        if (results.every((result) => result === true)) {
            Swal.fire({
                icon: 'success',
                title: 'Tous les créneaux ont été ouverts avec succès',
                showConfirmButton: false,
                timer: 1500
            });
            setOpenModal(false);
            setDateOfAppointment('');
            setTimeOfAppointment('');
            setDateAppointment("today");
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Au moins un des créneaux n\'a pas pu être ouvert',
                text: 'Veuillez réessayer.'
            });
        }
    }

    // if (isLoading) {
    //     return <Loader />;
    // }
    const handleEventClick = (event) => {
        const matchAppointment = appointments.find(appointment => appointment.id === event);

        if (matchAppointment) {

            Swal.fire({
                title: `Annuler le rendez-vous du ${formatDate(matchAppointment.dateOfAppointment)} à ${matchAppointment.timeOfAppointment}?`,
                text: 'Voulez-vous vraiment annuler ce rendez-vous ?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Oui, annuler',
                cancelButtonText: 'Non, conserver',
                confirmButtonColor: '#d33',
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteAppointment(event)
                }
            });
        }
    }

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    }

    // const [viewsCalendar, setViewsCalendar] = useState({ month: false, week: true, day: false, agenda: false });
    // const [defaultView, setDefaultView] = useState('week');
    // useEffect(() => {
    //     const updateViews = () => {
    //         if (window.innerWidth >= 760) {
    //             setDefaultView('week');
    //         } else {
    //             setDefaultView('day');
    //         }
    //     };
    //     updateViews();
    //     window.addEventListener('resize', updateViews);

    //     return () => {
    //         window.removeEventListener('resize', updateViews);
    //     };
    // }, [defaultView]);

    // useEffect(() => {
    //     // Ce useEffect réagira aux changements de defaultView
    //     if (defaultView === 'week') {
    //         setViewsCalendar({ month: false, week: true, day: false, agenda: false });
    //     } else {
    //         setViewsCalendar({ month: false, week: false, day: true, agenda: false });
    //     }
    // }, [defaultView]);

    const defaultView = 'week';
    const views = { month: false, week: true, day: false, agenda: false }
    return (
        <div className='appointments'>
            <Navbar />
            <header className='appointments-header'>
                <h1>Mes rendez-vous</h1>
                {user?.role === "patient" ?
                    (<div className='appointments-header__nav'>
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
                    </div>) : ""}
            </header>
            <div className='appointments-main'>
                {user?.role === "doctor" ? (
                    <div>
                        <div
                            className='appointments-main__button'
                            onClick={() => openModal()}
                        >
                            <button>Ouvrir un nouveau créneau</button>
                        </div>
                        <div className='appointments-main__exp'>
                            <div className='appointments-main__exp-available'>Disponible</div>
                            <div className='appointments-main__exp-unavailable'>Indisponible</div>
                        </div>
                        <Calendar
                            views={views}
                            defaultView={defaultView}
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 800 }}
                            min={validRange[0]}
                            max={validRange[1]}
                            messages={customMessages}
                            formats={customFormats}
                            onSelectEvent={(event) => handleEventClick(event.id)}
                            eventPropGetter={(event) => ({
                                className: event.className,
                            })}
                        />
                    </div>
                ) : ""}
                {(user?.role === "patient" && dateAppointment === "today") ? (
                    currentAppointments.length > 0 ? (
                        <div className='appointments-main__container'>
                            {
                                currentAppointments.map((appointment) => (
                                    <CardAppointment appointment={appointment} deleteAppointment={deleteAppointment} />
                                ))}
                        </div>
                    ) : (
                        <div className='appointments-main__container'>
                            <div className='appointments-main__container-none'>
                                Vous n'avez aucun rendez-vous aujourd'hui
                            </div>
                        </div>
                    )
                ) : (
                    ""
                )}
                {(user?.role === "patient" && dateAppointment === "future") ? (
                    futureAppointments.length > 0 ? (
                        <div className='appointments-main__container'>
                            {futureAppointments.map((appointment) => (
                                <CardAppointment appointment={appointment} deleteAppointment={deleteAppointment} />
                            ))}
                        </div>
                    ) : (
                        <div className='appointments-main__container'>
                            <div className='appointments-main__container-none'>
                                Vous n'avez aucun futurs rendez-vous
                            </div>
                        </div>
                    )
                ) : (
                    ""
                )}
                {(user?.role === "patient" && dateAppointment === "past") ? (
                    pastAppointments.length > 0 ? (
                        <div className='appointments-main__container'>
                            {pastAppointments.map((appointment) => (
                                <div key={appointment.id} className="appointments-main__container-item unavailable">
                                    <div className='appointments-main__container-date'>{appointment.dateOfAppointment}</div>
                                    <div className='appointments-main__container-time'>{appointment.timeOfAppointment}</div>
                                    <div>passé</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='appointments-main__container'>
                            <div className='appointments-main__container-none'>
                                Vous n'avez aucun rendez-vous passés
                            </div>
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
                            De* :</label>
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

                        <label htmlFor="endappointment-time">
                            <span className={validEndTimeOfAppointment ? "valid" : "hide"}>
                                <BsCheckLg />
                            </span>
                            <span className={validEndTimeOfAppointment || !endTimeOfAppointment ? "hide" : "invalid"}>
                                <ImCross />
                            </span>
                            à* :</label>
                        <input
                            type="time"
                            name="endappointment-time"
                            id="endappointment-time"
                            required
                            aria-invalid={validEndTimeOfAppointment ? "false" : "true"}
                            aria-describedby="endtimenote"
                            onChange={(e) => setEndTimeOfAppointment(e.target.value)}
                            onFocus={() => setEndTimeOfAppointmentFocus(true)}
                            onBlur={() => setEndTimeOfAppointmentFocus(false)}
                        />
                        <div id="timenote" className={endTimeOfAppointmentFocus && endTimeOfAppointment && !validEndTimeOfAppointment ? "instructions" : "offscreen"}>
                            <CgDanger className='danger' />
                            Heure invalide (au moins une heure après l'heure actuelle)
                        </div>

                        <label htmlFor="duration">
                            <span className={validDuration ? "valid" : "hide"}>
                                <BsCheckLg />
                            </span>
                            <span className={validDuration || !duration ? "hide" : "invalid"}>
                                <ImCross />
                            </span>
                            durée des rendez-vous en min* :</label>

                        <input
                            type="number"
                            name="duration"
                            id="duration"
                            required
                            aria-invalid={validDuration ? "false" : "true"}
                            aria-describedby="durationnote"
                            onChange={(e) => setDuration(e.target.value)}
                            onFocus={() => setDurationFocus(true)}
                            onBlur={() => setDurationFocus(false)}
                        />
                        <div id="durationnote" className={durationFocus && duration && !validDuration ? "instructions" : "offscreen"}>
                            <CgDanger className='danger' />
                            Durée des rendez-vous invalide
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