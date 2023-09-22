import React from 'react';
import Navbar from '../Navbar';

const HomeHeader = () => {
    return (
        <header>
            <Navbar />
            <img src="background.png" alt="" className='header__background' />
        </header>
    );
};

export default HomeHeader;