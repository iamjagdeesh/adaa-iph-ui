import React, { Component,PropTypes } from 'react';

class App extends Component {
  render() {
    return (
         <div className="container-fluid">                
                {this.props.children}
            </div>
    );
  }
}
App.PropTypes = {
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

export default App;
