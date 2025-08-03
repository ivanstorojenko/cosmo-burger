import styles from './burger-constructor.module.css';
import {
	ConstructorElement,
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { OrderDetail } from '../order/order-detail/order-detail';
import {
	getConstructorIngredients,
	getIntgredientsIdArray,
	getOrderPrice,
} from '@/services/burger-constructor/reducer';
import { addIngredient } from '@/services/burger-constructor/actions';
import { useDrop } from 'react-dnd';
import { DraggableElement } from './draggable-element/draggable-element';
import { getOrderLoading, getShowOrderDetails } from '@services/order/reducer';
import { hideOrderDetails, placeOrder } from '../../services/order/actions';
import { getUserInfo } from '../../services/auth/reducer';
import { useNavigate } from 'react-router';
import {
	TConstructorIngredient,
	TConstructorIngredients,
	TIngredient,
} from '@/utils/types';
import { TUserData } from '@/utils/api';
import { useDispatch, useSelector } from '@/services/store';

export const BurgerConstructor = (): React.JSX.Element => {
	const orderPrice = useSelector(getOrderPrice);
	const ingredients: TConstructorIngredients = useSelector(
		getConstructorIngredients
	);
	const bun: TIngredient | null = ingredients.bun;
	const restIngredients: Array<TConstructorIngredient> =
		ingredients.ingredients;
	const ingredientsId: string[] | null = useSelector(getIntgredientsIdArray);
	const dispatch = useDispatch();
	const user: Pick<TUserData, 'name' | 'email'> | null =
		useSelector(getUserInfo);
	const navigate = useNavigate();

	const handleDrop = (item: TIngredient): void => {
		dispatch(addIngredient(item));
	};

	const [{ isHover }, dropRef] = useDrop<
		TIngredient,
		void,
		{ isHover: boolean }
	>({
		accept: 'ingredient',
		collect: (monitor) => ({
			isHover: monitor.isOver(),
		}),
		drop(item) {
			handleDrop(item);
		},
	});

	const showOrderDetails: boolean = useSelector(getShowOrderDetails);
	const orderLoading: boolean = useSelector(getOrderLoading);

	const handlePlaceOrder = (ingredientsId: Array<string>): void => {
		if (user) {
			if (ingredientsId.length > 0) {
				dispatch(placeOrder(ingredientsId));
			}
		} else {
			navigate('/login', { state: { from: '/' } });
		}
	};

	const handleHideOrderDetails = (): void => {
		dispatch(hideOrderDetails());
	};

	return (
		<section className={`${styles.burger_constructor}  mt-25`}>
			<div
				ref={dropRef}
				className={`${styles.ingredients} ${isHover ? styles.onHover : ''}`}
				data-testid='drop-zone'>
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
					onClick={() => ingredientsId && handlePlaceOrder(ingredientsId)}
					disabled={!ingredientsId || orderLoading}
					data-testid='place-order-btn'>
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
