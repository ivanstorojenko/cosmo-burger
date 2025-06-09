import { BrowserRouter, Routes, Route } from 'react-router';
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
import { checkAuth } from '../../services/auth/actions';
import { useEffect } from 'react';

export const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const accessToken = window.localStorage.getItem('accessToken');
		const refreshToken = window.localStorage.getItem('refreshToken');

		if (accessToken && refreshToken) {
			dispatch(checkAuth());
		}
	}, []);

	return (
		<div className={styles.app}>
			<AppHeader />
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/forgot-password' element={<ForgotPasswordPage />} />
					<Route path='/reset-password' element={<ResetPasswordPage />} />
					<Route path='/profile' element={<ProfilePage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};
