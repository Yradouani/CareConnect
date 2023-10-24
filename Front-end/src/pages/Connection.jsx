import React from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import { AiOutlineCopyrightCircle } from "react-icons/ai";

const Connection = () => {
    const [signUp, setSignUp] = useState(true);
    const [success, setSuccess] = useState(false);


    return (
        <div className='connection'>
            <Helmet>
                <title>CareConnect - Page de connexion</title>
                <meta name="description" content="Connectez-vous à CareConnect pour prendre vos rendez-vous médicaux en ligne facilement et rapidement" />
            </Helmet>
            <div className='primary-part'>
                <div className='logo-container'>
                    <img src="logo.png" alt="logo" className='logo' />
                    <p>Plateforme de réservation médicale en ligne, où la santé rencontre la simplicité</p>
                </div>
                <img className='primary-part__img' src="imc.png" alt="vétérianire" />
                <p className='copyright'>Copyright <AiOutlineCopyrightCircle /> 2023, CareConnect. All rights reserved</p>
            </div>
            <div className='second-part'>
                <div className='connect_modal'>
                    {success ?
                        (
                            <h2>Formulaire validé ! <br />
                                Veuillez maintenant vous connecter
                            </h2>
                        )
                        :
                        ""
                    }
                    <div className="header_btn">
                        <button style={{
                            background: signUp ? "white" : "#f8f8f8",
                            color: signUp ? "#63696e" : "#63696e",
                            display: success ? 'none' : 'bloc'
                        }}
                            onClick={() => setSignUp(true)}>S'inscrire</button>

                        <button style={{
                            background: signUp ? "#f8f8f8" : "white",
                            color: signUp ? "#63696e" : "#63696e"
                        }}
                            onClick={() => setSignUp(false)}>Se connecter</button>
                    </div>
                    {signUp ? <SignUp success={success} setSuccess={setSuccess} setSignUp={setSignUp} /> : <Login />}
                </div>
            </div>
        </div>
    );
};

export default Connection;