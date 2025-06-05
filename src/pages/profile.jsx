import { useState } from 'react';
import {
	Input,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileMenu } from '../components/profile-menu/profile-menu';
import styles from './profile.module.css';

export const ProfilePage = () => {
	const [name, setName] = useState('Иван');
	const [email, setEmail] = useState('mail@stellar.burgers');
	const [pass, setPass] = useState('');

	return (
		<div className='container padding-top-120 profile'>
			<section className={styles.sidebar}>
				<ProfileMenu />
				<p className='text text_type_main-default text_color_inactive'>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</section>
			<form className='form'>
				<Input
					type={'text'}
					placeholder={'Имя'}
					onChange={(e) => setName(e.target.value)}
					value={name}
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
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					name={'email'}
					error={false}
					errorText={'Введите корректный e-mail'}
					size={'default'}
					extraClass=''
					icon={'EditIcon'}
				/>
				<PasswordInput
					onChange={(e) => setPass(e.target.value)}
					value={pass}
					name={'password'}
					extraClass=''
					icon={'EditIcon'}
				/>
				<div className={styles.button_group}>
					<Button htmlType='submit' type='secondary' size='medium'>
						Отмена
					</Button>
					<Button htmlType='submit' type='primary' size='medium'>
						Сохранить
					</Button>
				</div>
			</form>
		</div>
	);
};
