export const setUser = (userData) => ({
    type: 'SET_USER',
    payload: userData,
});

export const updateUserProperty = (key, value) => ({
    type: 'UPDATE_USER_PROPERTY',
    key,
    value,
});

export const logout = () => ({
    type: 'LOGOUT',
});