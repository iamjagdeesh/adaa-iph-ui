import React from 'react';
import Select from 'react-select';
import '../common/multiSelectCss.css';
import global from '../../global.js';

var MultiSelectField = React.createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: React.PropTypes.string,
	},
	
	getInitialState () {
		return {
			disabled: false,
			crazy: false,
			options: this.props.countryList,
			value: [],
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
		if(value.split(',').length<=global.CountryLimit){
			this.setState({ value });
            this.props.selectCountry(value,1);    
		}
		else{
			alert("You can compare only 20 Countries");
		}
		    
	},
	clearAll(){
		this.setState({ value:"" },function(){
			this.props.selectCountry(this.state.value,1);
		});
		
	},

	render () {
		//var ar =false;
		this.isHidden = true;
		
		 if(this.state.value !== null && this.state.value !== ""){
           if(this.state.value.length > 0){
			this.isHidden = false;
		}
		   
        }
		
		
		var placeHolder = "Select countries";
		 if(sessionStorage.getItem('arabic')=== "true"){
			// ar = true;
			 placeHolder = "اختر دول";

		 }
		return (
			
			<div className="section">
				
				<Select multi simpleValue clearable={false} disabled={this.state.disabled} value={this.state.value} placeholder={placeHolder} options={this.props.countryList} onChange={this.handleSelectChange}/>
                {!this.isHidden && <button id="btnClearAll" className={"btn btn-link"} onClick={this.clearAll}>Clear All</button>}
				
			</div>
		);
	}
});

module.exports = MultiSelectField;
/*<h3 className="section-heading">{this.props.label}</h3>
<div className="checkbox-list">
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" checked={this.state.disabled} onChange={this.toggleDisabled} />
						<span className="checkbox-label">Disable the control</span>
					</label>
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" checked={this.state.crazy} onChange={this.toggleChocolate} />
						<span className="checkbox-label">I don't like Chocolate (disabled the option)</span>
					</label>
				</div>

*/
