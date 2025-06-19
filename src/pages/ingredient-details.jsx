import { IngredientDetails } from '../components/burger-ingredients/ingredient-details/ingredient-details';

export const IngredientDetailsPage = () => {
	return (
		<div className='container padding-top-120 profile'>
			<div className='centered'>
				<h1 className='text text_type_main-large'>Детали ингредиента</h1>
				<IngredientDetails />
			</div>
		</div>
	);
};
