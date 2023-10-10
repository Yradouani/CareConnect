import React from 'react';
import moment from 'moment';
import 'moment/locale/fr';

const DeleteButton = ({ event, onDeleteAppointment }) => {
    const handleDeleteClick = () => {
        onDeleteAppointment(event.id);
    };

    

    return (
        <button onClick={handleDeleteClick}>Supprimer</button>
    );
};

export default DeleteButton;