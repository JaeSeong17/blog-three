import { createSlice } from '@reduxjs/toolkit'

const controller = createSlice({
    name: 'controller',
    initialState: {
        camAngle: {x:0, y:3, z:0},
        camPos: {x:15, y:5, z:20},
        focus: false,
        index: -1,
        clickable: false
    },
    reducers: {
        setCamAngle(state, action) {
            state.camAngle = {
                ...state.camAngle,
                ...action.payload
            }
        },
        setCamPos(state, action) { 
            state.camPos = {
                ...state.camPos,
                ...action.payload
            }
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
    setCamAngle,
    setCamPos,
    setFocusIn,
    setFocusOut, 
    setIndex,
    setClickable
} = controller.actions
export default controller.reducer;