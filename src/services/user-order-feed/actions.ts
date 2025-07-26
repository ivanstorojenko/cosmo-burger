import { TFeed } from '@/utils/types';
import { createAction } from '@reduxjs/toolkit';

export const connect = createAction<string, 'userFeed/connect'>(
	'userFeed/connect'
);
export const disconnect = createAction('userFeed/disconnect');
export const onConnecting = createAction('userFeed/onConnecting');
export const onOpen = createAction('userFeed/onOpen');
export const onClose = createAction('userFeed/onClose');
export const onError = createAction<string, 'userFeed/onError'>(
	'userFeed/onError'
);
export const onMessage = createAction<TFeed, 'userFeed/onMessage'>(
	'userFeed/onMessage'
);

export type userFeedActionTypes =
	| ReturnType<typeof connect>
	| ReturnType<typeof disconnect>
	| ReturnType<typeof onConnecting>
	| ReturnType<typeof onOpen>
	| ReturnType<typeof onClose>
	| ReturnType<typeof onError>
	| ReturnType<typeof onMessage>;
