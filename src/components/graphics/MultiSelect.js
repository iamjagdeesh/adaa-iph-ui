
import React from 'react';
import Select from 'react-select';
import global from '../../global.js';
//import './multiSelectCss.css';

const CountryListArray = [];
    
var ar =false;
var initialValue="";
var defCountry=sessionStorage.getItem('MainPillarSelectedCountyID');
var compCountries=sessionStorage.getItem('country_info');
//var placeHolder = "Add countries";
var MultiSelectField1 = React.createClass({
	displayName: 'MultiSelectField1',
	propTypes: {
		label: React.PropTypes.string,
	},
	getInitialState () {
		return {
			disabled: false,
			crazy: false,
			options: this.props.CountryListArray,
			value:[],
			arabic:false,
			
		};
        
	},
    componentDidMount(){
        /*document.getElementsByClassName('Select-value-icon')[0].remove();*/
    },
    /**
    * This function returns the selected country to Graphs
    */
	handleSelectChange (value) {
		//console.log('You\'ve selected:', value); 
         var count=0;
         for(var i=0;i<this.props.finalCountries.length;i++){
             if(this.props.finalCountries[i].length==1)
                 count++;
         }
         if(value.split(',').length<=global.CountryLimit){
          this.props.countrySelectionCallback(value);
          }
         else
             alert("You can compare only 20 Countries/Benchmarks");
	},
     handleClick(clicked) { 
         if(clicked.split(',').length+1<=global.CountryLimit){
         this.props.countrySelectionCallback(clicked);
         }
         else
              alert("You can compare only 20 Counties/Benchmarks");
    },
	render () {  
        var placeHolder="Add countries";
        if(sessionStorage.getItem('arabic')== "true"){
            placeHolder='اختر دول ';
        }
		return (
			<div className="section Graphs">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select multi simpleValue disabled={this.state.disabled} value={this.props.finalCountries} placeholder={placeHolder} options={this.state.options} onChange={this.handleSelectChange} />
			</div>
		);
	}
});
module.exports = MultiSelectField1;