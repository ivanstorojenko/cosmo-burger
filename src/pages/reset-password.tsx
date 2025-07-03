import { useEffect, useState, FormEvent } from 'react';
import {
	Input,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useNavigate } from 'react-router';
import { resetPassword } from '../utils/api';
import { Preloader } from '@/components/preloader/preloader';

export const ResetPasswordPage = (): React.JSX.Element => {
	const [isCodeSent, setIsCodeSent] = useState<boolean | null>(null);
	const [password, setPassword] = useState('');
	const [code, setCode] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | false>(false);
	const navigate = useNavigate();

	useEffect(() => {
		localStorage.getItem('passwordResetCodeSent') === 'true'
			? setIsCodeSent(true)
			: setIsCodeSent(false);
	}, []);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(false);
		resetPassword(password, code)
			.then(
				(res) => {
					if (res && res.success) {
						localStorage.removeItem('passwordResetCodeSent');
						navigate('/login');
					}
				},
				() => {
					setError('При сохранении пароля возникла ошибка');
				}
			)
			.finally(() => setLoading(false));
	};

	return (
		<div className='container padding-top-180'>
			<div className='centered'>
				{isCodeSent === null && <Preloader />}
				{isCodeSent === false && <Navigate to='/forgot-password' replace />}
				{isCodeSent && (
					<>
						<h1 className='text text_type_main-medium mb-6'>
							Восстановление пароля
						</h1>
						<form className='form mb-20' onSubmit={(e) => handleSubmit(e)}>
							<PasswordInput
								placeholder={'Введите новый пароль'}
								onChange={(e) => setPassword(e.target.value)}
								value={password}
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
							{loading ? (
								<Preloader />
							) : (
								<Button htmlType='submit' type='primary' size='medium'>
									Сохранить
								</Button>
							)}
							{error && (
								<span className='text text_type_main-default'>{error}</span>
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
					</>
				)}
			</div>
		</div>
	);
};
