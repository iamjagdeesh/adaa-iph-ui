import React from 'react';
import jQuery from 'jquery';

import myConfig from '../../conf.js'
//import applications from '../../../manifest.yml'
//var readYaml = require('read-yaml');

class CountryComponent extends React.Component {
    
     constructor (props) {
        super(props);
     
        var conf= myConfig;
    	
        this.state = { 
           //data :   [{ "countryName": "Loading..."}],
           //countrysearch : '',
           dataURL : conf.apiUrl+"countryAlphaList?locale=en"
        	      
        }
        this.onClick = this.handleClick.bind(this);
        
        //this.countrysearch= this.countrysearch.bind(this);
    }    
    
     handleClick(clicked) {
         var dArray = clicked.split(";");
         var ctryId = dArray[0];
         var ctryName = dArray[1];
         jQuery('.pillar-worldCountries .active').removeClass('active');
         jQuery('.ctry-'+ctryId).addClass('active'); 
        // jQuery(this.props.countryName+'-'+clicked).addClass('active');  
         this.props.countrySelectionCallback(clicked);
    }
    
    render() {
    let ar=false;
     if(sessionStorage.getItem('arabic')=== "true"){
            ar = true;
     } 
     let countryList=[],
         countryList_ar=[];  
     var countries = this.props.countrydata.map((row,index) => {
         var filteredcountriesList;
         var searchstring = this.props.countrysearch;
         //console.log(searchstring);

         if(row.countriesList !== undefined){

            filteredcountriesList = row.countriesList.filter(function(row1,index1){
               if(jQuery('#txtsearch').val().length > 0){
                    jQuery('.Pillar_Coutry_serach input').css('width','60%');
                    jQuery('#txtsearch').css('background-color','#000');
                   
               }else{
                    jQuery('.Pillar_Coutry_serach input').css('width','10%');
                    jQuery('#txtsearch').css('background-color','#1A0D1A');
                    
               }
            return row1.countryName.toLowerCase().search(
                searchstring.toLowerCase()) !== -1;      
            });   


             var countriesList = filteredcountriesList.map((row1,index1) => {
                    if(!ar){
                            countryList.push({
                                label:row1.countryName,
                                value:row1.countryId
                            });
                            countryList_ar.push({
                                label:row1.countryNameOtherLang,
                                value:row1.countryId 
                            });
                    }
                    else{
                         countryList.push({
                            label:row1.countryNameOtherLang,
                            value:row1.countryId
                     });
                      countryList_ar.push({
                            label:row1.countryName,
                            value:row1.countryId
                     });
                    }
                    
                    
                     return <div key={index1}>
                               <div className={`subpillar-text subpillar-text-en countries-name ctry-${row1.countryId}`} id={row1.countryId} key={row1.countryId} onClick={this.onClick.bind(this, row1.countryId+";"+row1.countryName+";"+row1.countryNameOtherLang)}>{row1.countryName}</div>
                             </div>
                     });             
         }
             
         if(filteredcountriesList !== undefined){
         if(filteredcountriesList.length >= 1){
            // console.log(filteredcountriesList.length);
             //if(filteredcountriesList.length == 1)
                // console.log("length is 1");
         return (<div className="col-xs-6 col-sm-4 col-md-4 col-lg-3 worldCountry-list-order" key={index}>
                     <div className="subpillar-title" key={row.alphabet}>{row.alphabet}</div>
                    <div>{countriesList}</div>
                    </div>)}}

         });
         
         sessionStorage.setItem('CountryDataListEN',JSON.stringify(countryList));
         sessionStorage.setItem('CountryDataListAR',JSON.stringify(countryList_ar));    

     return (<div>{countries}</div>) ;
  } 
}

export default CountryComponent;