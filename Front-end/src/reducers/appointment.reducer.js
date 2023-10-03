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
            return {
                ...state,
                appointment: [...state.appointment, action.payload],
            };
        case 'DELETE_APPOINTMENT':
            const updatedAppointments = state.appointment.filter(appointment => appointment.id !== action.payload);
            return {
                ...state,
                appointment: updatedAppointments,
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