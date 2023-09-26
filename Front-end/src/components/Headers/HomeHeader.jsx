import React from 'react';
import { useRef, useState, useEffect } from 'react';
import Navbar from '../Navbar';
import axios from '../../api/axios';

const HomeHeader = ({ onSearchResult }) => {
    const searchinputRef = useRef();
    const locationRef = useRef();

    const [searchinput, setSearchinput] = useState('');
    const [location, setLocation] = useState('');
    const [searchResult, setSearchResult] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "/recherche",
                JSON.stringify({ searchinput, location }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    // withCredentials: true
                }
            );
            setSearchResult(response.data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        onSearchResult(searchResult);
        //eslint-disable-next-line
    }, [searchResult]);

    return (
        <header className='header'>
            <Navbar />
            <img src="background.png" alt="background" className='header__background' />
            <h1>Prenez rendez-vous avec un professionel de santé</h1>
            <div className='header__searchbar'>
                <form onSubmit={e => handleSearch(e)}>
                    <div className='header__searchbar-input-wrapper'>
                        <svg width="17" height="17" viewBox="0 0 16 16" fill="currentColor" className="header__searchbar-input-icon" aria-hidden="true"><path d="m13.813 13.04-3.141-3.142c.68-.82 1.055-1.875 1.055-3.023C11.727 4.203 9.523 2 6.852 2 4.156 2 2 4.203 2 6.875 2 9.57 4.18 11.75 6.852 11.75c1.125 0 2.18-.375 3.023-1.055l3.14 3.14a.565.565 0 0 0 .422.165.469.469 0 0 0 .376-.164c.234-.211.234-.563 0-.797ZM3.124 6.874a3.746 3.746 0 0 1 3.75-3.75 3.761 3.761 0 0 1 3.75 3.75 3.746 3.746 0 0 1-3.75 3.75 3.731 3.731 0 0 1-3.75-3.75Z"></path></svg>
                        <input
                            type="text"
                            name="searchinput"
                            id="searchinput"
                            ref={searchinputRef}
                            placeholder='Nom, spécialité...'
                            onChange={(e) => setSearchinput(e.target.value)}
                            value={searchinput} />
                    </div>
                    <div className='header__searchbar-input-wrapper'>
                        <svg width="17" height="17" viewBox="0 0 16 16" fill="currentColor" className="header__searchbar-input-icon" aria-hidden="true"><path d="M9.875 6.5A1.866 1.866 0 0 1 8 8.375 1.851 1.851 0 0 1 6.125 6.5c0-1.031.82-1.875 1.875-1.875A1.88 1.88 0 0 1 9.875 6.5ZM8 5.75a.755.755 0 0 0-.75.75c0 .422.328.75.75.75.398 0 .75-.328.75-.75A.771.771 0 0 0 8 5.75Zm4.5.75c0 2.063-2.742 5.695-3.96 7.219a.707.707 0 0 1-1.102 0C6.218 12.195 3.5 8.563 3.5 6.5 3.5 4.016 5.492 2 8 2c2.484 0 4.5 2.016 4.5 4.5ZM8 3.125A3.376 3.376 0 0 0 4.625 6.5c0 .305.094.75.352 1.36.234.562.585 1.218.984 1.874A35.858 35.858 0 0 0 8 12.594c.563-.75 1.336-1.781 2.016-2.86.398-.656.75-1.312.984-1.875.258-.609.375-1.054.375-1.359A3.391 3.391 0 0 0 8 3.125Z"></path></svg>
                        <input
                            type="text"
                            name="location"
                            id="searchinput"
                            ref={locationRef}
                            placeholder='Où ?'
                            onChange={(e) => setLocation(e.target.value)}
                            value={location} />
                    </div>
                    <div className='header__searchbar-submit-wrapper'>
                        <div className='header__searchbar-submit-background'>
                            <input
                                type="submit"
                                value="Rechercher" />
                            <svg className="header__searchbar-submit-icon" width="10" height="16" viewBox="0 0 10 16"><path d="M2.7.5c-.2-.3-.5-.5-1-.5S1 .2.5.5C-.2 1-.2 2 .5 2.7L5.7 8 .5 13.5c-.7.8-.7 1.5 0 2.2.3.3.7.4 1.2.4.4 0 .8 0 1-.3L9 9c.3-.2.4-.5.4-1 0-.4 0-.8-.4-1L2.7.5z"></path></svg>
                        </div>
                    </div>
                </form>
            </div>
        </header>
    );
};

export default HomeHeader;