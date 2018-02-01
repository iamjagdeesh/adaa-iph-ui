import React from 'react';
import './NavMenuCss.css';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import CircularProgressbar from '../ProgressBar/CircularProgressbar';
import MultiSelectField from '../../common/MultiSelectN'; 
import {Link} from 'react-router';
import myConfig from '../../../conf.js';
import global from '../../../global.js';
import jQuery from 'jquery';
import CountrySelectedStatus from '../CountrySelectedStatus';

var conf= myConfig;
class CompareCountries extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            Breadcrumbs:this.props.breadcrumbs,
            CountryList:[],
            selectedKPI : this.props.selectedKPI,
            selectedYear : this.props.selectedYear,
            countryKPIData:[],
            selectedCountryList:[],
            titleDescription:'',
            preSelecterdCountry:this.props.SelectedCountry ,
            compareTitleCountDescription:"0/20",
            completeCountryKPIData:[]             //sessionStorage.getItem('MainPillarSelectedCountyID')
        }
        this.accessCountryData = [];
        this.buttonLabel = (sessionStorage.getItem('pillarSelected')).toUpperCase(); 
        this.handleCountrySelection = this.handleCountrySelection.bind(this);
        this.fromOtherpage = false;
        this.ar = false;  
        this.locale = "en"
        this.nodataString = global.nodata_compare_en;
        this.panelTitle=global.comparePanel_title_en;
        this.fullStatsBtn=global.fullstatsBtn_en;
        this.generateGraphicsBtn = global.generateGraphicsBtn_en;
        //this.LoadingText="Loading ...";
        this.LoadingText="No country selected";
         if(sessionStorage.getItem('arabic')=== "true"){
            this.ar = true;
            this.locale="ar";
            this.nodataString=global.nodata_compare_ar;
            this.panelTitle=global.comparePanel_title_ar;
            this.fullStatsBtn=global.fullstatsBtn_ar;
            this.generateGraphicsBtn =global.generateGraphicsBtn_ar;
            this.LoadingText='جاري التحميل ...' 
        }
    }
    addDefaultCountryToDropDown(){
        if(sessionStorage.getItem('MainPillarSelectedCountyID') != '' && sessionStorage.getItem('MainPillarSelectedCountyID') !=""){
            this.refs.mSelect.externalUpdate(sessionStorage.getItem('MainPillarSelectedCountyID'));
        }
        
    }
    /**
     * Close compare panel.
     * All countries(pins) plotted(except default)will be removed from the map
     */
     closeNav() {
          sessionStorage.setItem('compareOpened',false);
          sessionStorage.setItem('fromOtherpage',"false");
          sessionStorage.setItem('MainPillarSelectedCountyID','');
          this.fromOtherpage = false;
                if (this.refs.compareCntRef) { 
                    this.setState({selectedCountryList:[]},function(){
                        var compareList =[];
                        var compareCntries = sessionStorage.getItem('country_info');
                        if(compareCntries !== null && compareCntries !== ""){
                            compareList = compareCntries.split(",");
                        }
                        sessionStorage.setItem('country_info','');
                        this.refs.mSelect.externalUpdate(sessionStorage.getItem('country_info'));
                        this.props.sideNavClose();

                        jQuery('.disableClick').removeClass('StopClickEvent');
                            jQuery('.compare-menu-item').removeClass('active');
                            //document.getElementById("root").classList.remove("move-root");
                             $('.headerNav').removeClass("move-root");
                             $('.footer').removeClass("move-root"); 
                              $('.zoomButton').css('visibility','visible');
                            if(this.ar){
                                jQuery(ReactDOM.findDOMNode(this)).find('#CompareSidenav').css({'left' :'-450px'});
                                // $('.mapael svg').css('right','0px');

                            }else{
                                jQuery(ReactDOM.findDOMNode(this)).find('#CompareSidenav').css({'right' :'-450px'});
                                  $('.mapael svg').css('right','0px'); 
                            }
                           // jQuery(ReactDOM.findDOMNode(this)).find('#CompareSidenav').css({'width' :'0px'});
                            
                        

                            //Clear map pins
                            this.setState({compareTitleCountDescription:"0"+"/"+global.CountryLimit},function(){
                                 this.props.mapPlotChange(compareList,0);
                            });
                           
                    });
                }
                    

    }
    /**
     * Add countries to compare panel on map click
     * @param {string} value 
     */
    addCountriesToCompare(value){
        if(this.refs.mSelect){
             this.refs.mSelect.addSingleCountryExternal(value);
        }
       

    }
     closeProgressGraph(event) {
       // $(event.target).parent().parent().css('display','none');
        jQuery(event.target).parent().parent().remove('.compreProgress-circle');
    }
    /**
     * Event handler for country selection changes from multi select dropdown
     * Changes graphs plotted on compare panel and map pins
     * @param {string} values 
     * @param {number} option 
     */
    handleCountrySelection(values,option){
      var multPnl = this.refs.mSelect;
      var countryIDs = [];
      var type =1;
      var prevList = [];
      var prevItems = sessionStorage.getItem('country_info');
      let difference =[];
      let tempCountryIds=[];
      if(values !== null && values !== ""){
         tempCountryIds = values.split(",");
      }
      countryIDs = tempCountryIds.filter(val=>val!='');

      //Remove an item(default country) from array
     /* var cID = sessionStorage.getItem('MainPillarSelectedCountyID');
      var delIndex = countryIDs.indexOf(cID);
      if (delIndex > -1) {
            countryIDs.splice(delIndex, 1);
             multPnl.externalUpdate(countryIDs);
        }
    */
       if(sessionStorage.getItem('MainPillarSelectedCountyID') != '' && sessionStorage.getItem('MainPillarSelectedCountyID') !=""){
           if(prevItems !== null && prevItems !== ""){
                prevItems = prevItems + ","+sessionStorage.getItem('MainPillarSelectedCountyID');
           }
           else{
               prevItems = sessionStorage.getItem('MainPillarSelectedCountyID');
           }
               
          }
      sessionStorage.setItem('country_info',countryIDs);
     
     if(option === 1){
             
      if(prevItems !== null && prevItems !== ""){
         
          prevList = prevItems.split(",");
          if(prevList.length !== countryIDs.length){

              if(prevList.length > countryIDs.length){

                difference = prevList
                 .filter(x => countryIDs.indexOf(x) === -1)
                 .concat(countryIDs.filter(x => prevList.indexOf(x) === -1));
                 //Remove plot
                 // this.props.mapPlotChange(values);
                 type = 0;
              }
              else{

                difference = prevList
                 .filter(x => countryIDs.indexOf(x) === -1)
                 .concat(countryIDs.filter(x => prevList.indexOf(x) === -1));
                 //Add plot
                 // this.props.mapPlotChange(values);
                 type =1;
                  
              }
          }
      }
     else{
          difference[0] = values;
      }
        if (this.refs.compareCntRef) { 
                if(sessionStorage.getItem('MainPillarSelectedCountyID') != '' && sessionStorage.getItem('MainPillarSelectedCountyID') !=""){
                    if(difference[0] == sessionStorage.getItem('MainPillarSelectedCountyID') ){
                        sessionStorage.setItem('MainPillarSelectedCountyID','');
                    }
                }
                this.setState({selectedCountryList:countryIDs,compareTitleCountDescription:countryIDs.length+"/"+global.CountryLimit},function(){
                //Add/Remove country plot
               
                
                this.props.mapPlotChange(difference,type);
            });
        }
     }
     else{
           if (this.refs.compareCntRef) { 
                this.setState({selectedCountryList:countryIDs,compareTitleCountDescription:countryIDs.length+"/"+global.CountryLimit});
           }
     }

     
  
    }
    /**
     * Validation for navigation to graphics page and full stats
     * @param {object} event 
     */
     handleClickValidation(event)
    { 
         var selCountryCode = sessionStorage.getItem('MainPillarSelectedCountyID');
         if((this.state.selectedCountryList.length == 0 || this.state.selectedCountryList == null) && (selCountryCode == "")){
             
               event.preventDefault();
          }

    }
   /**
    * Load data based on kpi and year selected
    * @param {string} year 
    * @param {string} kpi 
    */
    loadData(year,kpi){
        var multPnl = this.refs.mSelect;
         jQuery.ajax({
            url:conf.apiUrl+"kpiScoreAccordion/"+kpi+"?locale="+this.locale,
            dataType: 'json',
            type: "GET",
            success: function(datavalue) {
                sessionStorage.setItem('KPIdescription',datavalue[0].countryInfo[0].descriptionLong);
                sessionStorage.setItem('datasourceName',datavalue[0].countryInfo[0].sourceName);
                sessionStorage.setItem('frequency',datavalue[0].countryInfo[0].frequency);
                 sessionStorage.setItem('denominator',datavalue[0].countryInfo[0].denominator);
				//this.props.countryData(datavalue);
                this.setState({completeCountryKPIData:datavalue},function(){
                         var ctryList =[];
                var currentYearData =datavalue.filter(function(item){
                     if(item.year == year){
                         return item;
                     }
                });
				    currentYearData.map((row,index) => {
					if(row.year == year && row.year != undefined){                 //pass year from map selectoin(time line)
					   row.countryInfo.map((row,index) => {
							if(row.countryName !== undefined){
								ctryList.push({
										label:row.countryName,
										value: row.countryId
									});
							}
						
						});
						
					}
						
				});
                sessionStorage.setItem("countriesAll",JSON.stringify(ctryList));
                  if (this.refs.compareCntRef) { 
                        this.setState({CountryList:ctryList});
                        this.setState({countryKPIData:currentYearData})
                  }
                
                if(sessionStorage.getItem('fromOtherpage') === "true"){
                   
                    multPnl.externalUpdate(sessionStorage.getItem('country_info'));
                    //Plot pins ons map
                    let cntInfo = sessionStorage.getItem('country_info').split(',');
                    this.setState({compareTitleCountDescription:cntInfo.length+"/"+global.CountryLimit},function(){
                        this.props.mapPlotChange(this.state.selectedCountryList,1);
                    });
                    

                }
                });
			   
             //this.setState({countrydata: datavalue });
            }.bind(this),
                error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    /**
     * React LifeCycle event
     * Load data based on the new values
     * @param {object} nextProps 
     */
    componentWillReceiveProps(nextProps) {
         // if (this.refs.compareCntRef) { 
             let prevKPI = this.props.selectedKPI;
             let prevYear=this.props.selectedYear;
                this.setState({selectedYear: nextProps.selectedYear,selectedKPI:nextProps.selectedKPI,Breadcrumbs: nextProps.Breadcrumbs},function(){
                    if(this.props.loadType === 1 && prevKPI !== nextProps.selectedKPI ){
                        this.loadData(this.state.selectedYear,this.state.selectedKPI);
                    }
                    if( prevKPI === nextProps.selectedKPI && prevYear !== nextProps.selectedYear ){
                        //reload country List
                            var ctryList =[];
                            var currentYearData =this.state.completeCountryKPIData.filter(function(item){
                                if(item.year == nextProps.selectedYear){
                                    return item;
                                }
                            });
                                currentYearData.map((row,index) => {
                                if(row.year == nextProps.selectedYear && row.year != undefined){                 //pass year from map selectoin(time line)
                                row.countryInfo.map((row,index) => {
                                        if(row.countryName !== undefined){
                                            ctryList.push({
                                                    label:row.countryName,
                                                    value: row.countryId
                                                });
                                        }
                                    
                                    });
                                    
                                }
                                    
                            });
                            sessionStorage.setItem("countriesAll",JSON.stringify(ctryList));
                            if (this.refs.compareCntRef) { 
                                    this.setState({CountryList:ctryList});
                                    this.setState({countryKPIData:currentYearData})
                            }
                    }
                });
         // }
     
   }
   /**
    * React LifeCycle event.Returns true or false 
    * @param {object} nextProps 
    * @param {object} nextState 
    */
   shouldComponentUpdate(nextProps, nextState){
       $(function(){
          
        var height1= ($(".pillarMenu-title ").height()+100);
        var height2=   ($(".Select-control").height()+180);
            $('.Compare-progress-graph').css({ height: $(window).innerHeight()- (height1 + height2) });
            $(window).resize(function(){
                $('.Compare-progress-graph').css({ height: $(window).innerHeight()- (height1 + height2) });
            });
        });

        return true;
   }
   /**
    * React LifeCycle event
      Loads data from API based on year and KPI
    */
    componentDidMount(){
        // multi select search scroll code
         $(".Select-control").scroll(function() {
               $(".Select-menu-outer").css('visibility','hidden');
               $(".Select-acontrol").removeClass('is-open is-focused');
               
        });

        $(".Select-control").bind('click', function(){
             $(".Select-acontrol").addClass('is-open is-focused');
              $(".Select-menu-outer").css('visibility','visible');
        });

        $(function(){
        var height1= ($(".pillarMenu-title ").height()+100);
        var height2=   ($(".Select-control").height()+100);
            $('.Compare-progress-graph').css({ height: $(window).innerHeight()- (height1 + height2) });
            $(window).resize(function(){
                $('.Compare-progress-graph').css({ height: $(window).innerHeight()- (height1 + height2) });
            });
        });


        if(this.props.loadType === 1){
         if(sessionStorage.getItem('fromOtherpage') === "true"){
             this.fromOtherpage = true;
         }
         if(this.fromOtherpage === true){
             var tmpList =  sessionStorage.getItem('country_info');
             var ctList = [];
             if(tmpList != null){
                       if(tmpList.length > 0){
                   ctList = tmpList.split(",");
             }
             }
             
            //addSingleCountryExternal
              //if (this.refs.compareCntRef) { 
                        this.setState({selectedCountryList:ctList},function(){
                            this.loadData(this.state.selectedYear,this.state.selectedKPI);
                            // this.refs.mSelect.externalUpdate(sessionStorage.getItem('country_info'));
                        });
             // }
         
         }
         else{
            this.loadData(this.state.selectedYear,this.state.selectedKPI);
         }
       
        }
    }

    /**
     * React LifeCycle event. Renders the component
     */
    render(){


       //Draw Graph
       var cntryList = this.state.selectedCountryList;
       var yearSel = this.state.selectedYear;
       var selKPI = this.state.selectedKPI;
       
       var ComparePlot =   this.state.selectedCountryList.map((rowC,indexC)=>{
       var CompareGraph =   this.state.countryKPIData.map((row,index) => {
                        var CompareGraphplot =   row.countryInfo.map((row,index) => {
                                                    
                         if(row.year == yearSel){

                          if( selKPI ==  row.kpiId){
        
                        
                                 //for(var itemL of cntryList ){
                                     if( (rowC == row.countryId) && (rowC != undefined) ){
                                        var scoreval = row.weightedScore;
                                        if(scoreval == null || scoreval == ' '){
                                            scoreval = 0;
                                        } 
                                         if(row.data == null || row.data == ''){
                                            row.data = this.nodataString;
                                        }
                                        return  (<div className="col-md-6 col-lg-6 col-sm-6 col-xs-6 compreProgress-circle" key={index}>
                                                   
                                                    <div className="Compare-progress-bar">
                                                        <CircularProgressbar  DataValue={row.data} percentage={scoreval}/>
                                                    </div>
                                                    <div className="Compare-progress-country">  {row.countryName}</div>
                                        </div>);
                                     }
                               //  }
                           
                           
                           

                          }
                           
                        }                 
                    });
                     
                     return (
                                <div className="progress-bar-component" onMouseOver={this.onProgressHover} key={index}>
                                        {CompareGraphplot}
                                    </div>
                     );
                });
                return(
                    <div key={indexC}>{CompareGraph}</div>
                )
                });
       //Graw Draw End
        if(ComparePlot.length===1)
        {
        var divStyle = {
                        pointerEvents: 'none',
                        opacity:'0.4'
                        };                            
        return(
            <div ref="compareCntRef">
               
                 <div id="CompareSidenav" className="sidenav PillarSidenav ">
                        <div className="pillarMenu-title menu-title-bar col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                <span className="accordion-menu accordion-menu-title col-md-10 col-lg-10 col-sm-10 col-xs-10">
                                    <div>{this.panelTitle}({this.state.compareTitleCountDescription})</div>
                                     <h4 className="pillar-selected world-ranking-selection">{this.state.Breadcrumbs}  ({sessionStorage.getItem('denominator')})</h4>
                                </span>
                                <span className="accordion-Close col-md-2 col-lg-2 col-sm-2 col-xs-2"><img src="icons/close-panel-normal.png" onClick={this.closeNav.bind(this)} alt="close"></img></span>
                        </div>
                         <div className="clearfix"></div>
                        <div>     
                            <MultiSelectField ref="mSelect" label="Multiselect" countryList={this.state.CountryList} selectCountry={this.handleCountrySelection.bind(this)} />                  
                        </div>
                       
                        <div  className="pillarMenu-body">
                          
                            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 Compare-progress-graph">
                                
                                {ComparePlot}
                                <CountrySelectedStatus statusType={1}/>
                            </div>
                            </div>
                           
                         <div  className="generate-graphics-section">

                           <Link to="/graphics"  style={divStyle} title={this.state.titleDescription} onClick={this.handleClickValidation.bind(this)} >{this.generateGraphicsBtn}</Link>
                           
                        </div> 
                        <div  className="generate-stats-section">
                           <Link to="/stats"  style={divStyle} title={this.state.titleDescription} onClick={this.handleClickValidation.bind(this)}>{this.fullStatsBtn} {this.buttonLabel}</Link>
                        </div>
                </div> 
            </div>
        );
        }
        else
            if(ComparePlot.length > 1){
            return(
            <div ref="compareCntRef">
               
                 <div id="CompareSidenav" className="sidenav PillarSidenav ">
                        <div className="pillarMenu-title menu-title-bar col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                <span className="accordion-menu accordion-menu-title col-md-10 col-lg-10 col-sm-10 col-xs-10">
                                    <div>{this.panelTitle}({this.state.compareTitleCountDescription})</div>
                                     <h4 className="pillar-selected world-ranking-selection">{this.state.Breadcrumbs}  ({sessionStorage.getItem('denominator')})</h4>
                                </span>
                                <span className="accordion-Close col-md-2 col-lg-2 col-sm-2 col-xs-2"><img src="icons/close-panel-normal.png" onClick={this.closeNav.bind(this)} alt="close"></img></span>
                        </div>
                         <div className="clearfix"></div>
                        <div>     
                            <MultiSelectField ref="mSelect" label="Multiselect" countryList={this.state.CountryList} selectCountry={this.handleCountrySelection.bind(this)} />                  
                        </div>
                       
                        <div  className="pillarMenu-body">
                          
                            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 Compare-progress-graph">
                                
                                {ComparePlot}
                               
                            </div>
                            </div>
                           
                         <div  className="generate-graphics-section">

                           <Link to="/graphics"  className="generate-graphics-btn" title={this.state.titleDescription} onClick={this.handleClickValidation.bind(this)} >{this.generateGraphicsBtn}</Link>
                           
                        </div> 
                        <div  className="generate-stats-section">
                           <Link to="/stats"  className="generate-stats-btn" title={this.state.titleDescription} onClick={this.handleClickValidation.bind(this)}>{this.fullStatsBtn} {this.buttonLabel}</Link>
                        </div>
                </div> 
            </div>
        );
    }
        else{
            return(
            <div ref="compareCntRef">
                 <div id="CompareSidenav" className="sidenav PillarSidenav ">
                        <div className="pillarMenu-title menu-title-bar col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                <span className="accordion-menu accordion-menu-title col-md-10 col-lg-10 col-sm-10 col-xs-10">                                    
                                     <div> {this.panelTitle}({this.state.compareTitleCountDescription})</div>
                                     <h4 className="pillar-selected world-ranking-selection">{this.state.Breadcrumbs}  ({sessionStorage.getItem('denominator')})</h4>
                                    </span>
                                <span className="accordion-Close col-md-2 col-lg-2 col-sm-2 col-xs-2"><img src="icons/close-panel-normal.png" onClick={this.closeNav.bind(this)} alt="close"></img></span>
                        </div>
                     <div className="clearfix"></div>
            <div>     
                            <MultiSelectField ref="mSelect" label="Multiselect" countryList={this.state.CountryList} selectCountry={this.handleCountrySelection.bind(this)} />                  
                        </div>
                        
                        <div  className="pillarMenu-body">
                          
                            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 pillar-component pillar-text compare-loading-text">
                                <CountrySelectedStatus statusType={0}/>
                            </div>
                        </div> 
                         <div  className="generate-graphics-section">

                          
                           
                        </div> 
                        <div  className="generate-stats-section">
                          
                        </div>
                </div> 
            </div>
        );  
        }                      
    }
}

export default CompareCountries;
//<a><img  className="CloseProgress"  onClick={this.closeProgressGraph.bind(this)}   src="icons/close-panel-normal.png" title="close"></img></a>
// <a><img  className="CloseProgress"  onClick={this.closeProgressGraph.bind(this)}   src="icons/close-panel-normal.png" title="close"></img></a>
// <Link to="/graphics"  className="generate-graphics-btn" title={this.state.titleDescription} onClick={this.handleClickValidation.bind(this)} >{this.generateGraphicsBtn}</Link>
// <Link to="/stats"  className="generate-stats-btn" title={this.state.titleDescription} onClick={this.handleClickValidation.bind(this)}>{this.fullStatsBtn} {this.buttonLabel}</Link>