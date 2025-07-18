import { TFeed, WebsocketStatus } from '@/utils/types';

export type TGeneralFeedStore = {
	status: WebsocketStatus;
	feed: TFeed;
	error: string | null;
};
