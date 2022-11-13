import {
  createSlice
} from '@reduxjs/toolkit'

const initialState = {
  info: {},
  value: 0,
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    initAdmin: (state, action) => {
      state.info = action.payload
    },
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
  },
})

export const getAdminInfo = state => state.admin.info;

// Action creators are generated for each case reducer function
export const {
  initAdmin
} = adminSlice.actions

export default adminSlice.reducer
