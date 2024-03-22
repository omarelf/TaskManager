import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    user: null,
    error: null,
    token: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
            state.error = null; 
        },
        loginSuccess: (state, action) => {
            localStorage.setItem('token', action.payload.token);
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null; 

        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload; 
            state.user = null;
            state.token = null;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
    },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
