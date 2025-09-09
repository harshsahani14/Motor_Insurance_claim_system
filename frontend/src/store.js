import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import roleReducer from './slices/roleSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    role: roleReducer
  }
})

export default store
