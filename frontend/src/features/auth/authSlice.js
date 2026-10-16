import { createSlice } from '@reduxjs/toolkit';

const TOKEN_KEY = 'sensei.token';

const initialState = {
    token: localStorage.getItem(TOKEN_KEY) ?? null,
    usuario: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action) {
            state.token = action.payload.token;
            state.usuario = action.payload.usuario ?? null;
            localStorage.setItem(TOKEN_KEY, action.payload.token);
        },
        logout(state) {
            state.token = null;
            state.usuario = null;
            localStorage.removeItem(TOKEN_KEY);
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export default authSlice.reducer;
