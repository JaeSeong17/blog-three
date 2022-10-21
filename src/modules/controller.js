import { createSlice } from '@reduxjs/toolkit'

const controller = createSlice({
    name: 'controller',
    initialState: {
        cameraAngle: [12,12,12],
        focus: false,
        index: -1,
        clickable: false
    },
    reducers: {
        setCameraAngle(state, action) {
            state.cameraAngle = action.payload
        },
        setFocusIn(state, action) {
            state.focus = true
        },
        setFocusOut(state, action) {
            state.focus = false
        },
        setIndex(state, action) {
            state.index = action.payload
        },
        setClickable(state, action) {
            state.clickable = true
        }
    }
})

export const { 
    setCameraAngle,
    setFocusIn,
    setFocusOut, 
    setIndex,
    setClickable
} = controller.actions
export default controller.reducer;