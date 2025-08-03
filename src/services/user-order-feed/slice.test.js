import { describe, expect, it } from 'vitest';
import { WebsocketStatus } from '@/utils/types';
import { UserFeedSlice, initialState } from './slice';
import { onClose, onConnecting, onError, onMessage, onOpen } from './actions';

describe('UserFeedSlice', () => {
	it('should return the initial state', () => {
		expect(UserFeedSlice.reducer(undefined, { type: '' })).toEqual(
			initialState
		);
	});

	it('should return WebsocketStatus.CONNECTING and error == null after onConnecting action', () => {
		expect(UserFeedSlice.reducer(undefined, { type: onConnecting })).toEqual({
			...initialState,
			status: WebsocketStatus.CONNECTING,
		});
	});

	it('should return WebsocketStatus.ONLINE and error == null after onOpen action', () => {
		expect(UserFeedSlice.reducer(undefined, { type: onOpen })).toEqual({
			...initialState,
			status: WebsocketStatus.ONLINE,
		});
	});

	it('should return WebsocketStatus.OFFLINE and error == null after onClose action', () => {
		expect(UserFeedSlice.reducer(undefined, { type: onClose })).toEqual({
			...initialState,
			status: WebsocketStatus.OFFLINE,
		});
	});

	it('should return error after onError action', () => {
		const error = 'Unknown error occurred';
		expect(
			UserFeedSlice.reducer(undefined, {
				type: onError,
				payload: error,
			})
		).toEqual({
			...initialState,
			error: error,
		});
	});

	it('should return state with feed after onMessage action', () => {
		const feed = {
			success: true,
			orders: [
				{
					_id: '688c5ce3d5ca30001cffcd8b',
					ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093e'],
					status: 'done',
					name: 'Краторный люминесцентный метеоритный бургер',
					createdAt: '2025-08-01T06:21:23.089Z',
					updatedAt: '2025-08-01T06:21:23.880Z',
					number: 85527,
				},
			],
			total: 85153,
			totalToday: 97,
		};

		expect(
			UserFeedSlice.reducer(undefined, {
				type: onMessage,
				payload: feed,
			})
		).toEqual({
			...initialState,
			feed: feed,
		});
	});
});
