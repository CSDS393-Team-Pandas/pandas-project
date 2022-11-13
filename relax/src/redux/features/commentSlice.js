import {
  createSlice
} from '@reduxjs/toolkit'

const initialState = {
  list: [],
  target: {},
  value: 0,
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    initComment: (state, action) => {
      state.list = action.payload || []
    },
    addComment: (state,action) => {
      state.list.push(action.payload)
    }
  },
})

export const getFormatCommentList = state => {
    // let list = state.comment.list,
    //     idMap = {},res = [];
    // list.forEach(item => {
    //     if(!item.linkCommentId) {
    //       if(!idMap[item._id])
    //         idMap[item._id] = [];
    //     } else {
    //       if(!idMap[item.linkCommentId]) {
    //         idMap[item.linkCommentId] = [];
    //       } else {
    //         idMap[item.linkCommentId].push(item);
    //       }
    //     }
    // })
    // res = list.map(item => {
    //   console.log('true',idMap[item._id])
    //   if(idMap[item._id]) {
    //     return { ...item,children: idMap[item._id] }
    //   } 
    //   return false
    // })
    return state.comment.list;
}

export const getCommentList = state => state.comment.list;

export const {
  initComment,
  addComment
} = commentSlice.actions

export default commentSlice.reducer
