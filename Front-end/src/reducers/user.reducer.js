const initialState = { user: null };

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
            };
        case 'UPDATE_USER_PROPERTY':
            const updatedUser = {
                ...state.user,
                [action.key]: action.value,
            };
            return {
                ...state,
                user: updatedUser,
            };
        default:
            return state;
    }
}