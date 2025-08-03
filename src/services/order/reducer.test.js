import { describe, it, expect } from 'vitest';
import { orderSlice, initialState } from './reducer';
import { placeOrder, hideOrderDetails, getOrder } from './actions';

const mockOrder = {
	name: 'Test order',
	order: {
		number: 12345,
	},
	success: true,
};

const mockOrderInfo = {
	_id: '1',
	ingredients: ['ing1', 'ing2'],
	status: 'done',
	name: 'Test order info',
	createdAt: '2023-01-01',
	updatedAt: '2023-01-01',
	number: 12345,
};

describe('orderSlice reducer', () => {
	describe('initial state', () => {
		it('should return initial state', () => {
			expect(orderSlice.reducer(undefined, { type: 'unknown' })).toEqual(
				initialState
			);
		});
	});

	describe('placeOrder actions', () => {
		it('should handle placeOrder.pending', () => {
			const action = { type: placeOrder.pending.type };
			const state = orderSlice.reducer(initialState, action);

			expect(state).toEqual({
				...initialState,
				loading: true,
				showOrderDetails: true,
				error: null,
			});
		});

		it('should handle placeOrder.fulfilled', () => {
			const action = {
				type: placeOrder.fulfilled.type,
				payload: mockOrder,
			};
			const state = orderSlice.reducer(initialState, action);

			expect(state).toEqual({
				...initialState,
				placedOrder: mockOrder,
				loading: false,
			});
		});

		it('should handle placeOrder.rejected with payload', () => {
			const errorMessage = 'Failed to place order';
			const action = {
				type: placeOrder.rejected.type,
				payload: errorMessage,
			};
			const state = orderSlice.reducer(initialState, action);

			expect(state).toEqual({
				...initialState,
				loading: false,
				error: errorMessage,
			});
		});
	});

	describe('hideOrderDetails action', () => {
		it('should hide order details and clear placed order', () => {
			const stateWithOrder = {
				...initialState,
				placedOrder: mockOrder,
				showOrderDetails: true,
			};

			const action = { type: hideOrderDetails.type };
			const state = orderSlice.reducer(stateWithOrder, action);

			expect(state).toEqual({
				...stateWithOrder,
				showOrderDetails: false,
				placedOrder: null,
			});
		});
	});

	describe('getOrder actions', () => {
		it('should handle getOrder.pending', () => {
			const action = { type: getOrder.pending.type };
			const state = orderSlice.reducer(initialState, action);

			expect(state).toEqual({
				...initialState,
				loading: true,
				error: null,
			});
		});

		it('should handle getOrder.fulfilled', () => {
			const action = {
				type: getOrder.fulfilled.type,
				payload: { orders: [mockOrderInfo] },
			};
			const state = orderSlice.reducer(initialState, action);

			expect(state).toEqual({
				...initialState,
				requestedOrder: mockOrderInfo,
				loading: false,
			});
		});

		it('should handle getOrder.rejected with payload', () => {
			const errorMessage = 'Order not found';
			const action = {
				type: getOrder.rejected.type,
				payload: errorMessage,
			};
			const state = orderSlice.reducer(initialState, action);

			expect(state).toEqual({
				...initialState,
				loading: false,
				error: errorMessage,
			});
		});
	});
});
