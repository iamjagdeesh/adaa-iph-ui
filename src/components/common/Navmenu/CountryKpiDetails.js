
import React from 'react';
import './NavMenuCss.css';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';

var pillarIdSelected =sessionStorage.getItem('pillarIdSelected');
var subpillarSelected=sessionStorage.getItem('subpillarSelected');

class CountryKpiDetails extends React.Component {
    constructor (props) {
        super(props);
         this.state = {
              Kpidata_list:this.props.Kpidata_list,
         }
        
         this.locale = "en";
         this.ar = false;
         if(sessionStorage.getItem('arabic')== "true"){
            this.ar = true;  
            this.locale = "ar";
			            
        }
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(param1,param2){
       // alert(param1+" : "+ param2);
       //this.props.statusChange(kpiName+";"+kpiId+";"+this.props.pillarSelected);
       let kpiName = param1;
       let kpiId = param2;
       let pillarName=sessionStorage.getItem('pillarSelected',pillarName);
       jQuery('.accordion-subpillar-row .active').removeClass('active');
       this.props.selectHandler(kpiName+";"+kpiId+";"+pillarName);
    }
     componentWillReceiveProps(KpiData) {
         this.setState({Kpidata_list: KpiData.Kpidata_list});
     
   }
   
    shouldComponentUpdate(nextProps, nextState){
        return true;
    }

    render() {   
           var KPI_selected_country;
           var nodata ='';
           if(this.ar){
                        KPI_selected_country = this.state.Kpidata_list.map((row,index) => {
               
                var KPI_country_ID= row.countryId;
                var KPI_country_name= row.countryName;
                
                    var SelectedCountryData =   row.kpiScores.map((row,index) => {
                    	//console.log(row);
                    if( row.data == null || row.data==''){
                        row.score=0;
                        nodata='-';
                        return <div  className={`kpilist-item-countryinfo`}  key={index} onClick={this.clickHandler.bind(this,row.kpiName,row.kpiId)}  >
                                     
                                    <div className="col-md-2 col-lg-2 col-sm-2 col-xs-2 Selected-country-KPI Selected-country-KPI-score-ar">
                                        <div className='nodatahyphen-ar'>{nodata}</div>
                                    </div>

                                    <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10 Selected-country-KPI-ar">
                                        <div className={`country-kpiIds country-kpiId-${row.kpiId}`}>{row.kpiName} ({row.denominator})</div>
                                    </div>

                                    
                                </div> 
                        } else{
                        	var rowColor;
                        	if(row.weightedScore < 0.5){
                        		rowColor="range1";
                        	}
                        	else if(row.weightedScore < 1){
                        		
                        		rowColor = "range2";
                        	}
            				else if(row.weightedScore < 1.5){
            				            		
            				    rowColor = "range3";
            				}
            				else if(row.weightedScore < 2){
                        		
            				    rowColor = "range4";
            				}
            				else if(row.weightedScore < 2.5){
                        		
            				    rowColor = "range5";
            				}
            				else if(row.weightedScore < 3){
                        		
            				    rowColor = "range6";
            				}
            				else if(row.weightedScore < 3.5){
                        		
            				    rowColor = "range7";
            				}
            				else if(row.weightedScore < 4){
                        		
            				    rowColor = "range8";
            				}
            				else if(row.weightedScore < 4.5){
                        		
            				    rowColor = "range9";
            				}
            				else{
                        		
            				    rowColor = "range10";
            				}
                            return <div  className={`kpilist-item-countryinfo`}  key={index} lang='ar' onClick={this.clickHandler.bind(this,row.kpiName,row.kpiId)}>
                                  
                                    <div className="col-md-3 col-lg-3 col-sm-3 col-xs-3 Selected-country-KPI Selected-country-KPI-score-ar">

                                        <div className={rowColor}>{row.data}</div>
                                    </div>
                                      <div className="col-md-9 col-lg-9 col-sm-9 col-xs-9 Selected-country-KPI-ar" lang={this.ar ? 'ar' : 'en'}>
                                        <div className={`country-kpiIds country-kpiId-${row.kpiId}`}>{row.kpiName} ({row.denominator})</div>
                                    </div>
                                   
                                   
                                </div>

                        }           
                    });
               jQuery('.country-kpiIds').removeClass('active');
            jQuery('.country-kpiId-'+sessionStorage.getItem('selectedKpiID')).addClass('active');
                     return <div key={index}>
                                        {SelectedCountryData}
                            </div>
                });
           }
           else{
                KPI_selected_country = this.state.Kpidata_list.map((row,index) => {
                var KPI_country_ID= row.countryId;
                var KPI_country_name= row.countryName;
                nodata = '-';
                    var SelectedCountryData =   row.kpiScores.map((row,index) => {
                    if( row.data == null || row.data==''){
                        row.score=0;
                       
                        return <div className={`kpilist-item-countryinfo`}  key={index} onClick={this.clickHandler.bind(this,row.kpiName,row.kpiId)}>
                                    <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10 Selected-country-KPI">
                                        
                                        <div className={`country-kpiIds country-kpiId-${row.kpiId}`}>{row.kpiName}({row.denominator})</div>
                                    </div>
                                    <div className="col-md-2 col-lg-2 col-sm-2 col-xs-2 Selected-country-KPI">
                                        <div className='nodatahyphen'>{nodata}</div>
                                    </div>
                                </div> 
                        } else{
                        	var rowColor;
                        	if(row.weightedScore < 0.5){
                        		rowColor="range1";
                        	}
                        	else if(row.weightedScore < 1){
                        		
                        		rowColor = "range2";
                        	}
            				else if(row.weightedScore < 1.5){
            				            		
            				    rowColor = "range3";
            				}
            				else if(row.weightedScore < 2){
                        		
            				    rowColor = "range4";
            				}
            				else if(row.weightedScore < 2.5){
                        		
            				    rowColor = "range5";
            				}
            				else if(row.weightedScore < 3){
                        		
            				    rowColor = "range6";
            				}
            				else if(row.weightedScore < 3.5){
                        		
            				    rowColor = "range7";
            				}
            				else if(row.weightedScore < 4){
                        		
            				    rowColor = "range8";
            				}
            				else if(row.weightedScore < 4.5){
                        		
            				    rowColor = "range9";
            				}
            				else{
                        		
            				    rowColor = "range10";
            				}
                            return <div className={`kpilist-item-countryinfo`}  key={index} lang='en' onClick={this.clickHandler.bind(this,row.kpiName,row.kpiId)}>
                                    <div className="col-md-9 col-lg-9 col-sm-9 col-xs-9 Selected-country-KPI">
                                        <div className={`country-kpiIds country-kpiId-${row.kpiId}`}>{row.kpiName} ({row.denominator})</div>
                                    </div>
                                    <div className="col-md-3 col-lg-3 col-sm-3 col-xs-3 Selected-country-KPI Selected-country-KPI-score">

                                        <div className={rowColor}>{row.data}</div>
                                    </div>
                                </div>

                        }           
                    });

            jQuery('.country-kpiIds').removeClass('active');
            jQuery('.country-kpiId-'+sessionStorage.getItem('selectedKpiID')).addClass('active');
              
                     return <div key={index}>
                                        {SelectedCountryData}
                            </div>
                });
           }

                 
                    return ( 
                        <div>
                              {KPI_selected_country}
                        </div> 
                    );
            }
}

export default CountryKpiDetails;