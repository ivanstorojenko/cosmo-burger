import { useState } from 'react';
import {
	Input,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { Link } from 'react-router';

export const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');

	return (
		<div className='container padding-top-180'>
			<div className='centered'>
				<h1 className='text text_type_main-medium mb-6'>Вход</h1>
				<form className={`${styles.form} mb-20`}>
					<Input
						type={'email'}
						placeholder={'E-mail'}
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						name={'email'}
						error={false}
						errorText={'Введите корректный e-mail'}
						size={'default'}
						extraClass='ml-1 mb-6'
					/>
					<PasswordInput
						onChange={(e) => setPass(e.target.value)}
						value={pass}
						name={'password'}
						extraClass='mb-2 mb-6'
					/>
					<Button htmlType='submit' type='primary' size='medium'>
						Войти
					</Button>
				</form>
				<section className='centered'>
					<div className={`${styles.text_row} mb-4`}>
						<span className='text text_type_main-default text_color_inactive'>
							Вы — новый пользователь?
						</span>
						<Link
							to='/register'
							className='text text_type_main-default text_color_link'>
							Зарегистрироваться
						</Link>
					</div>
					<div className={`${styles.text_row}`}>
						<span className='text text_type_main-default text_color_inactive'>
							Забыли пароль?
						</span>
						<Link
							to='/forgot-password'
							className='text text_type_main-default text_color_link'>
							Восстановить пароль
						</Link>
					</div>
				</section>
			</div>
		</div>
	);
};
