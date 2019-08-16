import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import HomePage from './home/home';
import AuthPage from '../containers/signUp';
import LoginPage from '../containers/login';
import Header from '../common/header';
import PageNotFound from './PageNotFound';
import loginContext from '../common/loginContext';
import CreateBlog from '../containers/createBlog';

class App extends Component {
	state = {
		token: null,
		userId: null
	};

	login = (token, userId) => {
		this.setState({
			token: token,
			userId: userId
		});
	};
	logout = () => {
		this.setState({
			token: null,
			userId: null
		});
	};

	render() {
		const { token, userId } = this.state;
		return (
			<loginContext.Provider
				value={{
					token: token,
					userId: userId,
					login: this.login,
					logout: this.logout
				}}
			>
				<div>
					<Header />
					<Switch>
						createBlog
						<Redirect from="/" to="/home" exact />
						{token && <Redirect from="/reg" to="/home" exact />}
						{token && <Redirect from="/sigin" to="/home" exact />}
						<Route path="/home" component={HomePage} exact />
						{token && <Route path="/photography/blog" component={CreateBlog} exact />}
						{!token && <Route path="/reg" component={AuthPage} />}
						{!token && <Route path="/sigin" component={LoginPage} />}
						<Route component={PageNotFound} />
					</Switch>
				</div>
			</loginContext.Provider>
		);
	}
}
export default App;
