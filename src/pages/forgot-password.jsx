import { useState } from 'react';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router';
import { getPasswordResetCode } from '../utils/api';

export const ForgotPasswordPage = () => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setError(false);
		getPasswordResetCode(email)
			.then(
				(res) => {
					if (res.success) {
						localStorage.setItem('passwordResetCodeSent', true);
						navigate('/reset-password');
					}
				},
				() => setError(true)
			)
			.finally(() => setLoading(false));
	};

	return (
		<div className='container padding-top-180'>
			<div className='centered'>
				<h1 className='text text_type_main-medium mb-6'>
					Восстановление пароля
				</h1>
				<form className='form mb-20' onSubmit={(e) => handleSubmit(e)}>
					<Input
						type={'email'}
						placeholder={'Укажите e-mail'}
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						name={'email'}
						error={false}
						errorText={'Введите корректный e-mail'}
						size={'default'}
						extraClass=''
					/>
					<Button
						htmlType='submit'
						type='primary'
						size='medium'
						disabled={loading}>
						Восстановить
					</Button>
					{error && (
						<span className='text text_type_main-default'>
							При отправке кода для сброса пароля возникла ошибка, повторите
							попытку
						</span>
					)}
				</form>
				<section className='centered'>
					<div className='text_row'>
						<span className='text text_type_main-default text_color_inactive'>
							Вспомнили пароль?
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
