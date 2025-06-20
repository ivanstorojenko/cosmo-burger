import { useSelector, useDispatch } from 'react-redux';
import styles from './burger-constructor.module.css';
import {
	ConstructorElement,
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { OrderDetail } from '../order-detail/order-detail';
import {
	getConstructorIngredients,
	getIntgredientsIdArray,
	getOrderPrice,
} from '@services/burger-constructor/reducer';
import { addIngredient } from '@services/burger-constructor/actions';
import { useDrop } from 'react-dnd';
import { DraggableElement } from './draggable-element/draggable-element';
import { getOrderLoading, getShowOrderDetails } from '@services/order/reducer';
import { hideOrderDetails, placeOrder } from '../../services/order/actions';
import { getUserInfo } from '../../services/auth/reducer';
import { useNavigate } from 'react-router';

export const BurgerConstructor = () => {
	const orderPrice = useSelector(getOrderPrice);
	const ingredients = useSelector(getConstructorIngredients);
	const bun = ingredients.bun;
	const restIngredients = ingredients.ingredients;
	const ingredientsId = useSelector(getIntgredientsIdArray);
	const dispatch = useDispatch();
	const user = useSelector(getUserInfo);
	const navigate = useNavigate();

	const handleDrop = (item) => {
		dispatch(addIngredient(item));
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

	const showOrderDetails = useSelector(getShowOrderDetails);
	const orderLoading = useSelector(getOrderLoading);

	const handlePlaceOrder = (ingredientsId) => {
		if (user) {
			dispatch(placeOrder(ingredientsId));
		} else {
			navigate('/login', { state: { from: '/' } });
		}
	};

	const handleHideOrderDetails = () => {
		dispatch(hideOrderDetails());
	};

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
						restIngredients.map((ingredient, index) => (
							<DraggableElement
								key={ingredient.uid}
								ingredient={ingredient}
								index={index}
							/>
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
					onClick={() => handlePlaceOrder(ingredientsId)}
					disabled={!ingredientsId || orderLoading}>
					Оформить заказ
				</Button>
			</div>

			{showOrderDetails && (
				<Modal handleClose={() => handleHideOrderDetails()}>
					<OrderDetail />
				</Modal>
			)}
		</section>
	);
};
