import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { getBurgerIngredients } from '../../utils/api';

export const loadIngredients = createAsyncThunk(
	'burgerIngredients/loadIngredients',
	getBurgerIngredients
);

export const setActiveTab = createAction('burgerIngredients/setActiveTab');
