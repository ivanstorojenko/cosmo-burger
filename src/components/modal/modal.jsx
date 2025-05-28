import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from './modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import * as PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteCurrentIngredient } from '@services/ingredient-detail/actions';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ title, children }) => {
	const dispatch = useDispatch();
	const handleClose = () => {
		dispatch(deleteCurrentIngredient());
	};

	useEffect(() => {
		const handleEscClose = (e) => {
			if (e.key === 'Escape' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
				handleClose();
			}
		};

		document.addEventListener('keydown', handleEscClose);

		return () => {
			document.removeEventListener('keydown', handleEscClose);
		};
	}, [handleClose]);

	return createPortal(
		<>
			<ModalOverlay handleClose={handleClose} />
			<div className={styles.modal}>
				<header className={styles.header}>
					<h2 className='text text_type_main-large'>{title}</h2>
					<button
						aria-label='Закрыть окно'
						onClick={handleClose}
						className={styles.close_btn}>
						<CloseIcon type='primary' />
					</button>
				</header>
				{children}
			</div>
		</>,
		modalRoot
	);
};

Modal.propTypes = {
	title: PropTypes.string,
	children: PropTypes.element.isRequired,
};
