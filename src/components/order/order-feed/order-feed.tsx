import { OrderFeedCard } from './order-feed-card/order-feed-card';
import styles from './order-feed.module.css';

export const OrderFeed = (): React.JSX.Element => {
	// определить где показывается компонент
	// общая лента или персональная (статус только на персональной)

	return (
		<ul className={`${styles.card_list} custom-scroll`}>
			<OrderFeedCard />
			<OrderFeedCard />
			<OrderFeedCard />
			<OrderFeedCard />
			<OrderFeedCard />
			<OrderFeedCard />
		</ul>
	);
};
