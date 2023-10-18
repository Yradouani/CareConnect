import React from 'react';

const CardAppointment = ({ appointment, deleteAppointment }) => {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    function getDay(date) {
        const newdate = new Date(date);
        return days[newdate.getDay()];
    }
    function formatTime(inputTime) {
        return inputTime.replace(/:\d{2}$/, '');
    }
    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    }
    console.log(appointment.doctor.user)
    return (
        <div key={appointment.id} className="appointments-main__container-item">
            <div className='appointments-main__container-appointment'>
                <div className='appointments-main__container-date'>
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" ><path d="M6.313 3.5h3.375v-.938c0-.304.234-.562.562-.562a.57.57 0 0 1 .563.563V3.5h.937c.82 0 1.5.68 1.5 1.5v7.5c0 .844-.68 1.5-1.5 1.5h-7.5a1.48 1.48 0 0 1-1.5-1.5V5c0-.82.656-1.5 1.5-1.5h.938v-.938c0-.304.234-.562.562-.562a.57.57 0 0 1 .563.563V3.5Zm-2.438 9c0 .21.164.375.375.375h7.5a.385.385 0 0 0 .375-.375v-6h-8.25v6Z"></path></svg>
                    {getDay(appointment.dateOfAppointment)} {formatDate(appointment.dateOfAppointment)}
                </div>
                <div className='appointments-main__container-time'>
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M7.438 4.813c0-.305.234-.563.562-.563a.57.57 0 0 1 .563.563v2.906l1.992 1.312c.258.188.328.54.14.797a.538.538 0 0 1-.773.14l-2.25-1.5A.577.577 0 0 1 7.438 8V4.812ZM8 2c3.305 0 6 2.695 6 6 0 3.328-2.695 6-6 6-3.328 0-6-2.672-6-6 0-3.305 2.672-6 6-6ZM3.125 8A4.871 4.871 0 0 0 8 12.875c2.672 0 4.875-2.18 4.875-4.875 0-2.672-2.203-4.875-4.875-4.875-2.695 0-4.875 2.203-4.875 4.875Z"></path></svg>
                    {formatTime(appointment.timeOfAppointment)}
                </div>
            </div>
            <div className='appointments-main__container-doctor'>
                <div className='appointments-main__container-text'>
                    {appointment.doctor.specialization} : {appointment.doctor.user.firstname} {appointment.doctor.user.lastname}
                </div>
                <hr />
                <div className='appointments-main__container-subtitle'>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="dl-icon dl-icon-neutral-090 dl-icon-xsmall" data-icon-name="solid/location-dot" data-design-system="oxygen" data-design-system-component="Icon"><path d="M7.438 13.719C6.218 12.195 3.5 8.563 3.5 6.5 3.5 4.016 5.492 2 8 2c2.484 0 4.5 2.016 4.5 4.5 0 2.063-2.742 5.695-3.96 7.219a.707.707 0 0 1-1.102 0ZM8 8c.82 0 1.5-.656 1.5-1.5C9.5 5.68 8.82 5 8 5c-.844 0-1.5.68-1.5 1.5C6.5 7.344 7.156 8 8 8Z"></path></svg>
                    <span>Se rendre à la consultation : </span>
                </div>
                <div className='appointments-main__container-text'>
                    {appointment.doctor.officeAddress}
                </div>
                <div className='appointments-main__container-text'>
                    {appointment.doctor.officePostalCode}  {appointment.doctor.officeCity}
                </div>
                <hr />
                <div className='appointments-main__container-subtitle'>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="dl-icon dl-icon-neutral-090 dl-icon-xsmall" data-icon-name="solid/phone" data-design-system="oxygen" data-design-system-component="Icon"><path d="m13.977 11.07-.563 2.367a.705.705 0 0 1-.703.586C6.805 14 2 9.195 2 3.29c0-.352.21-.633.563-.703l2.367-.563c.328-.07.68.118.82.422L6.852 5c.117.305.046.656-.211.844L5.375 6.875a8.139 8.139 0 0 0 3.75 3.727l1.031-1.266A.751.751 0 0 1 11 9.125l2.555 1.102c.304.164.492.515.422.843Z"></path></svg>
                    <span>Télephone du lieu de consultation : </span>
                </div>
                <div className='appointments-main__container-text'>
                    {appointment.doctor.user.phone}
                </div>
                <hr />
            </div>
            <div
                onClick={() => deleteAppointment(appointment.id)}
                className='appointments-main__container-delete'
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="m8.773 9.688 1.102 1.101c.234.234.234.586 0 .797a.513.513 0 0 1-.773 0L8 10.484l-1.125 1.102a.513.513 0 0 1-.773 0c-.235-.211-.235-.563 0-.797l1.101-1.101-1.101-1.102c-.235-.211-.235-.563 0-.797.21-.21.562-.21.773 0L8 8.914 9.102 7.79c.21-.21.562-.21.773 0 .234.234.234.586 0 .797l-1.102 1.1ZM5.75 2a.57.57 0 0 1 .563.563V3.5h3.375v-.938c0-.304.234-.562.562-.562a.57.57 0 0 1 .563.563V3.5h.937c.82 0 1.5.68 1.5 1.5v7.5c0 .844-.68 1.5-1.5 1.5h-7.5a1.48 1.48 0 0 1-1.5-1.5V5c0-.82.656-1.5 1.5-1.5h.938v-.938c0-.304.234-.562.562-.562Zm6.375 4.5h-8.25v6c0 .21.164.375.375.375h7.5a.385.385 0 0 0 .375-.375v-6Z"></path></svg>
                Annuler ce rendez-vous
            </div>
        </div>
    );
};

export default CardAppointment;