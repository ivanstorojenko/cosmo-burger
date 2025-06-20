import { NavLink } from 'react-router';
import styles from './profile-menu.module.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../services/auth/actions';

export const ProfileMenu = () => {
	const navLinkClass = `${styles.menu_item} text text_type_main-medium text_color_inactive`;
	const navLinkActiveClass = `${styles.menu_item} text text_type_main-medium text_color_primary`;
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<nav className='mb-20'>
			<ul className={styles.menu}>
				<li>
					<NavLink
						to='/profile'
						end
						className={({ isActive }) =>
							isActive ? navLinkActiveClass : navLinkClass
						}>
						Профиль
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/profile/orders'
						className={({ isActive }) =>
							isActive ? navLinkActiveClass : navLinkClass
						}>
						История заказов
					</NavLink>
				</li>
				<li>
					<button
						type='button'
						className={`${navLinkClass} ${styles.nav_link_button}`}
						onClick={handleLogout}>
						Выход
					</button>
				</li>
			</ul>
		</nav>
	);
};
