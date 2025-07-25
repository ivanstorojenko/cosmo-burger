import { useEffect, useRef } from 'react';

export const useFocusTrap = (isOpen: boolean) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen || !modalRef.current) return;

		const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);

		if (focusableElements.length === 0) return;

		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		const handleTabKey = (e: KeyboardEvent) => {
			if (e.key !== 'Tab') return;

			if (!e.shiftKey && document.activeElement === lastElement) {
				e.preventDefault();
				firstElement.focus();
			}

			if (e.shiftKey && document.activeElement === firstElement) {
				e.preventDefault();
				lastElement.focus();
			}
		};

		document.addEventListener('keydown', handleTabKey);
		firstElement.focus();

		return () => {
			document.removeEventListener('keydown', handleTabKey);
		};
	}, [isOpen]);

	return modalRef;
};
