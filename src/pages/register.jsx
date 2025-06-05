import { useState } from 'react';
import {
	Input,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router';

export const RegisterPage = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');

	return (
		<div className='container padding-top-180'>
			<div className='centered'>
				<h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
				<form className='form mb-20'>
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
					/>
					<PasswordInput
						onChange={(e) => setPass(e.target.value)}
						value={pass}
						name={'password'}
						extraClass=''
					/>
					<Button htmlType='submit' type='primary' size='medium'>
						Войти
					</Button>
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
