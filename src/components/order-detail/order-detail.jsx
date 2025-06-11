import styles from './order-detail.module.css';
import doneIcon from './done.png';
import { useSelector } from 'react-redux';
import {
	getOrderError,
	getOrderInfo,
	getOrderLoading,
} from '../../services/order/reducer';

export const OrderDetail = () => {
	const orderError = useSelector(getOrderError);
	const orderInfo = useSelector(getOrderInfo);
	const orderLoading = useSelector(getOrderLoading);

	return (
		<div className={styles.content}>
			{orderError ? (
				<p className='text text_type_main-medium mb-15'>
					При отправке заказа возникла ошибка
				</p>
			) : orderLoading ? (
				<p className='text text_type_main-medium mb-15'>Создаем заказ...</p>
			) : (
				<>
					<h3 className={`${styles.number} text text_type_digits-large mb-8`}>
						{orderInfo.order.number}
					</h3>
					<span className='text text_type_main-medium mb-15'>
						идентификатор заказа
					</span>
					<img
						className={styles.image}
						src={doneIcon}
						alt='Галочка'
						width='120'
						height='120'
					/>
					<div className='description mt-15'>
						<p className='text text_type_main-small mb-2'>
							Ваш заказ начали готовить
						</p>
						<p className='text text_type_main-default text_color_inactive'>
							Дождитесь готовности на орбитальной станции
						</p>
					</div>
				</>
			)}
		</div>
	);
};
