import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../actions/user.action';
import { setAppointments } from '../actions/appointment.action';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";

const Login = () => {
    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    //Remove error message if user is writing
    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                '/connexion',
                JSON.stringify({ email, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            const decodedToken = jwt_decode(response?.data?.token);
            const userData = {
                id: decodedToken.id,
                token: response?.data?.token,
                firstname: decodedToken.firstname,
                lastname: decodedToken.lastname,
                phone: decodedToken.phone,
                email: decodedToken.email,
                role: decodedToken.role,
                issued_at: decodedToken.issued_at
            };
            dispatch(setUser(userData));

            try {
                const response = await axios.get(
                    `/rendez-vous/${userData.id}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userData.token}`
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

            navigate('/accueil');
        } catch (err) {
            console.log(err);
            if (!err?.response) {
                setErrMsg('Pas de réponse du serveur');
            } else if (err.response?.status === 400) {
                setErrMsg("Veuillez entrer votre email ET votre mot de passe");
            } else if (err.response?.status === 401) {
                setErrMsg("Email et/ou mot de passe incorrect");
            } else if (err.response?.status === 429) {
                setErrMsg("Trop de tentatives de connexion, veuillez réessayer plus tard");
            } else {
                setErrMsg('Connexion échouée')
            }
            errRef.current.focus();
        }
    }

    return (
        <div className='login'>
            <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
            >
                {errMsg}
            </p>
            <form onSubmit={e => handleRegister(e)}>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="email">Email * : </label></td>
                            <td><input
                                type="email"
                                id="email"
                                required
                                ref={emailRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="password">Mot de passe * : </label></td>
                            <td><input
                                type="password"
                                id="password"
                                required
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                            /></td>
                        </tr>
                    </tbody>
                </table>
                <div className='signup_submit'>
                    <input type="submit" value="Se connecter" />
                </div>
            </form>
        </div>
    );
};

export default Login;