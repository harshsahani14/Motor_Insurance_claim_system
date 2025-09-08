import { createSlice,configureStore } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: null
  },
  reducers: {
    update: (state,action)=> {
      state.value = action.payload
    },
  }
})

export const { update } = userSlice.actions
export default userSlice.reducer
