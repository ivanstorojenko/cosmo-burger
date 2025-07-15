import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { placeOrder, hideOrderDetails } from './actions';
import { TOrder } from '@/utils/types';

type TOrderState = {
	order: TOrder | null;
	loading: boolean;
	error: string | null;
	showOrderDetails: boolean;
};

const initialState: TOrderState = {
	order: null,
	loading: false,
	error: null,
	showOrderDetails: false,
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {},
	selectors: {
		getOrderInfo: (state: TOrderState) => state.order,
		getOrderLoading: (state: TOrderState) => state.loading,
		getOrderError: (state: TOrderState) => state.error,
		getShowOrderDetails: (state: TOrderState) => state.showOrderDetails,
	},
	extraReducers: (builder) => {
		builder
			.addCase(placeOrder.pending, (state) => {
				state.loading = true;
				state.showOrderDetails = true;
				state.error = null;
			})
			.addCase(placeOrder.fulfilled, (state, action: PayloadAction<TOrder>) => {
				state.order = action.payload;
				state.loading = false;
			})
			.addCase(placeOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || action.error.message || 'Unknown error';
			})
			.addCase(hideOrderDetails, (state) => {
				state.showOrderDetails = false;
				state.order = null;
			});
	},
});

export const {
	getOrderInfo,
	getOrderLoading,
	getOrderError,
	getShowOrderDetails,
} = orderSlice.selectors;

export type TOrderSlice = {
	[orderSlice.name]: TOrderState;
};
