import React from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from './modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({
	currentIngredient,
	setCurrentIngredient,
	children,
}) => {
	document.addEventListener('keydown', (event) => {
		if (
			event.key === 'Escape' &&
			!event.shiftKey &&
			!event.ctrlKey &&
			!event.altKey
		) {
			setCurrentIngredient();
		}
	});

	return createPortal(
		currentIngredient && (
			<>
				<ModalOverlay setCurrentIngredient={() => setCurrentIngredient(null)} />
				<div className={styles.modal}>
					<header className={styles.header}>
						<h2 className='text text_type_main-large'>Детали ингредиента</h2>
						<button
							aria-label='Закрыть окно'
							onClick={setCurrentIngredient}
							className={styles.close_btn}>
							<CloseIcon type='primary' />
						</button>
					</header>
					{children}
				</div>
			</>
		),
		modalRoot
	);
};
