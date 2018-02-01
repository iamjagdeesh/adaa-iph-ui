import React from 'react';
import { Link, browserHistory, Router } from 'react-router';
import './StatsPage.css';
import $ from 'jquery';

import { Icon } from 'react-fa';
import ReactDOM from 'react-dom';
import MainHeader from '../common/MainHeader';
import StatsPage from './StatsPage';
import ExportToXL from './ExportToXL';
import global from '../../global.js';
import '../../../public/dataTable/fixedColumns.min.js';

class FullStatsMain extends React.Component {

      constructor (props) {
        super(props);
        this.ar = false;  
        this.locale = "en";
        this.StatsTitlePart1 =global.statsTitlePart1_en;
        if(sessionStorage.getItem('arabic')== "true"){
            this.ar = true;
            this.locale="ar";
            this.StatsTitlePart1=global.statsTitlePart1_ar;
        }
        this.state = {
            StatsTitle: this.StatsTitlePart1 +sessionStorage.getItem('pillarSelected')  + ' - ' +sessionStorage.getItem('selectedYear'),
        }
        
        this.loadType = 2;
        this.pillarSelcted = sessionStorage.getItem('pillarSelected')

        this.selectedKPI = sessionStorage.getItem('selectedKpiID');
        this.countrySel = sessionStorage.getItem('MainPillarSelectedCountyID');
        this.countryName = sessionStorage.getItem('MainPillarSelectedCountyName');
        this.backURL = "/worldmap";
    }


    componentDidMount() {

            // disable browser back button
            history.pushState(null, null, document.URL);
                window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });

        $('#overlay_fullStats').css('display','block');

    setTimeout(function(){
     $(document).ready(function() {
                    var table = $('#full-stats-table').DataTable( {
                    scrollY:        "300px",
                    scrollX:        true,
                    scrollCollapse: true,
                    paging:         false,
                    fixedColumns:   true,
                    bSort:          false

                    } );
                    // remove fullstats table column
                 $('.stats-col-close').on( 'click', function (e) {
                    e.preventDefault();
                    var column = table.column( $(this).attr('data-column') );
                    column.visible( ! column.visible() );
                } );
            } );
    
  

         $(function(){
        var height1= 100;
        var height2=   ($(".Stats-leftMenu").height()+40);
         var height3=   ($(".Stats-Table table thead").height());

            $('.Stats-table-Container').css({ height: $(window).innerHeight()- (height1 + height2) });
          //  $('.Stats-Table table tbody').css({ height: $(window).innerHeight()- (height1 + height2+ height3) });
           $('.Stats-Table .dataTables_scrollBody').css( "max-height", $(window).innerHeight()- (height1 + height2+ height3));
            $('.Stats-Table .DTFC_LeftBodyLiner').css("height", $(window).innerHeight()- (height1 + height2+ height3)-7);
            $('.Stats-Table .DTFC_LeftBodyWrapper').css("height", $(window).innerHeight()- (height1 + height2+ height3));
           
            $(window).resize(function(){
                $('.Stats-table-Container').css({ height: $(window).innerHeight()- (height1 + height2) });
              $('.Stats-Table .dataTables_scrollBody').css( "max-height", $(window).innerHeight()- (height1 + height2+ height3));
                $('.Stats-Table .DTFC_LeftBodyLiner').css("height", $(window).innerHeight()- (height1 + height2+ height3)-7);
                $('.Stats-Table .DTFC_LeftBodyWrapper').css("height", $(window).innerHeight()- (height1 + height2+ height3));
              //  $('.Stats-Table table tbody').css({ height: $(window).innerHeight()- (height1 + height2 + height3) });
            });
        });
}, 1000);
          


        document.body.classList.add("common-component");
        document.getElementById("root").classList.remove("move-root");
        $(ReactDOM.findDOMNode(this)).find('#CountryInfoPanel').css({
            'width': '0px'
        });
        $('.disableClick').addClass('StopClickEvent');
        sessionStorage.setItem("fromOtherpage",true);
 
     setTimeout(function() {
          $('#overlay_fullStats').css('display','none');
          browserHistory.push('/stats');
         // history.pushState(null, null, '/stats');
     }, 2000);

    }
    componentWillUnmount() {
        document.body.classList.remove("common-component");
    }

    render() {
    	var ar=this.ar;
    	if(ar){
    		return (
    	            <div >
                       <div id="overlay_fullStats"><img className="loading-gif" src="loadingCells.gif" role="presentation" ></img></div>
    	                <MainHeader loading={this.props.loading} loadType = {this.loadType} />
    	                 <div className="col-md-12 col-xs-12 col-lg-12  Stats-Text">
    	                    <div className="row">
    	                          <div onClick={this.Close} className="col-md-2 col-sm-2 col-xs-2 col-lg-2 Stats-leftMenu"  dir= {this.ar?'ltr':'rtl'}> 
                                      
    	                              <Link className="Stats-Close-btn" to={this.backURL}><img src="icons/close-panel-normal.png" title="close"></img></Link>
                                      
                                             
                                   </div>
    	                            <div className="col-md-10 col-sm-10 col-xs-10 col-lg-10 Stats-rightMenu" style={{'textAlign': 'right'}}>
    	                                    <span style={{'paddingRight':'35px'}}>{this.state.StatsTitle}</span>    <ExportToXL/> 
    	                            </div> 
    	                          
    	                     </div>
    	                       
    	                     <div className="row Stats-table-Container"  dir= {this.ar?'rtl':'ltr'}>
    	                        <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12 Stats-Table">
    	                            <StatsPage />
    	                        </div>
    	                    </div>
    	                </div>
    	            </div>
    	        );
    		
    	}else{
    		return (
    	            <div >
                       <div id="overlay_fullStats"><img className="loading-gif" src="loadingCells.gif" role="presentation" ></img></div>                    
    	              
    	                 <div className="col-md-12 col-xs-12 col-lg-12  Stats-Text">
    	                    <div className="row">
                                
    	                            <div className="col-md-10 col-sm-10 col-xs-10 col-lg-10 Stats-leftMenu">
    	                                    <span>{this.state.StatsTitle}</span>    
                                            <ExportToXL/> 
    	                            </div> 
    	                            <div onClick={this.Close} className="col-md-2 col-sm-2 col-xs-2 col-lg-2 Stats-rightMenu "> 
    	                                    
    	                                    <Link className="Stats-Close-btn" to={this.backURL}><img src="icons/close-panel-normal.png" title="close"></img></Link>       
    	                            </div>
    	                     </div>
    	                       
    	                     <div className="row Stats-table-Container"  dir= {this.ar?'rtl':'ltr'}>
    	                        <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12 Stats-Table">
    	                            <StatsPage />
    	                        </div>
    	                    </div>
    	                </div>
    	            </div>
    	        );
    		
    	}



    }
};

export default FullStatsMain;
//  <MainHeader loading={this.props.loading} loadType = {this.loadType} />


