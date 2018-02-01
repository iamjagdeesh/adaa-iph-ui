
import React from 'react';
import Select from 'react-select';
import global from '../../global.js';
//import './multiSelectCss.css';

const CountryListArray = [];
    
var ar =false;
var initialValue="";
var defCountry=localStorage.getItem('MainPillarSelectedCountyID');
var compCountries=localStorage.getItem('country_info');
//var placeHolder = "Add countries";
var MultiSelectField2 = React.createClass({
	displayName: 'MultiSelectField2',
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
        this.props.SelectCountryCallback(value);
		/*this.setState({ value:value});*/
	},
     handleClick(clicked) { 
         this.props.SelectCountryCallback(clicked);
    },
	render () {  
        var placeHolder=global.placeHolder;
        if(localStorage.getItem('arabic')== "true"){
            placeHolder=global.placeHolder_ar;
        }
		return (
			<div className="section Graphs">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select multi simpleValue disabled={this.state.disabled} value={this.props.finalCountries} placeholder={placeHolder} options={this.state.options} onChange={this.handleSelectChange} />
			</div>
		);
	}
});
module.exports = MultiSelectField2;