import { createSlice } from '@reduxjs/toolkit'

const auth = createSlice({
    name:"auth",
    initialState: {
        username: '',
        password: '',
    },
    reducers: {
        changeField(state, action) {
            state[action.payload.key] = action.payload.value;
        },
        initializeForm(state, action) {
            state.username = '';
            state.password = '';
        }
    }
});

export const { 
    changeField,
    initializeForm
} = auth.actions
export default auth.reducer;