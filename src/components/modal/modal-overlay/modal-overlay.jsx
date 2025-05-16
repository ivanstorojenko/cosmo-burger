import React from 'react';
import styles from './modal-overlay.module.css';

export const ModalOverlay = ({ handleClose }) => {
	return <button onClick={handleClose} className={styles.overlay}></button>;
};
