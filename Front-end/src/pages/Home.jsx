import React from 'react';
import { useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import axios from '../api/axios';
import { useState } from 'react';
import Loader from '../components/Loader';
import HomeHeader from '../components/Headers/HomeHeader';
import { useSelector } from 'react-redux';

const Home = () => {
    const user = useSelector((state) => state.userReducer.user);
    // const [data, setData] = useState({});
    // const [modal, setModal] = useState(false);
    // const [isLoading, setIsLoading] = useState(true);

    // const [oldPassword, setOldPassword] = useState();
    // const [newPassword, setNewPassword] = useState();
    // const [confirmPassword, setConfirmPassword] = useState();

    // const [edit, setEdit] = useState(false);
    // const [editFirstname, setEditFirstname] = useState(false);
    // const [editLastname, setEditLastname] = useState(false);
    // const [editAddress, setEditAddress] = useState(false);
    // const [editPhone, setEditPhone] = useState(false);
    // const [editEmail, setEditEmail] = useState(false);
    // const [editSiret, setEditSiret] = useState(false);

    console.log(user)

    // const updatePassword = async () => {
    //     if (type === "client") {
    //         try {
    //             console.log(oldPassword, newPassword, confirmPassword);
    //             const response = await axios.put(
    //                 "/user/client/" + id,
    //                 JSON.stringify({
    //                     old_pwd: oldPassword,
    //                     pwd: newPassword,
    //                     confirm_pwd: confirmPassword
    //                 }),
    //                 {
    //                     headers: { 'Content-Type': 'application/json' },
    //                     // withCredentials: true
    //                 }
    //             );
    //             console.log(response.data);
    //             setModal(false);
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }

    // }
    // console.log(data);

    // if (isLoading) {
    //     return <Loader />;
    // }
    return (
        <div className='home'>
            <HomeHeader />
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
    );
};

export default Home;