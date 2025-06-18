import { useEffect, useState } from 'react';
import {
	Input,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileMenu } from '../components/profile-menu/profile-menu';
import styles from './profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getError, getLoading, getUserInfo } from '../services/auth/reducer';
import { changeInfo } from '../services/auth/actions';
import { Preloader } from '@components/preloader/preloader';

export const ProfilePage = () => {
	// отображать в формле реальные данные
	const { name, email } = useSelector(getUserInfo);
	const loading = useSelector(getLoading);
	const error = useSelector(getError);
	const [changedName, setChangedName] = useState(name);
	const [changedEmail, setChangedEmail] = useState(email);
	const [password, setPassword] = useState('');
	// при изменении данных отображать кнопки Отменить и Сохранить
	let [infoChanged, setInfoChanged] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (name !== changedName || email !== changedEmail || password !== '') {
			setInfoChanged(true);
		} else {
			setInfoChanged(false);
		}
	}, [name, email, changedName, changedEmail, password]);
	// Сохранить - отправка запроса на обновление данных
	const handleSave = (e) => {
		e.preventDefault();
		dispatch(changeInfo({ name: changedName, email: changedEmail, password }));
	};
	// Отменить - возврат данных к реальным
	const handleCancel = () => {
		setChangedName(name);
		setChangedEmail(email);
		setPassword('');
		setInfoChanged(false);
	};

	return (
		<div className='container padding-top-120 profile'>
			<section className='sidebar'>
				<ProfileMenu />
				<p className='text text_type_main-default text_color_inactive'>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</section>
			<form className='form' onSubmit={(e) => handleSave(e)}>
				<Input
					type={'text'}
					placeholder={'Имя'}
					onChange={(e) => setChangedName(e.target.value)}
					value={changedName}
					name={'name'}
					error={false}
					errorText={'Введите имя'}
					size={'default'}
					extraClass=''
					icon={'EditIcon'}
				/>
				<Input
					type={'email'}
					placeholder={'E-mail'}
					onChange={(e) => setChangedEmail(e.target.value)}
					value={changedEmail}
					name={'email'}
					error={false}
					errorText={'Введите корректный e-mail'}
					size={'default'}
					extraClass=''
					icon={'EditIcon'}
				/>
				<PasswordInput
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					name={'password'}
					extraClass=''
					icon={'EditIcon'}
				/>
				{loading ? (
					<Preloader />
				) : (
					infoChanged && (
						<div className={styles.button_group}>
							<Button
								htmlType='button'
								type='secondary'
								size='medium'
								onClick={() => handleCancel()}>
								Отмена
							</Button>
							<Button htmlType='submit' type='primary' size='medium'>
								Сохранить
							</Button>
						</div>
					)
				)}
				{error && (
					<span className='text text_type_main-default'>
						При сохранении данных возникла ошибка, повторите попытку
					</span>
				)}
			</form>
		</div>
	);
};
