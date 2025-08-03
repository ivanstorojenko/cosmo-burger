import { describe, expect, it } from 'vitest';
import { constructorSlice, initialState } from './reducer';
import { addIngredient, deleteIngredient, moveIngredient } from './actions';
import { placeOrder } from '../order/actions';

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

const mockIngredient3 = {
	_id: '3',
	uid: 'uid3',
	name: 'Ingredient 3',
	price: 300,
	type: 'main',
};

describe('constructorSlice state', () => {
	it('should return the initial state', () => {
		expect(constructorSlice.reducer(undefined, { type: '' })).toEqual(
			initialState
		);
	});
});

describe('addIngredient reducer', () => {
	it('should return state with added not bun ingredient after addIngredient action', () => {
		expect(
			constructorSlice.reducer(undefined, {
				type: addIngredient,
				payload: mockIngredient1,
			})
		).toEqual({
			...initialState,
			constructorIngredients: {
				...initialState.constructorIngredients,
				ingredients: [
					...initialState.constructorIngredients.ingredients,
					{ ...mockIngredient1 },
				],
			},
		});
	});

	it('should return state with added bun ingredient after addIngredient action', () => {
		const bun = {
			...mockIngredient1,
			type: 'bun',
		};
		expect(
			constructorSlice.reducer(undefined, { type: addIngredient, payload: bun })
		).toEqual({
			...initialState,
			constructorIngredients: {
				...initialState.constructorIngredients,
				bun: bun,
			},
		});
	});
});

describe('deleteIngredient reducer', () => {
	it('should remove ingredient with matching uid', () => {
		const stateWithIngredients = {
			constructorIngredients: {
				bun: null,
				ingredients: [mockIngredient1, mockIngredient2],
			},
		};

		const action = {
			type: deleteIngredient.type,
			payload: 'uid1',
		};

		const result = constructorSlice.reducer(stateWithIngredients, action);

		expect(result.constructorIngredients.ingredients).toEqual([
			mockIngredient2,
		]);
		expect(result.constructorIngredients.ingredients).toHaveLength(1);
		expect(result.constructorIngredients.bun).toBeNull();
	});

	it('should not modify state if uid not found', () => {
		const stateWithIngredients = {
			constructorIngredients: {
				bun: null,
				ingredients: [mockIngredient1],
			},
		};

		const action = {
			type: deleteIngredient.type,
			payload: 'non-existing-uid',
		};

		const result = constructorSlice.reducer(stateWithIngredients, action);

		expect(result).toEqual(stateWithIngredients);
	});

	it('should handle empty ingredients array', () => {
		const action = {
			type: deleteIngredient.type,
			payload: 'uid1',
		};

		const result = constructorSlice.reducer(initialState, action);

		expect(result).toEqual(initialState);
	});

	it('should not modify bun', () => {
		const stateWithBun = {
			constructorIngredients: {
				bun: {
					_id: 'bun1',
					uid: 'bun-uid',
					name: 'Bun',
					price: 300,
					type: 'bun',
				},
				ingredients: [mockIngredient1],
			},
		};

		const action = {
			type: deleteIngredient.type,
			payload: 'uid1',
		};

		const result = constructorSlice.reducer(stateWithBun, action);

		expect(result.constructorIngredients.bun).toEqual(
			stateWithBun.constructorIngredients.bun
		);
		expect(result.constructorIngredients.ingredients).toHaveLength(0);
	});
});

describe('moveIngredient reducer', () => {
	it('should move ingredient from dragIndex to hoverIndex', () => {
		const stateWithIngredients = {
			constructorIngredients: {
				bun: null,
				ingredients: [mockIngredient1, mockIngredient2, mockIngredient3],
			},
		};

		const action = {
			type: moveIngredient.type,
			payload: {
				dragIndex: 0, // first element
				hoverIndex: 2, // move to place after third element
			},
		};

		const result = constructorSlice.reducer(stateWithIngredients, action);

		expect(result.constructorIngredients.ingredients).toEqual([
			mockIngredient2,
			mockIngredient3,
			mockIngredient1,
		]);
	});

	it('should handle moving ingredient to the same position', () => {
		const stateWithIngredients = {
			constructorIngredients: {
				bun: null,
				ingredients: [mockIngredient1, mockIngredient2, mockIngredient3],
			},
		};

		const action = {
			type: moveIngredient.type,
			payload: {
				dragIndex: 0, // first element
				hoverIndex: 0, // the same position
			},
		};

		const result = constructorSlice.reducer(stateWithIngredients, action);

		expect(result).toEqual(stateWithIngredients);
	});
});

describe('placeOrder reducer', () => {
	it('should reset state after placeOrder fulfilled', () => {
		expect(
			constructorSlice.reducer(undefined, { type: placeOrder.fulfilled })
		).toEqual(initialState);
	});
});
