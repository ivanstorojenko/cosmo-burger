import { FormEvent, useEffect, useState } from 'react';
import {
	Input,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileMenu } from '../components/profile-menu/profile-menu';
import styles from './profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
// @ts-expect-error: Could not find a declaration file for module
import { getError, getLoading, getUserInfo } from '../services/auth/reducer';
// @ts-expect-error: Could not find a declaration file for module '../services/auth/actions'
import { changeInfo } from '../services/auth/actions';
import { Preloader } from '@/components/preloader/preloader';
import { TUser } from '@/utils/types';

export const ProfilePage = (): React.JSX.Element => {
	const { name, email }: TUser = useSelector(getUserInfo);
	const loading: boolean = useSelector(getLoading);
	const error: boolean = useSelector(getError);
	const [changedName, setChangedName] = useState(name);
	const [changedEmail, setChangedEmail] = useState(email);
	const [password, setPassword] = useState('');
	const [infoChanged, setInfoChanged] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (name !== changedName || email !== changedEmail || password !== '') {
			setInfoChanged(true);
		} else {
			setInfoChanged(false);
		}
	}, [name, email, changedName, changedEmail, password]);

	const handleSave = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(changeInfo({ name: changedName, email: changedEmail, password }));
	};

	const handleCancel = (): void => {
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
