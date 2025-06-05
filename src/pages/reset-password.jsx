import { useState } from 'react';
import {
	Input,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router';

export const ResetPasswordPage = () => {
	const [pass, setPass] = useState('');
	const [code, setCode] = useState('');

	return (
		<div className='container padding-top-180'>
			<div className='centered'>
				<h1 className='text text_type_main-medium mb-6'>
					Восстановление пароля
				</h1>
				<form className='form mb-20'>
					<PasswordInput
						placeholder={'Введите новый пароль'}
						onChange={(e) => setPass(e.target.value)}
						value={pass}
						name={'password'}
						extraClass=''
					/>
					<Input
						type={'text'}
						placeholder={'Введите код из письма'}
						onChange={(e) => setCode(e.target.value)}
						value={code}
						name={'code'}
						error={false}
						errorText={'Введите код'}
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
