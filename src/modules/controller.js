import { createSlice } from '@reduxjs/toolkit'

const camSetting = {
    'start': {
        angle: {x:0, y:0, z:2},
        pos: {x:0, y:-30, z:3}
    },
    'key': {
        angle: {x:0, y: 3, z:0},
        pos: {x:15, y: 5, z:20}
    },
    'board': {
        angle: {x:0, y: 16, z:5},
        pos: {x:10, y: 12, z:5}
    },
    'connect': {
        angle: {x:0, y: 16, z:5},
        pos: {x:10, y: 12, z:5}
    },
    'screen': {
        angle: {x:0, y: 30, z:12},
        pos: {x:0, y: 25, z:12}
    },
}

const controller = createSlice({
    name: 'controller',
    initialState: {
        camAngle: {x:0, y:0, z:2},
        camPos: {x:0, y:-30, z:3},
        focus: false,
        screen: false,
        connect: false,
        index: -1,
        clickable: false,
        target: "start"
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
        },
        setTarget(state, action) {
            state.target = action.payload
            state.camAngle = camSetting[action.payload].angle
            state.camPos = camSetting[action.payload].pos
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
    setClickable,
    setTarget
} = controller.actions
export default controller.reducer;