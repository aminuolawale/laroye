import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'user',
    initialState: {userDetail:null, socialAccount:null},
    reducers: {
        setUser: (state, action) =>{
            state.userDetail = action.payload
        },
        setSocialAccount: (state, action) => {
            state.socialAccount = action.payload
        }
    }
})


export default userSlice.reducer;
export const {setUser, setSocialAccount} = userSlice.actions;
export const selectUser = (state: any) => state.user.userDetail