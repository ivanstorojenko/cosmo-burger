import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router';

export const NotFoundPage = (): React.JSX.Element => {
	return (
		<div className='container padding-top-180'>
			<div className='centered'>
				<h1 className='text text_type_main-medium mb-4'>Страница не найдена</h1>
				<span className='text text_type_digits-large mb-15'>404</span>
				<Link to='/'>
					<Button htmlType='button' type='primary' size='large'>
						На главную
					</Button>
				</Link>
			</div>
		</div>
	);
};
