'use strict';

const React = require('react');

module.exports = {

  propTypes: {
    showTooltip: React.PropTypes.bool,
    tooltipFormat: React.PropTypes.func,
    tooltipFormat1: React.PropTypes.func,  
  },

  getDefaultProps() {
    return {
      showTooltip: true,
      tooltipFormat: (d) => String(d.yValue,d.seriesName),
      tooltipFormat1: (d) => String(d.y1Value,d.seriesName),    
    };
  },

  getInitialState() {
    return {
      tooltip: {
        x: 0,
        y: 0,
        child: '',
        child1: '',  
        country: '',  
        show: false,
        color: -1  
      },
      changeState: false,
    };
  },

  componentWillReceiveProps() {
    this.setState({
      changeState: false,
    });
  },

  onMouseOver(x, y, dataPoint) {
    if (!this.props.showTooltip) {
      return;
    }
    this.setState({
      tooltip: {
        x,
        y,
        child: this.props.tooltipFormat.call(this, dataPoint),
        child1: this.props.tooltipFormat1.call(this, dataPoint),  
        country:    dataPoint.seriesName,  
        show: true,
        color: dataPoint.coloring
      },
      changeState: true,
    });
  },

  onMouseLeave() {
    if (!this.props.showTooltip) {
      return;
    }
    this.setState({
      tooltip: {
        x: 0,
        y: 0,
        child: '',
        child1: '',        
        country:'',  
        show: false,
        color: -1 
      },
      changeState: true,
    });
  },
};
