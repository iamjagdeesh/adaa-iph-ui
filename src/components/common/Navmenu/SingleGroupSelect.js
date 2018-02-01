
import React from 'react';
import Select from 'react-select';
import jQuery from 'jquery';

import myConfig from '../../../conf.js';

var GroupListArray = [];

var conf= myConfig;
var ar =false;
var placeHolder = "Select a Group";
var GroupSelectComponent = React.createClass({
	displayName: 'GroupSelectComponent',
	propTypes: {
		label: React.PropTypes.string,
		
	},
	getInitialState () {
		return {
			
			           searchable:false,
			           options: [],
			           groupdata : [],
			           selectValue:'World',
			           dataURL : conf.apiUrl+"getGroups?locale=en",
			           selectValueId:'1',
					   optionsList:[]
					  
			           
		};
	},
	loadData(){
		
		 jQuery.ajax({
	            url: this.state.dataURL,
	            dataType: 'json',
	            type: "GET",
	            success: function(data) {
	            	this.setState({groupdata : data},function(){
						if(this.state.groupdata){
    	 
    	 if(!this.state.groupdata.length == GroupListArray.length){
					this.state.groupdata.map((row,index) => {

							if(row.groupName !== undefined){
																
						GroupListArray.push({
											label:row.groupName,
											value: row.groupId
								});
																	
							}

					});
    	 		}}
				 this.setState({optionsList:GroupListArray});

					});
	            	
	            	
	            }.bind(this),
	                error: function(xhr, status, err) {
	                console.error(this.props.url, status, err.toString());
	            }.bind(this)
	        });     
	},
	 componentDidMount(){
		if(sessionStorage.getItem('arabic')== "true"){
			ar =true;
		}
			if(sessionStorage.getItem('arabic')== "true"){
				placeHolder = "اختر مجموعة";
				this.setState({dataURL : conf.apiUrl+"getGroups?locale=ar"},function(){
					GroupListArray = [];
					this.loadData();
				});
			
			}
			else{
				placeHolder = "Select a Group"
				GroupListArray = [];
				this.loadData();
			}

		
	        
	     },
	/**
	 * This function is used to set the value of the newly selected element in the dropdown. 
	 * 
	 */
	handleSelectChange (value) {
		//console.log(typeof(value.label));
		this.setState({selectValueId:Number(value.value)});
		this.setState({selectValue:value.label});
		
		this.props.groupSelectionCallback(Number(value.value),value.label);
		
		
	},
	/*focusStateSelect () {
		this.refs.stateSelect.focus();
	},*/
   externalUpdate(dataval,gid){
	    this.setState({selectValueId:gid});
	  	this.setState({selectValue:dataval});
	},
	render () {
   
    	 
    	/* if(!this.state.groupdata.length == GroupListArray.length){
          this.state.groupdata.map((row,index) => {

				if(row.groupName !== undefined){
				                                     
			GroupListArray.push({
								label:row.groupName,
								value: row.groupId
					});
				                                        
				}

          });
    	 }*/

         return (
				<div className="section" id="selectSection">
							
						<Select searchable={this.state.searchable} ref="stateSelect" autofocus options={this.state.optionsList} name="selected-group" value={this.state.selectValue} onChange={this.handleSelectChange} placeholder={this.state.selectValue}/>
				</div>);
    	 
	}
});
module.exports = GroupSelectComponent;