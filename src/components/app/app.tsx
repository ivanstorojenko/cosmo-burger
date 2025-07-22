import { Routes, Route, useLocation, useNavigate } from 'react-router';
import {
	ErrorPage,
	FeedPage,
	ForgotPasswordPage,
	HomePage,
	LoginPage,
	NotFoundPage,
	OrderDetailsPage,
	OrdersPage,
	ProfilePage,
	RegisterPage,
	ResetPasswordPage,
} from '../../pages';
import styles from './app.module.css';
import { AppHeader } from '@/components/app-header/app-header.js';
import { Modal } from '@/components/modal/modal';
import { IngredientDetails } from '@/components/burger-ingredients/ingredient-details/ingredient-details';
import { checkAuth } from '@/services/auth/actions';
import { useEffect } from 'react';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import { loadIngredients } from '@/services/burger-ingredients/actions';
import {
	getAllIngredients,
	getIngredientsLoading,
	getIngredientsError,
} from '@/services/burger-ingredients/reducer';
import { Preloader } from '../preloader/preloader';
import { IngredientDetailsPage } from '../../pages/ingredient-details';
import { useDispatch, useSelector } from '@/services/store';
import { OrderFeedDetail } from '../order/order-feed/order-feed_detail/order-feed-detail';

export const App = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const background: Location = location.state && location.state.background;

	useEffect(() => {
		dispatch(checkAuth());
	}, [dispatch]);

	useEffect(() => {
		dispatch(loadIngredients());
	}, [dispatch]);

	const ingredientsLoading = useSelector(getIngredientsLoading);
	const ingredientsError = useSelector(getIngredientsError);
	const ingredients = useSelector(getAllIngredients);

	const handleModalClose = (): void => {
		navigate(-1);
	};

	return (
		<div className={styles.app}>
			<AppHeader />

			<Routes location={background || location}>
				<Route path='/' element={<HomePage />} />
				<Route
					path='/feed'
					element={
						ingredientsLoading ? (
							<Preloader />
						) : ingredientsError ? (
							<ErrorPage message={'При загрузке ингредиента возникла ошибка'} />
						) : (
							<FeedPage />
						)
					}
				/>
				<Route
					path='/login'
					element={<OnlyUnAuth component={<LoginPage />} />}
				/>
				<Route
					path='/register'
					element={<OnlyUnAuth component={<RegisterPage />} />}
				/>
				<Route
					path='/forgot-password'
					element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
				/>
				<Route
					path='/reset-password'
					element={<OnlyUnAuth component={<ResetPasswordPage />} />}
				/>
				<Route
					path='/profile'
					element={<OnlyAuth component={<ProfilePage />} />}
				/>
				<Route
					path='/profile/orders'
					element={<OnlyAuth component={<OrdersPage />} />}
				/>
				<Route
					path='/ingredients/:ingredientId'
					element={
						ingredientsLoading ? (
							<Preloader />
						) : ingredientsError ? (
							<ErrorPage message={'При загрузке ингредиента возникла ошибка'} />
						) : (
							ingredients.length && <IngredientDetailsPage />
						)
					}
				/>
				<Route
					path='/feed/:number'
					element={
						ingredientsLoading ? (
							<Preloader />
						) : ingredientsError ? (
							<ErrorPage
								message={'При загрузке ингредиентов возникла ошибка'}
							/>
						) : (
							ingredients.length && <OrderDetailsPage />
						)
					}
				/>
				<Route
					path='/profile/orders/:number'
					element={
						ingredientsLoading ? (
							<Preloader />
						) : ingredientsError ? (
							<ErrorPage
								message={'При загрузке ингредиентов возникла ошибка'}
							/>
						) : (
							ingredients.length && <OrderDetailsPage />
						)
					}
				/>
				<Route path='*' element={<NotFoundPage />} />
			</Routes>

			{background && (
				<Routes>
					<Route
						path='/ingredients/:ingredientId'
						element={
							ingredientsLoading ? (
								<Preloader />
							) : (
								ingredients.length && (
									<Modal
										handleClose={handleModalClose}
										title={'Детали ингредиента'}>
										<IngredientDetails />
									</Modal>
								)
							)
						}
					/>
					<Route
						path='/feed/:number'
						element={
							ingredientsLoading ? (
								<Preloader />
							) : (
								ingredients.length && (
									<Modal handleClose={handleModalClose} title={''}>
										<OrderFeedDetail />
									</Modal>
								)
							)
						}
					/>
					<Route
						path='/profile/orders/:number'
						element={
							ingredientsLoading ? (
								<Preloader />
							) : (
								ingredients.length && (
									<Modal handleClose={handleModalClose} title={''}>
										<OrderFeedDetail />
									</Modal>
								)
							)
						}
					/>
				</Routes>
			)}
		</div>
	);
};
