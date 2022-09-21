import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'user',
    initialState: {userDetail:null},
    reducers: {
        setUser: (state, action) =>{
            state.userDetail = action.payload
            console.log("---",state)
        }
    }
})


export default userSlice.reducer;
export const {setUser} = userSlice.actions;
export const selectUser = (state: any) => state.user.userDetail