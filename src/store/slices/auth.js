import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
  },
  reducers: {
    signIn(state, action) {
      const { token, email } = action.payload;
      state.token = token;
      state.email = email;
    },
    signOut(state) {
      state = null;
    },
    saveUserDetails(state, action) {
      state.userDetails = action.payload
    }
  },
})

const { reducer } = authSlice
// Extract and export each action creator by name
export const { signIn, signOut, saveUserDetails } = authSlice.actions
// Export the reducer, either as a default or named export
export default reducer



