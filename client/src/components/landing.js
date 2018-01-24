import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class Landing extends Component {
    render() {
        return (
            <div>
                <p>Project Luisa</p>
                <div className="container">
                    {this.props.children}
                </div>
                
                <p>Footer here</p>
            </div>
        );
    }
}

export default Landing;