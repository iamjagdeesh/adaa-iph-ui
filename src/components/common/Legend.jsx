'use strict';

var React = require('react');
var d3 = require('d3');

module.exports = React.createClass({

  displayName: 'Legend',

  propTypes: {
    className:     React.PropTypes.string,
    colors:        React.PropTypes.func,
    colorAccessor: React.PropTypes.func,
    data:          React.PropTypes.array.isRequired,
    itemClassName: React.PropTypes.string,
    margins:       React.PropTypes.object,
    text:          React.PropTypes.string,
    width:         React.PropTypes.number.isRequired
  },

  getDefaultProps: function() {
    return {
      className:    'rd3-legend',
      colors:        d3.scale.category20c(),
      colorAccessor: (d, idx) => idx,
      itemClassName: 'rd3-legend-item',
      text:          '#ffffff'
    };
  },
    handleClick(clicked,valueID){
      this.props.legendSelectionCallback(clicked,valueID);  
    },

  render: function() {
      if(sessionStorage.getItem('arabic')== "true"){
            this.ar = true;
      }

    var props = this.props;

    var textStyle = {
      'color': 'black',
      'fontSize': '50%',
      'verticalAlign': 'top'
       
    };
      var legendStyle = {
      'float': 'left'
       
    };
      if(sessionStorage.getItem('arabic')== "true"){
        legendStyle = {
      'float': 'right'
       
    };  
      }

    var legendItems = [];

    props.data.forEach( (series, idx) => {
      var itemStyle = {
        'color': props.colors(props.colorAccessor(series, idx)),
        'lineHeight': '60%',
        'fontSize': '200%',
           /*'marginLeft':'50px',*/
        width: 8,
        height: 8,
        background:props.colors(props.colorAccessor(series, idx)),
        borderRadius: 50,
        marginTop: 2,
        marginRight: 10
      };
        
        var Styletext= {
        'fontSize':'14px',
        'color': 'white'
    };
        if(sessionStorage.getItem('arabic')== "true"){
            if(!series.country==""){
            var value= series.country;
            var valueID= series.countryId;
                var totalval=valueID+"_"+value;
             series.country=series.country+" "+props.itemClassName;
      /*if(sessionStorage.getItem('MainPillarSelectedCountyName')===value)
                 legendItems.push(
                  <div  className={`legendElement  ${value}`} style={legendStyle} key={idx} >
                      
                  <h2   style={Styletext}>{value} </h2>
                   <p   className={props.itemClassName} style={itemStyle}></p>      
                  </div>
           
       );
        else*/       
      legendItems.push(
                 <div  className={`legendElement  ${value}`}   style={legendStyle} key={idx} >
                     
                 <h2   style={Styletext}>{value} <p className={`closeCountryar  ${value}`} onClick={this.handleClick.bind(this,value,valueID)} >X</p></h2>
              <p   className={props.itemClassName} style={itemStyle}></p>
                 </div>
          
      );
            }
      }
        else
            {
              if(!series.country==""){
            var value= series.country;
            var valueID= series.countryId;
            var totalval=valueID+"_"+value;
             series.country=series.country+" "+props.itemClassName;
      /*if(sessionStorage.getItem('MainPillarSelectedCountyName')===value)
                 legendItems.push(
                  <div  className={`legendElement  ${value}`} style={legendStyle}  key={idx} dir={this.ar ? 'rtl' : 'ltr'}>
                      
                  <h2   style={Styletext}><p   className={props.itemClassName} style={itemStyle}></p>{value}</h2>
                  </div>
           
       );
        else */      
      legendItems.push(
                 <div  className={`legendElement  ${value}`}   style={legendStyle} key={idx} dir={this.ar ? 'rtl' : 'ltr'}>
                     
                 <h2   style={Styletext}><p   className={props.itemClassName} style={itemStyle}></p>{value} <p className={`closeCountryeng  ${value}`}  onClick={this.handleClick.bind(this,value,valueID)}>X</p></h2>
                 </div>
          
      );
            }  
            }

        

    });

    var topMargin = props.margins.top;

    var legendBlockStyle = {
      'wordWrap': 'break-word',
      'paddingLeft': '0',
      'marginBottom': '0',
      'marginTop': topMargin,
      'marginLeft': 10,
      'display':'inline-block',
      'maxHeight':70,
      'overflow':'auto'   
    };
      if(this.ar){
          legendBlockStyle = {
      'wordWrap': 'break-word',
      'paddingLeft': '0',
      'marginBottom': '0',
      'marginTop': topMargin,
      'marginLeft': 10,
      'display':'inline-block',
      'maxHeight':70,
      'overflow':'auto',
      'float': 'right'          
    };
      }
    return (
      <div dir={this.ar ? 'rtl' : 'ltr'}
        className={props.className}
        style={legendBlockStyle}
      >
        {legendItems}
      </div>
    );
  }

});
