import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';
import * as actions from './actions';
import Landing from './components/landing';
import NotFoundPage from './components/pages/not-found-page';
import HomePage from './components/pages/home-page';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Dashboard from './components/dashboard';
import RequireAuth from './components/auth/require-auth';
import Header from './components/header';
import Footer from './components/footer';


class Router extends Component {

	componentDidMount() {
		this.props.currentUser();
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<Grid fluid={true}>
						<Header />
						<Grid>
							<Route exact path="/" component={Landing} />
							<Route path="/register" component={Register} />
							<Route path="/login" component={Login} />
							<Route path="/dashboard" component={RequireAuth(Dashboard)} />
						</Grid>
						<Footer />
					</Grid>
				</BrowserRouter>
			</div>
		);
	}
}

function mapStateToProps({ auth }){
	return { auth };
}

export default connect(mapStateToProps, actions)(Router);