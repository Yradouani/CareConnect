import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/user.action';
import { cleanAppointments } from '../actions/appointment.action';

function TokenExpirationHandler({ issuedAt }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const checkTokenExpiration = () => {
        if (issuedAt) {
            const currentTime = Math.floor(Date.now() / 1000);

            if (currentTime - issuedAt > 3600) {
                dispatch(logout());
                dispatch(cleanAppointments());
                navigate('/');
            }
        }
    };

    useEffect(() => {
        checkTokenExpiration();
        const interval = setInterval(checkTokenExpiration, 60000);
        return () => clearInterval(interval);
        //eslint-disable-next-line
    }, [navigate, issuedAt]);

    return null;
}

export default TokenExpirationHandler;
