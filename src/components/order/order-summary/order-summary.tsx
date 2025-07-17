import styles from './order-summary.module.css';

export const OrderSummary = (): React.JSX.Element => {
	return (
		<>
			<div className={`${styles.status_board} mb-15`}>
				<div>
					<h2 className='text text_type_main-medium mb-6'>Готовы:</h2>
					<ul className={`${styles.status_list} ${styles.status_list_ready}`}>
						<li className='text text_type_digits-default'>034533</li>
					</ul>
				</div>

				<div>
					<h2 className='text text_type_main-medium mb-6'>В работе:</h2>
					<ul className={styles.status_list}>
						<li className='text text_type_digits-default'>034533</li>
					</ul>
				</div>
			</div>

			<div className='mb-15'>
				<h2 className='text text_type_main-medium'>Выполнено за все время:</h2>
				<span className='number-shadow text text_type_digits-large'>
					28 752
				</span>
			</div>

			<div>
				<h2 className='text text_type_main-medium'>Выполнено за сегодня:</h2>
				<span className='number-shadow text text_type_digits-large'>138</span>
			</div>
		</>
	);
};
