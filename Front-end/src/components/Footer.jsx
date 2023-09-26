import React from 'react';
import { AiOutlineCopyrightCircle } from "react-icons/ai";

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer__info'>
                <div className='footer__info-specilities'>
                    <h2>Trouver un spécialiste</h2>
                    <p>Médecin généraliste<br />Cardiologue<br />Dermatologue<br />Gastro-entérologue<br />Pédiatre<br />Psychiatre<br />Orthopédiste<br />Chirurgien<br />Ophtalmologiste<br />Dentiste<br />Gynécologue<br />Ostéopathe<br />Endocrinologue<br />Pneumologue<br />ORL</p>
                </div>
                <div className='footer__info-contact'>
                    <h2>Contactez-nous</h2>
                    <div className='footer__info-ontact-network'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24" fill="currentColor" stroke="none" role="img" alt="Twitter" aria-label="Twitter"><path d="M7.8,20.9c8.3,0,12.9-6.9,12.9-12.9c0-0.2,0-0.4,0-0.6C21.6,6.8,22.3,6,23,5c-0.8,0.4-1.7,0.6-2.6,0.7c0.9-0.6,1.6-1.4,2-2.5c-0.9,0.5-1.8,0.9-2.9,1.1c-0.8-0.9-2-1.4-3.3-1.4c-2.5,0-4.5,2-4.5,4.5c0,0.4,0,0.7,0.1,1C8,8.3,4.7,6.5,2.5,3.7C2.1,4.4,1.9,5.1,1.9,6c0,1.6,0.8,2.9,2,3.8c-0.7,0-1.4-0.2-2-0.6c0,0,0,0,0,0.1c0,2.2,1.6,4,3.6,4.5c-0.4,0.1-0.8,0.2-1.2,0.2c-0.3,0-0.6,0-0.8-0.1C4,15.6,5.7,16.9,7.7,17c-1.5,1.2-3.5,1.9-5.6,1.9c-0.4,0-0.7,0-1.1-0.1C2.9,20.1,5.3,20.9,7.8,20.9"></path></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24" fill="currentColor" stroke="none" role="img" alt="Facebook" aria-label="Facebook"><path d="M20.6,1.5H3.4C2.1,1.5,1,2.5,1,3.8v16.4c0,1.3,1.1,2.3,2.4,2.3H12v-8.2H9.6v-2.9H12V9c0-2.5,1.5-4.3,4.6-4.3l2.2,0v3h-1.5c-1.2,0-1.7,0.9-1.7,1.7v2h3.1l-0.7,2.9h-2.4v8.2h4.9c1.3,0,2.4-1.1,2.4-2.3V3.8C23,2.5,21.9,1.5,20.6,1.5z"></path></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24" fill="currentColor" stroke="none" role="img" alt="Instagram" aria-label="Instagram"><path d="M8 3a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5H8zm10 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-6 2a5 5 0 1 1-.001 10.001A5 5 0 0 1 12 7zm0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24" fill="currentColor" stroke="none" role="img" alt="Youtube" aria-label="Youtube"><path d="M12,3.5C1.2,3.5,1,4.4,1,11.6c0,7.2,0.2,8.1,11,8.1s11-0.9,11-8.1C23,4.4,22.8,3.5,12,3.5z M15.5,12l-4.9,2.2c-0.4,0.2-0.8,0-0.8-0.5V9.5c0-0.5,0.4-0.7,0.8-0.5l4.9,2.2C16,11.4,16,11.8,15.5,12z"></path></svg>
                    </div>
                    <div className='footer__info-contact-mail'>
                        <svg role="img" width="1.3em" height="1.3em" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" class="svg-inline--fa fa-envelope" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"></path></svg>
                        <a href="mailto:contact@careconnect.com">contact@careconnect.com</a>
                    </div>
                </div>
                <div className='footer__info-plan'>
                    <h2>Plan du site</h2>
                    <a href="/">Accueil</a>
                    <a href="/rendez-vous">Prendre un rendez-vous</a>
                    <a href="/compte">Information de mon compte</a>
                </div>
            </div>
            <div className='footer__legal'>
                <p className='copyright'>Copyright <AiOutlineCopyrightCircle /> 2023, CareConnect. All rights reserved</p>
            </div>
        </footer>
    );
};

export default Footer;