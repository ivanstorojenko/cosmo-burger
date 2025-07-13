import { Routes, Route, useLocation, useNavigate } from 'react-router';
import {
	ForgotPasswordPage,
	HomePage,
	LoginPage,
	NotFoundPage,
	ProfilePage,
	RegisterPage,
	ResetPasswordPage,
} from '../../pages';
import styles from './app.module.css';
import { AppHeader } from '@/components/app-header/app-header.js';
import { Modal } from '@/components/modal/modal';
import { IngredientDetails } from '@/components/burger-ingredients/ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
// @ts-expect-error: Could not find a declaration file for module '@services/auth/actions'.
import { checkAuth } from '@services/auth/actions';
import { useEffect } from 'react';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
// @ts-expect-error: Could not find a declaration file for module '@services/burger-ingredients/actions'.
import { loadIngredients } from '@services/burger-ingredients/actions';
// @ts-expect-error: Could not find a declaration file for module '@services/burger-ingredients/reducer'.
import { getAllIngredients } from '@services/burger-ingredients/reducer';
// @ts-expect-error: Could not find a declaration file for module '@services/burger-ingredients/reducer'.
import { getIngredientsLoading } from '@services/burger-ingredients/reducer';
// @ts-expect-error: Could not find a declaration file for module '@services/burger-ingredients/reducer'.
import { getIngredientsError } from '@services/burger-ingredients/reducer';
import { Preloader } from '../preloader/preloader';
import { IngredientDetailsPage } from '../../pages/ingredient-details';
import { ErrorPage } from '../../pages/error';
import { OrdersPage } from '../../pages/orders';
import { TIngredient } from '@/utils/types';
import { FeedPage } from '@/pages/feed';

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

	const ingredientsLoading: boolean = useSelector(getIngredientsLoading);
	const ingredientsError: boolean = useSelector(getIngredientsError);
	const ingredients: TIngredient[] = useSelector(getAllIngredients);

	const handleModalClose = (): void => {
		navigate(-1);
	};

	return (
		<div className={styles.app}>
			<AppHeader />

			<Routes location={background || location}>
				<Route path='/' element={<HomePage />} />
				<Route path='/feed' element={<FeedPage />} />
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
				</Routes>
			)}
		</div>
	);
};
