import { OrderFeed } from '@/components/order/order-feed/order-feed';
import { OrderSummary } from '@/components/order/order-summary/order-summary';

export const FeedPage = () => {
	// const ingredients: TIngredient[] = useSelector(getAllIngredients);
	// const loading: boolean = useSelector(getIngredientsLoading);
	// const error: boolean = useSelector(getIngredientsError);

	// создать ws

	return (
		<>
			<h1 className={'title text text_type_main-large mt-10 mb-5 pl-5'}>
				Лента заказов
			</h1>
			<main className={'main pl-5 pr-5'}>
				{/* {loading ? (
					<Preloader />
				) : error ? (
					<span className='text text_type_main-medium'>
						Произошла ошибка при загрузке ингредиентов
					</span>
				) : ingredients && ingredients.length > 0 ? (
					<DndProvider backend={HTML5Backend}>
						<BurgerIngredients />
						<BurgerConstructor />
					</DndProvider>
				) : (
					<span className='text text_type_main-medium'>Нет ингредиентов</span>
				)} */}
				<OrderFeed />
				<OrderSummary />
			</main>
		</>
	);
};
