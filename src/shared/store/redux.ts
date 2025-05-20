import {  asyncThunkCreator, buildCreateSlice, createAsyncThunk, ThunkAction, UnknownAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { extraArgument } from './extra-argument';
import type { store } from './store';



export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<R = void> = ThunkAction<R, AppState, typeof extraArgument,  UnknownAction>

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppState;
    dispatch: AppDispatch;
    extra: typeof extraArgument;
}>();

export const createSlice = buildCreateSlice({
    creators: {asyncThunk: asyncThunkCreator}  // изначально createSlice не имеет доступа к asyncThunkCreator
})