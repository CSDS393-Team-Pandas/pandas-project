import { configureStore } from '@reduxjs/toolkit'
import adminSlice from './feature/adminSlice'

const store = configureStore({
  reducer: {
    admin: adminSlice,
  },
})

export default store;