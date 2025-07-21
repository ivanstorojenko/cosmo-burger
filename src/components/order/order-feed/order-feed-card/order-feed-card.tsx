import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router';
import styles from './order-feed-card.module.css';
import { getAllIngredients } from '@/services/burger-ingredients/reducer';
import { TFeedOrder, TIngredient } from '@/utils/types';
import { useSelector } from '@/services/store';

type TOrderFeedCardProps = {
	showStatus: boolean;
	order: TFeedOrder;
};

export const OrderFeedCard = ({
	showStatus,
	order,
}: TOrderFeedCardProps): React.JSX.Element => {
	const location = useLocation();
	const allIngredients = useSelector(getAllIngredients);
	const burgerIngredients = allIngredients.filter((item) =>
		order.ingredients.includes(item._id)
	);
	let shownIngredients: null | TIngredient[] = null;
	let countUnshown = 0;

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

	return (
		<li>
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

				<span className={`${styles.status} text text_type_main-default mb-6`}>
					{showStatus && order.status}
				</span>

				<div className={styles.space_between}>
					<ul className={styles.image_list}>
						{shownIngredients.map((item, index) => (
							<li className={styles.image_wrapper}>
								<img
									className={styles.image}
									src={item.image_mobile}
									alt={item.name}
									loading='lazy'
								/>
								{index == 5 && (
									<span
										className={`${styles.count_unshown} text text_type_main-default`}>
										+{countUnshown}
									</span>
								)}
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
