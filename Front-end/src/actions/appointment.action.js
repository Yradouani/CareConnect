export const setAppointments = (appointmentsData) => ({
    type: 'SET_APPOINTMENTS',
    payload: appointmentsData,
});

export const addAppointment = (appointmentData) => ({
    type: 'ADD_APPOINTMENT',
    payload: appointmentData,
});

export const deleteAppointmentInStore = (appointmentData) => ({
    type: 'DELETE_APPOINTMENT',
    payload: appointmentData,
});

export const cleanAppointments = () => ({
    type: 'CLEANAPPOINTMENTS',
});