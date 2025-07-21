import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrder } from '../../utils/api';
import { TOrder } from '@/utils/types';

type TPlaceOrderArgs = Array<string>;

export const placeOrder = createAsyncThunk<
	TOrder,
	TPlaceOrderArgs,
	{ rejectValue: string }
>('order/placeOrder', async (ingredients, { rejectWithValue }) => {
	try {
		const response = await createOrder(ingredients);
		if (!response) {
			throw new Error('Не удалось создать заказ');
		}
		return response;
	} catch (error) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue('Unknown error occurred');
	}
});

export const hideOrderDetails = createAction('order/hideOrderDetails');
