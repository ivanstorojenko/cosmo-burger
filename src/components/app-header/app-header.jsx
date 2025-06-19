import { NavLink } from 'react-router';
import styles from './app-header.module.css';
import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
	Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const AppHeader = () => {
	return (
		<header className={styles.header}>
			<nav className={`${styles.menu} p-4`}>
				<div className={styles.menu_part_left}>
					{/*пока тут должны быть ссылки, а не например кнопки или абзацы*/}
					<NavLink
						to='/'
						className={({ isActive }) =>
							isActive
								? `${styles.link_active} ${styles.link}`
								: `${styles.link}`
						}>
						{({ isActive }) => (
							<>
								<BurgerIcon type={isActive ? 'primary' : 'secondary'} />
								<p className='text text_type_main-default ml-2'>Конструктор</p>
							</>
						)}
					</NavLink>

					<NavLink
						to='/feed'
						className={({ isActive }) =>
							isActive
								? `${styles.link_active} ${styles.link} ml-10`
								: `${styles.link} ml-10`
						}>
						{({ isActive }) => (
							<>
								<ListIcon type={isActive ? 'primary' : 'secondary'} />
								<p className='text text_type_main-default ml-2'>
									Лента заказов
								</p>
							</>
						)}
					</NavLink>
				</div>
				<div className={styles.logo}>
					<Logo />
				</div>
				<NavLink
					to='/profile'
					className={({ isActive }) =>
						isActive
							? `${styles.link_active} ${styles.link} ${styles.link_position_last}`
							: `${styles.link} ${styles.link_position_last}`
					}>
					{({ isActive }) => (
						<>
							<ProfileIcon type={isActive ? 'primary' : 'secondary'} />
							<p className='text text_type_main-default ml-2'>Личный кабинет</p>
						</>
					)}
				</NavLink>
			</nav>
		</header>
	);
};
