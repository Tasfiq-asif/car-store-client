import { configureStore } from '@reduxjs/toolkit'
import { carSlice } from './features/car/carSlice'
import { carApi } from './api/carApi'

// ...

export const store = configureStore({
  reducer: {
  car : carSlice.reducer,
  [carApi.reducerPath]: carApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>{
    return getDefaultMiddleware().concat(carApi.middleware)
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch