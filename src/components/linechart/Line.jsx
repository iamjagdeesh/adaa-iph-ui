'use strict';

var React = require('react');
const { findDOMNode } = require('react-dom');

module.exports = React.createClass({

  displayName: 'Line',

  propTypes: {
    fill: React.PropTypes.string,
    path: React.PropTypes.string,
    stroke: React.PropTypes.string,
    strokeWidth: React.PropTypes.number,
    strokeDashArray: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      stroke: '#3182bd',
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
_animateCircle(e) {
    const rect = document.getElementsByClassName(this.props.classnaming)[0].getBoundingClientRect();
    this.setState({
      strokeWidth: 3,strokeWidthSingle: 10, strokeWidthSingleBenchMark: 4,  
    });
    if(this.props.yearLen.length==1){
    this.props.toolTipCallback1(true);
    this.props.toolTipCallbackforPointSingle(e.screenX,e.screenY,this.props.data);    
        }
},
_restoreCircle() {
    this.setState({
      strokeWidth: 1,strokeWidthSingle: 5, strokeWidthSingleBenchMark: 2,   
    });
    if(this.props.yearLen.length==1)
    this.props.toolTipCallback1(false);
  },    
    

  render() {
      let handleMouseOver;
    let handleMouseLeave;
      let handleMouseOversingle;
      handleMouseOver = this._animateCircle;
      handleMouseOversingle = this._animateCircle;
      handleMouseLeave = this._restoreCircle;
    var props = this.props;
      var storkeWidthSingleYear=this.state.strokeWidthSingle;
      if(this.props.widthLine==1){
          if(this.props.data.countryId=='GLO' || this.props.data.countryId=='G20' || this.props.data.countryId=='GCC' || this.props.data.countryId=='ARA' || this.props.data.countryId=='OEC' )
          {
              storkeWidthSingleYear=this.state.strokeWidthSingleBenchMark;
          }
    return (
      <path 
        onMouseMove={handleMouseOversingle }
        onMouseLeave={handleMouseLeave}  
        d={props.path}
        stroke={props.stroke}
        strokeWidth={storkeWidthSingleYear}
        strokeDasharray={props.strokeDashArray}
        fill={props.fill}
        className={`rd3-linechart-path  ${props.classnaming}`}  
      />
    );}
      else
          return (          
      <path 
        onMouseOver={handleMouseOver }
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseOver }
        onTouchEnd ={handleMouseLeave}  
        d={props.path}
        stroke={props.stroke}
        strokeWidth={this.state.strokeWidth}
        strokeDasharray={props.strokeDashArray}
        fill={props.fill}
        className={`rd3-linechart-path  ${props.classnaming}`}  
                  
      />
    );
          
  } 

});
