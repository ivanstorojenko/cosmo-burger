import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { placeOrder, hideOrderDetails, getOrder } from './actions';
import { TOrder, TOrderInfo } from '@/utils/types';

type TOrderState = {
	placedOrder: TOrder | null;
	requestedOrder: TOrderInfo | null;
	loading: boolean;
	error: string | null;
	showOrderDetails: boolean;
};

const initialState: TOrderState = {
	placedOrder: null,
	requestedOrder: null,
	loading: false,
	error: null,
	showOrderDetails: false,
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {},
	selectors: {
		getOrderInfo: (state: TOrderState) => state.placedOrder,
		getRequestedOrderInfro: (state: TOrderState) => state.requestedOrder,
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
				state.placedOrder = action.payload;
				state.loading = false;
			})
			.addCase(placeOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || action.error.message || 'Unknown error';
			})
			.addCase(hideOrderDetails, (state) => {
				state.showOrderDetails = false;
				state.placedOrder = null;
			})
			.addCase(getOrder.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getOrder.fulfilled, (state, action) => {
				state.requestedOrder = action.payload.orders[0];
				state.loading = false;
			})
			.addCase(getOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || action.error.message || 'Unknown error';
			});
	},
});

export const {
	getOrderInfo,
	getRequestedOrderInfro,
	getOrderLoading,
	getOrderError,
	getShowOrderDetails,
} = orderSlice.selectors;

export type TOrderSlice = {
	[orderSlice.name]: TOrderState;
};
