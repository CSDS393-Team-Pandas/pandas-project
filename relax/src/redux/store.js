import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/userSlice'
import commentSlice from './features/commentSlice'
import rateSlice from './features/rateSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
    comment: commentSlice,
    rate: rateSlice
  },
})

export default store;