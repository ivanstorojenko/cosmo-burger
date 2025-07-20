import { TFeed, WebsocketStatus } from '@/utils/types';
import { onClose, onConnecting, onError, onMessage, onOpen } from './actions';
import { createSlice } from '@reduxjs/toolkit';

// если статус будет не нужен - удалить

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
		getFeed: (state: TGeneralFeedState) => state.feed,
		getError: (state: TGeneralFeedState) => state.error,
	},
});

export const { getStatus, getFeed, getError } = generalFeedSlice.selectors;
export type TGeneralFeedSlice = {
	[generalFeedSlice.name]: TGeneralFeedState;
};
