import { createSlice } from '@reduxjs/toolkit';

// Definimos el estado inicial puede ser un arreglo o un objeto
const initState = {
    id: null,
    session: false,
    token: null,
    expiration: null
};

// Actions
export const authSlice = createSlice({
    // Nombre por el que accedemos al slice
    name: 'auth',
    // Estado inicial que funcionara como state en los reducers
    initialState: initState,
    // Actions que reciben el estado inicial como state y los parametros como action.payload
    reducers: {
        logInReducer: (state, action) => {
            // Asignando nuevo valor
            localStorage.setItem("tokenUser", JSON.stringify(action.payload));

            return { ...state, ...action.payload }
        },

        logOutReducer: (state) => {
            localStorage.removeItem("tokenUser");

            return { ...state, ...initState }
        },

        verifySession: (state) => {
            let tokenU = JSON.parse(localStorage.getItem("tokenUser"));

            if (tokenU) {
                let now = Math.floor(new Date().getTime() / 1000);
                
                // Verificamos si la sesión ha expirado
                if (now > tokenU.expiration) {
                    localStorage.removeItem("tokenUser");
                    return { ...initState }; // Cerramos sesión
                } else {
                    return { ...state, ...tokenU}; // Restauramos sesión
                }
            }

            return state;
        }

    }
});

export const { logInReducer, logOutReducer, verifySession } = authSlice.actions;
export default authSlice.reducer;