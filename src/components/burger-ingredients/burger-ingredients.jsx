import { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsGroup } from '../burger-ingredients/ingredients-group/ingredients-group';
import { Modal } from '../modal/modal';
import { IngredientDetails } from './ingredient-details/ingredient-details';
import {
	getAllIngredients,
	getIngredientTypes,
	getActiveTab,
} from '@services/burger-ingredients/reducer';
import { getCurrentIngredient } from '@services/ingredient-detail/reducer';
import { deleteCurrentIngredient } from '@services/ingredient-detail/actions';
import { setActiveTab } from '@services/burger-ingredients/actions';

export const BurgerIngredients = () => {
	const ingredients = useSelector(getAllIngredients);
	const ingredientTypes = useSelector(getIngredientTypes);
	const currentIngredient = useSelector(getCurrentIngredient);
	const activeTab = useSelector(getActiveTab);
	const ingredientsContainerRef = useRef(null);
	const dispatch = useDispatch();

	const handleDeleteCurrentIngredient = useCallback(() => {
		dispatch(deleteCurrentIngredient());
	}, [dispatch]);

	const handleSetActiveTab = useCallback(
		(type) => {
			dispatch(setActiveTab(type));
		},
		[dispatch]
	);

	const scrollToSection = (type) => {
		handleSetActiveTab(type);
		const element = document.getElementById(type);
		if (element && ingredientsContainerRef.current) {
			ingredientsContainerRef.current.scrollTo({
				top: element.offsetTop - ingredientsContainerRef.current.offsetTop,
				behavior: 'smooth',
			});
		}
	};

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
						handleSetActiveTab(entry.target.id);
					}
				});
			},
			{
				root: ingredientsContainerRef.current,
				threshold: [0, 0.25, 0.5, 0.75, 1],
				rootMargin: '-30px 0px 0px 0px',
			}
		);

		ingredientTypes.forEach(({ type }) => {
			const element = document.getElementById(type);
			if (element) observer.observe(element);
		});

		return () => {
			ingredientTypes.forEach(({ type }) => {
				const element = document.getElementById(type);
				if (element) observer.unobserve(element);
			});
		};
	}, [ingredients, ingredientTypes, handleSetActiveTab]);

	return (
		<section className={styles.burger_ingredients}>
			<nav>
				<ul className={styles.menu}>
					{ingredientTypes.map(({ type, name }) => (
						<Tab
							key={type}
							value={type}
							active={activeTab === type}
							onClick={() => scrollToSection(type)}>
							{name}
						</Tab>
					))}
				</ul>
			</nav>

			<div
				ref={ingredientsContainerRef}
				className={`${styles.ingredients_group_list} custom-scroll mt-10`}>
				{ingredientTypes.map(({ type, name }) => (
					<div key={type} id={type}>
						<IngredientsGroup
							type={type}
							ingredients={ingredients.filter((ing) => ing.type === type)}
							title={name}
						/>
					</div>
				))}
			</div>

			{currentIngredient && (
				<Modal
					currentIngredient={currentIngredient}
					title={'Детали ингредиента'}
					handleClose={() => handleDeleteCurrentIngredient()}>
					<IngredientDetails
						ingredient={ingredients.find(
							(ingredient) => ingredient._id === currentIngredient
						)}
					/>
				</Modal>
			)}
		</section>
	);
};
