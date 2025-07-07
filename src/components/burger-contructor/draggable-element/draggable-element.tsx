import { useRef } from 'react';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './draggable-element.module.css';
import { useDispatch } from 'react-redux';
// @ts-expect-error: Could not find a declaration file for module '@services/burger-constructor/actions'.
import { deleteIngredient } from '@services/burger-constructor/actions';
// @ts-expect-error: Could not find a declaration file for module '@services/burger-constructor/actions'.
import { moveIngredient } from '@services/burger-constructor/actions';
import { useDrag, useDrop } from 'react-dnd';
import { TDraggableItem, TConstructorIngredient } from '@/utils/types';

type TDraggableElementProps = {
	ingredient: TConstructorIngredient;
	index: number;
};

type TDragCollectedProps = {
	isDragging: boolean;
};

export const DraggableElement = ({
	ingredient,
	index,
}: TDraggableElementProps): React.JSX.Element => {
	const {
		uid,
		name,
		image,
		price,
	}: Pick<TConstructorIngredient, 'uid' | 'name' | 'image' | 'price'> =
		ingredient;
	const dispatch = useDispatch();
	const ref = useRef<HTMLLIElement>(null);

	const handleDelete = (uid: string): void => {
		dispatch(deleteIngredient(uid));
	};

	const [, dropRef] = useDrop<TDraggableItem, unknown, unknown>({
		accept: 'constructor_ingredient',
		hover: (item: TDraggableItem, monitor) => {
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
			if (!clientOffset) {
				return;
			}
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

	const [{ isDragging }, dragRef] = useDrag<
		TDraggableItem,
		unknown,
		TDragCollectedProps
	>({
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
