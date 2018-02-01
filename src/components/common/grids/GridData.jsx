'use strict';

var React = require('react');
var d3 = require('d3');
var Grid = require('./Grid');

module.exports = React.createClass({

  displayName: 'GridData',

  propTypes: {
    color: React.PropTypes.func,
    colorAccessor: React.PropTypes.func,
    data: React.PropTypes.array,
    interpolationType: React.PropTypes.string,
    xAccessor: React.PropTypes.func,
    yAccessor: React.PropTypes.func,
     y1Accessor: React.PropTypes.func,  
    hoverAnimation: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      data: [],
      xAccessor: (d) => d.x,
      yAccessor: (d) => d.y,
      y1Accessor: (d) => d.y1,    
      interpolationType: 'linear',
      hoverAnimation: false,
    };
  },
    getInitialState() {
    return {
      dataPoint: [],
      showtooltip: false    
    };
  },
  
  _isDate(d, accessor) {
      return Object.prototype.toString.call(accessor(d)) === '[object Date]';
  },

  render() {
       var data= [];
      var initialData={
        name: "na",
        values: [ { x: 9999, y: 0 },{ x: 9999, y: 0 } ],
      };
       data.push(initialData);// adding dummy data for x-axis formatting  
      
      for(var i=0; i< this.props.ticks.length; i++){
          var sitePersonel = {};
          var values = []
          sitePersonel.values = values;
          sitePersonel.country="";
          for(var i1=0;i1<2;i1++){
        var x = i+10000;
              if( i1==0 && this.props.yearLen.length==1)
                  x = 10000-1;
              if( i1==1 && this.props.yearLen.length==1)
                  x=10000+this.props.countriesFilter;
              if( i1==0 && this.props.yearLen.length>1)
                  x = this.props.yearLen[0];
              if( i1==1 && this.props.yearLen.length>1)
                  x=this.props.yearLen[this.props.yearLen.length-1];
              var y=this.props.ticks[i];
                 var value = {
            "x":x,         
          "y": y,             
        }
                 sitePersonel.values.push(value);
               var widthLine=1;
                 }
           var x=[];
      x={sitePersonel};
      data.push(sitePersonel); 
               }
      if(this.props.yearLen.length>1)
      for(var i=0; i< this.props.yearLen.length; i++){
          var sitePersonel = {};
          var values = []
          sitePersonel.values = values;
          sitePersonel.country="";
          var x= this.props.yearLen[i];
          var y=0;
          for(var ranger=0;ranger<2;ranger++){
              if( ranger==0 )
                  y=this.props.range[0];
              else
                  y=this.props.range[1];
                 var value = {
            "x":x,         
          "y": y,             
        }
                 sitePersonel.values.push(value);
               var widthLine=1;
                 }
           var x=[];
      x={sitePersonel};
      data.push(sitePersonel); 
               }
        
        
    var props = this.props;
    var xScale = props.xScale;
    var yScale = props.yScale;
    var xAccessor = props.xAccessor,
        yAccessor = props.yAccessor,
        y1Accessor = props.y1Accessor;
      
    
    var interpolatePath = d3.svg.line()
        .y( (d) => props.yScale(yAccessor(d)) )
        .interpolate("monotone" );

        if (this._isDate(data[0].values[0], xAccessor)) {
          interpolatePath.x(function(d) {
            return props.xScale(props.xAccessor(d).getTime());
          });
        } else {
          interpolatePath.x(function(d) {
            return props.xScale(props.xAccessor(d));
          });
        }
    var lines = data.map((series, idx) => {
        if(series.countryId=="GLO" || series.countryId=="G20" || series.countryId=="GCC" || series.countryId=="ARA" || series.countryId=="OEC" )
            {
                var strokeDashArraying="5,5"
            }
        else
            {
               var strokeDashArraying=""  
            }
      return (
        <Grid 
          toolTipCallback1={this.toolTipCallback1}    
          path={interpolatePath(series.values)}
          stroke="#000000"
          strokeWidth={series.strokeWidth}
          strokeDashArray={strokeDashArraying}
          seriesName={series.name}
          key={idx}
          widthLine={props.widthLine} 
          classnaming={data[idx].country}
           yearLen={props.yearLen}
            data={data[idx]}
            toolTipCallbackforPointSingle={this.toolTipCallbackforPointSingle}
            datapoint={this.state.dataPoint}
            showtooltip={this.state.showtooltip}
        />
      );
    });

      

    return (
      <g>
        <g>{lines}</g>          
      </g>
    );
  }

});
