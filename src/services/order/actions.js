import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrder } from '../../utils/api';

export const placeOrder = createAsyncThunk(
	'order/placeOrder',
	async (ingredients) => {
		return createOrder(ingredients);
	}
);
export const hideOrderDetails = createAction('order/hideOrderDetails');
