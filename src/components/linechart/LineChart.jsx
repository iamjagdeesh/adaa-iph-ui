'use strict';
import '../graphics/graphics.css';
var React = require('react');
var d3 = require('d3');
var { Chart, XAxis, YAxis, Tooltip} = require('../common');
var DataSeries = require('./DataSeries');
var utils = require('../utils');
var { CartesianChartPropsMixin, DefaultAccessorsMixin, ViewBoxMixin, TooltipMixin } = require('../mixins');
var Legend=require('../common/Legend');
var removeCountry=0;
import jQuery from 'jquery';
import myConfig from '../../conf.js'

var conf= myConfig;
module.exports = React.createClass({

  mixins: [ CartesianChartPropsMixin, DefaultAccessorsMixin, ViewBoxMixin, TooltipMixin ],

  displayName: 'LineChart',

  propTypes: {
    circleRadius:   React.PropTypes.number,
    hoverAnimation: React.PropTypes.bool,
    margins:        React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      jsonData: [],    
      circleRadius:    3,
      className: 'rd3-linechart',
      hoverAnimation: true,
      margins:        {top: 10, right: 20, bottom: 50, left: 45},
      years: [],    
      xAxisClassName: 'rd3-linechart-xaxis',
      yAxisClassName: 'rd3-linechart-yaxis',
      data: [
    ],
    };
  },
    getInitialState(){
      return{
          dataURL : conf.apiUrl+"countryList?locale=en",
        data: [
    ],
          width:document.getElementById('root').offsetWidth/1.5,
          countryMapper: [],
          countries: [],
          tipenable: false,
          right: 0,
          top: 0,
          dataPoint: [],
          rightsingle: 0,
          topsingle: 0,
          dataPointsingle: [],
      }},
    componentDidMount(){
        if(this.props.years.length==1){
            if(document.getElementsByClassName('9999')[0])
            document.getElementsByClassName('9999')[0].textContent="";// inital value 99999 made null
        for(var i=0;i<this.state.countries.length;i++){
            var i1=10000+i;
            var country=this.state.countries[i];
            if(country.length==1)
            var y = "this.jsonData[this.props.years[0]].groups["+country+"].groupWeightedScore";
            else
            var y = "this.jsonData[this.props.years[0]].areas."+country+".value";
            var color="";
                        if(eval(y)<0)
                color='rgb(169, 169, 169)';
            if(eval(y)>=0 && eval(y)<=0.49)
                color='#e12d2d';
            else if(eval(y)>=0.50 && eval(y)<=0.99)
                color='#eb5541';
            else if(eval(y)>=1 && eval(y)<=1.49)
                color='#FE8523';
            else if(eval(y)>=1.50 && eval(y)<=1.99)
                color='#FFA019';
            else if(eval(y)>=2 && eval(y)<=2.49)
                color='#FFC000';
            else if(eval(y)>=2.50 && eval(y)<=2.99)
                color='#F2D616';
            else if(eval(y)>=3 && eval(y)<=3.49)
                color='#BDD72A';
            else if(eval(y)>=3.50 && eval(y)<=3.99)
                color='#8DBE6D';
            else if(eval(y)>=4 && eval(y)<=4.49)
                color='#00B386';
            else if(eval(y)>=4.50 && eval(y)<=5)
                color='#009A8D';
            if(country.length==1){
                color='rgb(169, 169, 169)';
                if(country==0)
                      country="";
                 else if(country==1)
                      country="";
                 else if(country==2)
                      country="";
                 else if(country==3)
                      country="";
                 else if(country==4)
                      country="";
            }
            document.getElementsByClassName('rd3-linechart-path')[i+1].setAttribute('stroke',color);
            document.getElementsByClassName('rd3-legend-item')[i].style.color=color;
            document.getElementsByClassName('rd3-legend-item')[i].style.background=color;
            
            if(document.getElementsByClassName(i1)[0])
        document.getElementsByClassName(i1)[0].textContent=country;
        }}
        
        if(this.props.years.length>1){
        for(var i=0;i<this.state.countries.length;i++){
            var country=this.state.countries[i];
            var maxValue=0;
            if(country.length==1){
                for(var yearCount=0;yearCount<this.props.years.length;yearCount++){
                    var y = "this.jsonData[this.props.years[yearCount]].groups["+country+"].groupWeightedScore";
                    y=eval(y);
                    if(y>maxValue)
                    maxValue=y;
            }}
            else{
                for(var yearCount=0;yearCount<this.props.years.length;yearCount++){
                    var y = "this.jsonData[this.props.years[yearCount]].areas."+country+".value";
                    y=eval(y);
                    if(y>maxValue)
                        maxValue=y;
            }}
            var color="";
                        if(maxValue===0)
                color='rgb(169, 169, 169)';
            if(maxValue>0 && maxValue<=0.49)
                color='#e12d2d';
            else if(maxValue>=0.50 && maxValue<=0.99)
                color='#eb5541';
            else if(maxValue>=1 && maxValue<=1.49)
                color='#FE8523';
            else if(maxValue>=1.50 && maxValue<=1.99)
                color='#FFA019';
            else if(maxValue>=2 && maxValue<=2.49)
                color='#FFC000';
            else if(maxValue>=2.50 && maxValue<=2.99)
                color='#F2D616';
            else if(maxValue>=3 && maxValue<=3.49)
                color='#BDD72A';
            else if(maxValue>=3.50 && maxValue<=3.99)
                color='#8DBE6D';
            else if(maxValue>=4 && maxValue<=4.49)
                color='#00B386';
            else if(maxValue>=4.50 && maxValue<=5)
                color='#009A8D';
            if(country.length==1){
                color='rgb(169, 169, 169)';
                if(country==0)
                      country="GLO";
                 else if(country==1)
                      country="G20";
                 else if(country==2)
                      country="GCC";
                 else if(country==3)
                      country="ARA";
                 else if(country==4)
                      country="OEC";
            }
            document.getElementsByClassName('rd3-linechart-path')[i].setAttribute('stroke',color);
            document.getElementsByClassName('rd3-legend-item')[i].style.color=color;
            document.getElementsByClassName('rd3-legend-item')[i].style.background=color;
        }}
        
        
        var i1=10000+i;
        if(document.getElementsByClassName(i1)[0])
            document.getElementsByClassName(i1)[0].textContent="";// final value 99999 made null
        /*window.addEventListener("resize", this.updateDimensions);*/
    },
    componentDidUpdate(){
        if(this.props.years.length==1){
            if(document.getElementsByClassName('9999')[0])
            document.getElementsByClassName('9999')[0].textContent="";// inital value 99999 made null
        for(var i=0;i<this.state.countries.length;i++){
            var i1=10000+i;
            var country=this.state.countries[i];
            if(country.length==1)
            var y = "this.jsonData[this.props.years[0]].groups["+country+"].groupWeightedScore";
            else
            var y = "this.jsonData[this.props.years[0]].areas."+country+".value";
            var color="";
                        if(eval(y)<0)
                color='rgb(169, 169, 169)';
            if(eval(y)>=0 && eval(y)<=0.49)
                color='#e12d2d';
            else if(eval(y)>=0.50 && eval(y)<=0.99)
                color='#eb5541';
            else if(eval(y)>=1 && eval(y)<=1.49)
                color='#FE8523';
            else if(eval(y)>=1.50 && eval(y)<=1.99)
                color='#FFA019';
            else if(eval(y)>=2 && eval(y)<=2.49)
                color='#FFC000';
            else if(eval(y)>=2.50 && eval(y)<=2.99)
                color='#F2D616';
            else if(eval(y)>=3 && eval(y)<=3.49)
                color='#BDD72A';
            else if(eval(y)>=3.50 && eval(y)<=3.99)
                color='#8DBE6D';
            else if(eval(y)>=4 && eval(y)<=4.49)
                color='#00B386';
            else if(eval(y)>=4.50 && eval(y)<=5)
                color='#009A8D';
            if(country.length==1 && !(sessionStorage.getItem('arabic')== "true")){
                color='rgb(169, 169, 169)';
                if(country==0)
                      country="";
                 else if(country==1)
                      country="";
                 else if(country==2)
                      country="";
                 else if(country==3)
                      country="";
                 else if(country==4)
                      country="";
            }
            else if(country.length==1 && (sessionStorage.getItem('arabic')== "true")){
                color='rgb(169, 169, 169)';
                if(country==0)
                      country="";
                 else if(country==1)
                      country="";
                 else if(country==2)
                      country="";
                 else if(country==3)
                      country="";
                 else if(country==4)
                      country="";
            }
            document.getElementsByClassName('rd3-linechart-path')[i+1].setAttribute('stroke',color);
            document.getElementsByClassName('rd3-legend-item')[i].style.color=color;
            document.getElementsByClassName('rd3-legend-item')[i].style.background=color;
            if(document.getElementsByClassName(i1)[0])
        document.getElementsByClassName(i1)[0].textContent=country;
        }}
         if(this.props.years.length>1){
        for(var i=0;i<this.state.countries.length;i++){
            var country=this.state.countries[i];
            var maxValue=0;
            if(country.length==1){
                for(var yearCount=0;yearCount<this.props.years.length;yearCount++){
                    var y = "this.jsonData[this.props.years[yearCount]].groups["+country+"].groupWeightedScore";
                    y=eval(y);
                    if(y>maxValue)
                    maxValue=y;
            }}
            else{
                for(var yearCount=0;yearCount<this.props.years.length;yearCount++){
                    var y = "this.jsonData[this.props.years[yearCount]].areas."+country+".value";
                    y=eval(y);
                    if(y>maxValue)
                        maxValue=y;
            }}
            var color="";
                        if(maxValue===0)
                color='rgb(169, 169, 169)';
            if(maxValue>0 && maxValue<=0.49)
                color='#e12d2d';
            else if(maxValue>=0.50 && maxValue<=0.99)
                color='#eb5541';
            else if(maxValue>=1 && maxValue<=1.49)
                color='#FE8523';
            else if(maxValue>=1.50 && maxValue<=1.99)
                color='#FFA019';
            else if(maxValue>=2 && maxValue<=2.49)
                color='#FFC000';
            else if(maxValue>=2.50 && maxValue<=2.99)
                color='#F2D616';
            else if(maxValue>=3 && maxValue<=3.49)
                color='#BDD72A';
            else if(maxValue>=3.50 && maxValue<=3.99)
                color='#8DBE6D';
            else if(maxValue>=4 && maxValue<=4.49)
                color='#00B386';
            else if(maxValue>=4.50 && maxValue<=5)
                color='#009A8D';
            if(country.length==1){
                color='rgb(169, 169, 169)';
                if(country==0)
                      country="GLO";
                 else if(country==1)
                      country="G20";
                 else if(country==2)
                      country="GCC";
                 else if(country==3)
                      country="ARA";
                 else if(country==4)
                      country="OEC";
            }
            document.getElementsByClassName('rd3-linechart-path')[i].setAttribute('stroke',color);
            document.getElementsByClassName('rd3-legend-item')[i].style.color=color;
            document.getElementsByClassName('rd3-legend-item')[i].style.background=color;
        }}
        var i1=10000+i;
        if(document.getElementsByClassName(i1)[0])
            document.getElementsByClassName(i1)[0].textContent="";// final value 99999 made null
        /*window.addEventListener("resize", this.updateDimensions);*/
    },
    /**
    * Get the country selected in the legend and push it to graphs
    */
    legendSelectionCallback(clicked,valueID){
        removeCountry=1;
      this.props.legendSelectionCallback(clicked,valueID);  
    },
    toolTipCallback(check){
      this.setState({tipenable:check});
    },
    toolTipCallback1(check){
      this.setState({tipenable:check});
    },
    toolTipCallbackforPoint(right,top,dataPoint){
        this.setState({right:right,top:top,dataPoint:dataPoint});
        },
    toolTipCallbackforPointSingle(right,top,dataPoint){
        this.setState({rightsingle:right,topsingle:top,dataPointsingle:dataPoint});
        },
    /**
    * This function is used for rendering.
    */
    updateDimensions: function() {
        this.setState({width:document.getElementById('root').offsetWidth/1.5 });
    },

  _calculateScales: utils.calculateScales,
    
    addData(data1){
      this.setState({data:data1});  
    },

  render() {
                                var countriesMap={};
                                var countryId="";
                                var country_array = sessionStorage.getItem('countriesAll');
                                country_array = JSON.parse(country_array);
                                for (var i = 0; i < country_array.length; i++) {
                                                var tempo = country_array[i];
                                                countriesMap[tempo.value] = tempo.label;
                                }
                
      if(removeCountry===0)
      this.state.countries=this.props.countries;
      if(this.state.countries.includes("")) // pop out if the country value is "";
         this.state.countries.pop (this.state.countries.indexOf(""));
      if(this.state.countries.includes("null"))  // pop null values that come when the default country is only sent without the compared countries
          this.state.countries.pop(this.state.countries.indexOf("null"));
      this.jsonData=JSON.parse(sessionStorage.getItem('countriesData'))
      var length=this.props.data.length;
    for(var counter=0;counter<length;counter++)
    {this.props.data.pop(0);}
      var props = this.props;
     var widthLine=0;
      var xlabel="";
      var ylabel=sessionStorage.getItem('denominator');
      if(props.years.length>1 && this.state.countries.length>=1 )
          { 
              xlabel="Years";
              if(sessionStorage.getItem('arabic')== "true"){
                  xlabel= 'سنة';
              }
      var flagWorldGroup=0;
      var addCountry= props.Benchmarksclicked;
      this.state.years=this.props.years;    
      for(var i=0; i< this.state.countries.length; i++){
          if(props.years.length===0)
              break;
          if(this.state.countries[i]=="")
              continue;
          var sitePersonel = {};
          var values = []
          sitePersonel.values = values;
          for(var i1=0;i1<props.years.length;i1++){
        var x = props.years[i1];
        var country=this.state.countries[i];
              if(country.length===2){
              var z="this.jsonData[x].areas."+country;     
              if(eval(z)==undefined)
                  var y=0;
                  else{
        var y = "this.jsonData[x].areas."+country+".dataValue";
        var y1 = "this.jsonData[x].areas."+country+".score";              
        var z = "this.jsonData[this.props.years[0]].areas."+country+".value";              
                                if(eval(y)==null)
                      y=0;
                      if(eval(y1)==null)
                      y1=0;
                      if(eval(z)==null)
                      z=0;
                  }
              }
              else{
              if(country.length==1){
                  
                  var y = "this.jsonData[x].groups["+country+"].groupScore";
                  var y1 = "this.jsonData[x].groups["+country+"].formattedGroupScore";
                  var z = "this.jsonData[this.props.years[0]].groups["+country+"].groupWeightedScore";
                  
                  if(eval(y)==null)
                      y=0;
                  if(eval(z)==null)
                      z=0;
               flagWorldGroup=1;   
              }
              }

                 var value = {
          "x": x,
          "y": Math.abs(eval(y)),
            "z": eval(z),
            "y1": eval(y1)        
        }
                 sitePersonel.values.push(value);
                 }
         
        
          this.state.countryMapper=countriesMap;
        var country=this.state.countries[i];
          if(country.length==2){
          var z="this.state.countryMapper."+country;
        sitePersonel.country=eval(z);
        sitePersonel.countryId=country;      
              }
          else{ if(country.length==1 && !(sessionStorage.getItem('arabic')== "true")){
                if(country==0){
                      country="World";
                      countryId="GLO";
                    }
                 else if(country==1){
                      country="G20";
                     countryId="G20";
                     }
                 else if(country==2){
                      country="GCC";
                     countryId="GCC";
                      
                     }
                 else if(country==3){
                      country="Arab World";
                     countryId="ARA";
                     }
                 else if(country==4){
                      country="OECD";
                     countryId="OEC";
                     }
            }
            else if(country.length==1 && (sessionStorage.getItem('arabic')== "true")){
                if(country==0){
                      country="عالم";
                      countryId="GLO";
                    }
                 else if(country==1){
                      country="مجموعة العشرين";
                      countryId="G20";   
                     }
                 else if(country==2){
                      country='دول مجلس التعاون الخليجي';
                      countryId="GCC";
                     }
                 else if(country==3){
                      country='الوطن العربي';
                      countryId="ARA";
                     }
                 else if(country==4){
                      country='منظمة التعاون الاقتصادي والتنمية';
                      countryId="OEC";
                     }
            }
             sitePersonel.country=country;
            sitePersonel.countryId=countryId;   
               }
        
        
        
      var x=[];
      x={sitePersonel};
      this.props.data.push(sitePersonel);

      }
              }
      else
          {
              xlabel="Countries/Benchmarks";
              if(sessionStorage.getItem('arabic')== "true"){
                 xlabel= 'الدول/ القيمة المرجعية';
              }
               var initialData={
        name: "na",
        values: [ { x: 9999, y: 0 },{ x: 9999, y: 0 } ],
      };
       this.props.data.push(initialData);// adding dummy data for x-axis formatting   
            var flagWorldGroup=0;
      var addCountry= props.Benchmarksclicked;
      if(removeCountry===0)          
      this.state.countries=this.props.countries;
      this.state.years=this.props.years;    
              var countriesFilter=[];
              var benchmarkFilter=[];
      for(var i=0; i< this.state.countries.length; i++){
            if(this.state.countries[i].length>1)
                countriesFilter[countriesFilter.length]=this.state.countries[i];
          else
                benchmarkFilter[benchmarkFilter.length]=this.state.countries[i];
         }
      for(var i=0; i< this.state.countries.length; i++){
          if(props.years.length===0)
              break;
          if(this.state.countries[i]=="")
              continue;
          var sitePersonel = {};
          var values = []
          sitePersonel.values = values;
          for(var i1=0;i1<2;i1++){
        var x = i+10000;
              if(this.state.countries[i].length===1 && i1==0)
                  x = 10000-1;
              if(this.state.countries[i].length===1 && i1==1)
                  x=10000+countriesFilter.length;
              if(i1==0 && this.state.countries[i].length>1)
                  var y=0;
              else{
                  var country=this.state.countries[i];
                  if(country.length===2){
                  var z="this.jsonData[this.props.years[0]].areas."+country;    
                  if(eval(z)==undefined)
                  var y=0;
                      else{
        var y = "this.jsonData[this.props.years[0]].areas."+country+".dataValue";
        var y1 = "this.jsonData[this.props.years[0]].areas."+country+".score";                   
        var z = "this.jsonData[this.props.years[0]].areas."+country+".value";                   
                  if(eval(y)==null)
                      y=0;
                if(eval(y1)==null)
                      y1=0;          
                 if(eval(z)==null)
                      z=0;          
                      }
                  }
              else{
              if(country.length==1){
                  var z = "this.jsonData[this.props.years[0]].groups["+country+"].groupWeightedScore";
                  var y = "this.jsonData[this.props.years[0]].groups["+country+"].groupScore";
                  var y1 = "this.jsonData[this.props.years[0]].groups["+country+"].formattedGroupScore";
                  if(eval(y)==null)
                      y=0;
                  if(eval(z)==null)
                      z=0;
               flagWorldGroup=1;   
              }
              
              }
              }
              /*if(i1==1)
                  {
                      y=Math.abs(eval(y))/6;
                  }
              if(i1==2)
                  {
                      y=Math.abs(eval(y))/3;
                  }
              if(i1==3)
                  {
                      y=Math.abs(eval(y))/2;
                  }
              if(i1==4)
                  {
                      y=Math.abs(eval(y))*2/3;
                  }
              if(i1==5)
                  {
                      y=Math.abs(eval(y))*5/6;
                  }*/
                 var value = {
          "x": x,
          "y": Math.abs(eval(y)),
          "z": eval(z),
          "y1": eval(y1)             
        }
                 sitePersonel.values.push(value);
              widthLine=1;
                 }
         
        
        
          this.state.countryMapper=countriesMap;
        var country=this.state.countries[i];
          if(country.length==2){
          var z="this.state.countryMapper."+country;
        sitePersonel.country=eval(z);
        sitePersonel.countryId=country;      
              }
          else{ if(country.length==1 && !(sessionStorage.getItem('arabic')== "true")){
                if(country==0){
                      country="World";
                      countryId="GLO";
                    }
                 else if(country==1){
                      country="G20";
                     countryId="G20";
                     }
                 else if(country==2){
                      country="GCC";
                     countryId="GCC";
                      
                     }
                 else if(country==3){
                      country="Arab World";
                     countryId="ARA";
                     }
                 else if(country==4){
                      country="OECD";
                     countryId="OEC";
                     }
            }
            else if(country.length==1 && (sessionStorage.getItem('arabic')== "true")){
                if(country==0){
                      country="عالم";
                      countryId="GLO";
                    }
                 else if(country==1){
                      country="مجموعة العشرين";
                      countryId="G20";   
                     }
                 else if(country==2){
                      country='دول مجلس التعاون الخليجي';
                      countryId="GCC";
                     }
                 else if(country==3){
                      country='الوطن العربي';
                      countryId="ARA";
                     }
                 else if(country==4){
                      country='منظمة التعاون الاقتصادي والتنمية';
                      countryId="OEC";
                     }
            }
             sitePersonel.country=country;
             sitePersonel.countryId=countryId;  
               }
        
      var x=[];
      x={sitePersonel};
      this.props.data.push(sitePersonel);
  
          }
              var finalData={
        name: "na",
        values: [ { x: 9999, y: 0 } ],
      };
              finalData.values[0].x=countriesFilter.length+10000;  
       this.props.data.push(finalData);// adding dummy data for x-axis formatting 
          }
    
    if (this.props.data && this.props.data.length < 1) {
      return null;
    }

    var {innerWidth, innerHeight, trans, svgMargins} = this.getDimensions();
    var yOrient = this.getYOrient();
    var domain = props.domain || {};

    if (!Array.isArray(props.data)) {
      props.data = [props.data];
    }

    // Returns an object of flattened allValues, xValues, and yValues
    var flattenedData = utils.flattenData(props.data, props.xAccessor, props.yAccessor);

    var allValues = flattenedData.allValues,
        xValues = flattenedData.xValues,
        yValues = flattenedData.yValues;
    var scales = this._calculateScales(innerWidth, innerHeight, xValues, yValues, domain.x, domain.y);
      var renderHeight=window.innerHeight/1.5;
      var renderWidth=document.getElementById('root').offsetWidth/1.5;
    return (<div>
      
          <Legend
              legendSelectionCallback={this.legendSelectionCallback}
          {...this.props}
        />
            <span onMouseLeave={this.onMouseLeave}
                onTouchEnd={this.onMouseLeave}>
        <Chart
          viewBox={this.getViewBox()}
          legend={props.legend}
          data={props.data}
          margins={props.margins}
          colors={props.colors}
          colorAccessor={props.colorAccessor}
          width={renderWidth}
          height={renderHeight}
          title={props.title}
          shouldUpdate={!this.state.changeState}
            hoverAnimation="true"
        >
          <g transform={trans} className={props.className}>
            <XAxis
              xAxisClassName={props.xAxisClassName}
              strokeWidth={props.xAxisStrokeWidth}
              xAxisTickValues={props.xAxisTickValues}
              xAxisTickInterval={props.xAxisTickInterval}
              xAxisOffset={props.xAxisOffset}
              xScale={scales.xScale}
              xAxisLabel={props.xAxisLabel}
              xAxisLabelOffset={props.xAxisLabelOffset}
              tickFormatting={props.xAxisFormatter}
              xOrient={props.xOrient}
              yOrient={yOrient}
              data={props.data}
              margins={svgMargins}
              width={innerWidth}
              height={innerHeight}
              horizontalChart={props.horizontal}
              stroke={props.axesColor}
              gridVertical={props.gridVertical}
              gridVerticalStroke={props.gridVerticalStroke}
              gridVerticalStrokeWidth={props.gridVerticalStrokeWidth}
              gridVerticalStrokeDash={props.gridVerticalStrokeDash}
              xlabel={xlabel}
            />
            <YAxis
              yAxisClassName={props.yAxisClassName}
              strokeWidth={props.yAxisStrokeWidth}
              yScale={scales.yScale}
              xScale={scales.xScale}    
              yAxisTickValues={props.yAxisTickValues}
              yAxisTickCount={props.yAxisTickCount}
              yAxisOffset={props.yAxisOffset}
              yAxisLabel={props.yAxisLabel}
              yAxisLabelOffset={props.yAxisLabelOffset}
              tickFormatting={props.yAxisFormatter}
              xOrient={props.xOrient}
              yOrient={yOrient}
              margins={svgMargins}
              width={innerWidth}
              height={innerHeight}
              horizontalChart={props.horizontal}
              stroke={props.axesColor}
              gridHorizontal={props.gridHorizontal}
              gridHorizontalStroke={props.gridHorizontalStroke}
              gridHorizontalStrokeWidth={props.gridHorizontalStrokeWidth}
              gridHorizontalStrokeDash={props.gridHorizontalStrokeDash}
              ylabel={ylabel}
              yearLen={this.props.years} 
              countriesFilter={(this.props.years.length==1)?countriesFilter.length:this.props.years.length}    
            />
            <DataSeries
              toolTipCallback={this.toolTipCallback}
              toolTipCallback1={this.toolTipCallback1}
              toolTipCallbackforPoint={this.toolTipCallbackforPoint} 
              toolTipCallbackforPointSingle={this.toolTipCallbackforPointSingle}    
              xScale={scales.xScale}
              yScale={scales.yScale}
              xAccessor={props.xAccessor}
              yAccessor={props.yAccessor}
              hoverAnimation={props.hoverAnimation}
              circleRadius={props.circleRadius}
              data={props.data}
              value={allValues}
              interpolationType={props.interpolationType}
              colors={props.colors}
              colorAccessor={props.colorAccessor}
              width={innerWidth}
              height={innerHeight}
              onMouseOver={this.onMouseOver}
                onTouchStart={this.onMouseOver}
                widthLine={widthLine}
                yearLen={this.props.years}
                countryLen={this.state.countries}
              />
          </g>
        </Chart>
        {((props.showTooltip && this.state.tipenable && this.props.years.length==1) ? <Tooltip show={true} data={this.props.data} x={this.state.rightsingle} y={this.state.topsingle} yearLen={this.props.years} dataPoint={this.state.dataPointsingle}/> : null)}
        {((props.showTooltip && this.state.tipenable && this.props.years.length>1) ? <Tooltip show={true} data={this.props.data} x={this.state.right} y={this.state.top} yearLen={this.props.years} dataPoint={this.state.dataPoint}/> : null)}        
              </span>        
      
        </div>
    );
  }

});
