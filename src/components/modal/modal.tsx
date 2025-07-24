import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from './modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useParams } from 'react-router';

const modalRoot = document.getElementById('modal-root')!;
type TModalProps = {
	children: React.ReactNode;
	handleClose: () => void;
};

export const Modal = ({
	children,
	handleClose,
}: TModalProps): React.JSX.Element => {
	const location = useLocation();
	const { number } = useParams();
	let title: React.JSX.Element | null;
	const orderNumber = (
		<h2 className='text text_type_digits-default'>#{number}</h2>
	);
	const background: string = location.state?.background?.pathname || '';

	switch (background) {
		case '/profile/orders':
			title = orderNumber;
			break;
		case '/feed':
			title = orderNumber;
			break;
		case '/':
			title = <h2 className='text text_type_main-large'>Детали ингредиента</h2>;
			break;
		default:
			title = null;
	}

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
				<header className={`${styles.header} mb-6`}>
					{title}
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
