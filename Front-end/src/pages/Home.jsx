import React from 'react';
import axios from '../api/axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

//Components
import Loader from '../components/Loader';
import HomeHeader from '../components/Headers/HomeHeader';
import Footer from '../components/Footer';

//Icons
import { AiOutlineArrowLeft } from "react-icons/ai";

const Home = ({ user }) => {
    // const user = useSelector((state) => state.userReducer.user);
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

    const [searchResult, setSearchResult] = useState(false);
    const [takeAppointment, setTakeAppointment] = useState(false);
    const [appointmentOfSelectedDoctor, setAppointmentOfSelectedDoctor] = useState(null);
    const [appointmentDay, setAppointmentDay] = useState(null);
    const [loading, setLoading] = useState(true);
    const [inputValue, setInputValue] = useState("");


    const handleSearchResult = (result) => {
        console.log(result)
        setSearchResult(result);
    };

    const makeAnAppointment = async (result) => {
        setTakeAppointment(result);
        console.log(result)

        try {
            const response = await axios.get(
                `/rendez-vous/${result}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                }
            );

            console.log(response.data);
            let availableAppointment = [];
            response.data.forEach(date => {
                if (date.available) {
                    availableAppointment.push(date)
                }
            })
            setAppointmentOfSelectedDoctor(availableAppointment);
            setLoading(false)
        } catch (err) {
            console.error('Erreur lors de la récupération des rendez-vous :', err);
        }
    }

    useEffect(() => {
        let tab = [];
        appointmentOfSelectedDoctor?.forEach(day => {
            if (!tab.includes(day.dateOfAppointment)) {
                tab.push(day.dateOfAppointment)
            }
        })
        setAppointmentDay(tab)

    }, [appointmentOfSelectedDoctor])
    // const [isLoading, setIsLoading] = useState(true);

    function getDay(date) {
        const newdate = new Date(date);
        return days[newdate.getDay()];
    }

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    }
    function formatTime(inputTime) {
        return inputTime.replace(/:\d{2}$/, '');
    }

    function bookAppointment(id, date, time) {
        Swal.fire({
            title: `Prendre rendez-vous le ${getDay(date)} ${formatDate(date)} à ${time}?`,
            text: 'Voulez-vous vraiment prendre ce rendez-vous ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui',
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#75b6fe',
        }).then((result) => {
            if (result.isConfirmed) {
                confirmBookAppointment(id)
            }
        });
    }

    const confirmBookAppointment = async (appointmentid) => {
        try {
            const response = await axios.put(
                `/rendez-vous/${appointmentid}`,
                JSON.stringify({
                    role: user.role,
                    patient_id: user.id,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                }
            );
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Le rendez-vous a été pris avec succès',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            setTakeAppointment(false);
            setSearchResult(false);
            setInputValue("");
        } catch (err) {
            if (err.response.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Le rendez-vous est déjà pris par un autre patient',
                    text: 'Veuillez supprimer un autre créneau',
                });
            } else if (err.response.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Vous ne pouvez pas prendre rendez-vous avec un compte professionnel',
                    text: 'Veuillez créer un compte patient',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur lors de la prise de rendez-vous.',
                    text: 'Veuillez réessayer.',
                });
            }
        }
    }

    function closeMakeAppointment() {
        setTakeAppointment(false)
    }
    console.log(user)
    // if (isLoading) {
    //     return <Loader />;
    // }
    return (
        <div className='home'>
            <Helmet>
                <title>Page d'accueil</title>
                <meta name="description" content="Bienvenue sur la page d'accueil" />
            </Helmet>
            <HomeHeader onSearchResult={handleSearchResult} value={inputValue}/>
            {searchResult ?
                (
                    takeAppointment && !loading ? (
                        <div className='home__makeappointment'>
                            {appointmentOfSelectedDoctor && appointmentOfSelectedDoctor.length > 0 ? (
                                <div className='home__makeappointment-wrapper'>
                                    <div className='home__makeappointment-title-icon'>
                                        <AiOutlineArrowLeft
                                            onClick={() => closeMakeAppointment()}
                                        />
                                        <h2>Disponiblités du docteur</h2>
                                    </div>

                                    <div className='home__makeappointment-wrapper-column'>
                                        {appointmentDay.filter(day => {
                                            const appointmentDate = new Date(day);
                                            const currentDate = new Date();
                                            const isDateValid = appointmentDate >= currentDate;
                                            return isDateValid
                                        }).map(day => (

                                            <div className='home__makeappointment-wrapper-date' key={day}>
                                                <h3>{getDay(day)} {formatDate(day)}</h3>
                                                {appointmentOfSelectedDoctor
                                                    .filter(appointment => {
                                                        const isPatientNull = appointment.patient_id === null;
                                                        const isDay = day === appointment.dateOfAppointment
                                                        return isPatientNull && isDay

                                                    })
                                                    .map(appointment => (
                                                        <div
                                                            className='home__makeappointment-container'
                                                            key={appointment.id}
                                                            onClick={() => bookAppointment(appointment.id, appointment.dateOfAppointment, appointment.timeOfAppointment)}
                                                        >
                                                            <div className='home__makeappointment-wrapper-item'>
                                                                <div>De {formatTime(appointment.timeOfAppointment)} à {formatTime(appointment.endTimeOfAppointment)}</div>
                                                                <div>réserver ce créneau</div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : "Ce professionnel de santé n'a aucune disponibilité"}
                        </div>
                    ) : (
                        <div className='home__result'>
                            {searchResult.length > 0 ?
                                (<div>

                                    {searchResult.map((result, index) => (
                                        <div className='home__result-wrapper' key={index}>
                                            <div className='home__result-wrapper-info'>
                                                <div className='home__result-wrapper-name'>Dr {result.user.firstname} {result.user.lastname}</div>
                                                <div className='home__result-wrapper-specialization'>{result.specialization}</div>
                                                <div className='home__result-wrapper-address'>{result.officeAddress}</div>
                                                <div>{result.officePostalCode} {result.officeCity}</div>
                                                <div className='home__result-wrapper-btn'>
                                                    <button
                                                        onClick={() => makeAnAppointment(result.user_id)}
                                                    >Prendre rendez-vous
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='home__result-wrapper-appointment'>
                                                {
                                                    result.appointments ? (
                                                        <div>Prochain rendez-vous le {getDay(result.appointments.dateOfAppointment)} {formatDate(result.appointments.dateOfAppointment)} à {formatTime(result.appointments.timeOfAppointment)}</div>
                                                    ) : (
                                                        <div>Aucun rendez-vous disponible avec ce praticien</div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </div>) : (
                                    <div className='home__result-message'>"Aucun résultat ne correspond à votre recherche"</div>
                                )}
                        </div>)
                ) : (
                    <div>
                        <div className='home__info-wrapper'>
                            <div className='home__info-wrapper-card'>
                                <img src="home-image1.png" alt="" />
                                <div className='home__info-wrapper-card-info'>
                                    <h3>Consulter un professionnel</h3>
                                    <p>Filtrer par localisation</p>
                                </div>
                            </div>
                            <div className='home__info-wrapper-card'>
                                <img src="home-image2.png" alt="" />
                                <div className='home__info-wrapper-card-info'>
                                    <h3>Prendre rendez-vous</h3>
                                    <p>Facilement en ligne</p>
                                </div>
                            </div>
                        </div>
                        <div className='home__explaination'>
                            <h2>Comment ça fonctionne ?</h2>
                            <hr />
                            <div className='home__explaination-text'>
                                <p className='home__explaination-text-info'>CareConnect est un service en ligne de prise de rendez-vous avec des professionnels de santé que vous pouvez filtrer en fonction de leur localisation et de leur spécialisation</p>
                            </div>
                            <div className='home__explaination-wrapper'>
                                <div className='home__explaination-wrapper-card'>
                                    <img src="registration.png" alt="" />
                                    <p>Je créé un compte</p>
                                </div>
                                <div className='home__explaination-wrapper-card'>
                                    <img src="doctor.jpg" alt="" />
                                    <p>Je recherche un spécialiste</p>
                                </div>
                                <div className='home__explaination-wrapper-card'>
                                    <img src="picto-bleu.png" alt="" />
                                    <p>Je prend rendez-vous avec mon praticien</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <Footer />
        </div>
    );
};

export default Home;