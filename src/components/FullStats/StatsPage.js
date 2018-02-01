import React from 'react';
import jQuery from 'jquery';
import './StatsPage.css';
import KpiRows from './KpiRows';
import myConfig from '../../conf.js';
import MultiSelectField2 from './MultiSelectForStats';
import global from '../../global.js';
import Timeline from '../worldmap/Timeline';

var conf= myConfig;
class StatsPage extends React.Component {

       constructor(props) {
             super(props)
         var conf= myConfig;
             this.pillarId = sessionStorage.getItem('pillarIdSelected');
             var tmpList =  sessionStorage.getItem('country_info');
             var ctList = [];
             if(tmpList !== null){
                       if(tmpList.length > 0){
                   ctList = tmpList.split(",");
             }
             }
             this.countryListMain = ctList;//localStorage.getItem('country_info');
             this.Year = sessionStorage.getItem('selectedYear');
             //this.countryList = this.countryListMain;//this.countryListMain.split(",")
             //this.defaultCountrySel = localStorage.getItem('MainPillarSelectedCountyID');
             //this.countryList.push(this.defaultCountrySel);
             this.countriesData = []
             this.transformedData = []
             this.countriesMap = {}
             this.prevYearSelected = sessionStorage.getItem('selectedYear');
             
             var CountryListArray=[];
             var pillarId = sessionStorage.getItem('pillarIdSelected');
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
        this.DropdownCountryList = CountryListArray;
        var tempTimeLineYears = sessionStorage.getItem('TimelineYears');
        var tList = [];
        if(tempTimeLineYears !== null){
        	if(tempTimeLineYears.length > 0){
        		tList = tempTimeLineYears.split(",");
        	}
        }
        this.timelineyears = tList;
        this.state = {
                    countryList:this.countryListMain,
                    
                    selectedYear:this.Year,
                    
                    pillarDetails:JSON.parse(sessionStorage.getItem('pillarDetails'))
                    
        }
             this.kpiActualMap = new Map()
             this.ar = false;
             this.locale = "en";
             this.benchMarkWorld=global.benchMarkWorld;
             this.benchMarkG20=global.benchMarkG20;
             this.benchMarkGCC=global.benchMarkGCC;
             this.benchMarkArab=global.benchMarkArab;
             this.benchMarkOECD=global.benchMarkOECD;
             if(localStorage.getItem('arabic')== "true"){
                   this.ar = true;
                   this.locale="ar";
                   this.benchMarkWorld=global.benchMarkWorld_ar;
                   this.benchMarkG20=global.benchMarkG20_ar;
                   this.benchMarkGCC=global.benchMarkGCC_ar;
                   this.benchMarkArab=global.benchMarkArab_ar;
                   this.benchMarkOECD=global.benchMarkOECD_ar;
                   
               }
             this.baseUrl = conf.apiUrl+"kpisScore/pillar/" + this.pillarId + "/year/" + this.state.selectedYear + "/countries/" + this.state.countryList + "?locale=" + this.locale
             this.SelectCountryCallback = this.SelectCountryCallback.bind(this);
             this.timeLine = this.timeLine.bind(this);
       };
       
       timeLine(response) {
           //console.log(response);
    	  
          this.prevYearSelected = this.state.selectedYear;
          this.setState({selectedYear:response},function(){
              //console.log(this.state.year);
              sessionStorage.setItem("selectedYear",this.state.selectedYear);
              this.baseUrl = conf.apiUrl+"kpisScore/pillar/" + this.pillarId + "/year/" +this.state.selectedYear + "/countries/" + this.state.countryList + "?locale=" + this.locale
              this.loadData(this.baseUrl);
              this.setState({pillarDetails:JSON.parse(sessionStorage.getItem('pillarDetails'))});
              //JSON.parse(sessionStorage.getItem('pillarDetails'));
          });
          //
          
        }
       SelectCountryCallback(countryName){
             //console.log(this.state.countryList);
        var length=this.state.countryList.length;
        if(this.state.countryList.includes("null"))  // pop null values that come when the default country is only sent without the compare con
           this.state.countryList.pop(this.state.countryList.indexOf("null"));
        if(this.state.countryList.includes(""))  // pop null values that come when the default country is only sent without the compare con
           this.state.countryList.pop(this.state.countryList.indexOf(""));
            if(countryName==="")
                countryName=localStorage.getItem('MainPillarSelectedCountyID');
            var actualValue=countryName.split(',');
            length=actualValue.length;
            var finalCountries=[];
            for (var count=0;count<length;count++)
                {
                    if(!this.state.countryList.includes(actualValue[count])) // only if the country is not there it is being pushed
                      finalCountries.push(actualValue[count])  
                }

            finalCountries=countryName.split(',');
            var l1=this.state.countryList.length;
            for(var i=0;i<l1;i++)
                {
                    if(this.state.countryList[i].length===1)
                      finalCountries[finalCountries.length]= this.state.countryList[i];
                }
             var conf= myConfig;
             this.baseUrl = conf.apiUrl+"kpisScore/pillar/" + this.pillarId + "/year/" + this.state.selectedYear + "/countries/" + finalCountries + "?locale=" + this.locale
             console.log(this.baseUrl);
             
                       this.setState({countryList:finalCountries});
             

             
       }
      
       loadData(baseUrl) {
       
             jQuery.ajax({
                    url: baseUrl,
                    dataType: 'json',
                    type: "GET",
                    async: false,
                    success: function (data) {
                    	 
                    	 this.countriesData = data;    
                    
                    }.bind(this),
                    error: function (xhr, status, err) {
                           console.error(this.props.url, status, err.toString());
                    }.bind(this)
             });
            
             this.transformData();
             this.getCountriesMap();
       }
       /**
       * 
        */
       flatten(arr) {
             return arr.reduce(function (flat, toFlatten) {
                    return flat.concat(Array.isArray(toFlatten) ? this.flatten(toFlatten) : toFlatten);
             }, []);
       }
       getCountriesList() {
             
       }
   /**
    * This function is used to get the list of all countries 
    **/
       getCountriesMap() {
             var array = sessionStorage.getItem('countriesAll');
             array = JSON.parse(array);
             for (var i = 0; i < array.length; i++) {
                    var temp = array[i];
                    this.countriesMap[temp.value] = temp.label;
             }
             /*var array2 = sessionStorage.getItem('countriesData');
              array2 = JSON.parse(array2);
              var groupAndCountriesArray = this.countriesMap;
               for (var i = 0; i < array2.length; i++) {
                    var temp = array2[i];
                    groupAndCountriesArray[temp.groupUid] = temp.groupName;
             }
             this.countriesMap = groupAndCountriesArray;
              */
       }
       
       /**
       * This function is used to create an object with required details for each country
       */
       transformData() {
             
             var kpiScoresMapTemp = []
             var kpiScoresMap = []
             var res = this.countriesData.map((mainRow, mainIndex) => {
                    if (mainRow != undefined) {
                           var countryId = mainRow.countryId;
                           var countryName = mainRow.countryName;

                           var kpiScores = mainRow.kpiScores

                           kpiScores.map((kpiScoreRow, kpiScoreIndex) => {
                                 var kpiId = kpiScoreRow.kpiId
                                 var kpiName = kpiScoreRow.kpiName
                                 var kpiScore = kpiScoreRow.data
                                 var kpiWeightedScore = kpiScoreRow.weightedScore
                                 var denominator = kpiScoreRow.denominator
                                 var key = countryId.concat('_').concat(kpiId)

                                 this.kpiActualMap.set(key, {
                                        "kpiId": kpiId, "kpiName": kpiName,
                                        "score": kpiScore, "weightedScore": kpiWeightedScore, "denominator":denominator
                                 })
                                 kpiScoresMapTemp.push({
                                        [key]: {
                                               "kpiId": kpiId, "kpiName": kpiName,
                                               "score": kpiScore, "weightedScore": kpiWeightedScore, "denominator":denominator
                                        }
                                 })
                           });

                    }
                    return res
             });
             this.transformedData = kpiScoresMapTemp
       }

    /**
     * This function is used to get all details of selected countries
     */
       getCountryDetails(props) {
             var countriesScore = []
             var responseObject = []

             var singleObj = {}
             var countryScoresObjList = []
             for (var i = 0; i < this.state.countryList.length; i++) {

                    var countryId = this.state.countryList[i];
                    var key = countryId.concat('_').concat(props);
                    var scoreObject = this.kpiActualMap.get(key);
                    //console.log(scoreObject);
                    if (scoreObject != undefined) {
                           singleObj['kpiId'] = props
                           singleObj['kpiName'] = scoreObject.kpiName
                           singleObj['denominator'] = scoreObject.denominator
                           var countryScoresObj = {}

                           countryScoresObj["countryName"] = this.countriesMap[countryId]
                           countryScoresObj["countryId"] = countryId
                           countryScoresObj["score"] = scoreObject.score
                           countryScoresObj["weightedScore"] = scoreObject.weightedScore
                           countryScoresObjList.push(countryScoresObj)

                           singleObj[countryId] = scoreObject.score
                    }
             }
             singleObj['countryScores'] = countryScoresObjList
             responseObject.push(singleObj)

             return responseObject[0]
       }
       componentWillUpdate (){
    
       }
       
       shouldComponentUpdate(nextProps, nextState) {
    	  
    	   //console.log(nextState.countryList !== this.state.countryList)
    	   // return nextState.countryList !== this.state.countryList;
    	   return true;
    	  }

       render() {
    	    if(this.prevYearSelected === this.state.selectedYear){
    	    	 this.loadData(this.baseUrl);
    	    }
            
            
             var pillarData = JSON.parse(sessionStorage.getItem('pillarDetails'));
             var pillarId = this.pillarId;
             var datatemp = []
             var subPillars = this.state.pillarDetails.map((row, index) => {
                    if (row.subTopicList != undefined && row.pillarId == pillarId) {                            //
                           var subTopicList = row.subTopicList.map((row1, index1) => {

                                 var kpiDetails = row1.kpiList.map((rowKpi, indexKpi) => {
                                        if (rowKpi != undefined) {
                                               var res = {}
                                               res = this.getCountryDetails(rowKpi.id)

                                               datatemp.push(res)

                                               return rowKpi;
                                        }
                                 });

                           });
                    }
                    return subTopicList
             });
             return (
                     <div>
                             <div className="col-xs-12">
                                <KpiRows rowData={datatemp} countryList={this.state.countryList} selectedYear = {this.state.selectedYear} />
                             </div>
                             
                             <Timeline timeLineYears={this.timelineyears} timeLine={this.timeLine} year={this.state.selectedYear} />
                     </div>
                 )

            

       }
};

export default StatsPage;
/*return (
<div>
        <div className="col-xs-8">
           <KpiRows rowData={datatemp} countryList={this.state.countryList} selectedYear = {this.state.selectedYear} />
        </div>
        <div className="col-xs-4 iph-Addcountries" style={{'float':'right'}}>
                   <h4 className="">Addcountries </h4>
                   <div className="search-box">
                          <MultiSelectField2 finalCountries={this.state.countryList} CountryListArray={ this.DropdownCountryList} SelectCountryCallback={this.SelectCountryCallback} />
                   </div>
                          <div className="benchmarkDatasource col-xs-8">
                          <div className="iph-Benchmarks-btns">
                                 <h4 className="">{this.Benchmarks}</h4>
                                  <a href="#" className="btn btn-outline benchMark0" data-toggle="tooltip" title="" id="0">{this.benchMarkWorld}</a> 
                                  <a href="#" className="btn btn-outline benchMark1"  id="1"> {this.benchMarkG20} </a> 
                                  <a href="#" className="btn btn-outline benchMark2"  id="2"> {this.benchMarkGCC} </a> 
                                  <a href="#" className="btn btn-outline benchMark3"  id="3"> {this.benchMarkArab} </a> 
                                  <a href="#" className="btn btn-outline benchMark4"  id="4"> {this.benchMarkOECD} </a> 
                         </div>
                         </div>
        </div>
        <Timeline timeLineYears={this.timelineyears} timeLine={this.timeLine} year={this.state.selectedYear} />
</div>
)*/



