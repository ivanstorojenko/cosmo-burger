import { ProfileMenu } from '../components/profile-menu/profile-menu';

export const OrdersPage = () => {
	return (
		<div className='container padding-top-120 profile'>
			<section className='sidebar'>
				<ProfileMenu />
				<p className='text text_type_main-default text_color_inactive'>
					В этом разделе вы можете просмотреть свою историю заказов
				</p>
			</section>
			<div></div>
		</div>
	);
};
