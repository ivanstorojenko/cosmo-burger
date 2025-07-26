import { getFeed as getGeneralFeed } from '@/services/general-order-feed/slice';
import { useDispatch, useSelector } from '@/services/store';
import { getFeed as getUserFeed } from '@/services/user-order-feed/slice';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import styles from './order-feed-detail.module.css';
import { getAllIngredientsWithIdKey } from '@/services/burger-ingredients/reducer';
import { OrderIngredientImage } from '../../order-ingredient-image/order-ingredient-image';
import { ErrorPage, NotFoundPage } from '@/pages';
import { getOrder } from '@/services/order/actions';
import {
	getOrderError,
	getOrderLoading,
	getRequestedOrderInfro,
} from '@/services/order/reducer';
import { Preloader } from '@/components/preloader/preloader';

export const OrderFeedDetail = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const { number } = useParams();
	const userFeed = useSelector(getUserFeed);
	const generalFeed = useSelector(getGeneralFeed);
	const orderFromStore = useSelector(getRequestedOrderInfro);
	const orderLoading = useSelector(getOrderLoading);
	const orderError = useSelector(getOrderError);
	const allIngredients = useSelector(getAllIngredientsWithIdKey);

	const orderFromFeeds = useMemo(() => {
		if (userFeed && number) {
			const foundOrder = userFeed.orders.find((o) => o.number === +number);
			if (foundOrder) return foundOrder;
		}
		if (generalFeed && number) {
			return generalFeed.orders.find((o) => o.number === +number);
		}
		return null;
	}, [userFeed, generalFeed, number]);

	// Загрузка заказа, если его нет в feeds
	useEffect(() => {
		if (!orderFromFeeds && number) {
			dispatch(getOrder(number));
		}
	}, [orderFromFeeds, number, dispatch]);

	// Приоритет: orderFromFeeds > orderFromStore
	const order = orderFromFeeds || orderFromStore;

	if (orderLoading && !order) {
		return <Preloader />;
	}

	if (orderError) {
		return <ErrorPage message='Не удалось загрузить заказ' />;
	}

	if (!order) {
		return <NotFoundPage />;
	}

	const countIngredients = order.ingredients.reduce<Record<string, number>>(
		(acc, id) => {
			acc[id] = (acc[id] || 0) + 1;
			return acc;
		},
		{}
	);
	const burgerIngredients = Object.entries(countIngredients).flatMap(
		([id, qty]) => {
			const foundItem = allIngredients.get(id);
			if (!foundItem) return [];

			return foundItem.type === 'bun'
				? [{ ...foundItem, qty: 2 }]
				: [{ ...foundItem, qty }];
		}
	);
	const burgerPrice = burgerIngredients.reduce(
		(acc, ingredient) => acc + ingredient.price * ingredient.qty,
		0
	);

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
		<section className={styles.card}>
			<div className={styles.top}>
				<h1 className='text text_type_main-medium mb-2'>{order.name}</h1>
				<span
					className={`${styles[colorHighlight]} text text_type_main-default`}>
					{status}
				</span>
			</div>
			<h2 className='text text_type_main-medium mb-6'>Состав:</h2>
			<ul className={`${styles.ingredient_list} custom-scroll`}>
				{burgerIngredients.map(
					(item) =>
						item && (
							<li key={item._id} className={styles.ingredient_item}>
								<div className={styles.description}>
									<OrderIngredientImage
										src={item.image_mobile}
										alt={item.name}
									/>
									<span className='text text_type_main-default ml-16'>
										{item.name}
									</span>
								</div>

								<div className={styles.price}>
									<span className='text text_type_digits-default'>
										{item.qty} x {item.price}
									</span>
									<CurrencyIcon type='primary' />
								</div>
							</li>
						)
				)}
			</ul>

			<div className={styles.summary}>
				<span className='text text_type_main-default text_color_inactive'>
					<FormattedDate date={new Date(order.createdAt)} />
				</span>

				<div className={styles.price}>
					<span className='text text_type_digits-default'>{burgerPrice}</span>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</section>
	);
};
