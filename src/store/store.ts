import { combineReducers, configureStore } from '@reduxjs/toolkit'
import  authSlice  from './auth-store';
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import thunk from 'redux-thunk';
import addFoodSlice from './food-store';
import fetchCategorySlice from './fetch-category-store';
import  fetchFoodSlice  from './fetch-food-store';

const reducers = combineReducers({
  authSlice,
  addFoodSlice,
  fetchCategorySlice,
  fetchFoodSlice
});

const persistConfig = {
  key:"root",
  storage,
  whitelist: ["authSlice"]
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,

  middleware:[thunk]
})

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch