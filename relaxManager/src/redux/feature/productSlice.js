import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'
import request from '../../utils/request';

const initialState = {
  list: [],
  value: 0,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    initProduct: (state, action) => {
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

export const getProductList = state => state.product.list;

// Action creators are generated for each case reducer function
export const {
    initProduct
} = productSlice.actions

export default productSlice.reducer
