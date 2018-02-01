import React from 'react';
import jQuery from 'jquery';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import GroupSelectComponent from './SingleGroupSelect';
import './NavMenuCss.css';
import myConfig from '../../../conf.js';
import global from '../../../global.js';

var conf= myConfig;

class RankingTableComponent extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			selectedGroupId: "1",
			data: [{ "": "Loading..." }],
			groupdata: [{}],
			nextState: '',
			selectedPillarId: "1",
			selectedYear: this.props.SelectedYear,
			denominator:this.props.denominator
			//dataURL: "http://iph-service.cfapps.io/iph/ranking/kpi/1/year/2013/countryGroup/1?locale=en"
		}
		this.yearSelected=this.props.SelectedYear;
		this.loadgroupData = this.loadgroupData.bind(this);
		this.groupSelectionCallback = this.groupSelectionCallback.bind(this);
		this.loadRankingData = this.LoadRankingData.bind(this);
		this.dataURL = this.getDataURL.bind(this);
		this.selectedGroupId = "1";
		this.selectedGroupName = "World";
		this.loadedData = [];
		//this.setColor = this.setColor.bind(this);
		this.columnClassNameFormat = this.columnClassNameFormat.bind(this);
		//this.onClick = this.handleClick.bind(this);
		this.selectedYear = sessionStorage.getItem('selectedYear')
		this.selectedKpiId = sessionStorage.getItem("selectedKpiID")
		this.locale = "en";
		this.ar="false";
		this.countriesText = global.rankingTableCountriesText_en;
		this.rankText = global.rankingTablerankText_en;
		this.scoreText = global.rankingTablescoreText_en;
		if(sessionStorage.getItem('arabic')== "true"){
            this.ar = false;  
            this.locale = "ar";
			this.countriesText = global.rankingTableCountriesText_ar;
		    this.rankText = global.rankingTablerankText_ar;
			this.scoreText =global.rankingTablescoreText_ar;  
			this.selectedGroupName = "عالم ";
        }
		
		this.singleSlct ="";
	}
     /**
      * This function is used to give a classname to the scores based on the color-range.
      */
	 columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
		  // fieldValue is column value
		  // row is whole row object
		  // rowIdx is index of row
		  // colIdx is index of column
		
			if(row.weightedScore < 0.5){
	    		return 'td-range1';
	    	}
	    	else if(row.weightedScore < 1){
	    		
	    		return 'td-range2';
	    	}
			else if(row.weightedScore < 1.5){
				    		
				return 'td-range3';
		    }
			else if(row.weightedScore < 2){
	    		
	    		return 'td-range4';
	    	}
			else if(row.weightedScore < 2.5){
	    		
	    		return 'td-range5';
	    	}
			else if(row.weightedScore < 3){
	    		
	    		return 'td-range6';
	    	}
			else if(row.weightedScore < 3.5){
	    		
	    		return 'td-range7';
	    	}
			else if(row.weightedScore < 4){
	    		
	    		return 'td-range8';
	    	}
			else if(row.weightedScore < 4.5){
	    		
	    		return 'td-range9';
	    	}
			else {
	    		
	    		return 'td-range10';
	    	}

		  
		}
	



	getDataURL(selectedGroupId) {
		var actualGroupId = "1"
		if (selectedGroupId != undefined) {
			actualGroupId = selectedGroupId
		}
		this.selectedYear = sessionStorage.getItem('selectedYear')
		this.selectedKpiId = sessionStorage.getItem("selectedKpiID")
		return conf.apiUrl+"ranking/kpi/" + this.selectedKpiId + "/year/" + this.yearSelected + "/countryGroup/" + actualGroupId + "?locale="+this.locale;
	}

	loadgroupData(response) {
		if(this.refs.rankingTbRef){
			this.setState({ groupdata: response });
		}
		
	}
	
	groupSelectionCallback(groupId,groupName) {
		this.selectedGroupId = groupId;
		this.selectedGroupName = groupName;
		let dataURL = this.getDataURL(this.selectedGroupId)
			this.LoadRankingData(dataURL);
	
	}
	componentWillReceiveProps(nextProps) {
		var groupName = this.selectedGroupName;
		var groupId = this.selectedGroupId;
		this.yearSelected = nextProps.SelectedYear;
			if(this.props.loadType === 1){
			this.LoadRankingData(this.getDataURL(groupId));
			var extUpdate = this.singleSlct;
			//this.refs.singleselect.externalUpdate("World");
			extUpdate.externalUpdate(groupName,groupId);
		 }
   
     }
	shouldComponentUpdate(nextProps, nextState) {
		/*if (this.state.selectedGroupId !== nextState.selectedGroupId) {
			  return true;
			}*/
		const currentGroupId = this.selectedGroupId;
		const selYear = this.yearSelected;
		//console.log(currentGroupId);
		if (currentGroupId !== nextState.selectedGroupId || selYear !== nextState.selectedYear) {
			//console.log(nextState.selectedGroupId);
           //	this.LoadRankingData(this.getDataURL());
			return true;

		}

		return true;

	}
	
	LoadRankingData(dataURL) {

		//this.state.dataURL = this.state.dataURL+this.state.selectedGroupId+"?locale=en";

		//console.log(dataURL);
		jQuery.ajax({

			url: dataURL,
			dataType: 'json',
			type: "GET",
			success: function (data) {
//                sessionStorage.setItem('denominator',data[0].denominator);
			//if(this.refs.rankingTbRef){
				this.setState({ data: data });
				this.loadedData = data;
			//}

			}.bind(this),
			error: function (xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	}
	componentDidMount() {
	var extUpdate = this.singleSlct;
	
			if(this.props.loadType === 1){
					this.LoadRankingData(this.getDataURL());
					//extUpdate.externalUpdate("World");
			}
	
			if(sessionStorage.getItem('arabic') === 'true'){
				if(document.getElementsByClassName("react-bs-table-no-data")[0])
					
				  {
					document.getElementsByClassName("react-bs-table-no-data")[0].textContent="لا توجد بيانات للعرض"
						return <div className="react-bs-table-no-data">لا توجد بيانات للعرض</div>;
					
				  }
			}
			else if(sessionStorage.getItem('arabic') === 'false'){
				if(document.getElementsByClassName("react-bs-table-no-data")[0])
					
				  {
					document.getElementsByClassName("react-bs-table-no-data")[0].textContent="There is no data to display"
					return <div className="react-bs-table-no-data">There is no data to display</div>;
					
				  }
			
		  }
	}
	componentDidUpdate(){
		if(sessionStorage.getItem('arabic') === 'true'){
			if(document.getElementsByClassName("react-bs-table-no-data")[0])
				
			  {
				document.getElementsByClassName("react-bs-table-no-data")[0].textContent="لا توجد بيانات للعرض"
					return <div className="react-bs-table-no-data">لا توجد بيانات للعرض</div>;
				
			  }
		
	  }
		else if(sessionStorage.getItem('arabic')=== 'false'){
			if(document.getElementsByClassName("react-bs-table-no-data")[0])
				
			  {
				document.getElementsByClassName("react-bs-table-no-data")[0].textContent="There is no data to display"

					return <div className="react-bs-table-no-data">There is no data to display</div>;
				
			  }
		
	  }
	}
	render() {


		if(this.state.data)
			
			return (
					<div className="global-ranking-table" >
						<GroupSelectComponent ref={(singleSlct) => { this.singleSlct = singleSlct; }} groupSelectionCallback={this.groupSelectionCallback} loadgroupData={this.loadgroupData} groupdata={this.state.groupdata}/>
						<BootstrapTable data={this.state.data} striped={false} hover={true} scrollTop={'5'}>
		                    <TableHeaderColumn dataField="score" dataAlign="left" dataSort={true} >{this.rankText}</TableHeaderColumn>
							<TableHeaderColumn className="sec-column" dataField="countryName" isKey={true} dataAlign="left" dataSort={true}>{this.countriesText}</TableHeaderColumn>

							<TableHeaderColumn  columnClassName={ this.columnClassNameFormat } dataField="data" dataAlign="right" dataSort={false} >{this.scoreText}</TableHeaderColumn>

						</BootstrapTable>
					</div>
				);
		else{
			if(sessionStorage.getItem('arabic')){
				if(document.getElementsByClassName("react-bs-table-no-data")[0])
					
				  {
					document.getElementsByClassName("react-bs-table-no-data")[0].textContent="لا توجد بيانات للعرض"
						return <div className="react-bs-table-no-data">لا توجد بيانات للعرض</div>;
					
				  }
			}
			return (
					<div className="global-ranking-table" ref="rankingTbRef">
						<GroupSelectComponent ref="singleselect" groupSelectionCallback={this.groupSelectionCallback} loadgroupData={this.loadgroupData} groupdata={this.state.groupdata} />
						<BootstrapTable data={this.state.data} striped={false} hover={true} scrollTop={'5'}>
		                    <TableHeaderColumn dataField="score" dataAlign="left" dataSort={true} >{this.rankText}</TableHeaderColumn>
							<TableHeaderColumn dataField="countryName" isKey={true} dataAlign="left" dataSort={true}>{this.countriesText}</TableHeaderColumn>

							<TableHeaderColumn  columnClassName={ this.columnClassNameFormat } dataField="data" dataAlign="right" dataSort={false} >{this.scoreText}</TableHeaderColumn>

						</BootstrapTable>
					</div>
				);
		}
	}
}

export default RankingTableComponent;