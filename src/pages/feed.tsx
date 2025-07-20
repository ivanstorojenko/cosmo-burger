import { OrderFeed } from '@/components/order/order-feed/order-feed';
import { OrderSummary } from '@/components/order/order-summary/order-summary';
import styles from './feed.module.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { connect, disconnect } from '@/services/general-order-feed/actions';

export const ORDER_FEED_URL = 'wss://norma.nomoreparties.space/orders/all';

export const FeedPage = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(connect(ORDER_FEED_URL));

		return () => {
			dispatch(disconnect());
		};
	}, [dispatch]);

	return (
		<>
			<h1 className={'title text text_type_main-large mt-10 mb-5 pl-5'}>
				Лента заказов
			</h1>
			<main className={'main pl-5 pr-5'}>
				<div className={`${styles.feed} custom-scroll`}>
					<OrderFeed showStatus={false} />
				</div>
				<div className={`${styles.summary} custom-scroll`}>
					<OrderSummary />
				</div>
			</main>
		</>
	);
};
