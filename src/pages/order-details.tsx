import { OrderFeedDetail } from '@/components/order/order-feed/order-feed_detail/order-feed-detail';
import { useParams } from 'react-router';

export const OrderDetailsPage = (): React.JSX.Element => {
	const { number } = useParams();

	return (
		<div className='container padding-top-120'>
			<div className='centered'>
				<h1 className='text text_type_digits-default mb-10'>#{number}</h1>
				<OrderFeedDetail />
			</div>
		</div>
	);
};
