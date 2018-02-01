'use strict';

var React = require('react');
var d3 = require('d3');
const { findDOMNode } = require('react-dom');
var {Tooltip} = require('../common');


module.exports = React.createClass({

  displayName: 'VoronoiCircle',

  getDefaultProps() {
    return { 
      circleRadius: 3,
      circleFill: '#1f77b4'    
    };
  },
  getInitialState() {
    return {
      right:0,
      top: 0, 
      circleRadius: this.props.circleRadius,
      circleFill: '#1f77b4',
      showTooltip:false   
    };
  },
    
animateCircle() {
    const rect = findDOMNode(this).getElementsByTagName('circle')[0].getBoundingClientRect();
    /*this.props.onMouseOver.call(this, rect.right, rect.top, this.props.dataPoint);*/
      if(this.props.yearLen.length>1){
    this.setState({
      right:rect.right,
      top:rect.top ,    
      circleRadius: this.props.circleRadius * (2),
      showTooltip:true, 
   
    },function(){
        if(this.state.showTooltip==true){
       this.props.toolTipCallback(true);
     this.props.toolTipCallbackforPoint(this.state.right,this.state.top,this.props.dataPoint);   
      }
    });
        document.getElementsByClassName(this.props.dataPoint.seriesName)[0].setAttribute('stroke-width',3);  
    }     
  },

  restoreCircle() {
    this.setState({    
      circleRadius: this.props.circleRadius,
      showTooltip:false,    
    });
    this.props.toolTipCallback(false); 
      document.getElementsByClassName(this.props.dataPoint.seriesName)[0].setAttribute('stroke-width',1); 
  },    

  render() {
      
      var classNaming="";
      if(this.props.yearLen.length>1)
          classNaming="rd3-linechart-circle";
      else
          classNaming="rd3-linechart-circle-single";
          
    return (
      <g>
        <circle
          onMouseOver={this.animateCircle}
          onMouseLeave={this.restoreCircle}
          onTouchStart={this.animateCircle }
        onTouchEnd ={this.restoreCircle}    
          cx={this.props.cx}
          cy={this.props.cy}
          r={this.state.circleRadius}
          fill={this.props.circleFill}
          className={classNaming}    
        />    
      </g>
    );
  },
});
