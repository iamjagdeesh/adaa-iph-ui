import React from 'react';
import './NavMenuCss.css';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import CircularProgressbar from '../ProgressBar/CircularProgressbar';
import CountryKpiDetails from './CountryKpiDetails'; 
import myConfig from '../../../conf.js';
import global from '../../../global.js';
import SingleSelect from '../../common/SingleSelect';


 var conf= myConfig;
class CountryInfoPanel extends React.Component {
    constructor (props) {
        super(props);
       
       this.pillarId =  sessionStorage.getItem('pillarIdSelected')
		this.countriesData = []
        this.ar = false;  
        this.locale = "en"
        this.nodataString = global.nodata_compare_en;
        this.scoreText = global.rankingTablescoreText_en;
        this.kpiText = global.KpiText_en;


         if(sessionStorage.getItem('arabic')=== "true"){
            this.ar = true;
            this.locale="ar";
            this.nodataString=global.nodata_compare_ar;
            this.scoreText = global.rankingTablescoreText_ar;
            this.kpiText = global.KpiText_ar;
            this.cntryList=JSON.parse(sessionStorage.getItem('CountryDataListAR'))
            this.Benchmarks=global.Benchmarks_ar;
            this.Datasource=global.Datasource_ar;
            this.Frequency=global.Frequency_ar;
            this.DatasourceYearStatic=global.DatasourceYearStatic_ar;

        }
        else{
            this.cntryList=JSON.parse(sessionStorage.getItem('CountryDataListEN'))
            this.Datasource=global.Datasource;
            this.Benchmarks=global.Benchmarks;
            this.Frequency=global.Frequency;
            this.DatasourceYearStatic=global.DatasourceYearStatic;

        }
        this.selectedYear=this.props.selectedYear
        this.SelectedcountryName= this.props.SelectedcountryName
       // this.ContyrIDval="SA"
        this.ContyrIDval=this.props.SelectedCountry
        this.kpiDataURL=conf.apiUrl+"kpisScore/pillar/" + this.pillarId + "/year/" + this.selectedYear + "/countries/" + this.ContyrIDval + "?locale="+this.locale;
        this.countryKPIdata=[]
        this.Breadcrumbs= this.props.breadcrumbs
        this.state = {  
            selectedYear:this.props.selectedYear,
            // pillarIdSelected :sessionStorage.getItem('pillarIdSelected'),
             subpillarSelected:this.props.selectedKPI,
             pillarSelected:sessionStorage.getItem('pillarIdSelected'),                        //sessionStorage.getItem('subpillarSelected'),
             selectedCountryID:this.props.SelectedCountry,
             Breadcrumbs:this.props.breadcrumbs,
             Kpidata_list:[],
             CountryList: this.cntryList,
             displayKPISection:false,
             toggleKPISection:global.HideKPISectionText_en,
             displayDatasource:false,
             toggleDataSourceSection:global.HideDataSourceText_en
        }   
         this.pillarId = this.state.pillarIdSelected 
         this.toggleKPISection=this.toggleKPISection.bind(this);
         this.toggleDataSource=this.toggleDataSource.bind(this);
       
           
    }
   

    
    /**
     * React LifeCycle event.
     * @param {object} nextProps 
     * @param {object} nextState 
     */
    shouldComponentUpdate(nextProps, nextState){

         $(function(){
             
        var height1= ($(".accordion-menu.accordion-menu-title").height());
        var heightpillarMenu= ($(".pillarMenu-title ").height()+40);
        var heightKPI=   ($(".KPI-Circle-data").height()+60);
            $('.KPI-info-data').css({ height: $(window).innerHeight()- (height1+heightpillarMenu + heightKPI) });
            $(window).resize(function(){
                $('.KPI-info-data').css({ height: $(window).innerHeight()- (height1 + heightpillarMenu + heightKPI) });
            });
        });
        return true;
    }
    toggleDataSource(){
         let toggleValue = this.state.displayDatasource;
         this.setState({displayDatasource:!toggleValue},function(){
            if(toggleValue===true){
                if(!this.ar){
                     this.setState({toggleDataSourceSection:global.ShowDataSourceText_en});
                }
                else{
                    this.setState({toggleDataSourceSection:global.ShowDataSourceText_ar});
                }
               
            }
            else{
                if(!this.ar){
                     this.setState({toggleDataSourceSection:global.HideDataSourceText_en});
                }
                else{
                    this.setState({toggleDataSourceSection:global.HideDataSourceText_ar});
                }
                
            }

            
         });
    }
    toggleKPISection(){
        let toggleValue = this.state.displayKPISection;
        this.setState({displayKPISection:!toggleValue},function(){
            if(toggleValue===true){
                if(!this.ar){
                     this.setState({toggleKPISection:global.ShowKPISectionText_en});
                }
                else{
                    this.setState({toggleKPISection:global.ShowKPISectionText_ar});
                }
               
            }
            else{
                if(!this.ar){
                     this.setState({toggleKPISection:global.HideKPISectionText_en});
                }
                else{
                    this.setState({toggleKPISection:global.HideKPISectionText_ar});
                }
                
            }
            
        });
    }
    /**
     * Load Data from backend based on pillar,country and year
     * @param {string} pillarSelected 
     * @param {string} country 
     * @param {string} year 
     */
    loadData(pillarSelected,country,year){
        country = this.state.selectedCountryID;
        this.kpiDataURL= conf.apiUrl+"kpisScore/pillar/" + pillarSelected + "/year/" + year + "/countries/" + country + "?locale="+this.locale
        if(this.props.loadType === 1){
        $.ajax({
			//url: "https://iph-service.cfapps.io/iph/kpisScore/pillar/1/year/2013/countries/SA,IN,RU,RS?locale=en",
			url: this.kpiDataURL,
			dataType: 'json',
			type: "GET",
			async: false,
			success: function (data) {
                if(!sessionStorage.getItem('denominator'))
                sessionStorage.setItem('denominator',data[0].kpiScores[0].denominator);
                     if (this.refs.cntryInfoRef) {
                         this.setState({Kpidata_list: data});
                     }
                    
				this.countryKPIdata = data;
			}.bind(this),
			error: function (xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		}); 
       }
    }
/**
 * React LifeCycle event
 * @param {object} nextProps 
 */
 componentWillReceiveProps(nextProps) {
        var pillarSel= sessionStorage.getItem('pillarIdSelected');
        if(sessionStorage.getItem('fromOtherpage') == "false"){
            if (this.refs.cntryInfoRef) {
                        this.setState({selectedYear: nextProps.selectedYear,pillarSelected:pillarSel,subpillarSelected:nextProps.selectedKPI,Breadcrumbs: nextProps.Breadcrumbs,selectedCountryID:nextProps.SelectedCountry,selectedCountryName:sessionStorage.getItem('MainPillarSelectedCountyName')},function(){
                        if(this.state.selectedCountryID != ''){
                             this.loadData(this.state.pillarSelected,this.state.selectedCountryID,this.state.selectedYear);
                        }
                    });
            }
        }
}
/**
 * React LifeCycle event
 */
    componentDidMount(){
         // console.log(this.kpiDataURL);
    if(this.ar){
        this.setState({toggleKPISection:global.ShowKPISectionText_ar,toggleDataSourceSection:global.ShowDataSourceText_ar});
    }
    else{
        this.setState({toggleKPISection:global.ShowKPISectionText_en,toggleDataSourceSection:global.ShowDataSourceText_en});
    }
    if(sessionStorage.getItem('fromOtherpage') == "false"){
        if(sessionStorage.getItem('MainPillarSelectedCountyID') != '' && sessionStorage.getItem('MainPillarSelectedCountyID') !=""){
             this.loadData(this.state.pillarSelected,this.state.selectedCountryID,this.state.selectedYear);
        }
        
    }

        $(function(){
        var heightpillarMenu= ($(".pillarMenu-title ").height()+40);
        var heightKPI=   ($(".KPI-Circle-data").height()+20);
            $('.KPI-info-data').css({ height: $(window).innerHeight()- (heightpillarMenu + heightKPI) });
            $(window).resize(function(){
                $('.KPI-info-data').css({ height: $(window).innerHeight()- (heightpillarMenu + heightKPI) });
            });
        });
     }
    /**
     * Close panel
     */
    closeNav() {
          
          //clear pin 
          this.props.removeMapPin();
          sessionStorage.setItem('MainPillarSelectedCountyID','');
          
          $('.pillar-menu-item').removeClass('active');
          $('.disableClick').removeClass('StopClickEvent');
          //document.getElementById("root").classList.remove("move-root")
           $('.headerNav').removeClass("move-root");
           $('.footer').removeClass("move-root"); 
            $('.zoomButton').css('visibility','visible');
          if(this.ar)
          {
                $(ReactDOM.findDOMNode(this)).find('#CountryInfoPanel').css({'left' :'-450px'});
                //$('.mapael svg').css('right','0px');
          }
          else
          {
                $(ReactDOM.findDOMNode(this)).find('#CountryInfoPanel').css({'right' :'-450px'});
                $('.mapael svg').css('right','0px');
          }
      
            this.props.sideNavClose();
    }
   
    /**
     * React LifeCycle event
     * Renders the component
     */
    render() { 
            var countryID = this.state.selectedCountryID;
            var kpiSel = this.state.subpillarSelected;
            let countryName_sel = this.SelectedcountryName;
            if(this.props.loadType === 1){
            var KPI_selected_country = this.countryKPIdata.map((row,index) => {
                var KPI_country_ID= row.countryId;
                countryName_sel = row.countryName;
                sessionStorage.setItem('MainPillarSelectedCountyName',countryName_sel);
               
                //var countryID
                var displayData;
                //var KPI_country_name= row.countryName;
                for(var counter=0;counter<row.kpiScores.length;counter++){
                        if(row.kpiScores[counter].kpiId===Number(kpiSel))
                            sessionStorage.setItem('denominator',row.kpiScores[counter].denominator);
                    }
                   
                    var SelectedCountryData =   row.kpiScores.map((row,index) => {
                        // console.log(this.state.selectedYear+"======"+ this.ContyrIDval +"========"+KPI_country_ID );
                       //  if(row.year == this.state.selectedYear){
                             displayData = row.data;
                              if( countryID === KPI_country_ID ){
                                 
                                  
                                if(kpiSel ==  row.kpiId){
                                  
                                    if( row.weightedScore == null || row.weightedScore =='')
                                    {
                                        if(row.data == null || row.data == ''){
                                            displayData = this.nodataString;
                                        }
                                        row.weightedScore = 0;
                                        return  <div key={index}>
                                                    <div className="KPI-graph-kpiname">{countryName_sel}</div> 
                                                    <div className="KPI-progress-bar">
                                                        <CircularProgressbar  DataValue={displayData} percentage={row.weightedScore}/>
                                                    </div>
                                                    <div className="KPI-graph-kpiname"> {row.denominator} </div>   
                                                </div>
                                    }
                                    else
                                    {
                                    	if(row.data == null || row.data == ''){
                                            displayData = this.nodataString;
                                        }
                                        return  <div key={index}> 
                                                     <div className="KPI-graph-kpiname">{countryName_sel}</div>    
                                                    <div className="KPI-progress-bar">
                                                        <CircularProgressbar  DataValue={displayData}  percentage={row.weightedScore}/>
                                                    </div>
                                                    <div className="KPI-graph-kpiname">{row.denominator}</div>
                                              
                                                </div>
                                    }
                                }
                                
                            }
                        // }
                                    
                    });


                     return <div key={index}>
                                        {SelectedCountryData}
                            </div>
                });
            
        if(this.ar){
            return ( 
                    <div ref="cntryInfoRef">
                       <div id="CountryInfoPanel" className="sidenav Country-Info-Nav">
                                <div className="pillarMenu-title menu-title-bar col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                        <span className=" col-md-10 col-lg-10 col-sm-10 col-xs-10 accordion-menu accordion-menu-title">                                            
                                            <div>{global.CountryDetailsTitle_ar}</div>
                                            <h4 className="pillar-selected world-ranking-selection">{this.state.Breadcrumbs} ({sessionStorage.getItem('denominator')})</h4>
                                            </span>
                                        <span className=" col-md-2 col-lg-2 col-sm-2 col-xs-2 accordion-Close"><img src="icons/close-panel-normal.png" onClick={this.closeNav.bind(this)} alt="close"></img></span>
                                </div> 
                                <div className="clearfix"></div>
                                <div className="countrySearch">
                                        <SingleSelect countrySearchCallback={this.props.countrySearchCallback} countryList={this.state.CountryList} />
                                 </div>
                                <div  className="pillarMenu-body">
                                     
                                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 KPI-Circle-data">
                                        {KPI_selected_country}
                                    </div>
                                        <div className="kpi-section-datasource">
                                        <button className="datasource-toggle-button"  type="button" onClick={this.toggleDataSource}> > {this.state.toggleDataSourceSection}</button>
                                        {this.state.displayDatasource &&<div className="kpi-datasource">
                                            <h3>{this.Datasource}  </h3>
                                            <h5 >{sessionStorage.getItem('datasourceName')}</h5>
                                            <h4 >{this.benchMarkDescription}  </h4>

                                            {this.state.DatasourceData}
                                                    <h5><span className="DataSourceFrequency">{this.Frequency}</span> : {sessionStorage.getItem('frequency')}</h5>
                                                    <h5><span className="DataSourceYear"> {this.DatasourceYearStatic}</span> : {this.state.selectedYear}</h5>
                                        </div>
                                        }
                                    </div>
                                    <div className="kpi-data-Section">
                                   
                                        <button className="kpi-section-toggle-button" type="button" onClick={this.toggleKPISection}> > {this.state.toggleKPISection} {sessionStorage.getItem('pillarSelected')}</button>
                                   

                                    {this.state.displayKPISection &&<div className="kpi-Section" id="kpi-section">

                                    <div className="col-md-3 col-lg-3 col-sm-3 col-xs-3" style={{'color':'white',paddingRight:'30px'}} >{this.scoreText}</div>
                                    <div className="col-md-9 col-lg-9 col-sm-9 col-xs-9" style={{'color':'white',paddingRight:'45px'}} >{this.kpiText}</div>
                                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 KPI-info-data">
                                       <CountryKpiDetails Kpidata_list={this.state.Kpidata_list} selectHandler={this.props.selectHandler}/>
                                    </div>

                                    </div>
                                     }
                                     </div>
                                </div> 
           
                        </div>
                           
                    </div>
                );
        	
        }else{
        	
            return ( 
                    <div ref="cntryInfoRef">
                       <div id="CountryInfoPanel" className="sidenav Country-Info-Nav">
                                <div className="pillarMenu-title menu-title-bar col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                        <span className=" col-md-10 col-lg-10 col-sm-10 col-xs-10 accordion-menu accordion-menu-title">
                                           <div>{global.CountryDetailsTitle_en}</div>
                                             <h4 className="pillar-selected world-ranking-selection">{this.state.Breadcrumbs} ({sessionStorage.getItem('denominator')})</h4>
                                            </span>
                                        <span className=" col-md-2 col-lg-2 col-sm-2 col-xs-2 accordion-Close"><img src="icons/close-panel-normal.png" onClick={this.closeNav.bind(this)} alt="close"></img></span>
                                </div> 

                                 <div className="clearfix"></div>
                                 <div className="countrySearch">
                                        <SingleSelect countrySearchCallback={this.props.countrySearchCallback} countryList={this.state.CountryList} />
                                 </div>
                                 
                                <div  className="pillarMenu-body">
                                  
                                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 KPI-Circle-data">
                                        {KPI_selected_country}
                                    </div>
                                    <div className="kpi-section-datasource">
                                        <button className="datasource-toggle-button"  type="button" onClick={this.toggleDataSource}> > {this.state.toggleDataSourceSection}</button>
                                        {this.state.displayDatasource &&<div className="kpi-datasource">
                                            <h3>{this.Datasource}  </h3>
                                            <h5 >{sessionStorage.getItem('datasourceName')}</h5>
                                            <h4 >{this.benchMarkDescription}  </h4>

                                            {this.state.DatasourceData}
                                                    <h5><span className="DataSourceFrequency">{this.Frequency}</span> : {sessionStorage.getItem('frequency')}</h5>
                                                    <h5><span className="DataSourceYear"> {this.DatasourceYearStatic}</span> : {this.state.selectedYear}</h5>
                                        </div>
                                        }
                                    </div>
                                    <div className="kpi-data-Section">
                                                                                  
                                            <button className="kpi-section-toggle-button" type="button" onClick={this.toggleKPISection}> > {this.state.toggleKPISection} {sessionStorage.getItem('pillarSelected').toUpperCase()}</button>
                                       
                                        
                                        {this.state.displayKPISection &&<div className="kpi-Section" id="kpi-section">
                                            <div className="col-md-9 col-lg-9 col-sm-9 col-xs-9" style={{'color':'white',paddingLeft:'45px'}} >{this.kpiText}</div>
                                            <div className="col-md-3 col-lg-3 col-sm-3 col-xs-3" style={{'color':'white',paddingLeft:'30px'}} >{this.scoreText}</div>
                                                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 KPI-info-data">
                                                    <CountryKpiDetails Kpidata_list={this.state.Kpidata_list} selectHandler={this.props.selectHandler}/>
                                                </div>
                                        </div>
                                        }
                                    </div>
                                </div> 
           
                        </div>
                           
                    </div>
                );
        	
        }

            }
            else{
                return(
                    <div className="No-data-found">No data</div>
                );
            }
        //
    }
}


export default CountryInfoPanel;
//<h4 className="pillar-selected">{this.breadcrumbs}</h4>