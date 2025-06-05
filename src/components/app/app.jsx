import { BrowserRouter, Routes, Route } from 'react-router';
import {
	ForgotPasswordPage,
	HomePage,
	LoginPage,
	ProfilePage,
	RegisterPage,
	ResetPasswordPage,
} from '../../pages';
import styles from './app.module.css';
import { AppHeader } from '@components/app-header/app-header.jsx';

export const App = () => {
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
				</Routes>
			</BrowserRouter>
		</div>
	);
};
