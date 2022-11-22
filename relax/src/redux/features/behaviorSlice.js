import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'
import request from '../../utils/request'

const initialState = {
  list: [],
  focusUserList: [],
  focusArticleList: [],
  value: 0,
}

const initBehaviorList = async () => {
  return new Promise((resolve, reject) => {
    request('behavior.init').then(res => {
      if (res.success)
        resolve(res.data);
    }).catch(e => {
        console.log('errro',e)
      reject(e)
    })
  })
}

export const fetchBehaviorList = createAsyncThunk('behavior/init', async () => {
  return await initBehaviorList() || [];
})

export const BehaviorSlice = createSlice({
  name: 'behavior',
  initialState,
  reducers: {
    initBehavior: (state, action) => {
      state.list = action.payload
    },
    updateUserBehavior: (state,action) => {
      state.focusUserList = action.payload
    },
    updateArticleBehavior: (state,action) => {
      state.focusArticleList = action.payload
    },
    addBehavior: (state,action) => { 
        const { type,id } = action.payload;
        if(type == 0) { //Edit User Follow
            state.focusUserList.push(id);
        } else if(type == 1) {
            state.focusArticleList.push(id);
        }
    },
    removeBehavior: (state,action) => { 
        const { type,id } = action.payload;
        if(type == 0) { //Edit User Follow
            state.focusUserList = state.focusUserList.filter(item => item !== id);
        } else if(type == 1) {
            state.focusArticleList = state.focusArticleList.filter(item => item !== id);
        }
    }
  },
  extraReducers: {
    [fetchBehaviorList.fulfilled]: (state, action) => {
      console.log(action.payload)
        state.focusArticleList = action.payload.focusArticleList
        state.focusUserList = action.payload.focusUserList
    }
  }
})

export const getBehaviorList = state => {
  return {
    focusUserList: state.behavior.focusUserList,
    focusArticleList: state.behavior.focusArticleList
  }
};
export const isUserFocus = (id) => (state) => {
    return state.behavior.focusUserList.includes(id);
}
export const isArticleFocus = (id) => (state) => {
  return state.behavior.focusArticleList.includes(id);
}

// Action creators are generated for each case reducer function
export const {
  initBehavior,
  addBehavior,
  removeBehavior,
  updateUserBehavior,
  updateArticleBehavior
} = BehaviorSlice.actions

export default BehaviorSlice.reducer
