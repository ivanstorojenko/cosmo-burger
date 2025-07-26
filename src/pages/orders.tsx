import { OrderFeed } from '@/components/order/order-feed/order-feed';
import { ProfileMenu } from '../components/profile-menu/profile-menu';
import { useDispatch, useSelector } from '@/services/store';
import { connect, disconnect } from '@/services/user-order-feed/actions';
import { useEffect } from 'react';
import { getFeed } from '@/services/user-order-feed/slice';

const accessToken = localStorage.getItem('accessToken')?.split(' ')[1];
export const ORDER_FEED_URL = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;

export const OrdersPage = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const feed = useSelector(getFeed);
	const orders = feed?.orders;

	useEffect(() => {
		dispatch(connect(ORDER_FEED_URL));

		return () => {
			dispatch(disconnect());
		};
	}, [dispatch]);

	return (
		<div className='container padding-top-120 profile'>
			<section className='sidebar'>
				<ProfileMenu />
				<p className='text text_type_main-default text_color_inactive'>
					В этом разделе вы можете просмотреть свою историю заказов
				</p>
			</section>
			<OrderFeed showStatus={true} orders={orders} />
		</div>
	);
};
