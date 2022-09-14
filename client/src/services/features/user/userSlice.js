import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        add_user: (state, action) => {
            state = action.payload
            return state
        },
        kick_user: (state) => {
            state = null
            return state
        },
    },
})

// Action creators are generated for each case reducer function
export const { add_user, kick_user } = userSlice.actions

export default userSlice.reducer
