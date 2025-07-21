import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const OrderDetailsPage = (): React.JSX.Element => {
	// todo проверить путь и в зав-ти от этого показывать/не показывать статус

	return (
		<div className='container padding-top-120 profile'>
			<div className='centered'>
				<span>номер заказа</span>
				<h1 className='text text_type_main-large'>название бургера</h1>

				<h2>Состав:</h2>
				<ul>
					<li>
						картинка в рамке
						<span>название</span>
						<div>
							<span>количество х стоимость</span>
							<CurrencyIcon type='primary' />
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
};
