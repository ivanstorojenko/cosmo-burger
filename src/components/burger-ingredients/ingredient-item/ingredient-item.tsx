import styles from './ingredient-item.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { getConstructorIngredients } from '@/services/burger-constructor/reducer';
import { useLocation, Link } from 'react-router';
import { TConstructorIngredients, TIngredient } from '@/utils/types';

type TIngredientItemProps = {
	ingredient: TIngredient;
};

export const IngredientItem = ({
	ingredient,
}: TIngredientItemProps): React.JSX.Element => {
	const { _id, type, name, price, image } = ingredient;
	const constructorIngredients: TConstructorIngredients = useSelector(
		getConstructorIngredients
	);
	const location = useLocation();

	let counter = 0;
	if (type === 'bun') {
		counter = constructorIngredients.bun?._id === _id ? 2 : 0;
	} else {
		counter = constructorIngredients.ingredients.filter(
			(item) => item._id === _id
		).length;
	}

	const [, dragRef] = useDrag<TIngredient, unknown, unknown>({
		type: 'ingredient',
		item: { ...ingredient },
	});

	return (
		<li ref={dragRef} draggable className={styles.ingredient_item_wrapper}>
			<Link
				to={`/ingredients/${_id}`}
				state={{ background: location }}
				className={styles.ingredient_item}>
				{counter !== 0 && (
					<Counter count={counter} size='default' extraClass='m-1' />
				)}
				<img
					src={image}
					alt={name}
					className={`${styles.image}`}
					width='211'
					height='106'
				/>
				<div className={styles.price}>
					<span className='text text_type_digits-default mr-2'>{price}</span>
					<CurrencyIcon type='primary' />
				</div>
				<h3 className={styles.title}>{name}</h3>
			</Link>
		</li>
	);
};
