import React from 'react';
import styles from './modal-overlay.module.css';

export const ModalOverlay = ({
	handleClose,
}: {
	handleClose: () => void;
}): React.JSX.Element => {
	return <button onClick={handleClose} className={styles.overlay}></button>;
};
