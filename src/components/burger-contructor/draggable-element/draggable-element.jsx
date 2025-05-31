import { useRef } from 'react';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './draggable-element.module.css';
import { useDispatch } from 'react-redux';
import {
	deleteIngredient,
	moveIngredient,
} from '@services/burger-constructor/actions';
import { useDrag, useDrop } from 'react-dnd';
import { ingredientPropType } from '@utils/prop-types';
import * as PropTypes from 'prop-types';

export const DraggableElement = ({ ingredient, index }) => {
	const { uid, name, image, price } = ingredient;
	const dispatch = useDispatch();
	const ref = useRef(null);

	const handleDelete = (uid) => {
		dispatch(deleteIngredient(uid));
	};

	const [, dropRef] = useDrop({
		accept: 'constructor_ingredient',
		hover: (item, monitor) => {
			if (!ref.current) {
				return;
			}

			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) {
				return;
			}

			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			dispatch(moveIngredient({ dragIndex, hoverIndex }));

			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, dragRef] = useDrag({
		type: 'constructor_ingredient',
		item: () => {
			return { uid, index };
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const opacity = isDragging ? 0 : 1;
	dragRef(dropRef(ref));

	return (
		<li className={`${styles.filling_item}`} ref={ref} style={{ opacity }}>
			<DragIcon type='primary' />
			<ConstructorElement
				text={name}
				thumbnail={image}
				price={price}
				handleClose={() => handleDelete(uid)}
			/>
		</li>
	);
};

DraggableElement.propTypes = {
	ingredient: ingredientPropType.isRequired,
	index: PropTypes.number.isRequired,
};
