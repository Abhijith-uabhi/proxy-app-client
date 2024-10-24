import { createSlice } from '@reduxjs/toolkit'
import { AUTH_TOKEN } from 'config/authConfig'

const initialState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem(AUTH_TOKEN) ? localStorage.getItem(AUTH_TOKEN) : null,
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticated: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token=localStorage.getItem(AUTH_TOKEN)
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token=action.payload.token
      state.error = null
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
      state.error = action.payload.error
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
      state.error = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { loginSuccess, loginFailure, logout ,authenticated} = authSlice.actions

export default authSlice.reducer
