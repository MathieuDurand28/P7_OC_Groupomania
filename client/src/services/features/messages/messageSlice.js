import { createSlice } from '@reduxjs/toolkit'


export const messageSlice = createSlice({
    name: 'message',
    initialState: null,
    reducers: {
        add_message: (state, action) => {
            state = {id: "1",author: "Joe",message: "test 1"}
        },
        delete_message: (state) => {
            state = null
        },
    },
})

// Action creators are generated for each case reducer function
export const { add_message, delete_message } = messageSlice.actions

export default messageSlice.reducer
