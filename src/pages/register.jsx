import { useState } from 'react';
import {
	Input,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { registration } from '../services/auth/actions';
import { userInfo, loading, error } from '@services/auth/reducer';

export const RegisterPage = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const user = useSelector(userInfo);
	const registrationPending = useSelector(loading);
	const registrationError = useSelector(error);
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(registration({ name, email, password }));
	};

	if (user) {
		return <Navigate to='/' replace />;
	}

	return (
		<div className='container padding-top-180'>
			<div className='centered'>
				<h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
				<form className='form mb-20' onSubmit={(e) => handleSubmit(e)}>
					<Input
						type={'text'}
						placeholder={'Имя'}
						onChange={(e) => setName(e.target.value)}
						value={name}
						name={'name'}
						error={false}
						errorText={'Введите имя'}
						size={'default'}
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
					/>
					<PasswordInput
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						name={'password'}
					/>
					<Button
						htmlType='submit'
						type='primary'
						size='medium'
						disabled={registrationPending}>
						Зарегистрироваться
					</Button>
					{registrationError && (
						<span className='text text_type_main-default'>
							При регистрации возникла ошибка, повторите попытку
						</span>
					)}
				</form>
				<section className='centered'>
					<div className='text_row'>
						<span className='text text_type_main-default text_color_inactive'>
							Уже зарегистрированы?
						</span>
						<Link
							to='/login'
							className='text text_type_main-default text_color_link'>
							Войти
						</Link>
					</div>
				</section>
			</div>
		</div>
	);
};
