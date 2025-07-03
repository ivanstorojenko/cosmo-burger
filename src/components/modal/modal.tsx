import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from './modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('modal-root')!;
type TModalProps = {
	title?: string;
	children: React.ReactNode;
	handleClose: () => void;
};

export const Modal = ({
	title,
	children,
	handleClose,
}: TModalProps): React.JSX.Element => {
	useEffect(() => {
		const handleEscClose = (e: KeyboardEvent): void => {
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
