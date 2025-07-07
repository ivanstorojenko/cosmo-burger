import { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsGroup } from './ingredients-group/ingredients-group';
// @ts-expect-error: Could not find a declaration file for module '@services/burger-ingredients/reducer'.
import { getAllIngredients } from '@services/burger-ingredients/reducer';
// @ts-expect-error: Could not find a declaration file for module '@services/burger-ingredients/reducer'.
import { getIngredientTypes } from '@services/burger-ingredients/reducer';
// @ts-expect-error: Could not find a declaration file for module '@services/burger-ingredients/reducer'.
import { getActiveTab } from '@services/burger-ingredients/reducer';
// @ts-expect-error: Could not find a declaration file for module '@services/burger-ingredients/actions'.
import { setActiveTab } from '@services/burger-ingredients/actions';
import { TIngredient, TIngredientCategory } from '@/utils/types';

export const BurgerIngredients = (): React.JSX.Element => {
	const ingredients: Array<TIngredient> = useSelector(getAllIngredients);
	const ingredientTypes: Array<TIngredientCategory> =
		useSelector(getIngredientTypes);
	const activeTab: string = useSelector(getActiveTab);
	const ingredientsContainerRef = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch();

	const handleSetActiveTab = useCallback(
		(type: string): void => {
			dispatch(setActiveTab(type));
		},
		[dispatch]
	);

	const scrollToSection = (type: string): void => {
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
				{ingredientTypes.map(({ type }) => (
					<div key={type} id={type}>
						<IngredientsGroup type={type} />
					</div>
				))}
			</div>
		</section>
	);
};
