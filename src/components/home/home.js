import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
	<div className="jumbotron">
		<h1>Royal Frrames</h1>
		<p>Paragraph</p>
		<Link to="about" className="btn btn-primary btn-lg">
			about
		</Link>
	</div>
);

export default HomePage;
