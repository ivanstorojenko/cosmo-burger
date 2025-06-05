import { useState } from 'react';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router';

export const ForgotPasswordPage = () => {
	const [email, setEmail] = useState('');

	return (
		<div className='container padding-top-180'>
			<div className='centered'>
				<h1 className='text text_type_main-medium mb-6'>
					Восстановление пароля
				</h1>
				<form className='form mb-20'>
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
					<Button htmlType='submit' type='primary' size='medium'>
						Войти
					</Button>
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
