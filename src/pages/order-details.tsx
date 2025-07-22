import { OrderFeedDetail } from '@/components/order/order-feed/order-feed_detail/order-feed-detail';

export const OrderDetailsPage = (): React.JSX.Element => {
	return (
		<div className='container padding-top-120 profile'>
			<div className='centered'>
				<OrderFeedDetail />
			</div>
		</div>
	);
};
