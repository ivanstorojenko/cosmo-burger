import { useSelector } from '@/services/store';
import { OrderFeedCard } from './order-feed-card/order-feed-card';
import styles from './order-feed.module.css';
import { getFeed } from '@/services/general-order-feed/slice';

type TOrderFeedProps = {
	showStatus: boolean;
};

export const OrderFeed = ({
	showStatus,
}: TOrderFeedProps): React.JSX.Element => {
	const feed = useSelector(getFeed);
	const orders = feed?.orders;

	return (
		<ul className={`${styles.card_list} custom-scroll`}>
			{orders?.map((order) => (
				<OrderFeedCard key={order._id} showStatus={showStatus} order={order} />
			))}
		</ul>
	);
};
