import React from 'react';
import Select from 'react-select';
import '../common/multiSelectCss.css';
import global from '../../global.js';

var SingleSelect = React.createClass({
	displayName: 'SingleSelect',
	propTypes: {
		label: React.PropTypes.string,
	},
	
	getInitialState () {
		return {
			disabled: false,
			crazy: false,
			options: this.props.countryList,
			countryName: '',
			countryID:''
		};
	},
	addSingleCountryExternal(value){
		this.setState({ value });
        this.props.selectCountry(value,0);
	},
	externalUpdate(data){
		this.setState({value:data});
	},
	handleSelectChange (value) {
			
			this.setState({countryID: value.value,countryName: value.label },function(){
					this.props.countrySearchCallback(this.state.countryID,this.state.countryName);  
			});
         		    
	},
	

	render () {
		//var ar =false;
		var placeHolder = "Select country";
		 if(sessionStorage.getItem('arabic')=== "true"){
			// ar = true;
			 placeHolder = "اختر دول";

		 }
		return (
			
			<div className="section">
				
				<Select multi={false} clearable={false} disabled={this.state.disabled} value={this.state.countryName} placeholder={placeHolder} options={this.props.countryList} onChange={this.handleSelectChange}/>
             				
			</div>
		);
	}
});

module.exports = SingleSelect;

