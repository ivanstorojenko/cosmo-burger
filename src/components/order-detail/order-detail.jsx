import React from 'react';
import styles from './order-detail.module.css';
import doneIcon from './done.png';

export const OrderDetail = () => {
	return (
		<div className={styles.content}>
			<h3 className={`${styles.number} text text_type_digits-large mb-8`}>
				034536
			</h3>
			<span className='text text_type_main-medium mb-15'>
				идентификатор заказа
			</span>
			<img
				className={styles.image}
				src={doneIcon}
				alt='Галочка'
				width='120'
				height='120'
			/>
			<div className='description mt-15 mb-2'>
				<p className='text text_type_main-small'>Ваш заказ начали готовить</p>
				<p className='text text_type_main-default text_color_inactive'>
					Дождитесь готовности на орбитальной станции
				</p>
			</div>
		</div>
	);
};
