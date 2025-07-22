import { TFeed, WebsocketStatus } from '@/utils/types';
import { onClose, onConnecting, onError, onMessage, onOpen } from './actions';
import { createSelector, createSlice } from '@reduxjs/toolkit';

export type TUserFeedState = {
	status: WebsocketStatus;
	feed: TFeed;
	error: string | null;
};

const initialState: TUserFeedState = {
	status: WebsocketStatus.OFFLINE,
	feed: null,
	error: null,
};

export const UserFeedSlice = createSlice({
	name: 'userFeed',
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
				if (action.payload?.success === true) {
					state.feed = action.payload;
				} else if (action.payload?.error) {
					state.error = action.payload.error;
				}
			});
	},
	selectors: {
		getStatus: (state: TUserFeedState) => state.status,
		getFeed: createSelector([(state: TUserFeedState) => state.feed], (feed) => {
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
		}),
		getError: (state: TUserFeedState) => state.error,
	},
});

export const { getStatus, getFeed, getError } = UserFeedSlice.selectors;
export type TUserFeedSlice = {
	[UserFeedSlice.name]: TUserFeedState;
};
