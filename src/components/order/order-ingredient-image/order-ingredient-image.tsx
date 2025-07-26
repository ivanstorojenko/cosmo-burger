import styles from './order-ingredient-image.module.css';

type OrderIngredientImageProps = {
	src: string;
	alt: string;
	counter?: number | null;
};

export const OrderIngredientImage = ({
	src,
	alt,
	counter = null,
}: OrderIngredientImageProps): React.JSX.Element => {
	return (
		<div className={styles.image_wrapper}>
			<img
				className={`${styles.image} ${counter ? styles.image_muted : ''}`}
				src={src}
				alt={alt}
				loading='lazy'
			/>
			{counter && (
				<span className={`${styles.count_unshown} text text_type_main-default`}>
					+{counter}
				</span>
			)}
		</div>
	);
};
