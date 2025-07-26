import { useState, FormEvent } from 'react';
import {
	Input,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router';
import { login } from '@/services/auth/actions';
import { getUserInfo, getLoading, getError } from '@/services/auth/reducer';
import { Preloader } from '@/components/preloader/preloader';
import { TUserData } from '@/utils/api';
import { useDispatch, useSelector } from '@/services/store';

export const LoginPage = (): React.JSX.Element => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const user: Pick<TUserData, 'email' | 'name'> | null =
		useSelector(getUserInfo);
	const loginPending: boolean = useSelector(getLoading);
	const loginError: string | null = useSelector(getError);

	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		dispatch(login({ email, password }));
	};

	if (user) {
		return <Navigate to='/' replace />;
	}

	return (
		<div className='container padding-top-180'>
			<div className='centered'>
				<h1 className='text text_type_main-medium mb-6'>Вход</h1>
				<form className='form mb-20' onSubmit={(e) => handleSubmit(e)}>
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
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						name={'password'}
						extraClass=''
					/>
					{loginPending ? (
						<Preloader />
					) : (
						<Button htmlType='submit' type='primary' size='medium'>
							Войти
						</Button>
					)}
					{loginError && (
						<span className='text text_type_main-default'>
							При авторизации возникла ошибка, повторите попытку
						</span>
					)}
				</form>
				<section className='centered'>
					<div className='text_row mb-4'>
						<span className='text text_type_main-default text_color_inactive'>
							Вы — новый пользователь?
						</span>
						<Link
							to='/register'
							className='text text_type_main-default text_color_link'>
							Зарегистрироваться
						</Link>
					</div>
					<div className='text_row'>
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
