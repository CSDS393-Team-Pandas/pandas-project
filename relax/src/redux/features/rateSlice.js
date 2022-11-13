import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'

const initialState = {
  list: [],
  value: 0,
}

export const rateSlice = createSlice({
  name: 'rate',
  initialState,
  reducers: {
    initRate: (state,action) => {
        state.list = action.payload;
    },
    updateRate: (state,action) => {
        const { userId,rate } = action.payload;
        const index = state.list.findIndex(item => {
            if(item.userId == userId) {
                item.rate = rate;
                return true
            }
            return false;
        })

        if(index == -1) {
            state.list.push(action.payload)
        }
    },
    increment: (state) => {
      state.value += 1
    },
  },
})

export const getGameRate = state => {
    const l = state.rate.list.length;
    if(!l) {
        return 5
    }   
    const sum = state.rate.list.reduce((cur,item) => {
        return cur += item.rate;
    },0)
    return sum / l;
}

export const getUserRateCent = (userId) => state => {
    let cent = -1;
    state.rate.list.forEach(item => {
        if(item.userId == userId) {
            cent = item.rate;
        }
    })
    return cent;
}

export const getRateNumber = state => state.rate.list.length;

export const {initRate,updateRate} = rateSlice.actions

export default rateSlice.reducer
