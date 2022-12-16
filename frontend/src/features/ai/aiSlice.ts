import { createSlice } from "@reduxjs/toolkit";
import userSlice from "../user/userSlice";

const aiSlice = createSlice({
    name: 'ai',
    initialState: {results:{Validation:'-', Sentiment: '-', Topic: '-'}},
    reducers:{
        setResults:(state, action)=> {
            state.results = action.payload
        }
    }
})



export default aiSlice.reducer;

export const {setResults} = aiSlice.actions;
export const selectUser = (state:any) => state.ai.results;