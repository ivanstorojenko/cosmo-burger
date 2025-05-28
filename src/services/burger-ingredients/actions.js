import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBurgerIngredients } from '../../utils/api';

export const loadIngredients = createAsyncThunk(
	'burgerConstructor/loadIngredients',
	async () => {
		return getBurgerIngredients();
	}
);
