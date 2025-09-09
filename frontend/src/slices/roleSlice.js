import { createSlice,configureStore } from '@reduxjs/toolkit'

const roleSlice = createSlice({
  name: 'role',
  initialState: {
    value: ''
  },
  reducers: {
    updateRole: (state,action)=> {
      state.value = action.payload
    },
  }
})

export const { updateRole } = roleSlice.actions
export default roleSlice.reducer