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
    initialState: { loggedIn: !!readFromLocalStorage("accessToken"), accessToken: readFromLocalStorage("accessToken"), refreshToken: readFromLocalStorage("refreshToken") },
    reducers: {
        loginUser: (state, action) => {
            const { user, accessToken, refreshToken } = action.payload
            state.loggedIn = true
            state.accessToken = accessToken
            state.refreshToken = refreshToken
            localStorage.setItem("accessToken", JSON.stringify(accessToken))
            localStorage.setItem("refreshToken", JSON.stringify(refreshToken))
        },
        logOutUser: (state) => {
            state.loggedIn = false
            state.accessToken = null
            state.refreshToken = null
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
        }
    },
})

export const { loginUser, logOutUser } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state: any) => state.auth.token
export const getLoggedInStatus  = (state:any) => state.auth.loggedIn