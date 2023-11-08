import React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import axios from '../api/axios';
import { updateUserProperty } from '../actions/user.action';

//Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Profile = ({ user }) => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const changeProfil = async (propertyTochange, string1) => {

        let REGEX;
        switch (propertyTochange) {
            case 'text':
                REGEX = /^[a-zA-Z][a-zA-Z-éÉèÈàÀùÙâÂêÊîÎôÔûÛïÏëËüÜçÇ]{2,24}$/;
                break;
            case 'phone':
                REGEX = /^\d{10,13}$/;
                break;
            case 'email':
                REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                break;
            case 'password':
                REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%£§&]).{8,24}$/;
                break;
            default:
                console.log(`Impossible de récupérer la Regex`);
        }

        let html = `
                    <label for="${propertyTochange}">${string1} :</label>
                    <input 
                    type="${propertyTochange}" 
                    id="${propertyTochange}" 
                    class="swal2-input" 
                    placeholder="${string1}"
                    required
                    autoComplete='off'
                    aria-invalid={validString1 ? "false" : "true"}
                    />
                `;

        const validateInputs = () => {
            const input1 = document.querySelector(`#${propertyTochange}`);
            if (input1) {
                return REGEX.test(input1.value);
            }
            return false;
        };
        Swal.fire({
            title: `Souhaitez-vous modifier votre ${string1} ?`,
            html: html,
            showCancelButton: true,
            confirmButtonText: 'Modifier',
            cancelButtonText: 'Annuler',
            preConfirm: () => {
                const areInputsValid = validateInputs();
                if (!areInputsValid) {
                    Swal.showValidationMessage(`${string1} incorrect, veuillez entrer un champs valide`);
                }
                return areInputsValid;
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const newValue1 = document.getElementById(propertyTochange).value;

                confirmChangeProfil(newValue1, propertyTochange);
            }
        });
    }
    const confirmChangeProfil = async (newValue1, propertyTochange) => {
        if (propertyTochange === 'text') {
            propertyTochange = 'lastname';
        }

        try {
            const response = await axios.put(
                `/profile/${user.id}`,
                JSON.stringify({
                    property: propertyTochange,
                    value: newValue1
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
                    title: 'Profile modifier avec succès',
                    showConfirmButton: false,
                    timer: 1500
                });

                dispatch(updateUserProperty(propertyTochange, newValue1));
            }
        } catch (err) {
            if (err.response.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Impossible de modifier le profil',
                    text: 'Veuillez réessayer',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur lors de la modification du profile',
                    text: 'Veuillez réessayer.',
                });
            }
        }
    }
    return (
        <div className='profil'>
            <Helmet>
                <title>CareConnect - Page profil</title>
                <meta name="description" content="Consulter votre profil utilisateur CareConnect" />
            </Helmet>
            <Navbar />
            <div className='profil-main'>
                <h1>Mon compte</h1>
                <div className='profil-main__security'>
                    <div>La sécurité de vos données est notre priorité</div>
                    <img src="security.png" alt="" />
                </div>
                <div className='profil-main__identity'>
                    <h2>Identité</h2>
                    <hr />
                    <div
                        className='profil-main__identity-wrapper'
                        onClick={() => changeProfil('text', 'Nom')}
                    >
                        <div className='profil-main__identity-title'>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M8 2C4.672 2 2 4.695 2 8c0 3.328 2.672 6 6 6 3.305 0 6-2.672 6-6 0-3.305-2.695-6-6-6Zm0 3c.914 0 1.688.773 1.688 1.688 0 .937-.774 1.687-1.688 1.687a1.68 1.68 0 0 1-1.688-1.688A1.697 1.697 0 0 1 8 5Zm0 7.5a4.48 4.48 0 0 1-3.188-1.313A2.601 2.601 0 0 1 7.25 9.5h1.5c1.102 0 2.04.703 2.414 1.688A4.467 4.467 0 0 1 8 12.5Z"></path></svg>
                            <span>Mon profil</span>
                        </div>
                        <div className='profil-main__identity-value'>{user?.firstname} {user?.lastname}</div>
                    </div>
                </div>
                <div className='profil-connection'>
                    <h2>Connexion</h2>
                    <hr />
                    <div>
                        <div
                            className='profil-main__connexion-wrapper'
                            onClick={() => changeProfil('phone', 'Numéro de téléphone')}
                        >
                            <div className='profil-main__connexion-title'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="m13.977 11.07-.563 2.367a.705.705 0 0 1-.703.586C6.805 14 2 9.195 2 3.29c0-.352.21-.633.563-.703l2.367-.563c.328-.07.68.118.82.422L6.852 5c.117.305.046.656-.211.844L5.375 6.875a8.139 8.139 0 0 0 3.75 3.727l1.031-1.266A.751.751 0 0 1 11 9.125l2.555 1.102c.304.164.492.515.422.843Z"></path></svg>
                                <span>Téléphone</span>
                            </div>
                            <div className='profil-main__connexion-value'>{user?.phone}</div>
                        </div>

                        <div
                            className='profil-main__connexion-wrapper'
                            onClick={() => changeProfil('email', 'Adresse email')}
                        >
                            <div className='profil-main__connexion-title'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M8 10.25c-.398 0-.797-.117-1.125-.375L2 6.078v5.297A1.11 1.11 0 0 0 3.125 12.5h9.75c.61 0 1.125-.492 1.125-1.125V6.078L9.102 9.875A1.79 1.79 0 0 1 8 10.25ZM2.375 5.422l4.969 3.867a1.09 1.09 0 0 0 1.289 0l4.969-3.867A1.06 1.06 0 0 0 14 4.625 1.14 1.14 0 0 0 12.875 3.5h-9.75C2.492 3.5 2 4.016 2 4.625c0 .305.14.61.375.797Z"></path></svg>
                                <span>E-mail</span>
                            </div>
                            <div className='profil-main__connexion-value'>{user?.email}</div>
                        </div>

                        <div
                            className='profil-main__connexion-wrapper'
                            onClick={() => changeProfil('password', 'Mot de passe')}
                        >
                            <div className='profil-main__connexion-title'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M4.625 6.5V5.375C4.625 3.523 6.125 2 8 2a3.391 3.391 0 0 1 3.375 3.375V6.5h.375c.82 0 1.5.68 1.5 1.5v4.5c0 .844-.68 1.5-1.5 1.5h-7.5a1.48 1.48 0 0 1-1.5-1.5V8c0-.82.656-1.5 1.5-1.5h.375Zm1.5 0h3.75V5.375A1.88 1.88 0 0 0 8 3.5a1.866 1.866 0 0 0-1.875 1.875V6.5Z"></path></svg>
                                <span>Mot de passe</span>
                            </div>
                            <div className='profil-main__connexion-value'>************</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;