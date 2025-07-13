import { OrderFeed } from '@/components/order/order-feed/order-feed';
import { ProfileMenu } from '../components/profile-menu/profile-menu';

export const OrdersPage = (): React.JSX.Element => {
	return (
		<div className='container padding-top-120 profile'>
			<section className='sidebar'>
				<ProfileMenu />
				<p className='text text_type_main-default text_color_inactive'>
					В этом разделе вы можете просмотреть свою историю заказов
				</p>
			</section>
			<OrderFeed />
		</div>
	);
};
