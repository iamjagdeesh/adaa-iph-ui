'use strict';

const React = require('react');

module.exports = React.createClass({

  propTypes: {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    child: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.element,
    ]),
    child1: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.element,
    ]),  
    show: React.PropTypes.bool,
  },
    

  render() {
      var scoreColor='rgb(169, 169, 169)';
    const props = this.props;
    var display = this.props.show ? 'inherit' : 'none';
      /*if(this.props.yearLen.length>1)
          display=this.props.showTooltip ? 'inherit' : 'none';*/
    var containerStyles = {
      position: 'fixed',
      top: props.y-75,
      left: props.x,
      display,
      opacity: 0.8,
      zIndex: 9999,       
    };
      if(sessionStorage.getItem('arabic')== "true"){
          this.ar = true;
      }

    // TODO: add 'right: 0px' style when tooltip is off the chart
    const tooltipStyles = {
      position: 'absolute',
      backgroundColor: '#000',
      minWidth: '150px',    
      padding: '10px',
      marginLeft: '10px',
      marginRight: '10px',
      marginTop: '-15px',
      maxWidth: '200px'
      /*  position: absolute;
    background-color: ;
    moz-opacity: 0.80;
    opacity: 0.80;
    filter: alpha(opacity=80);
    border-radius: 4px;
    padding: 20px;
    z-index: 1000;
    max-width: 200px;
    display: block !important;
    color: #0892b7;
    font-size: 20px;
    font-weight: bold;
      */
    };
      if(props.color){
            var y=props.color;
            if(y<0)
                scoreColor='rgb(169, 169, 169)';
            if(y>=0 && y<=0.49)
                scoreColor='#e12d2d';
            else if(y>=0.50 && y<=0.99)
                scoreColor='#eb5541';
            else if(y>=1 && y<=1.49)
                scoreColor='#FE8523';
            else if(y>=1.50 && y<=1.99)
                scoreColor='#FFA019';
            else if(y>=2 && y<=2.49)
                scoreColor='#FFC000';
            else if(y>=2.50 && y<=2.99)
                scoreColor='#F2D616';
            else if(y>=3 && y<=3.49)
                scoreColor='#BDD72A';
            else if(y>=3.50 && y<=3.99)
                scoreColor='#8DBE6D';
            else if(y>=4 && y<=4.49)
                scoreColor='#00B386';
            else if(y>=4.50 && y<=5)
                scoreColor='#009A8D';
        }
      var country="";
      if(this.props.yearLen.length==1)
      country=this.props.dataPoint.country.replace(' rd3-legend-item','');
      else if(this.props.yearLen.length>1)
        country=this.props.dataPoint.seriesName.replace(' rd3-legend-item','');  
      var stringatt="rd3-linechart-path  "+country+" rd3-legend-item";
      if(document.getElementsByClassName(stringatt)[0])
      scoreColor=document.getElementsByClassName(stringatt)[0].getAttribute('stroke');
      const tipColoring = {
      color: scoreColor,
      };
          if(this.props.yearLen.length===1){
              if(1){
               return (
      <div style={containerStyles} dir={this.ar ? 'rtl' : 'ltr'}>
        <div className={`toolTip  ${country.replace(' rd3-legend-item','')}`} style={tooltipStyles}>
            <div className="tipCoutryName">{country.replace(' rd3-legend-item','')}</div>
           
            <div className={`toolTipColor  ${country.replace(' rd3-legend-item','')}`} style={tipColoring}>{this.props.dataPoint.values[1].y1}/{sessionStorage.getItem('denominator')}</div>
        </div>
      </div>
    );
                  
              }
              else return null;
          }
      else
    return (
      <div style={containerStyles} dir={this.ar ? 'rtl' : 'ltr'}>
        <div className={`toolTip  ${country}`} style={tooltipStyles}>
            <div className="tipCoutryName">{country}</div>
            <div className={`toolTipColor  ${country.replace(' rd3-legend-item','')}`} style={tipColoring}>{this.props.dataPoint.yValue}/{sessionStorage.getItem('denominator')}</div>
        </div>
      </div>
    );
  },
});
