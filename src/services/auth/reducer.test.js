import { describe, expect, it } from 'vitest';
import { login, logout, registration } from './actions';
import { authSlice, initialState, setIsAuthChecked, setUser } from './reducer';

const pendingState = {
	...initialState,
	loading: true,
	error: null,
};

const mockUser = {
	email: 'ivan@mail.com',
	name: 'Ivan',
};

const mockAuthResponse = {
	success: true,
	accessToken: 'aaa',
	refreshToken: 'bbb',
	user: mockUser,
};

describe('authSlice state', () => {
	it('should return the initial state', () => {
		expect(authSlice.reducer(undefined, { type: '' })).toEqual(initialState);
	});
});

describe('registration reducer', () => {
	it('should return state with loading == true and error == null after registration pending action', () => {
		const payload = {
			...mockUser,
			password: '123456',
		};

		expect(
			authSlice.reducer(undefined, {
				type: registration.pending,
				payload: payload,
			})
		).toEqual(pendingState);
	});

	it('should return state with user object after registration fulfilled action', () => {
		expect(
			authSlice.reducer(undefined, {
				type: registration.fulfilled,
				payload: mockAuthResponse,
			})
		).toEqual({
			...initialState,
			user: mockAuthResponse.user,
		});
	});

	it('should return state with error and loading == false after registration rejected action', () => {
		const error = 'Unknown error occurred';

		expect(
			authSlice.reducer(undefined, {
				type: registration.rejected,
				payload: error,
			})
		).toEqual({
			...initialState,
			error: error,
			loading: false,
		});
	});
});

describe('login reducer', () => {
	it('should return state with loading == true and error == null after login pending action', () => {
		const payload = {
			email: 'ivan@mail.com',
			password: '123456',
		};

		expect(
			authSlice.reducer(undefined, { type: login.pending, payload: payload })
		).toEqual(pendingState);
	});

	it('should return state with user object after login fulfilled action', () => {
		expect(
			authSlice.reducer(undefined, {
				type: login.fulfilled,
				payload: mockAuthResponse,
			})
		).toEqual({
			...initialState,
			user: mockAuthResponse.user,
		});
	});

	it('should return state with error and loading == false after login rejected action', () => {
		const error = 'Unknown error occurred';

		expect(
			authSlice.reducer(undefined, { type: login.rejected, payload: error })
		).toEqual({
			...initialState,
			error: error,
			loading: false,
		});
	});
});

describe('logout reducer', () => {
	it('should return state with loading == true and error == null after logout pending action', () => {
		expect(authSlice.reducer(undefined, { type: logout.pending })).toEqual(
			pendingState
		);
	});

	it('should return state with user == null and loading == false after logout fulfilled action', () => {
		expect(authSlice.reducer(undefined, { type: logout.fulfilled })).toEqual({
			...initialState,
			user: null,
			loading: false,
		});
	});

	it('should return state with user == null and loading == false and error after logout rejected action', () => {
		const error = 'Unknown error occurred';

		expect(
			authSlice.reducer(undefined, { type: logout.rejected, payload: error })
		).toEqual({
			...initialState,
			user: null,
			loading: false,
			error: error,
		});
	});
});

describe('setUser reducer', () => {
	it('should return state with user object after setUser action', () => {
		expect(
			authSlice.reducer(undefined, { type: setUser, payload: mockAuthResponse })
		).toEqual({
			...initialState,
			user: mockAuthResponse.user,
		});
	});

	it('should return state with user == null after setUser action', () => {
		expect(
			authSlice.reducer(undefined, {
				type: setUser,
				payload: { success: false },
			})
		).toEqual({
			...initialState,
			user: null,
		});
	});
});

describe('setIsAuthChecked reducer', () => {
	it('should return state with user object after setUser action', () => {
		expect(
			authSlice.reducer(undefined, { type: setIsAuthChecked, payload: true })
		).toEqual({
			...initialState,
			isAuthChecked: true,
		});
	});
});
