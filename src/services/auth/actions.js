import { createAsyncThunk } from '@reduxjs/toolkit';
import { register, getUserInfo, authorize } from '../../utils/api';

export const registration = createAsyncThunk('auth/registration', register);
export const checkAuth = createAsyncThunk('auth/checkAuth', getUserInfo);
export const login = createAsyncThunk('auth/login', authorize);
