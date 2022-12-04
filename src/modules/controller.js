import { createSlice } from '@reduxjs/toolkit'

const camSetting = {
    'start': {
        angle: {x:0, y:0, z:2},
        pos: {x:0, y:-30, z:3}
    },
    'login': {
        angle: {x:0, y:0, z:2},
        pos: {x:0, y:-30, z:3}
    },
    'loading': {
        angle: {x:0, y:0, z:2},
        pos: {x:0, y:-30, z:3}
    },
    'key': {
        angle: {x:0, y: 3, z:0},
        pos: {x:15, y: 5, z:20}
    },
    'board': {
        angle: {x:0, y: 3, z:5},
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
        index: -1,
        target: "start",
    },
    reducers: {
        setCamAngle: (state, action) => {
            state.camAngle = {
                ...state.camAngle,
                ...action.payload
            }
        },
        setCamPos: (state, action) => { 
            state.camPos = {
                ...state.camPos,
                ...action.payload
            }
        },
        setIndex: (state, action) => {
            state.index = action.payload
        },
        setTarget: (state, action) => {
            state.target = action.payload
            state.camAngle = camSetting[action.payload].angle
            state.camPos = camSetting[action.payload].pos
        }
    }
})

export const { 
    setCamAngle,
    setCamPos,
    setIndex,
    setTarget
} = controller.actions
export default controller.reducer;