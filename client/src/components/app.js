import React, { Component } from 'react';

class App extends Component {
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

export default App;