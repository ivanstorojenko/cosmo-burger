import React, { useState } from 'react';
import styles from './burger-constructor.module.css';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';
import {
	ConstructorElement,
	DragIcon,
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { OrderDetail } from '../order-detail/order-detail';

export const BurgerConstructor = ({ ingredients }) => {
	const [showOrderDetail, setShowOrderDetail] = useState(false);
	const bun = ingredients.filter((ingredient) => ingredient.type === 'bun')[0];
	const restIngredients = ingredients.filter(
		(ingredient) => ingredient.type !== 'bun'
	);

	return (
		<section className={`${styles.burger_constructor}  mt-25`}>
			<ConstructorElement
				key='top'
				text={bun.name}
				thumbnail={bun.image}
				price={bun.price}
				type='top'
				isLocked={true}
				extraClass='ml-8'
			/>
			<ul className={`${styles.filling_list} custom-scroll`}>
				{restIngredients.map((ingredient) => (
					<li key={ingredient._id} className={`${styles.filling_item}`}>
						<DragIcon type='primary' />
						<ConstructorElement
							text={ingredient.name}
							thumbnail={ingredient.image}
							price={ingredient.price}
						/>
					</li>
				))}
			</ul>
			<ConstructorElement
				key='bottom'
				text={bun.name}
				thumbnail={bun.image}
				price={bun.price}
				type='bottom'
				isLocked={true}
				extraClass='ml-8'
			/>
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

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
