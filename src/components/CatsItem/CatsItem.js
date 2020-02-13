import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './CatsItem.module.css';


const declOfNum = (number, titles) => {
	const cases = [2, 0, 1, 1, 1, 2];
	return titles[
		(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]
	];
};
const CatsItem = (props) => {
	const {
		description, quantity, id, name, promo, aboutItem,
	} = props;

	const [about, setAbout] = useState("Чего сидишь? Порадуй котэ");
	const [weight, setWeight] = useState(0.5);
	const [empty, setEmpty] = useState(false);
	const [active, setActive] = useState(false);
	useEffect(() => {
		if (weight === quantity) {
			setEmpty(true);
		} else {
			setEmpty(false);
		}
	}, [weight, quantity]);
	useEffect(() => {
		if (empty) {
			setAbout("Печалька, с курой закончился.");
		}
		if (active && !empty) {
			setAbout(aboutItem);
		} else if (!empty) {
			setAbout("Чего сидишь? Порадуй котэ");
		}
	}, [active, empty, aboutItem]);
	const clickCart = (e) => {
		const { target } = e;
		const targetId = target.id;
		switch (targetId) {
		case id:
			if (empty) {
				setWeight(0.5);
			} else {
				setWeight((w) => w + 0.5);
			}
			break;
		default:
			if (!empty) {
				setActive((a) => !a);
			} else {
				setActive(false);
			}
		}
	};
	const classCart = () => (empty ? `${style.cart_empty}`
		: active ? `${style.cart_active}` : ``);
	return (
		<div className={style.wrapper}>
			<div className={ `${style.cart} ${classCart()}` }
				onClick={clickCart}
			>
				<div className={style.text}>
					<div className={style.promo}>{promo}</div>
					<div className={style.promo_hover}>Котэ не одобряет?</div>
					<div className={style.name}>{name}</div>
					<div className={style.description}>{description}</div>
					<p className={style.present}> {weight * 20} порций</p>
					<p className={style.present}>
						{weight * 2} {declOfNum(weight * 2, ["мышь", "мыши", "мышей"])} в подарок
					</p>
				</div>
				<div className={style.price} id={id}>
					<span className={style.price_number}>{weight}</span>
					<p className={style.price_text}>кг</p>
				</div>
			</div>
			<div className={ empty ? `${style.cart_about_empty}` : `${style.cart_about}`}>
				{ about }
				{!active && !empty && <span className={style.link_about} onClick={clickCart}> купи.</span>}
			</div>
		</div>
	);
};
export default CatsItem;
CatsItem.propTypes = {
	description: PropTypes.string,
	quantity: PropTypes.number,
	about: PropTypes.string,
	id: PropTypes.string,
	name: PropTypes.string,
	promo: PropTypes.string,
	aboutItem: PropTypes.string,
};
