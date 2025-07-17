import { OrderFeed } from '@/components/order/order-feed/order-feed';
import { OrderSummary } from '@/components/order/order-summary/order-summary';
import styles from './feed.module.css';

export const FeedPage = () => {
	// обработка ошибок
	// прелоадер
	// создать ws

	return (
		<>
			<h1 className={'title text text_type_main-large mt-10 mb-5 pl-5'}>
				Лента заказов
			</h1>
			<main className={'main pl-5 pr-5'}>
				<div className={`${styles.feed} custom-scroll`}>
					<OrderFeed />
				</div>
				<div className={`${styles.summary} custom-scroll`}>
					<OrderSummary />
				</div>
			</main>
		</>
	);
};
