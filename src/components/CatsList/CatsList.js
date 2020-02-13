import React from 'react';
import PropTypes from "prop-types";
import style from './CatsList.module.css';
import CatsItem from '../CatsItem/CatsItem';


const CatsList = (props) => {
	const { data } = props;
	const items = data.map((item) => (
		<CatsItem
			{...item}
			key={ item.id }
		/>
	));
	return (
		<div className={style.wrapper}>
			{ items }
		</div>
	);
};
export default CatsList;

CatsList.propTypes = {
	data: PropTypes.array,
};
