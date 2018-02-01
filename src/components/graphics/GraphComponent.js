require('rc-slider/assets/index.css');
import React from 'react';
import {Link} from 'react-router';
import {Icon} from 'react-fa';
import MainHeader from '../common/MainHeader';
import LineChart from '../linechart/LineChart';
import './graphics.css';
import jQuery from 'jquery';
import $ from 'jquery';
import MultiSelectField1 from './MultiSelect';
const Slider = require('rc-slider');
import global from '../../global.js';
const style = {  };
class GraphComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            GraphTitle: sessionStorage.getItem('selectedYear').split(',')[0],
            Benchmarksclicked: [],
            benchClickedValue:"",
            DatasourceData:sessionStorage.getItem('KPIdescription'),
            DatasourceYear:sessionStorage.getItem('selectedYear').split(',')[0],    
            height: props.height,
            width: props.width,
            heightPanel:props.height,
            countries: (sessionStorage.getItem('MainPillarSelectedCountyID')+","+sessionStorage.getItem('country_info')).split(','),
            years:sessionStorage.getItem('selectedYear').split(','),
            arabic:false
        }
        this.ar = false;  
        this.locale = "en";
        this.Addcountries= global.Addcountries;
        this.Benchmarks=global.Benchmarks;
        this.Datasource=global.Datasource;
        this.GraphTitleStatic=global.GraphTitleStatic;
        this.placeHolder= global.placeHolder;
        this.benchMarkWorld=global.benchMarkWorld;
        this.benchMarkG20=global.benchMarkG20;
        this.benchMarkGCC=global.benchMarkGCC;
        this.benchMarkArab=global.benchMarkArab;
        this.benchMarkOECD=global.benchMarkOECD;
        this.DatasourceYearStatic=global.DatasourceYearStatic;
        this.Frequency=global.Frequency;
        this.benchMarkDescription=global.benchMarkDescription;
         if(sessionStorage.getItem('arabic')== "true"){
            this.ar = true;
            this.locale="ar";
            this.Addcountries= global.Addcountries_ar;
        this.Benchmarks=global.Benchmarks_ar;
        this.Datasource=global.Datasource_ar;
        this.GraphTitleStatic=global.GraphTitleStatic_ar;
        this.placeHolder= global.placeHolder_ar;
        this.benchMarkWorld=global.benchMarkWorld_ar;
        this.benchMarkG20=global.benchMarkG20_ar;
        this.benchMarkGCC=global.benchMarkGCC_ar;
        this.benchMarkArab=global.benchMarkArab_ar;
        this.benchMarkOECD=global.benchMarkOECD_ar;
        this.DatasourceYearStatic=global.DatasourceYearStatic_ar;
        this.Frequency=global.Frequency_ar;
        this.benchMarkDescription=global.benchMarkDescription_ar; 
        }
        this.yearsCallback = this.yearsCallback.bind(this);
        this.legendSelectionCallback=this.legendSelectionCallback.bind(this);
        this.addBenchMarks = this.addBenchMarks.bind(this);
        this.countrySelectionCallback = this.countrySelectionCallback.bind(this);
        this.selectedKPI = sessionStorage.getItem('selectedKpiID');
        this.countrySel = sessionStorage.getItem('MainPillarSelectedCountyID');
        this.countryName = sessionStorage.getItem('MainPillarSelectedCountyName');
        this.backURL = "/worldmap";
         this.years1=sessionStorage.getItem('TimelineYears').split(',');
            this.marks={};
            this.keys=[];
            this.keysArabic=[];
            for(var i=0;i<this.years1.length;i++){
            this.keys[i]=100*(i+1)/(this.years1.length+1);    
            this.marks[100*(i+1)/(this.years1.length+1)]=this.years1[i]}
            this.marksArabic={};
            for(var i1=0;i1<this.years1.length;i1++){
            this.marksArabic[100*(i1+1)/(this.years1.length+1)]=this.years1[this.years1.length-1-i1]};

    }
/*addBenchMarks(response){
    var i=this.state.Benchmarksclicked.length;
    this.state.Benchmarksclicked[i]=response;
           this.setState({Benchmarksclicked:this.state.Benchmarksclicked}); 
        }*/
    /**
    * This function adds benchmarks on click.
    */
    addBenchMarks(response){
        var countriesMap={};
        var myArray=this.state.countries;
        
                                var country_array = sessionStorage.getItem('countriesAll');
                                country_array = JSON.parse(country_array);
                                for (var i = 0; i < country_array.length; i++) {
                                                var tempo = country_array[i];
                                                countriesMap[tempo.value] =tempo.label;
                                }
        var remCountryClass1='benchMark'+response;
        var remCountryClass="";
        if(document.getElementsByClassName(remCountryClass1)[0].className.includes('active')){ // remove the benchmark active class on removing
            if(response==='0')
           remCountryClass='legendElement  '+this.benchMarkWorld;
            if(response==='1')
           remCountryClass="legendElement  "+this.benchMarkG20;
            if(response==='2')
           remCountryClass="legendElement  "+this.benchMarkGCC;
            if(response==='3')
           remCountryClass="legendElement  "+this.benchMarkArab;
            if(response==='4')
           remCountryClass="legendElement  "+this.benchMarkOECD;
            myArray.splice(myArray.indexOf(response),1);
            document.getElementsByClassName('benchMark'+response)[0].className=document.getElementsByClassName('benchMark'+response)[0].className.replace('active','') ;
            this.setState({countries:myArray});
        }
        else{
            
        
        jQuery('.benchMark'+response).addClass('active');  
           this.setState({benchClickedValue:response}); 
        
        myArray[myArray.length]=response;
            
        this.setState({countries:myArray});
        
                }
        }
    /**
    * This function is used to remove the countries using the country name on click of close button on the legend
    */
    legendSelectionCallback(clicked,valueID){
        var value=this;
        var countriesMap={};
                                var country_array = sessionStorage.getItem('countriesAll');
                                country_array = JSON.parse(country_array);
                                for (var i = 0; i < country_array.length; i++) { // name as key and id as value
                                                var tempo = country_array[i];
                                         if(tempo.label.includes('('))
                                        tempo.label=tempo.label.split('(')[0]+tempo.label.split('(')[1].split(')')[0].split(',')[0];
                                    var arrayLabel=tempo.label.split(' ');
                                    var labelFinal="";
                                    for(var z=0;z<arrayLabel.length;z++){
                                      labelFinal=labelFinal+ arrayLabel[z]; 
                                    }
                                                countriesMap[labelFinal] =tempo.value;
                                }
              
         // pop null values that come when the default country is only sent without the compare con
        var myArray=this.state.countries;
        if(clicked===this.benchMarkWorld){
                    myArray.splice(myArray.indexOf('0'),1);
                    jQuery('.benchMark0').removeClass('active');
                    document.getElementsByClassName('benchMark0')[0].className=document.getElementsByClassName('benchMark0')[0].className.replace('active','') ;
                    }
               else if(clicked===this.benchMarkG20){
                    myArray.splice(myArray.indexOf('1'),1);
                    jQuery('.benchMark1').removeClass('active'); 
                    document.getElementsByClassName('benchMark1')[0].className=document.getElementsByClassName('benchMark1')[0].className.replace('active','') ;
                           }
       else  if(clicked===this.benchMarkGCC){
            myArray.splice(myArray.indexOf('2'),1);
            jQuery('.benchMark2').removeClass('active');
            document.getElementsByClassName('benchMark2')[0].className=document.getElementsByClassName('benchMark2')[0].className.replace('active','') ;
            }
        else if(clicked===this.benchMarkArab){
            myArray.splice(myArray.indexOf('3'),1);
            jQuery('.benchMark3').removeClass('active');
            document.getElementsByClassName('benchMark3')[0].className=document.getElementsByClassName('benchMark3')[0].className.replace('active','') ;
            }
        else if(clicked===this.benchMarkOECD){
            myArray.splice(myArray.indexOf('4'),1);
            jQuery('.benchMark4').removeClass('active');
            document.getElementsByClassName('benchMark4')[0].className=document.getElementsByClassName('benchMark4')[0].className.replace('active','') ;
            }
        else{
            if(clicked.includes('(')){
            clicked=clicked.split('(')[0]+clicked.split('(')[1].split(')')[0].split(',')[0];
                  }
        var clickedArray=clicked.split(' ');
                                    var clickedFinal="";
                                    for(var z=0;z<clickedArray.length;z++){
                                      clickedFinal=clickedFinal+ clickedArray[z]; 
                                    }
            myArray.splice(myArray.indexOf( valueID),1);
        }
 
        
        
               this.setState({countries:myArray});
    }
    /**
    * The function is used to set the countries that are selected from the add countries 
    */
            countrySelectionCallback(countryName) {
                var length=this.state.countries.length;
            if(this.state.countries.includes("null"))  // pop null values that come when the default country is only sent without the compare con
               this.state.countries.pop(this.state.countries.indexOf("null"));
            if(this.state.countries.includes(""))  // pop null values that come when the default country is only sent without the compare con
               this.state.countries.pop(this.state.countries.indexOf(""));
                /*if(countryName==="")
                    countryName=sessionStorage.getItem('MainPillarSelectedCountyID');*/
                var actualValue=countryName.split(',');
                length=actualValue.length;
                var finalCountries=[];
                for (var count=0;count<length;count++)
                    {
                        if(!this.state.countries.includes(actualValue[count])) // only if the country is not there it is being pushed
                          finalCountries.push(actualValue[count])  
                    }

                finalCountries=countryName.split(',');
                var l1=this.state.countries.length;
                for(var i=0;i<l1;i++)
                    {
                        if(this.state.countries[i].length===1)
                          finalCountries[finalCountries.length]= this.state.countries[i];
                    }
                this.setState({countries:finalCountries});
                this.setState({benchClickedValue:""}); 
    }

    /**
     * These two functions are used to toggle datasource div in english and arabic respectively
     * 
     */
    toggleDatasource() {
        var x = document.getElementById('iph-data-source');
        if (x.style.display === 'block') {
            x.style.display = 'none';
        } else {
            x.style.display = 'block';
        }
    }

    toggleDatasourceAr() {
        var x = document.getElementById('iph-data-source-ar');
        if (x.style.display === 'block') {
            x.style.display = 'none';
        } else {
            x.style.display = 'block';
        }
    }
    
    /**
    * This function is used to select the list of years and is used by slider and line chart
    */
    yearsCallback(value) {
        var year=[];
        if(!(sessionStorage.getItem('arabic')== "true")){
            for(var yearCount=0;yearCount<this.years1.length;yearCount++){
               if(value[0]<=this.keys[yearCount] && value[1]>=this.keys[yearCount])
            year.push(this.years1[yearCount]); 
            }
        }
        else
            {
              for(var yearCount=0;yearCount<this.years1.length;yearCount++){
               if(value[0]<=this.keys[yearCount] && value[1]>=this.keys[yearCount])
            year.push(this.years1[this.years1.length-1-yearCount]); 
            }  
            }
        var initalYear=year[0];
        var finalYear=year[year.length-1];
        var graphYear;
        if(year.length===0)
            graphYear="";
        else if(initalYear===finalYear)
            graphYear=initalYear;
        else if(!(sessionStorage.getItem('arabic')== "true"))
            graphYear=initalYear+'-'+finalYear;
        else if((sessionStorage.getItem('arabic')== "true"))
            graphYear=finalYear+'-'+initalYear;
         this.setState({years:year,GraphTitle:graphYear,DatasourceYear:graphYear});
    }
    /**
    * This function removes the countries in local storage
    */
        Close(){
            if(!sessionStorage.getItem('country_info')===null){
         var array=sessionStorage.getItem('country_info').split(',');
            var storageString="";
            var length=array.length;
            var array1=[];
            var i1=0;
            for(var i=0;i<length;i++)
                {
                    if(array[i])
                    if(array[i].length==2){
                        array1[i1]=array[i];
                        i1++;
                        }
                }
            for(var i=0;i<array1.length;i++)
                {
                    if(i!=0)
                    storageString=storageString+","+array1[i];
                    else
                    storageString=array1[i];    
                }
            
         sessionStorage.setItem('country_info',storageString);   
        }
            }

    render() {
        $(function(){
            $('.benchmarkDatasource').css({ height:window.innerHeight/2 });
            $(window).resize(function(){
                $('.benchmarkDatasource').css({ height:window.innerHeight/2 });
            });
        });
        
        this.state.countries = this.state.countries.filter( function( item, index, inputArray ) {
           return inputArray.indexOf(item) == index;
    });
        if(this.state.countries.includes("")){this.state.countries.splice(this.state.countries.indexOf(""),1)}
        var CountryListArray=[];
        CountryListArray.length=0;
        var array=sessionStorage.getItem('countriesAll').split('}');
        for(var i=0;i < array.length-1;i++)
            {
                var arraySplit=array[i].split('"');
        CountryListArray.push({
                                        label:arraySplit[3],
                                        value: arraySplit[7]
                                    });
                }
        var year=(sessionStorage.getItem('selectedYear'));
        var a=10;
        var b=20;
        var diff =this.keys[2]-this.keys[1];
        if(!(sessionStorage.getItem('arabic')== "true")){
          for(var yearCount=0;yearCount<this.years1.length;yearCount++){
               if(year===this.years1[yearCount]){
            a=this.keys[yearCount]-diff/2;
            b=this.keys[yearCount]+diff/2;
                   }
            }   
            }
        else
            {
                for(var yearCount=0;yearCount<this.years1.length;yearCount++){
               if(year===this.years1[this.years1.length-1-yearCount]){
            a=this.keys[yearCount]-diff/2;
            b=this.keys[yearCount]+diff/2;
                   }
            }   
            }
        var countriesOnly=0;
        for(var i=0;i<this.state.countries.length;i++){
            if(this.state.countries[i].length==2)
                countriesOnly++;
        } 
        if(this.ar){
            return (  
                    
                    <div className="container-fluid">
                    
                        <div className="row">
                            <div className="col-md-12 col-xs-12 col-lg-12  garphic-Text">
                                <div className="col-md-3 col-sm-3 col-xs-6 col-lg-3" style={{'textAlign': 'left'}} >
                                       <Link className="Graphic-Close-btn" to={this.backURL}><img src="icons/close-panel-normal.png" title="close"></img></Link> 
                                </div>
                                <div onClick={this.Close} className="col-md-9 col-sm-9  col-xs-6 col-lg-9" lang={this.ar ? 'ar' : 'en'} style={{'textAlign': 'right'}}> 
                                         
                                        <span>{this.GraphTitleStatic} {sessionStorage.getItem('GraphTitleStatic')} {sessionStorage.getItem('subpillarSelected')}    {this.state.GraphTitle}</span> 
                                </div>
                            </div>
                            <div className='graphicsCrum_ar' lang={this.ar ? 'ar' : 'en'} dir={this.ar ? 'rtl' : 'ltr'}> {sessionStorage.getItem('pillarSelected')} > {sessionStorage.getItem('subpillarSelected')}({sessionStorage.getItem('denominator')})  </div>
                        </div>    
                        <div className="row">
                            <div className="col-md-12 col-xs-12 col-lg-12  ">
                                
                                <div className="col-md-3 col-sm-3  col-xs-6 col-lg-3 Graphic-rightMenu iph-graphicPage-details">
                                      <div className="row" dir={this.ar ? 'rtl' : 'ltr'} lang={this.ar ? 'ar' : 'en'}>
                                        <div className="col-xs-12 iph-Addcountries">
                                                <h4 className="">{this.Addcountries}({countriesOnly}/20) </h4>
                                                <div className="search-box">
                                                    <MultiSelectField1  finalCountries={this.state.countries} CountryListArray={CountryListArray} placeHolder={this.placeHolder} countrySelectionCallback={this.countrySelectionCallback} />
                                               
                                                 </div>

                                        </div>
                                        <div className="benchmarkDatasource col-xs-12">
                                         <div className="iph-Benchmarks-btns">
                                                <h4 className="">{this.Benchmarks}</h4>
                                                 <a href="#" className="btn btn-outline benchMark0" data-toggle="tooltip" title="" onClick={this.addBenchMarks.bind(this,"0")} id="0">{this.benchMarkWorld}</a> 
                                                 <a href="#" className="btn btn-outline benchMark1" onClick={this.addBenchMarks.bind(this,"1")} id="1"> {this.benchMarkG20} </a> 
                                                 <a href="#" className="btn btn-outline benchMark2" onClick={this.addBenchMarks.bind(this,"2")} id="2"> {this.benchMarkGCC} </a> 
                                                 <a href="#" className="btn btn-outline benchMark3" onClick={this.addBenchMarks.bind(this,"3")} id="3"> {this.benchMarkArab} </a> 
                                                 <a href="#" className="btn btn-outline benchMark4" onClick={this.addBenchMarks.bind(this,"4")} id="4"> {this.benchMarkOECD} </a> 
                                        </div>
                                         <div className="iph-Datasource">
                                             <button type="button" className="data-source-toggle-button" onClick={this.toggleDatasourceAr}>> Show {this.Datasource}  </button>
                                             <div id="iph-data-source-ar" className="iph-data-source" hidden="true"> 
                                                <h4 >{this.Datasource}  </h4>
                                                <h5 >{sessionStorage.getItem('datasourceName')}</h5>
                                                <h4 >{this.benchMarkDescription}  </h4>
                                                
                                                    {this.state.DatasourceData}
                                                    <h5><span className="DataSourceFrequency">{this.Frequency}</span> : {sessionStorage.getItem('frequency')}</h5>
                                                    <h5><span className="DataSourceYear"> {this.DatasourceYearStatic}</span> : {this.state.DatasourceYear}</h5>
                                                </div>
                                        </div>
                                      </div>                
                                    </div>
                                </div>
                                <div className="col-md-9 col-sm-9 col-xs-6 col-lg-9 Graphic-leftMenu" dir="ltr" lang='en'>
                                    
                                    <div> 
                                        <LineChart legendSelectionCallback={this.legendSelectionCallback} Benchmarksclicked={this.state.benchClickedValue} countries={this.state.countries} years={this.state.years} /> 
                                    
                                    <div className="Slider">
                                        <Slider.Range  min={7} max={93} allowCross={false} pushable={diff} marks={this.marksArabic} onChange={this.yearsCallback}  defaultValue={[a, b]} className="Slider"/>
                                    </div>
                                    </div>
                    
                                </div>
                            </div>
                                                
                        </div>  
                                               
                    </div> 
                    
                );
        
            
        }else{
            return (  
                    
                    <div className="container-fluid">
                    
                        <div className="row">
                            <div className="col-md-12 col-xs-12 col-lg-12  garphic-Text">
                                <div className="col-md-9 col-sm-9 col-xs-6 col-lg-9"  lang={this.ar ? 'ar' : 'en'}>
                                        <span>{this.GraphTitleStatic} {sessionStorage.getItem('GraphTitleStatic')} {sessionStorage.getItem('subpillarSelected')}   {this.state.GraphTitle}</span>     
                                </div>
                                <div onClick={this.Close} className="col-md-3 col-sm-3  col-xs-6 col-lg-3 "> 
                                        <Link className="Graphic-Close-btn" to={this.backURL}><img src="icons/close-panel-normal.png" title="close"></img></Link>       
                                </div>
                    
                            </div>
                            <div className='graphicsCrum'>{sessionStorage.getItem('pillarSelected')} > {sessionStorage.getItem('subpillarSelected')}({sessionStorage.getItem('denominator')})</div>
                        </div>    
                        <div className="row">
                            <div className="col-md-12 col-xs-12 col-lg-12  ">
                                <div className="col-md-9 col-sm-9 col-xs-6 col-lg-9 Graphic-leftMenu" dir="ltr" lang='en'>
                                    
                                    <div> 
                                        <LineChart legendSelectionCallback={this.legendSelectionCallback} Benchmarksclicked={this.state.benchClickedValue} countries={this.state.countries} years={this.state.years} /> 
                                    <div className="Slider">
                                        <Slider.Range  min={7} max={93} allowCross={false} pushable={diff} marks={this.marks} onChange={this.yearsCallback}  defaultValue={[a, b]} className="Slider"/>
                                    </div>
                                    
                                    </div>
                    
                                </div>
                                <div className="col-md-3 col-sm-3  col-xs-6 col-lg-3 Graphic-rightMenu iph-graphicPage-details">
                                      <div className="row" dir={this.ar ? 'rtl' : 'ltr'} lang={this.ar ? 'ar' : 'en'}>
                                        <div className="col-xs-12 iph-Addcountries">
                                                <h4 className="">{this.Addcountries}({countriesOnly}/20) </h4>
                                                <div className="search-box">
                                                    <MultiSelectField1 finalCountries={this.state.countries} CountryListArray={CountryListArray} placeHolder={this.placeHolder} countrySelectionCallback={this.countrySelectionCallback} />
                                               
                                                 </div>

                                        </div>
                                        <div className="benchmarkDatasource col-xs-12">
                                         <div className=" iph-Benchmarks-btns">
                                                <h4 className="">{this.Benchmarks}</h4>
                                                 <a href="#" className="btn btn-outline benchMark0" data-toggle="tooltip" title="" onClick={this.addBenchMarks.bind(this,"0")} id="0">{this.benchMarkWorld}</a> 
                                                 <a href="#" className="btn btn-outline benchMark1" onClick={this.addBenchMarks.bind(this,"1")} id="1"> {this.benchMarkG20} </a> 
                                                 <a href="#" className="btn btn-outline benchMark2" onClick={this.addBenchMarks.bind(this,"2")} id="2"> {this.benchMarkGCC} </a> 
                                                 <a href="#" className="btn btn-outline benchMark3" onClick={this.addBenchMarks.bind(this,"3")} id="3"> {this.benchMarkArab} </a> 
                                                 <a href="#" className="btn btn-outline benchMark4" onClick={this.addBenchMarks.bind(this,"4")} id="4"> {this.benchMarkOECD} </a> 
                                        </div>
                                         <div className="iph-Datasource">
                                             <button type="button" className="data-source-toggle-button" onClick={this.toggleDatasource}>> Show {this.Datasource}  </button>
                                             <div id="iph-data-source" className="iph-data-source" hidden="true"> 
                                                <h4 >{this.Datasource}  </h4>
                                                <h5 >{sessionStorage.getItem('datasourceName')}</h5>
                                                <h4 >{this.benchMarkDescription}  </h4>
                                                
                                                    {this.state.DatasourceData}
                                                    <h5><span className="DataSourceFrequency">{this.Frequency}</span> : {sessionStorage.getItem('frequency')}</h5>
                                                    <h5><span className="DataSourceYear"> {this.DatasourceYearStatic}</span> : {this.state.DatasourceYear}</h5>
                                                </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                                
                        </div>  
                                               
                    </div> 
                    
                );
        }
        
    }
}

export default GraphComponent;