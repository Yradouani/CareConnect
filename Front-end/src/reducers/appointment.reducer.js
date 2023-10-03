const initialState = { appointment: null };

export default function appointmentReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_APPOINTMENTS':
            console.log("je set appointments reducer")
            return {
                ...state,
                appointment: action.payload,
            };
        case 'ADD_APPOINTMENT':
            const newAppointment = action.payload;
            const updatedAppointments = [...state.appointment, newAppointment];

            updatedAppointments.sort((a, b) => {
                const dateA = new Date(a.dateOfAppointment + ' ' + a.timeOfAppointment);
                const dateB = new Date(b.dateOfAppointment + ' ' + b.timeOfAppointment);
                return dateA - dateB;
            });

            return {
                ...state,
                appointment: updatedAppointments,
            };
        case 'DELETE_APPOINTMENT':
            const deleteAppointments = state.appointment.filter(appointment => appointment.id !== action.payload);
            return {
                ...state,
                appointment: deleteAppointments,
            };
        case 'CLEANAPPOINTMENTS':
            return {
                ...state,
                appointment: null,
            };
        default:
            return state;
    }
}