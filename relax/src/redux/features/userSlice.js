import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import request from '../../utils/request'
import { redirect } from 'react-router-dom'

const initialState = {
    info: {},
}

const initUserInfo = async () => {
  return new Promise((resolve, reject) => {
    request('user.info').then(res => {
      if (res.success)
        resolve(res.data);
    }).catch(e => {
      redirect('/sign')
    })
  })
}

export const fetchUserInfo = createAsyncThunk('user/init', async () => {
  return await initUserInfo() || {};
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initUser: (state,action) => {
        state.info = action.payload
    }
  },
  extraReducers: {
    [fetchUserInfo.fulfilled]: (state, action) => {
        console.log('user',action.payload)
        state.info = action.payload
    }
  }
})

export const getUserInfo = state => state.user.info;

export const { initUser } = userSlice.actions

export default userSlice.reducer