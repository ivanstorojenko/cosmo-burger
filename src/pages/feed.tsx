import { OrderFeed } from '@/components/order/order-feed/order-feed';
import { OrderSummary } from '@/components/order/order-summary/order-summary';
import styles from './feed.module.css';
import { useEffect } from 'react';
import { connect, disconnect } from '@/services/general-order-feed/actions';
import { useDispatch, useSelector } from '@/services/store';
import { getError, getFeed } from '@/services/general-order-feed/slice';
import { ErrorPage } from './error';
import { Preloader } from '@/components/preloader/preloader';

export const ORDER_FEED_URL = 'wss://norma.nomoreparties.space/orders/all';

export const FeedPage = () => {
	const dispatch = useDispatch();
	const feed = useSelector(getFeed);
	const orders = feed?.orders;
	const error = useSelector(getError);

	useEffect(() => {
		dispatch(connect(ORDER_FEED_URL));

		return () => {
			dispatch(disconnect());
		};
	}, [dispatch]);

	if (error) {
		return <ErrorPage message={error} />;
	}
	if (!feed) {
		return <Preloader />;
	}

	return (
		<>
			<h1 className={'title text text_type_main-large mt-10 mb-5 pl-5'}>
				Лента заказов
			</h1>
			<main className={'main pl-5 pr-5'}>
				<div className={`${styles.feed} custom-scroll`}>
					<OrderFeed showStatus={false} orders={orders} />
				</div>
				<div className={`${styles.summary} custom-scroll`}>
					<OrderSummary />
				</div>
			</main>
		</>
	);
};
