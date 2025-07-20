import { TFeed } from '@/utils/types';
import { createAction } from '@reduxjs/toolkit';

export const connect = createAction<string, 'generalFeed/connect'>(
	'generalFeed/connect'
);
export const disconnect = createAction('generalFeed/disconnect');
export const onConnecting = createAction('generalFeed/onConnecting');
export const onOpen = createAction('generalFeed/onOpen');
export const onClose = createAction('generalFeed/onClose');
export const onError = createAction<string, 'generalFeed/onError'>(
	'generalFeed/onError'
);
export const onMessage = createAction<TFeed, 'generalFeed/onMessage'>(
	'generalFeed/onMessage'
);

export type generalFeedActionTypes =
	| ReturnType<typeof connect>
	| ReturnType<typeof disconnect>
	| ReturnType<typeof onConnecting>
	| ReturnType<typeof onOpen>
	| ReturnType<typeof onClose>
	| ReturnType<typeof onError>
	| ReturnType<typeof onMessage>;
