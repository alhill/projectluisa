import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';
import Landing from './components/landing';
import NotFoundPage from './components/pages/not-found-page';
import HomePage from './components/pages/home-page';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Dashboard from './components/dashboard';
import RequireAuth from './components/auth/require-auth';

class Router extends Component {

	componentDidMount() {
		this.props.currentUser();
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<div>
						<Route exact path="/" component={Landing} />
						<Route path="/register" component={Register} />
						<Route path="/login" component={Login} />
						<Route path="/dashboard" component={RequireAuth(Dashboard)} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

function mapStateToProps({ auth }){
	return { auth };
}

export default connect(mapStateToProps, actions)(Router);