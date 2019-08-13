import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
// import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import './index.css';

const client = new ApolloClient({
	uri: 'https://royalframes-photography.herokuapp.com/photography'
});

render(
	<ApolloProvider client={client}>
		<Router>
			<App />
		</Router>
	</ApolloProvider>,
	document.getElementById('app')
);
