'use strict';

var React = require('react');

module.exports = React.createClass({

  displayName: 'Grid',

  propTypes: {
    fill: React.PropTypes.string,
    path: React.PropTypes.string,
    stroke: React.PropTypes.string,
    strokeWidth: React.PropTypes.number,
    strokeDashArray: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      stroke: '#000000',
      fill: 'none',
      strokeWidth: 1,
      className: 'rd3-linechart-path',
      zIndex: 2    
    };
  },
  getInitialState() {
    return {
      strokeWidth: 1, 
      strokeWidthSingle: 5,
      strokeWidthSingleBenchMark: 2,  
    };
  },          
  render() {
    return (
      <path 
        d={this.props.path}
        stroke={this.props.stroke}
        strokeWidth="0.5"
        strokeDasharray={this.props.strokeDashArray}
        fill={this.props.fill}
        className="gridLines"  
      />
    );
          
  } 

});
