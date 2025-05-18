import React from 'react';
import styles from './modal-overlay.module.css';
import * as PropTypes from 'prop-types';

export const ModalOverlay = ({ handleClose }) => {
	return <button onClick={handleClose} className={styles.overlay}></button>;
};

ModalOverlay.propTypes = {
	handleClose: PropTypes.func.isRequired,
};
