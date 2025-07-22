import { getFeed as getGeneralFeed } from '@/services/general-order-feed/slice';
import { useSelector } from '@/services/store';
import { getFeed as getUserFeed } from '@/services/user-order-feed/slice';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useParams } from 'react-router';
import styles from './order-feed-detail.module.css';

export const OrderFeedDetail = (): React.JSX.Element => {
	const { number } = useParams();
	const userFeed = useSelector(getUserFeed);
	const generalFeed = useSelector(getGeneralFeed);

	const order = useMemo(() => {
		if (userFeed && number) {
			const foundOrder = userFeed.orders.find((o) => o.number === +number);
			if (foundOrder) return foundOrder;
		}
		if (generalFeed && number) {
			return generalFeed.orders.find((o) => o.number === +number);
		}
		return null;
	}, [userFeed, generalFeed, number]);
	// если нет - сделать запрос на получение данных

	if (!order) {
		return <div>Заказ не найден</div>;
	}

	let status = 'Неизвестный статус';
	let colorHighlight = '';
	switch (order.status) {
		case 'created':
			status = 'Создан';
			break;
		case 'pending':
			status = 'Готовится';
			break;
		case 'done':
			status = 'Выполнен';
			colorHighlight = 'status_done';
			break;
	}

	return (
		<>
			<span className='text text_type_digits-default'>{order.number}</span>
			<h1 className='text text_type_main-medium'>{order.name}</h1>
			<span
				className={`${styles[colorHighlight]} text text_type_main-default mb-6`}>
				{status}
			</span>
			<h2 className='text text_type_main-medium'>Состав:</h2>
			<ul>
				<li>
					картинка в рамке
					<span className='text text_type_main-default'>название</span>
					<div>
						<span className='text text_type_digits-default'>2 x 410</span>
						<CurrencyIcon type='primary' />
					</div>
				</li>
			</ul>
		</>
	);
};
