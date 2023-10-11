import React from 'react';
import { useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import axios from '../api/axios';
import { useState } from 'react';
import Loader from '../components/Loader';
import HomeHeader from '../components/Headers/HomeHeader';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';

const Home = () => {
    const user = useSelector((state) => state.userReducer.user);

    const [searchResult, setSearchResult] = useState(false);
    const [takeAppointment, setTakeAppointment] = useState(false);
    const [appointmentOfSelectedDoctor, setAppointmentOfSelectedDoctor] = useState(null);
    const [appointmentDay, setAppointmentDay] = useState(null);

    const handleSearchResult = (result) => {
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
        } catch (err) {
            console.error('Erreur lors de la récupération des rendez-vous :', err);
        }
    }

    useEffect(() => {
        let tab = [];
        appointmentOfSelectedDoctor?.forEach(day => {
            if (!tab.includes(day.dateOfAppointment)) {
                console.log(day.dateOfAppointment)
                tab.push(day.dateOfAppointment)
            }
        })
        setAppointmentDay(tab)
    }, [appointmentOfSelectedDoctor])
    // const [isLoading, setIsLoading] = useState(true);

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

    console.log(user)
    // if (isLoading) {
    //     return <Loader />;
    // }
    return (
        <div className='home'>
            <HomeHeader onSearchResult={handleSearchResult} />
            {searchResult ?
                (
                    takeAppointment ? (
                        <div className='home__makeappointment'>
                            {appointmentOfSelectedDoctor ? (
                                <div className='home__makeappointment-wrapper'>
                                    <h2>Disponiblités du docteur</h2>

                                    {appointmentDay.map(day => (

                                        <div className='home__makeappointment-wrapper-date' key={day}>
                                            <h3>{formatDate(day)}</h3>
                                            {appointmentOfSelectedDoctor.map(appointment => (
                                                <div className='home__makeappointment-container' key={appointment.id}>
                                                    {day === appointment.dateOfAppointment ? (
                                                        <div className='home__makeappointment-wrapper-item'>
                                                            <div>Le {formatDate(appointment.dateOfAppointment)} de {formatTime(appointment.timeOfAppointment)} à {formatTime(appointment.endTimeOfAppointment)}</div>
                                                            <div>réserver ce creneau</div>
                                                        </div>
                                                    ) : ""}
                                                </div>
                                            ))}

                                        </div>
                                    ))}
                                </div>
                            ) : ""}
                        </div>
                    ) : (<div className='home__result'>
                        {searchResult.map((result, index) => (
                            <div className='home__result-wrapper' key={index}>
                                <div className='home__result-wrapper-info'>
                                    <div className='home__result-wrapper-name'>Dr {result.user.firstname} {result.user.lastname}</div>
                                    <div className='home__result-wrapper-specialization'>{result.specialization}</div>
                                    <div className='home__result-wrapper-address'>{result.officeAddress}</div>
                                    <div>{result.officePostalCode} {result.officeCity}</div>
                                    <div className='home__result-wrapper-btn'>
                                        <button
                                            onClick={() => makeAnAppointment(result.id)}
                                        >Prendre rendez-vous
                                        </button>
                                    </div>
                                </div>
                                <div className='home__result-wrapper-appointment'>
                                    {
                                        result.appointments ? (
                                            <div>Prochain rendez-vous le {result.appointments.dateOfAppointment} à {result.appointments.timeOfAppointment}</div>
                                        ) : (
                                            <div>Aucun rendez-vous disponible avec ce praticien</div>
                                        )
                                    }
                                </div>
                            </div>
                        ))}
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