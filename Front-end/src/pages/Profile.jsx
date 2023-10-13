import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Profile = () => {
    const user = useSelector((state) => state.userReducer.user);

    return (
        <div className='profil'>
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
                    <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="dl-icon dl-align-self-flex-start dl-list-item-icon dl-icon-primary-110 dl-icon-medium" data-icon-name="solid/circle-user" data-design-system="oxygen" data-design-system-component="Icon"><path d="M8 2C4.672 2 2 4.695 2 8c0 3.328 2.672 6 6 6 3.305 0 6-2.672 6-6 0-3.305-2.695-6-6-6Zm0 3c.914 0 1.688.773 1.688 1.688 0 .937-.774 1.687-1.688 1.687a1.68 1.68 0 0 1-1.688-1.688A1.697 1.697 0 0 1 8 5Zm0 7.5a4.48 4.48 0 0 1-3.188-1.313A2.601 2.601 0 0 1 7.25 9.5h1.5c1.102 0 2.04.703 2.414 1.688A4.467 4.467 0 0 1 8 12.5Z"></path></svg>
                        <span>Mon profil</span>
                    </div>
                    <div>{user.firstname} {user.lastname}</div>
                </div>
                <div className='profil-connection'>
                    <h2>Connexion</h2>
                    <hr />
                    <div>
                        <div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="dl-icon dl-align-self-flex-start dl-list-item-icon dl-icon-primary-110 dl-icon-medium" data-icon-name="solid/phone" data-design-system="oxygen" data-design-system-component="Icon"><path d="m13.977 11.07-.563 2.367a.705.705 0 0 1-.703.586C6.805 14 2 9.195 2 3.29c0-.352.21-.633.563-.703l2.367-.563c.328-.07.68.118.82.422L6.852 5c.117.305.046.656-.211.844L5.375 6.875a8.139 8.139 0 0 0 3.75 3.727l1.031-1.266A.751.751 0 0 1 11 9.125l2.555 1.102c.304.164.492.515.422.843Z"></path></svg>
                            <span>Téléphone</span>
                        </div>
                        <div>{user.phone}</div>
                        <div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="dl-icon dl-align-self-flex-start dl-list-item-icon dl-icon-primary-110 dl-icon-medium" data-icon-name="solid/envelope" data-design-system="oxygen" data-design-system-component="Icon"><path d="M8 10.25c-.398 0-.797-.117-1.125-.375L2 6.078v5.297A1.11 1.11 0 0 0 3.125 12.5h9.75c.61 0 1.125-.492 1.125-1.125V6.078L9.102 9.875A1.79 1.79 0 0 1 8 10.25ZM2.375 5.422l4.969 3.867a1.09 1.09 0 0 0 1.289 0l4.969-3.867A1.06 1.06 0 0 0 14 4.625 1.14 1.14 0 0 0 12.875 3.5h-9.75C2.492 3.5 2 4.016 2 4.625c0 .305.14.61.375.797Z"></path></svg>
                            <span>E-mail</span>
                        </div>
                        <div>{user.email}</div>
                        <div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="dl-icon dl-align-self-flex-start dl-list-item-icon dl-icon-primary-110 dl-icon-medium" data-icon-name="solid/lock" data-design-system="oxygen" data-design-system-component="Icon"><path d="M4.625 6.5V5.375C4.625 3.523 6.125 2 8 2a3.391 3.391 0 0 1 3.375 3.375V6.5h.375c.82 0 1.5.68 1.5 1.5v4.5c0 .844-.68 1.5-1.5 1.5h-7.5a1.48 1.48 0 0 1-1.5-1.5V8c0-.82.656-1.5 1.5-1.5h.375Zm1.5 0h3.75V5.375A1.88 1.88 0 0 0 8 3.5a1.866 1.866 0 0 0-1.875 1.875V6.5Z"></path></svg>
                            <span>Mot de passe</span>
                        </div>
                        <div>************</div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;