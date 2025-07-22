import { TFeed, WebsocketStatus } from '@/utils/types';
import { onClose, onConnecting, onError, onMessage, onOpen } from './actions';
import { createSelector, createSlice } from '@reduxjs/toolkit';

export type TGeneralFeedState = {
	status: WebsocketStatus;
	feed: TFeed;
	error: string | null;
};

const initialState: TGeneralFeedState = {
	status: WebsocketStatus.OFFLINE,
	feed: null,
	error: null,
};

export const generalFeedSlice = createSlice({
	name: 'generalFeed',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(onConnecting, (state) => {
				state.status = WebsocketStatus.CONNECTING;
				state.error = null;
			})
			.addCase(onOpen, (state) => {
				state.status = WebsocketStatus.ONLINE;
			})
			.addCase(onClose, (state) => {
				state.status = WebsocketStatus.OFFLINE;
			})
			.addCase(onError, (state, action) => {
				state.error = action.payload;
			})
			.addCase(onMessage, (state, action) => {
				state.feed = action.payload;
			});
	},
	selectors: {
		getStatus: (state: TGeneralFeedState) => state.status,
		getFeed: createSelector(
			[(state: TGeneralFeedState) => state.feed],
			(feed) => {
				if (!feed) return null;

				// Важно: создаем новый массив только если orders действительно изменился
				const sortedOrders = [...feed.orders].sort(
					(a, b) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);

				return {
					...feed,
					orders: sortedOrders,
				};
			}
		),
		getError: (state: TGeneralFeedState) => state.error,
	},
});

export const { getStatus, getFeed, getError } = generalFeedSlice.selectors;
export type TGeneralFeedSlice = {
	[generalFeedSlice.name]: TGeneralFeedState;
};
