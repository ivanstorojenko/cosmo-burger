import styles from './ingredient-details.module.css';
import { getAllIngredients } from '@/services/burger-ingredients/reducer';
import { Navigate, useParams } from 'react-router';
import { TIngredient } from '@/utils/types';
import { useSelector } from '@/services/store';

export const IngredientDetails = (): React.JSX.Element => {
	const { ingredientId } = useParams();
	const ingredients: Array<TIngredient> = useSelector(getAllIngredients);
	const ingredient: TIngredient | undefined = ingredients.find(
		(ingredient) => ingredient._id === ingredientId
	);

	if (ingredient) {
		return (
			<div className={styles.content}>
				<img
					className={`${styles.image} mb-4`}
					src={ingredient.image_large}
					alt={ingredient.name}
					width='480'
					height='240'
				/>
				<h3 className='text text_type_main-medium mb-8'>{ingredient.name}</h3>
				<ul className={styles.nutrition_list}>
					<li className={styles.nutrition_item}>
						<span className='text text_type_main-default text_color_inactive'>
							Калории,ккал
						</span>
						<span className='text text_type_digits-default text_color_inactive'>
							{ingredient.calories}
						</span>
					</li>
					<li className={styles.nutrition_item}>
						<span className='text text_type_main-default text_color_inactive'>
							Белки, г
						</span>
						<span className='text text_type_digits-default text_color_inactive'>
							{ingredient.proteins}
						</span>
					</li>
					<li className={styles.nutrition_item}>
						<span className='text text_type_main-default text_color_inactive'>
							Жиры, г
						</span>
						<span className='text text_type_digits-default text_color_inactive'>
							{ingredient.fat}
						</span>
					</li>
					<li className={styles.nutrition_item}>
						<span className='text text_type_main-default text_color_inactive'>
							Углеводы, г
						</span>
						<span className='text text_type_digits-default text_color_inactive'>
							{ingredient.carbohydrates}
						</span>
					</li>
				</ul>
			</div>
		);
	} else {
		return <Navigate to='/not-found' replace />;
	}
};
