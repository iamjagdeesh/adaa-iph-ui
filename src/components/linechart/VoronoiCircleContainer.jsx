'use strict';

const React = require('react');
const { findDOMNode } = require('react-dom');
const shade = require('../utils').shade;
const VoronoiCircle = require('./VoronoiCircle');


module.exports = React.createClass({

  displayName: 'VornoiCircleContainer',

  propTypes: {
    circleRadius: React.PropTypes.any,
    circleFill: React.PropTypes.any,
    onMouseOver: React.PropTypes.any,
    dataPoint: React.PropTypes.any,
  },

  getDefaultProps() {
    return {
      circleRadius: 3,
      circleFill: '#1f77b4',
      hoverAnimation: true,
    };
  },

  getInitialState() {
    return {
      circleRadius: this.props.circleRadius,
      circleFill: this.props.circleFill,
      right: 0,
      top:0,    
          
    };
  },
   /* componentDidMount(){
        if(document.getElementsByClassName('rd3-linechart-circle')){
            var length=document.getElementsByClassName('rd3-linechart-circle').length;
            for(var i=0;i<length;i++){
                if(this.props.yearLen.length==1)
                document.getElementsByClassName('rd3-linechart-circle')[i].setAttribute('r',1.5);
            }
            }
    },
    componentDidUpdate(){
        if(document.getElementsByClassName('rd3-linechart-circle')){
            var length=document.getElementsByClassName('rd3-linechart-circle').length;
            for(var i=0;i<length;i++){
                if(this.props.yearLen.length==1)
                document.getElementsByClassName('rd3-linechart-circle')[i].setAttribute('r',1.5);
            }
            }
    },*/
toolTipCallback(check){
      this.props.toolTipCallback(check);  
    },
    toolTipCallbackforPoint(right,top,dataPoint){
    this.props.toolTipCallbackforPoint(right,top,dataPoint);
        },

  _animateCircle() {
    const rect = findDOMNode(this).getElementsByTagName('circle')[0].getBoundingClientRect();
    this.props.onMouseOver.call(this, rect.right, rect.top, this.props.dataPoint);
      if(this.props.yearLen.length>1)
    this.setState({   
    });
  },

  _restoreCircle() {
    this.setState({
          
    });
  },

  _drawPath(d) {
    if (d === undefined) {
      return 'M Z';
    }
    return `M${d.join(',')}Z`;
  },

  render() {
    const props = this.props;

    // animation controller
    let handleMouseOver;
    let handleMouseLeave;
    if (props.hoverAnimation) {
      handleMouseOver = this._animateCircle;
      handleMouseLeave = this._restoreCircle;
    } else {
      handleMouseOver = handleMouseLeave = null;
    }

    return (
      <g>
        <VoronoiCircle
          handleMouseOver={handleMouseOver}
          handleMouseLeave={handleMouseLeave}
          onTouchStart={handleMouseOver }
        onTouchEnd ={handleMouseLeave}    
          voronoiPath={this._drawPath(props.vnode)}
          cx={props.cx}
          cy={props.cy}
          circleRadius={this.state.circleRadius}
          circleFill={this.state.circleFill}
          yearLen={props.yearLen}
          toolTipCallback={this.toolTipCallback}
          dataPoint={this.props.dataPoint}
          toolTipCallbackforPoint={this.toolTipCallbackforPoint}    
        />    
      </g>
    );
  },
});