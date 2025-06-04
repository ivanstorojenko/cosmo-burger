import { BrowserRouter, Routes, Route } from 'react-router';
import { HomePage } from '../../pages';
import styles from './app.module.css';
import { AppHeader } from '@components/app-header/app-header.jsx';

export const App = () => {
	return (
		<div className={styles.app}>
			<AppHeader />
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};
