import { createSlice } from '@reduxjs/toolkit'

const loading = createSlice({
    name:"loading",
    initialState: {},
    reducers: {
        startLoading(state, action) {
            state = {
                ...state,
                [action.payload]: true,
            }
        },
        finishLoading(state, action) {
            state = {
                ...state,
                [action.payload]: false, 
            }
        }
    }
});

export const { 
    startLoading,
    finishLoading
} = loading.actions
export default loading.reducer;