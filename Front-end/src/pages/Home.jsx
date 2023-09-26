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
    const handleSearchResult = (result) => {
        setSearchResult(result);
    };
    // const [isLoading, setIsLoading] = useState(true);

    console.log(user)
    // if (isLoading) {
    //     return <Loader />;
    // }
    return (
        <div className='home'>
            <HomeHeader onSearchResult={handleSearchResult} />
            {searchResult ?
                (
                    <div className='home__result'>
                        {searchResult.map((result, index) => (
                            <div className='home__result-wrapper' key={index}>
                                <div className='home__result-wrapper-info'>
                                    <div className='home__result-wrapper-name'>Dr {result.user.firstname} {result.user.lastname}</div>
                                    <div className='home__result-wrapper-specialization'>{result.specialization}</div>
                                    <div className='home__result-wrapper-address'>{result.officeAddress}</div>
                                    <div>{result.officePostalCode} {result.officeCity}</div>
                                    <div className='home__result-wrapper-btn'><button>Prendre rendez-vous</button></div>
                                </div>
                                <div className='home__result-wrapper-appointment'>
                                    <div>Prochain rendez-vous le</div>
                                </div>
                            </div>
                        ))}
                    </div>
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