'use strict';
var React = require('react');
var GridData=require('../grids/GridData');

module.exports = React.createClass({

  displayName: 'AxisTick',

  propTypes: {
    scale: React.PropTypes.func.isRequired,
    orient: React.PropTypes.oneOf(['top','bottom','left','right']).isRequired,
    orient2nd: React.PropTypes.oneOf(['top','bottom','left','right']),
    height: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    horizontal: React.PropTypes.bool,
    tickArguments : React.PropTypes.array,
    tickValues: React.PropTypes.array,
    innerTickSize: React.PropTypes.number,
    outerTickSize: React.PropTypes.number,
    tickPadding: React.PropTypes.number,
    tickFormat: React.PropTypes.func,
    tickStroke: React.PropTypes.string,
    gridHorizontal: React.PropTypes.bool,
    gridVertical: React.PropTypes.bool,
    gridHorizontalStroke: React.PropTypes.string,
    gridVerticalStroke: React.PropTypes.string,
    gridHorizontalStrokeWidth: React.PropTypes.number,
    gridVerticalStrokeWidth: React.PropTypes.number,
    gridHorizontalStrokeDash: React.PropTypes.string,
    gridVerticalStrokeDash: React.PropTypes.string
  },
  getDefaultProps() {
    return {
      innerTickSize: 6,
      outerTickSize: 6,
      tickStroke: '#000',
      tickPadding: 3,
      tickArguments: [10],
      tickValues: null,
      gridHorizontal: false,
      gridVertical: false,
      gridHorizontalStroke: '#D8D7D7',
      gridVerticalStroke: '#D8D7D7',
      gridHorizontalStrokeWidth: 1,
      gridVerticalStrokeWidth: 1,
      gridHorizontalStrokeDash: '5, 5',
      gridVerticalStrokeDash: '5, 5'
    };
  },

  render() {
    var props = this.props;

    var tr,
        ticks,
        scale,
        adjustedScale,
        textAnchor,
        textTransform,
        tickFormat,
        y1, y2, dy, x1, x2;

    var gridStrokeWidth,
        gridStroke,
        gridStrokeDashArray,
        x2grid,
        y2grid;
    var gridOn = false;

    var sign = props.orient === 'top' || props.orient === 'right' ? -1 : 1;
    var tickSpacing = Math.max(props.innerTickSize, 0) + props.tickPadding;

    scale = props.scale;

    if (props.tickValues) {
      ticks = props.tickValues;
    } else if (scale.ticks && props.axis=="Y") {
      ticks = scale.ticks.apply(scale, props.tickArguments);
        this.props.ColletTicks(ticks);
    } else {
      ticks = scale.domain();
        var tickeditor=[];
        tickeditor[0]=ticks[0];
        tickeditor[1]=ticks[1];
        var counter=0;
        for(var i=tickeditor[0];i<=tickeditor[1];i++){
            ticks[counter]=i;
            counter++;
        }
    }

    if (props.tickFormatting) {
        tickFormat = props.tickFormatting;
    } else if (scale.tickFormat) {
        tickFormat = scale.tickFormat.apply(scale, props.tickArguments);
    } else {
        tickFormat = (d)=> d;
    }

    adjustedScale = scale.rangeBand ? (d) => { return scale(d) + scale.rangeBand() / 2; } : scale;


    // Still working on this
    // Ticks and lines are not fully aligned
    // in some orientations
    switch (props.orient) {
      case 'top':
        tr = (tick) => `translate(${adjustedScale(tick)},0)`;
        textAnchor = "middle";
        y2 = props.innerTickSize * sign;
        y1 = tickSpacing * sign;
        dy =  sign < 0 ? "0em" : ".71em";
        x2grid = 0;
        y2grid = -props.height;
        break;
      case 'bottom':
        tr = (tick) => `translate(${adjustedScale(tick)},0)`;
        textAnchor = "middle";
        y2 = props.innerTickSize * sign;
        y1 = tickSpacing * sign;
        dy =  sign < 0 ? "0em" : ".71em";
        x2grid = 0;
        y2grid = -props.height;
        break;
      case 'left':
        tr = (tick) => `translate(0,${adjustedScale(tick)})`;
        textAnchor = "end";
        x2 = props.innerTickSize * -sign;
        x1 = tickSpacing * -sign;
        dy = ".32em";
        x2grid = props.width;
        y2grid = 0;
        break;
      case 'right':
        tr = (tick) => `translate(0,${adjustedScale(tick)})`;
        textAnchor = "start";
        x2 = props.innerTickSize * -sign;
        x1 = tickSpacing * -sign;
        dy = ".32em";
        x2grid = -props.width;
        y2grid = 0;
        break;
    }

    if (props.horizontalChart) {
      textTransform = "rotate(-90)";
      [y1, x1] = [x1, -y1 || 0];

      switch (props.orient) {
        case 'top':
          textAnchor = "start";
          dy = ".32em";
          break;
        case 'bottom':
          textAnchor = "end";
          dy = ".32em";
          break;
        case 'left':
          textAnchor = 'middle';
          dy = sign < 0 ? ".71em" : "0em";
          break;
        case 'right':
          textAnchor = 'middle';
          dy = sign < 0 ? ".71em" : "0em";
          break;
      }
    }

    if (props.gridHorizontal) {
      gridOn = true;
      gridStrokeWidth = props.gridHorizontalStrokeWidth;
      gridStroke = props.gridHorizontalStroke;
      gridStrokeDashArray = props.gridHorizontalStrokeDash;
    }
    else if (props.gridVertical) {
      gridOn = true;
      gridStrokeWidth = props.gridVerticalStrokeWidth;
      gridStroke = props.gridVerticalStroke;
      gridStrokeDashArray = props.gridVerticalStrokeDash;
    }

    // return grid line if grid is enabled and grid line is not on at same position as other axis.
    var gridLine = function(pos) {
      if (gridOn
        && !(props.orient2nd === 'left' && pos === 0)
        && !(props.orient2nd === 'right' && pos === props.width)
        && !((props.orient === 'left' || props.orient === 'right') && pos === props.height)
      ) {
        return (
          <line style={{
            strokeWidth: gridStrokeWidth,
            shapeRendering: 'crispEdges',
            stroke: gridStroke,
            strokeDasharray: gridStrokeDashArray
            }} x2={x2grid} y2={y2grid}></line>
        )
      }
    }

    var optionalTextProps = textTransform ? {
      transform: textTransform
    } : {};

    return (
    <g>
            {(this.props.axis=="Y") ? <GridData
                range={scale.domain()}                          
                ticks={ticks}
                yearLen={this.props.yearLen}
                countriesFilter={this.props.countriesFilter}
                yScale={this.props.yScale} 
                xScale={this.props.xScale}                          
                /> : null}
      {ticks.map( (tick, idx) => {
                var tick1=tick;
                if(tick>=1000000 && tick<1000000000)
                    {
                        tick=tick/1000000;
                        tick=tick.toString();
                        tick=tick+"M"
                    }
                if(tick>=1000000000)
                    {
                      tick=tick/1000000000;
                        tick=tick.toString();
                        tick=tick+"B"  
                    }
                tick=tick.toString();
                if(tick.length===4)
                    {
                        
                    }
                else if(tick.length>5 ){
                    if(tick>=9999 && tick<=10100){
                    tick="";
                        }
                    }
                if(tick>2000 && tick<2025){
                    if(tick.length>4 )
                        tick="";
                    
                    tick=tick.substring(0,4)
                }
                    else
                     tick=tick.substring(0,9)   
                
                
                
                        return (
          <g key={idx} id={tick} className="tick" transform={tr(tick1)} >
            
            <line style={{shapeRendering:'crispEdges',opacity:'1',stroke:props.tickStroke}} x2={x2} y2={y2} >
            </line>
            <text className={tick}
              strokeWidth="0.01"
              dy={dy} x={x1} y={y1}
              style={{stroke:"#ffffff", fill:"#ffffff"}}
              textAnchor={textAnchor}
              {...optionalTextProps}
            >
              {tick}
            </text>
          </g>
        );
        })
      }
    </g>
    );
  }

});
