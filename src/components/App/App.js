import React, { useState } from 'react';
import style from './App.module.css';
import CatsList from '../CatsList/CatsList';
import dataJson from '../../data/data.json';

const App = () => {
	const [data] = useState(dataJson);
	return (
		<div className={style.main}>
			<h1 className={style.title}>Ты&nbsp;сегодня покормил кота?</h1>
			<CatsList data={data} />
		</div>
	);
};


export default App;
