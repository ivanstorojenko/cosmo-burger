import React from 'react';
import styles from './modal-overlay.module.css';

export const ModalOverlay = ({ setCurrentIngredient }) => {
	return (
		<button onClick={setCurrentIngredient} className={styles.overlay}></button>
	);
};
