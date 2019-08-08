import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './home/home';
import About from './about/about';
import Header from './common/header';
import PageNotFound from './PageNotFound';

const App = () => {
	return (
		<div className="container-fluid">
			<Header />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/about" component={About} />
				<Route component={PageNotFound} />
			</Switch>
		</div>
	);
};
export default App;
