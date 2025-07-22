import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router';
import styles from './order-feed-card.module.css';
import { getAllIngredients } from '@/services/burger-ingredients/reducer';
import { TFeedOrder, TIngredient } from '@/utils/types';
import { useSelector } from '@/services/store';
import { OrderIngredientImage } from '../../order-ingredient-image/order-ingredient-image';

type TOrderFeedCardProps = {
	showStatus: boolean;
	order: TFeedOrder;
};

function isTFeedOrder(order: unknown): order is TFeedOrder {
	return (
		typeof order === 'object' &&
		order !== null &&
		'_id' in order &&
		'number' in order &&
		'ingredients' in order &&
		'createdAt' in order &&
		'name' in order &&
		'status' in order &&
		typeof (order as TFeedOrder)._id === 'string' &&
		typeof (order as TFeedOrder).number === 'number' &&
		Array.isArray((order as TFeedOrder).ingredients) &&
		typeof (order as TFeedOrder).createdAt === 'string' &&
		typeof (order as TFeedOrder).name === 'string' &&
		typeof (order as TFeedOrder).status === 'string'
	);
}

export const OrderFeedCard = ({
	showStatus,
	order,
}: TOrderFeedCardProps): React.JSX.Element | null => {
	const location = useLocation();
	const allIngredients = useSelector(getAllIngredients);
	const burgerIngredients = allIngredients.filter((item) =>
		order.ingredients.includes(item._id)
	);
	let shownIngredients: null | TIngredient[] = null;
	let countUnshown = 0;

	if (
		!isTFeedOrder(order) ||
		burgerIngredients.length < order.ingredients.length
	) {
		return null;
	}

	if (burgerIngredients.length > 5) {
		shownIngredients = burgerIngredients.slice(0, 6);
		countUnshown = burgerIngredients.length - shownIngredients.length + 1;
	} else {
		shownIngredients = burgerIngredients;
	}

	const orderPrice = burgerIngredients.reduce(function (acc, ingredient) {
		if (ingredient.type === 'bun') {
			return acc + +ingredient.price * 2;
		} else {
			return acc + +ingredient.price;
		}
	}, 0);

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
		<li key={order._id}>
			<Link
				to={`${location.pathname}/${order.number}`}
				state={{ background: location }}
				className={styles.card}>
				<div className={`${styles.space_between} mb-6`}>
					<span className='text text_type_digits-default'>#{order.number}</span>
					<span className='text text_type_main-default text_color_inactive'>
						<FormattedDate date={new Date(order.createdAt)} />
					</span>
				</div>

				<h2 className='text text_type_main-medium mb-2'>{order.name}</h2>

				<span
					className={`${styles.status} ${styles[colorHighlight]} text text_type_main-default mb-6`}>
					{showStatus && status}
				</span>

				<div className={styles.space_between}>
					<ul className={styles.image_list}>
						{shownIngredients.map((item, index) => (
							<li
								key={`${item._id}-${index}`}
								className={styles.image_list_item}>
								<OrderIngredientImage
									src={item.image_mobile}
									alt={item.name}
									counter={index === 5 ? countUnshown : null}
								/>
							</li>
						))}
					</ul>

					<div className={styles.price}>
						<span className='text text_type_digits-default'>{orderPrice}</span>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</Link>
		</li>
	);
};
