import { describe, expect, it } from 'vitest';
import { loadIngredients, setActiveTab } from './actions';
import { burgerIngredientsSlice, initialState } from './reducer';

const pendingStatePart = {
	loading: true,
	error: null,
};

const mockIngredient1 = {
	_id: '1',
	uid: 'uid1',
	name: 'Ingredient 1',
	price: 100,
	type: 'main',
};

const mockIngredient2 = {
	_id: '2',
	uid: 'uid2',
	name: 'Ingredient 2',
	price: 200,
	type: 'sauce',
};

const mockIngredients = {
	data: [mockIngredient1, mockIngredient2],
};

it('should return the initial state', () => {
	expect(burgerIngredientsSlice.reducer(undefined, { type: '' })).toEqual(
		initialState
	);
});

describe('loadIngredients reducer', () => {
	it('should return pending state after pending action', () => {
		expect(
			burgerIngredientsSlice.reducer(undefined, {
				type: loadIngredients.pending,
			})
		).toEqual({
			...initialState,
			...pendingStatePart,
		});
	});

	it('should return state with ingredients after fulfilled action', () => {
		expect(
			burgerIngredientsSlice.reducer(undefined, {
				type: loadIngredients.fulfilled,
				payload: mockIngredients,
			})
		).toEqual({
			...initialState,
			ingredients: [...mockIngredients.data],
			loading: false,
		});
	});

	it('should return state with error after rejected action', () => {
		const error = { message: 'Unknown error occurred' };
		expect(
			burgerIngredientsSlice.reducer(undefined, {
				type: loadIngredients.rejected,
				payload: error,
			})
		).toEqual({
			...initialState,
			loading: false,
			error: error.message,
		});
	});
});

it('should return state with new activeTab after setActiveTab action', () => {
	const newActiveTab = 'sauce';
	expect(
		burgerIngredientsSlice.reducer(undefined, {
			type: setActiveTab,
			payload: newActiveTab,
		})
	).toEqual({
		...initialState,
		activeTab: newActiveTab,
	});
});
