import {createSlice} from '@reduxjs/toolkit';


const errorsSlice = createSlice({
    name: 'errors',
    initialState: [],
    reducers: {
        addErrors: (state:string[], action) => {
            console.log("errors added")
            state.push(...action.payload)
        }
    }
})



export default errorsSlice.reducer;

export const {addErrors} = errorsSlice.actions;

export const selectErrors = (state:any) => state.errors;