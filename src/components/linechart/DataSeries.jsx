'use strict';

var React = require('react');
var d3 = require('d3');
var VoronoiCircleContainer = require('./VoronoiCircleContainer');
var Line = require('./Line');

module.exports = React.createClass({

  displayName: 'DataSeries',

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
      hoverAnimation: false
    };
  },
    getInitialState() {
    return {
      dataPoint: [],
      showtooltip: false    
    };
  },
    toolTipCallback(check){  
        this.setState({showtooltip:check});
      this.props.toolTipCallback(check);  
    },
    toolTipCallback1(check){
        this.setState({showtooltip:check});
      this.props.toolTipCallback1(check);  
    }, 
    toolTipCallbackforPoint(right,top,dataPoint){
        this.setState({dataPoint:dataPoint});
    this.props.toolTipCallbackforPoint(right,top,dataPoint);
        },
     toolTipCallbackforPointSingle(right,top,dataPoint){
         this.setState({dataPoint:dataPoint});
    this.props.toolTipCallbackforPointSingle(right,top,dataPoint);
        },
    componentDidMount(){
     if(document.getElementsByClassName('9999')[0])
            document.getElementsByClassName('9999')[0].textContent="";    
    },
    componentDidUpdate(){
     if(document.getElementsByClassName('9999')[0])
            document.getElementsByClassName('9999')[0].textContent="";    
    },
  
  _isDate(d, accessor) {
      return Object.prototype.toString.call(accessor(d)) === '[object Date]';
  },

  render() {
    var props = this.props;
    var xScale = props.xScale;
    var yScale = props.yScale;
    var xAccessor = props.xAccessor,
        yAccessor = props.yAccessor,
        y1Accessor = props.y1Accessor;
      
    
    var interpolatePath = d3.svg.line()
        .y( (d) => props.yScale(yAccessor(d)) )
        .interpolate("monotone" );

        if (this._isDate(props.data[0].values[0], xAccessor)) {
          interpolatePath.x(function(d) {
            return props.xScale(props.xAccessor(d).getTime());
          });
        } else {
          interpolatePath.x(function(d) {
            return props.xScale(props.xAccessor(d));
          });
        }
    var lines = props.data.map((series, idx) => {
        if(series.countryId=="GLO" || series.countryId=="G20" || series.countryId=="GCC" || series.countryId=="ARA" || series.countryId=="OEC" )
            {
                var strokeDashArraying="5,5"
            }
        else
            {
               var strokeDashArraying=""  
            }
      return (
        <Line 
          toolTipCallback1={this.toolTipCallback1}    
          path={interpolatePath(series.values)}
          stroke={props.colors(props.colorAccessor(series, idx))}
          strokeWidth={series.strokeWidth}
          strokeDashArray={strokeDashArraying}
          seriesName={series.name}
          key={idx}
          widthLine={props.widthLine} 
          classnaming={props.data[idx].country}
           yearLen={props.yearLen}
            data={props.data[idx]}
            toolTipCallbackforPointSingle={this.toolTipCallbackforPointSingle}
            datapoint={this.state.dataPoint}
            showtooltip={this.state.showtooltip}
        />
      );
    });

    var voronoi = d3.geom.voronoi()
      .x(function(d){ return xScale(d.coord.x); })
      .y(function(d){ return yScale(d.coord.y); })
      .clipExtent([[0, 0], [ props.width , props.height]]);

    var cx, cy,cy1, circleFill;
      var valuesFinal=props.value;
      /*if(this.props.yearLen.length===1)
          {
              var length=valuesFinal.length;
              for(var i=0;i<length;i++)
                  valuesFinal[i].series.values.pop(0);
                  if(valuesFinal[i])
              if(valuesFinal[i].series.name==="na")
                  valuesFinal.pop(i);
              props.circleRadius/3;
          }*/
      var lengthArray=voronoi(valuesFinal).length;
    var regions = voronoi(valuesFinal).map(function(vnode, idx) {
        var colorer=-1;
      var point = vnode.point.coord;
      if (Object.prototype.toString.call(xAccessor(point)) === '[object Date]') {
        cx = props.xScale(xAccessor(point).getTime());
      } else {
        cx = props.xScale(xAccessor(point));
      }
      if (Object.prototype.toString.call(yAccessor(point)) === '[object Date]') {
        cy = props.yScale(yAccessor(point).getTime());
        cy1 = props.yScale(y1Accessor(point).getTime());  
      } else {
        cy = props.yScale(yAccessor(point));
        cy1 = props.yScale(y1Accessor(point));  
      }
      circleFill = props.colors(props.colorAccessor(vnode, vnode.point.seriesIndex));
        circleFill='rgb(169, 169, 169)';
        if(props.data[idx])
        if(props.data[idx].values[1])
        /*if(props.data[idx].values[1].z){
            if(idx!=0 && idx!=lengthArray-1){
            var y=Number(props.data[idx].values[1].z);
            if(y<0)
                circleFill='rgb(169, 169, 169)';
            if(y>=0 && y<=0.49)
                circleFill='#e12d2d';
            else if(y>=0.50 && y<=0.99)
                circleFill='#eb5541';
            else if(y>=1 && y<=1.49)
                circleFill='#FE8523';
            else if(y>=1.50 && y<=1.99)
                circleFill='#FFA019';
            else if(y>=2 && y<=2.49)
                circleFill='#FFC000';
            else if(y>=2.50 && y<=2.99)
                circleFill='#F2D616';
            else if(y>=3 && y<=3.49)
                circleFill='#BDD72A';
            else if(y>=3.50 && y<=3.99)
                circleFill='#8DBE6D';
            else if(y>=4 && y<=4.49)
                circleFill='#00B386';
            else if(y>=4.50 && y<=5)
                circleFill='#009A8D';
        }
            }*/
        if(props.data[idx])
        if(props.data[idx].values[1])
        if(props.data[idx].values[1].z){
          colorer= Number(vnode.point.series.values[1].z); 
        }
      if(this.props.yearLen.length>1 && this.props.countryLen.length>0){
          var countryCount=lengthArray/this.props.yearLen.length;
          var yearCount=lengthArray/countryCount;
          var county1Value=idx%yearCount;
      return (
          <VoronoiCircleContainer 
              toolTipCallback={this.toolTipCallback}
              key={idx} 
              circleFill={circleFill}
              vnode={vnode}
              hoverAnimation={props.hoverAnimation}
              cx={cx} cy={cy} 
              circleRadius={3}
              onMouseOver={props.onMouseOver}
              onTouchStart={props.onMouseOver}
              dataPoint={{xValue: xAccessor(point), yValue: yAccessor(point), seriesName: vnode.point.series.country, coloring:circleFill }}
              yearLen={props.yearLen}
              toolTipCallbackforPoint={this.toolTipCallbackforPoint} 
          />
      );
          }
        else if(vnode.point.series.values[1])
            return null;
    }.bind(this));
      

    return (
      <g>
        <g>{lines}</g>
        <g>{regions}</g>          
      </g>
    );
  }

});
