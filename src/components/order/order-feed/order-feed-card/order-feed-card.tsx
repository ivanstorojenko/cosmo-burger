import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router';
import styles from './order-feed-card.module.css';
import { useSelector } from 'react-redux';
import { getAllIngredients } from '@/services/burger-ingredients/reducer';

export const OrderFeedCard = (): React.JSX.Element => {
	const location = useLocation();
	const ingredients = useSelector(getAllIngredients);
	const shownIngredients = ingredients.slice(0, 6);
	const countUnshown: number = ingredients.length - shownIngredients.length + 1;

	return (
		<li>
			<Link
				to='/feed/number'
				state={{ background: location }}
				className={styles.card}>
				<div className={`${styles.space_between} mb-6`}>
					<span className='text text_type_digits-default'>#034535</span>
					<span className='text text_type_main-default text_color_inactive'>
						Сегодня, 16:20
					</span>
				</div>

				<h2 className='text text_type_main-medium mb-2'>
					Death Star Starship Main бургер
				</h2>

				<span className={`${styles.status} text text_type_main-default mb-6`}>
					Создан
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
						<span className='text text_type_digits-default'>460</span>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</Link>
		</li>
	);
};
