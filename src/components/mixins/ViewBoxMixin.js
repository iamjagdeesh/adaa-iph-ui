
'use strict';

var React = require('react');
var svgHeight=0;

module.exports =  {

  propTypes: {
    viewBox:           React.PropTypes.string,
    viewBoxObject:     React.PropTypes.object
  },

  getViewBox() {
    if (this.props.viewBoxObject) {
      var v = this.props.viewBoxObject;
      return [v.x, v.y, v.width, v.height].join(' ');
    } else if (this.props.viewBox) {
      return this.props.viewBox;
    } 
  },

  getDimensions() {
    var props = this.props;
    var {horizontal, margins, viewBoxObject, xOrient, xAxisOffset, yAxisOffset} = props;
    var yOrient = this.getYOrient();

    var width, height;
    if (viewBoxObject) {
      width = viewBoxObject.width,
      height = viewBoxObject.height
    } else {
      width = props.width,
      height = props.height
    }

    var svgWidth;
    var xOffset, yOffset;
    var svgMargins;
    var trans;
    if (horizontal) {
      var center = width / 2;
      trans = `rotate(90 ${ center } ${ center }) `;
      svgWidth = height;
      svgHeight = width;
      svgMargins = {
        left: margins.top,
        top: margins.right,
        right: margins.bottom,
        bottom: margins.left
      };
    } else {
      trans = '';
      svgWidth = document.getElementById('root').offsetWidth/1.5 ;
        svgHeight = window.innerHeight/1.5;
      svgMargins = margins;
    }

    var xAxisOffset = Math.abs(props.xAxisOffset || 0);
    var yAxisOffset = Math.abs(props.yAxisOffset || 0);

    var xOffset = svgMargins.left + (yOrient === 'left' ? yAxisOffset : 0);
    var yOffset = svgMargins.top + (xOrient === 'top' ? xAxisOffset : 0);
    trans += `translate(${ xOffset }, ${ yOffset })`;

    return {
      innerHeight: svgHeight - svgMargins.top - svgMargins.bottom - xAxisOffset,
      innerWidth: svgWidth - svgMargins.left*1.2 - svgMargins.right*1.2 - yAxisOffset,// need to recheck it
      trans: trans,
      svgMargins: svgMargins
    };
  }

};
