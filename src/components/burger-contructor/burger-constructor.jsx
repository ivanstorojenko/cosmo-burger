import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './burger-constructor.module.css';
import {
	ConstructorElement,
	DragIcon,
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { OrderDetail } from '../order-detail/order-detail';
import {
	getConstructorIngredients,
	getOrderPrice,
} from '@services/burger-constructor/reducer';

import {
	addIngredient,
	deleteIngredient,
} from '@services/burger-constructor/actions';
import { useDrop } from 'react-dnd';

export const BurgerConstructor = () => {
	const orderPrice = useSelector(getOrderPrice);
	const ingredients = useSelector(getConstructorIngredients);
	const bun = ingredients.bun;
	const restIngredients = ingredients.ingredients;
	const dispatch = useDispatch();

	const handleDrop = (item) => {
		dispatch(addIngredient(item));
	};

	const handleDelete = (id) => {
		dispatch(deleteIngredient(id));
	};

	const [{ isHover }, dropRef] = useDrop({
		accept: 'ingredient',
		collect: (monitor) => ({
			isHover: monitor.isOver(),
		}),
		drop(item) {
			handleDrop(item);
		},
	});

	const [showOrderDetail, setShowOrderDetail] = useState(false);

	return (
		<section className={`${styles.burger_constructor}  mt-25`}>
			<div
				ref={dropRef}
				className={`${styles.ingredients} ${isHover ? styles.onHover : ''}`}>
				{bun === null ? (
					<div className={`${styles.empty_bun_top} ml-8 mr-8`}></div>
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
						<div className={`${styles.empty_bun_middle} ml-8 mr-8`}>
							<span className='text text_type_main-default'>
								Перетащите ингредиенты в эту область
							</span>
						</div>
					) : (
						restIngredients.map((ingredient) => (
							<li key={ingredient.id} className={`${styles.filling_item}`}>
								<DragIcon type='primary' />
								<ConstructorElement
									text={ingredient.name}
									thumbnail={ingredient.image}
									price={ingredient.price}
									handleClose={() => handleDelete(ingredient.id)}
								/>
							</li>
						))
					)}
				</ul>
				{bun === null ? (
					<div className={`${styles.empty_bun_bottom} ml-8 mr-8`}></div>
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
			</div>

			<div className={`${styles.complete_order} mt-10 mr-8`}>
				<div>
					<span className='text text_type_digits-medium mr-2'>
						{orderPrice}
					</span>
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
