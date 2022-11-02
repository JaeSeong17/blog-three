import { createSlice } from '@reduxjs/toolkit'

const controller = createSlice({
    name: 'controller',
    initialState: {
        camAngle: {x:0, y:0, z:2},
        camPos: {x:0, y:-30, z:3},
        focus: false,
        screen: false,
        connect: false,
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
        setScreenOn(state, action) {
            state.screen = true
        },
        setScreenOff(state, action) {
            state.screen = false
        },
        setConnectOn(state, action) {
            state.connect = true
        },
        setConnectOff(state, action) {
            state.connect = false
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
    setScreenOn,
    setScreenOff,
    setConnectOn,
    setConnectOff,
    setIndex,
    setClickable
} = controller.actions
export default controller.reducer;