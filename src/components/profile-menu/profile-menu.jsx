import { NavLink } from 'react-router';
import styles from './profile-menu.module.css';

export const ProfileMenu = () => {
	const navLinkClass = `${styles.menu_item} text text_type_main-medium text_color_inactive`;
	const navLinkActiveClass = `${styles.menu_item} text text_type_main-medium text_color_primary`;

	return (
		<nav className='mb-20'>
			<ul className={styles.menu}>
				<li>
					<NavLink
						to='/profile'
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
					<NavLink to='/' className={navLinkClass}>
						Выход
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};
