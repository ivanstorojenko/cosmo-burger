import { createAsyncThunk } from '@reduxjs/toolkit';
import { register } from '../../utils/api';

export const registration = createAsyncThunk('auth/registration', register);
