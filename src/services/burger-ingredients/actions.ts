import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { getBurgerIngredients, TIngredientsRes } from '../../utils/api';
import { TIngredient } from '@/utils/types';

type TActiveTab = TIngredient['type'];

type TApiError = {
	message: string;
};

export const loadIngredients = createAsyncThunk<
	TIngredientsRes,
	void,
	{
		rejectValue: TApiError;
	}
>('burgerIngredients/loadIngredients', async (_, { rejectWithValue }) => {
	try {
		const response = await getBurgerIngredients();

		if (!response) {
			return rejectWithValue({ message: 'Не удалось загрузить ингредиенты' });
		}

		if (!response.success) {
			return rejectWithValue({ message: 'Ошибка в ответе сервера' });
		}

		return response;
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue({ message: error.message });
		}
		return rejectWithValue({
			message: 'Неизвестная ошибка при загрузке ингредиентов',
		});
	}
});

export const setActiveTab = createAction<TActiveTab>(
	'burgerIngredients/setActiveTab'
);
