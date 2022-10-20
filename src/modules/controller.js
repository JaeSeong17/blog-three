import { createSlice } from '@reduxjs/toolkit'

const controller = createSlice({
    name: 'controller',
    initialState: {
        cameraAngle: [12,12,12],
        focus: false,
        index: 0
    },
    reducers: {
        setCameraAngle(state, action) {
            state.cameraAngle = action.payload.angle
        },
        setFocusIn(state, action) {
            state.focus = true
        },
        setFocusOut(state, action) {
            state.focus = false
        },
        setIndex(state, action) {
            state.index = action.payload
        }
    }
})

export const { setCameraAngle, setFocusIn, setFocusOut, setIndex } = controller.actions
export default controller.reducer;