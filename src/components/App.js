import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import HomePage from './home/home';
import AuthPage from '../containers/signUp';
import LoginPage from '../containers/login';
import Header from '../common/header';
import PageNotFound from './PageNotFound';

const App = () => {
	return (
		<div>
			<Header />
			<Switch>
				<Redirect from="/" to="/home" exact />
				<Route path="/home" component={HomePage} exact />
				<Route path="/reg" component={AuthPage} />
				<Route path="/sigin" component={LoginPage} />
				<Route component={PageNotFound} />
			</Switch>
		</div>
	);
};
export default App;
