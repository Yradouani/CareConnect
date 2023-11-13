import React from 'react';
import { useState, useEffect } from 'react';
import { addAppointment, deleteAppointmentInStore, setAppointments } from '../actions/appointment.action';

//Package
import axios from '../api/axios';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/fr';

//Components
import Loader from '../components/Loader';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import CardAppointment from '../components/CardAppointment';
import FormAddAppointment from '../components/FormAddAppointment';

const Appointments = ({ user }) => {

    useEffect(() => {
        //Request to retrieve all appointments for the logged-in user
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
                //Setup appointments in redux store
                dispatch(setAppointments(tab));
            } catch (err) {
                console.error('Erreur lors de la récupération des rendez-vous :', err);
            }
        }
        getAllAppointments();
        // eslint-disable-next-line
    }, []);

    //Get all appointments of redux store
    const appointments = useSelector((state) => state.appointmentReducer.appointment);
    moment.locale('fr');
    const localizer = momentLocalizer(moment);

    //Function to add appointments into calender
    const events = appointments?.map((appointment, index) => {
        if (appointment.dateOfAppointment) {
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
            const eventClassName = (!appointment.patient_id && checkDate) ? 'available' : 'unavailable';
            return {
                id: appointment.id,
                title: "",
                start: dateOfAppointment,
                end: endDateOfAppointment,
                className: eventClassName,
            };
        }
    });

    //Set the time slots to display on calendar
    const getValidRange = () => {
        const today = new Date();
        const startHour = 8;
        const endHour = 20;
        const validStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), startHour, 0, 0);
        const validEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), endHour, 0, 0);

        return [validStart, validEnd];
    };

    //Set custom messages to display on calendar
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

    //Custom date format to display on calendar
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
    const [shouldReload, setShouldReload] = useState(false);
    const [dateAppointment, setDateAppointment] = useState("today");
    const [modal, setOpenModal] = useState(false);
    const [pastAppointments, setPastAppointments] = useState('');
    const [currentAppointments, setCurrentAppointments] = useState('');
    const [futureAppointments, setFutureAppointments] = useState('');
    const [newAppointments, setNewAppointments] = useState('');

    const [dateOfAppointment, setDateOfAppointment] = useState('');
    const [validDateOfAppointment, setValidDateOfAppointment] = useState(false);

    const [timeOfAppointment, setTimeOfAppointment] = useState('');
    const [validTimeOfAppointment, setValidTimeOfAppointment] = useState(false);

    const [endTimeOfAppointment, setEndTimeOfAppointment] = useState('');
    const [validEndTimeOfAppointment, setValidEndTimeOfAppointment] = useState(false);

    const [duration, setDuration] = useState('');
    const [validDuration, setValidDuration] = useState(false);

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
        const isEndTimeAfterStartTime = isEndAfterStart(dateOfAppointment, timeOfAppointment, endTimeOfAppointment);
        setValidEndTimeOfAppointment(isEndTimeOfAppointment && isEndTimeAfterStartTime);
        //eslint-disable-next-line
    }, [endTimeOfAppointment])

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

    const isEndAfterStart = (dateOfAppointment, timeOfAppointment, endTimeOfAppointment) => {
        let start = new Date(dateOfAppointment)
        let end = new Date(dateOfAppointment)

        const [starthours, startminutes] = timeOfAppointment.split(':');
        const [endhours, endminutes] = endTimeOfAppointment.split(':');
        start.setHours(starthours);
        start.setMinutes(startminutes);
        end.setHours(endhours);
        end.setMinutes(endminutes);

        return end > start;
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
                    title: 'Rendez-vous supprimer avec succès',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            dispatch(deleteAppointmentInStore(id))


            //Temporary solution
            if (appointments.length === 1) {
                window.location.reload();
            }
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
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Au moins un des rendez-vous n\'a pas pu être ouvert',
                text: 'Attention, vos créneaux horaires ne peuvent pas se chevaucher'
            });
            setOpenModal(false);
            setDateOfAppointment('');
            setTimeOfAppointment('');
            setEndTimeOfAppointment('');
            setDuration('');
        }
    }

    // if (isLoading) {
    //     return <Loader />;
    // }
    const handleEventClick = (event) => {
        const matchAppointment = appointments.find(appointment => appointment.id === event);
        let texte = "";
        if (matchAppointment.patient) {
            texte = `<div class="modal-name">Avec ${matchAppointment.patient.user.firstname} ${matchAppointment.patient.user.lastname}</div> 
            <br/>
            <div class="modal-text">Contactez votre patient </div>
            <div class="modal-phone">Numéro de téléphone : ${matchAppointment.patient.user.phone}</div>
            <div class="modal-email">Adresse email : ${matchAppointment.patient.user.email}</div>
            <div class="modal-delete">Souhaitez-vous annuler ce rendez-vous ?</div>
            `
        } else {
            texte = "Souhaitez-vous supprimer ce créneau ?"
        }
        if (matchAppointment) {

            Swal.fire({
                title: `Rendez-vous du ${formatDate(matchAppointment.dateOfAppointment)} à ${matchAppointment.timeOfAppointment}?`,
                html: texte,
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
            <Helmet>
                <title>CareConnect - Mes rendez-vous</title>
                <meta name="description" content="Consulter vos rendez-vous en ligne" />
            </Helmet>
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
                    <FormAddAppointment
                        handleAddAppointment={handleAddAppointment}
                        validDateOfAppointment={validDateOfAppointment}
                        dateOfAppointment={dateOfAppointment}
                        setDateOfAppointment={setDateOfAppointment}
                        validTimeOfAppointment={validTimeOfAppointment}
                        timeOfAppointment={timeOfAppointment}
                        setTimeOfAppointment={setTimeOfAppointment}
                        validEndTimeOfAppointment={validEndTimeOfAppointment}
                        endTimeOfAppointment={endTimeOfAppointment}
                        setEndTimeOfAppointment={setEndTimeOfAppointment}
                        validDuration={validDuration}
                        duration={duration}
                        setDuration={setDuration}
                        closeModal={closeModal} />
                </div>
            ) : ""}
            <Footer />
        </div>
    );
};

export default Appointments;