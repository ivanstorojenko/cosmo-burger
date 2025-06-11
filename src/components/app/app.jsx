import { Routes, Route } from 'react-router';
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
import { AppHeader } from '@components/app-header/app-header.jsx';
import { useDispatch } from 'react-redux';
import { checkAuth } from '@services/auth/actions';
import { useEffect } from 'react';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';

export const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkAuth());
	}, [dispatch]);

	return (
		<div className={styles.app}>
			<AppHeader />
			<Routes>
				<Route path='/' element={<HomePage />} />
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
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</div>
	);
};
