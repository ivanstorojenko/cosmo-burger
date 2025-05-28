import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './burger-constructor.module.css';
import {
	ConstructorElement,
	DragIcon,
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { OrderDetail } from '../order-detail/order-detail';
import { getConstructorIngredients } from '@services/burger-constructor/reducer';

export const BurgerConstructor = () => {
	const ingredients = useSelector(getConstructorIngredients);
	const bun = ingredients.bun;
	const restIngredients = ingredients.ingredients;

	const [showOrderDetail, setShowOrderDetail] = useState(false);

	return (
		<section className={`${styles.burger_constructor}  mt-25`}>
			{bun === null ? (
				<div className={`${styles.empty_bun_top}`}></div>
			) : (
				<ConstructorElement
					key='top'
					text={`${bun.name} (верх)`}
					thumbnail={bun.image}
					price={bun.price}
					type='top'
					isLocked={true}
					extraClass='ml-8'
				/>
			)}

			<ul className={`${styles.filling_list} custom-scroll`}>
				{restIngredients.length === 0 ? (
					<div className={`${styles.empty_bun_middle}`}>
						<span className='text text_type_main-default'>
							Перетащите ингредиенты в эту область
						</span>
					</div>
				) : (
					restIngredients.map((ingredient) => (
						<li key={ingredient._id} className={`${styles.filling_item}`}>
							<DragIcon type='primary' />
							<ConstructorElement
								text={ingredient.name}
								thumbnail={ingredient.image}
								price={ingredient.price}
							/>
						</li>
					))
				)}
			</ul>

			{bun === null ? (
				<div className={`${styles.empty_bun_bottom}`}></div>
			) : (
				<ConstructorElement
					key='bottom'
					text={`${bun.name} (низ)`}
					thumbnail={bun.image}
					price={bun.price}
					type='bottom'
					isLocked={true}
					extraClass='ml-8'
				/>
			)}
			<div className={`${styles.complete_order} mt-10`}>
				<div>
					<span className='text text_type_digits-medium mr-2'>610</span>
					<CurrencyIcon type='primary' />
				</div>
				<Button
					htmlType='button'
					type='primary'
					size='medium'
					onClick={() => setShowOrderDetail(true)}>
					Оформить заказ
				</Button>
			</div>

			{showOrderDetail && (
				<Modal handleClose={() => setShowOrderDetail(false)}>
					<OrderDetail />
				</Modal>
			)}
		</section>
	);
};
