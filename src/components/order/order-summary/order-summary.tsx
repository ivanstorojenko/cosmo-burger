import { useSelector } from '@/services/store';
import styles from './order-summary.module.css';
import { getFeed } from '@/services/general-order-feed/slice';

export const OrderSummary = (): React.JSX.Element => {
	const feed = useSelector(getFeed);
	const readyOrders = feed?.orders
		.filter((order) => order.status === 'done')
		.slice(0, 13);
	const coockingOrders = feed?.orders
		.filter((order) => order.status === 'pending')
		.slice(0, 13);

	return (
		<>
			<div className={`${styles.status_board} mb-15`}>
				<div>
					<h2 className='text text_type_main-medium mb-6'>Готовы:</h2>
					<ul className={`${styles.status_list} ${styles.status_list_ready}`}>
						{readyOrders?.map((order) => (
							<li
								key={order.number}
								className={`${styles.status_item} text text_type_digits-default`}>
								{order.number}
							</li>
						))}
					</ul>
				</div>

				<div>
					<h2 className='text text_type_main-medium mb-6'>В работе:</h2>
					<ul className={styles.status_list}>
						{coockingOrders?.map((order) => (
							<li
								key={order.number}
								className={`${styles.status_item} text text_type_digits-default`}>
								{order.number}
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className='mb-15'>
				<h2 className='text text_type_main-medium'>Выполнено за все время:</h2>
				<span className='number-shadow text text_type_digits-large'>
					{feed?.total}
				</span>
			</div>

			<div>
				<h2 className='text text_type_main-medium'>Выполнено за сегодня:</h2>
				<span className='number-shadow text text_type_digits-large'>
					{feed?.totalToday}
				</span>
			</div>
		</>
	);
};
