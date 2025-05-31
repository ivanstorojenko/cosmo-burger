import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { getBurgerIngredients } from '../../utils/api';

export const loadIngredients = createAsyncThunk(
	'burgerIngredients/loadIngredients',
	async () => {
		return getBurgerIngredients();
	}
);

export const setActiveTab = createAction('burgerIngredients/setActiveTab');
