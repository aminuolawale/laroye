import { createSlice } from "@reduxjs/toolkit"


const readFromLocalStorage = (key: string) => {
    try {
        return JSON.parse(localStorage.getItem(key) || "")
    } catch (err) {
        return ""
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, accessToken: readFromLocalStorage("accessToken"), refreshToken: readFromLocalStorage("refreshToken") },
    reducers: {
        loginUser: (state, action) => {
            const { user, accessToken, refreshToken } = action.payload
            state.user = user
            state.accessToken = accessToken
            state.refreshToken = refreshToken
            localStorage.setItem("accessToken", JSON.stringify(accessToken))
            localStorage.setItem("refreshToken", JSON.stringify(refreshToken))
        },
        logOutUser: (state, action) => {
            state.user = null
            state.accessToken = null
            state.refreshToken = null
            localStorage.setItem("accessToken", "")
            localStorage.setItem("refreshToken", "")
        }
    },
})

export const { loginUser, logOutUser } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: any) => state.auth.user
export const selectCurrentToken = (state: any) => state.auth.token