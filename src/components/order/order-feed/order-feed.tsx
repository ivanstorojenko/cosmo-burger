import { OrderFeedCard } from './order-feed-card/order-feed-card';
import styles from './order-feed.module.css';
import { TFeedOrder } from '@/utils/types';

type TOrderFeedProps = {
	showStatus: boolean;
	orders: TFeedOrder[] | undefined;
};

export const OrderFeed = ({
	showStatus,
	orders,
}: TOrderFeedProps): React.JSX.Element => {
	// const sortedOrders = orders && [...orders].sort((a, b) =>
	// 	new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
	// );

	return (
		<ul className={`${styles.card_list} custom-scroll`}>
			{orders?.map((order) => (
				<OrderFeedCard key={order._id} showStatus={showStatus} order={order} />
			))}
		</ul>
	);
};
