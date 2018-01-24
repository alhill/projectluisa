import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import * as actions from '../actions';

class Header extends Component {

    renderContent() {
        if( this.props.auth.authenticated == true ) {
            return(
                <div>
                    <Link className="btn btn-primary" to='/dashboard'>Dashboard</Link>
                    <div className="btn btn-primary" onClick={() => this.props.logoutUser()}>Log Out</div>
                </div>
            );
        }
        else {
            return(
                <div>
                    <Link className="btn btn-primary" to='/login'>Log In</Link>
                    <Link className="btn btn-primary" to='/register'>Register</Link>
                </div>
            );
        }

    }

    render() {
        return (
            <Row style={{backgroundColor: 'lightgray'}}>
                <Col xs={6}>
                    <Link to="/">
                        <h1>Project Luisa</h1>
                    </Link>
                </Col>
                <Col xs={6}>
                    { this.renderContent() }
                </Col>
            </Row>
        );
    }
}

function mapStateToProps({ auth }){
	return { auth };
}

export default connect(mapStateToProps, actions)(Header);