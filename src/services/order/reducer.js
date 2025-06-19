import { createSlice } from '@reduxjs/toolkit';
import { placeOrder, hideOrderDetails } from './actions';

const initialState = {
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
		getOrderInfo: (state) => state.order,
		getOrderLoading: (state) => state.loading,
		getOrderError: (state) => state.error,
		getShowOrderDetails: (state) => state.showOrderDetails,
	},
	extraReducers: (builder) => {
		builder
			.addCase(placeOrder.pending, (state) => {
				state.loading = true;
				state.showOrderDetails = true;
				state.error = null;
			})
			.addCase(placeOrder.fulfilled, (state, action) => {
				state.order = action.payload;
				state.loading = false;
			})
			.addCase(placeOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
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
