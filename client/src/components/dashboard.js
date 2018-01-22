import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        //this.props.protectedTest();
    }
    
    componentWillMount() {
        if(this.props.auth.authenticated){
            this.props.currentUser();
        }
    }

    renderContent() {
        if(this.props.content) {
            return (
                <div>
                    <p>{this.props.content}</p>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderContent()}
                <button className="btn btn-primary" onClick={() => this.props.logoutUser()}>Logout</button>
            </div>
        );
    }
}

function mapStateToProps({ auth }){
    console.log( auth );
	return { auth };
}

export default connect(mapStateToProps, actions)(Dashboard);