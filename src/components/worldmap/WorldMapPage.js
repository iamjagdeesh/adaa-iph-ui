import React from 'react';
import jQuery from 'jquery';
import $ from 'jquery';
import {mapael} from 'jquery-mapael';
import countryData from './countriesData';
import WorldMap from './WorldMap';
import './WorldMapPage.css';
import global from '../../global.js';
import myConfig from '../../conf.js';
//import Header from '../common/Header';
import MainHeader from '../common/MainHeader';

    var conf= myConfig;
    var wrldMap;
   // const multiSelectedList=[];
   // var timeLineYearsList;
      /**
     Page :WorldMapPage
     Displays worldmap with data for default year.
     Also allows various operations like compare,check world ranking,navigate to graphs etc.
   */
class WorldMapPage extends React.Component {
   
      constructor(props){
          super(props);

          this.cData =[];
          this.cData = countryData;
          this.selectedCountryCode = sessionStorage.getItem('MainPillarSelectedCountyID');
          this.selectedCountryName = sessionStorage.getItem('MainPillarSelectedCountyName');
          this.kpiId = sessionStorage.getItem('selectedKpiID');
          this.locale = "en";
          this.dataURL = conf.apiUrl+"kpiScoreMap/"+this.kpiId+"?locale="+this.locale;
          this.state = {data :[],year:sessionStorage.getItem("selectedYear"),selectedCountry_Id:sessionStorage.getItem('MainPillarSelectedCountyID'),arabic:false};
          this.countriesData =[];
          this.timeLine = this.timeLine.bind(this);
          this.calltimeLinearray = this.calltimeLinearray.bind(this);
          this.timeLineYears = [];
          this.reloadMap = this.reloadMap.bind(this);
          this.loadType = 1;
          this.zoomSelectedCountry = this.zoomSelectedCountry.bind(this);
          this.zoomedCountryId = '';
          this.zoomedCntryName='';
          this.zoomed = false;
          this.zoomedLat='';
          this.zoomedLong='';
          this.mapCountryChange = this.mapCountryChange.bind(this);
          this.plotMultiClick = this.plotMultiClick.bind(this);
          this.removePlot = this.removePlot.bind(this);
          this.mapPlotChange = this.mapPlotChange.bind(this);
          this.updatePlot = this.updatePlot.bind(this);
          this.removeMapPin = this.removeMapPin.bind(this);
          this.mapCountryClick = this.mapCountryClick.bind(this);
          this.ar = false;

          
      }
      
      /**
       * 
       * @param {string} selectedCountryID 
       * @param {string} selectedCntryName 
       */
      countrySearchCallback(selectedCountryID,selectedCntryName){
        let countryDetails = this.cData;
        let lat = countryDetails[selectedCountryID].latitude,
            lon = countryDetails[selectedCountryID].longitude;

        this.mapCountryClick(lat,lon,wrldMap,selectedCountryID,selectedCntryName,1);

      }
     /**
      * Change the selected country in map based on user click
      * @param {string} selectedCountryID 
      * @param {string} selectedCntryName 
      */
     mapCountryChange(selectedCountryID,selectedCntryName){
        
        
         jQuery("#overlay").show();
                         
          this.selectedCountryCode = selectedCountryID;
          this.selectedCountryName = selectedCntryName;
          sessionStorage.setItem('MainPillarSelectedCountyID',selectedCountryID);
          sessionStorage.setItem('MainPillarSelectedCountyName',selectedCntryName);
          this.setState({selectedCountry_Id:selectedCountryID});
          this.refs.headerPanel.openCountryPanel();
          //}
          setTimeout(function() {
            $('.mapTooltip').css('display','none');
        }, 200); 
          jQuery("#overlay").hide();
         
                   
          
     }
     //Remove Pin
     removeMapPin(){
         var cId = sessionStorage.getItem('MainPillarSelectedCountyID');
         //wrldMap
         var deletedPlots = [cId];
       
           wrldMap.trigger('update', [{
                    //mapOptions: updatedOptions, 
                    deletePlotKeys: deletedPlots, 
                    animDuration: 0
                }]);

                this.setState({selectedCountry_Id:''},function(){
                    sessionStorage.setItem('MainPillarSelectedCountyName','');
                    sessionStorage.setItem('country_info',"");
                });

     }
     
     /**
      * Reload map data based on the KPI selected  from KPI side panel
      * @param {number} selectedKPIId 
      */
      reloadMap(selectedKPIId){
    	  
      
                  //Ajax Request
              
              this.dataURL = conf.apiUrl+"kpiScoreMap/"+selectedKPIId+"?locale="+this.locale;
               jQuery("#overlay").show();
               jQuery.ajax({
                       
                        url: this.dataURL,
                        dataType: 'json',
                        type: "GET",
                        success: function(data) {
                            this.setState({data:data},function(){

                                sessionStorage.setItem("countriesData",JSON.stringify(this.state.data));
                                this.plotWorldMap(2);
                                this.countriesData =this.state.data;
                                //  this.refs.headerPanel.closePillerBar();
                                this.refs.headerPanel.closePillerBar_from_pillar();
                                jQuery("#overlay").hide();
                                //this.refs.headerPanel.openCountryPanel();

                            }); 
                            
                         
                            
                        }.bind(this),
                            error: function(xhr, status, err) {
                            console.error(this.props.dataURL, status, err.toString());
                            jQuery("#overlay").hide();
                        }.bind(this)
             });   
          //End Request
      
      }
      /**
       * Timeline change event callback
       * Replot map for the selected timeline
       * @param {string} response 
       */
      timeLine(response) {
         
         this.setState({year:response},function(){
            
             sessionStorage.setItem("selectedYear",this.state.year);
             this.plotWorldMap(2);
            
             
         });
        
    
         
       }
       /**
        * React LifeCycle event
        * @param {object} nextProps 
        * @param {object} nextState 
        */
       shouldComponentUpdate(nextProps, nextState){
           return true;
       }
       /**
        * React LifeCycle event
        */
      componentDidMount(){
            // disable browser back button
            history.pushState(null, null, document.URL);
                window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });

            if(sessionStorage.getItem('fromOtherpage') == "false"){
                sessionStorage.setItem('compareOpened',false);
            }

           $(function(){
           // var height1= ($(".headerNav").height());
                 $("body").css({"overflow":"hidden"});
                     
                $('.map').css('height', $(window).innerHeight() );
                $(window).resize(function(){
                $('.map').css('height', $(window).innerHeight());
                });
             });
            

        if(sessionStorage.getItem('arabic')=== "true"){
            this.ar = true;
         
        }
        if(this.ar){
            this.setState({arabic:true});
            this.locale = "ar";
            this.dataURL = conf.apiUrl+"kpiScoreMap/"+this.kpiId+"?locale="+this.locale;

        }
          
        else{
              this.locale = "en";
          }
          //Ajax Request
          if(sessionStorage.getItem('Preloader')== "true"){
              jQuery("#overlay_reload").show();
          }
          else{
             
             if(sessionStorage.getItem('fromOtherpage') == "true"){
                // alert('other page');
                 setTimeout(function(){
                       jQuery("#initialLoadPanel").show();
                 },900);
             
              }
              else{
                jQuery("#initialLoad").show();
              }
               
          }
          //jQuery("#overlay").show();
               jQuery.ajax({
                        url: this.dataURL,
                        dataType: 'json',
                        type: "GET",
                        success: function(data) {
                        var timeLineYearsList = Object.keys(data);
                        this.calltimeLinearray(timeLineYearsList);
    
                            this.setState({data:data},function(){
                                sessionStorage.setItem("countriesData",JSON.stringify(this.state.data));
                                this.plotWorldMap(1);
                                if(sessionStorage.getItem('MainPillarSelectedCountyID') != '' && sessionStorage.getItem('MainPillarSelectedCountyID') !=""){
                                     this.refs.headerPanel.openCountryPanel();
                                }
                                else{
                                    $('.disableClick').removeClass('StopClickEvent');
                                }
                                if(sessionStorage.getItem('fromOtherpage') == "true"){
                                     $('.zoomButton').css('visibility','hidden'); 
                                }
                                if(sessionStorage.getItem('MainPillarSelectedCountyID') != '' && sessionStorage.getItem('MainPillarSelectedCountyID') !=""){
                                     this.refs.headerPanel.openCountryPanel();
                                 }
                                 else{
                                    $('.disableClick').removeClass('StopClickEvent');
                                }
                                this.countriesData =this.state.data;
                                if(sessionStorage.getItem('Preloader')== "true"){
                                     sessionStorage.setItem("Preloader","false");
                                     jQuery("#overlay_reload").hide();
                                }
                                else{
                                      if(sessionStorage.getItem('fromOtherpage') == "true"){
                                    setTimeout(function(){
                                        jQuery("#initialLoadPanel").hide();
                                       /* if(sessionStorage.getItem('arabic')== "true"){
                           
                                               // $('.mapael svg').css('right','200px');
                                                 }else{
                            
                                               // $('.mapael svg').css('right','-250px'); 
                                                }
                                        */
                                        },2000);
                                      }
                                      else{
                                          setTimeout(function(){
                                               jQuery("#initialLoad").hide();
                                          },2000);
                                          
                                      }

                                      
                                        
                                    }
                              
                            }); 
                            
                            //sessionStorage.setItem("countriesData",JSON.stringify(this.state.data));
                            //this.plotWorldMap(1);
                            
                        }.bind(this),
                            error: function(xhr, status, err) {
                            console.error(this.props.dataURL, status, err.toString());
                        }.bind(this)
             });   
          //End Request
      
         document.body.classList.add("worldmap-component");
           
         
    }
   /**
    * Set data for timeline
    * @param {object} data 
    */
    calltimeLinearray(data){
        this.timeLineYears= data;
        sessionStorage.setItem('TimelineYears',data);
    }
    /**
     * Remove pin on country deselection(can be triggered onclick on map as well as compare panel country change)
     * @param {number} latVal 
     * @param {number} lonVal 
     * @param {object} mapObject 
     * @param {string} countryId 
     * @param {array} tmpArray 
     */
    removePlot(latVal,lonVal,mapObject,countryId,tmpArray){
        var headerPnl =  this.refs.headerPanel;
        var  $worldObj = mapObject;
        var country = countryId;
        var deletedPlots = [country];
       
           $worldObj.trigger('update', [{
                    //mapOptions: updatedOptions, 
                    deletePlotKeys: deletedPlots, 
                    animDuration: 0
                }]);
            
            if(countryId == sessionStorage.getItem('MainPillarSelectedCountyID')){
             sessionStorage.setItem('MainPillarSelectedCountyID','');
             sessionStorage.setItem('MainPillarSelectedCountyName','');
           }

            //var tmpList =  sessionStorage.getItem('country_info');
            var tmpList = tmpArray;
            var cntryList=tmpList.join();
            if(cntryList !== null){
                //tmpList = tmpList + ","+selectedCountryID;
                headerPnl.addCountriesToCompare(cntryList);
            }

    }

    /**
     * Update map plots(pin on selected countries)based on the changes in compare panel selected country list
     * @param {string} cntryId 
     * @param {number} type 
     * type=0 add plot,type=1 remove plot
     */
    updatePlot(cntryId,type){
        if(type === 1){
            //add plot 

             var newPlots = {
                   
                   [cntryId]:{
                        type:'svg',
                       // path: "M 24.267286,27.102843 15.08644,22.838269 6.3686216,27.983579 7.5874348,17.934248 0,11.2331 9.9341158,9.2868473 13.962641,0 l 4.920808,8.8464793 10.077199,0.961561 -6.892889,7.4136777 z",
                        path:"M14.7,0C8.7,0,3.9,4.9,3.9,10.9c0,6,10.7,18.7,10.9,18.7c0,0,10.9-12.7,10.9-18.7C25.6,4.9,20.8,0,14.7,0zM14.8,15.3c-2.5,0-4.6-2-4.6-4.6c0,0,0,0,0,0c0-2.5,2.1-4.6,4.6-4.6c0,0,0,0,0,0c2.5,0,4.6,2,4.6,4.6c0,0,0,0,0,0C19.4,13.2,17.4,15.3,14.8,15.3L14.8,15.3z",
                        width: 9,
                        height: 12,
                        latitude: countryData[cntryId].latitude,
                        longitude:  countryData[cntryId].longitude,
                        zoom:{
                            enabled:true
                        },
                        attrs: {
                            opacity: 1,
                            fill: "#ffffff"
                        }
                    }

            
                };
         wrldMap.trigger('update', [{
                    //mapOptions: updatedOptions, 
                    newPlots: newPlots, 
                    animDuration: 0
                }]);
        }
        else{
            //remove plot wrldMap
             var deletedPlots = [cntryId];
       
             wrldMap.trigger('update', [{
                    //mapOptions: updatedOptions, 
                    deletePlotKeys: deletedPlots, 
                    animDuration: 0
                }]);
        }

    }
     /**
     * Update map plots(pin on selected countries)based on the changes in compare panel selected country list
     * @param {array} value 
     * @param {number} type 
     * type=0 add plot,type=1 remove plot
     */
    mapPlotChange(value,type){
        var countries = [];
        if(value !== null && value !== ""){
            if(value.length > 0){
                 countries = value;
                  for(var val of countries){
                        var cntryId = val;
                        this.updatePlot(cntryId,type);
                  }


            }
           
        }
      
        
       

    }
    /**
     * User can select multiple countries on the map when compare panel is opened.Pin will be plotted on selected countries
     * and circle graph will be drawn on compare panel
     * @param {string} latVal 
     * @param {string} lonVal 
     * @param {object} mapObject 
     * @param {string} countryId 
     * @param {string} cntry_name 
     * @param {number} type 
     */
    plotMultiClick(latVal,lonVal,mapObject,countryId,cntry_name,type){
        //If already selected remove selection
        var headerPnl = this.refs.headerPanel;
        var  $worldObj = mapObject;
        var deletePlot = false;
        var tmpList =  sessionStorage.getItem('country_info');
        var tmpArray = [];
       if(tmpList !== null && tmpList !=""){
           tmpList +=","+sessionStorage.getItem('MainPillarSelectedCountyID');
            tmpArray = tmpList.split(",");
            if(tmpArray.indexOf(countryId) !== -1){
                //tmpArray.remove(tmpArray.indexOf(countryId));
                tmpArray.splice(tmpArray.indexOf(countryId),1);
                deletePlot = true;
                this.removePlot(latVal,lonVal,mapObject,countryId,tmpArray);
            }
        }
        else{
            tmpList = sessionStorage.getItem('MainPillarSelectedCountyID');
             tmpArray = tmpList.split(",");

             if(tmpArray.indexOf(countryId) !== -1){
                //tmpArray.remove(tmpArray.indexOf(countryId));
                tmpArray.splice(tmpArray.indexOf(countryId),1);
                deletePlot = true;
                this.removePlot(latVal,lonVal,mapObject,countryId,tmpArray);
            }
        }
          if(!deletePlot){
               var newPlots = {
                   
                   [countryId]:{
                        type:'svg',
                       // path: "M 24.267286,27.102843 15.08644,22.838269 6.3686216,27.983579 7.5874348,17.934248 0,11.2331 9.9341158,9.2868473 13.962641,0 l 4.920808,8.8464793 10.077199,0.961561 -6.892889,7.4136777 z",
                        path:"M14.7,0C8.7,0,3.9,4.9,3.9,10.9c0,6,10.7,18.7,10.9,18.7c0,0,10.9-12.7,10.9-18.7C25.6,4.9,20.8,0,14.7,0zM14.8,15.3c-2.5,0-4.6-2-4.6-4.6c0,0,0,0,0,0c0-2.5,2.1-4.6,4.6-4.6c0,0,0,0,0,0c2.5,0,4.6,2,4.6,4.6c0,0,0,0,0,0C19.4,13.2,17.4,15.3,14.8,15.3L14.8,15.3z",
                        width: 9,
                        height: 12,
                        latitude: latVal,
                        longitude: lonVal,
                        zoom:{
                            enabled:true
                        },
                        attrs: {
                            opacity: 1,
                            fill: "#ffffff"
                        }
                    }

            
                };
        
                //
                var tmpList_d =  sessionStorage.getItem('country_info');
                if(tmpList_d !== null && tmpList_d !=""){
                    var tmpItems = tmpList_d.split(',');
                    if(tmpItems.length < global.CountryLimit){
                         $worldObj.trigger('update', [{
                            newPlots: newPlots, 
                            animDuration: 0
                        }]);

                        tmpList_d = tmpList_d + ","+countryId;
                        //this.refs.headerPanel.addCountriesToCompare(tmpList);
                         headerPnl.addCountriesToCompare(tmpList_d);
                    }  

                    else{
                        alert("You can compare only 20 Countries");
                    }
                       
                 
                
                }else{
                
                  $worldObj.trigger('update', [{
                    //mapOptions: updatedOptions, 
                    newPlots: newPlots, 
                    animDuration: 0
                }]);

                 headerPnl.addCountriesToCompare(countryId);
                }
                //
               
          }
        
    }

  mapCountryClick(latVal,lonVal,mapObject,countryId,cntry_name,type){
      if(this.zoomed){
                if(this.zoomedCountryId !== countryId){
                        if(type == 1){
                        this.mapCountryChange(countryId,cntry_name);
                        }
                        else{
                                this.setState({selectedCountry_Id:countryId});
                            }
                
            }
            
      }
      
     
      else{
                        if(type == 1){
                        this.mapCountryChange(countryId,cntry_name);
                        }
                        else{
                                this.setState({selectedCountry_Id:countryId});
                            }
      }
      this.zoomSelectedCountry(latVal,lonVal,mapObject,countryId,cntry_name,type);
    }
    /**
     * zoom selected country on the map
     * @param {string} latVal 
     * @param {string} lonVal 
     * @param {object} mapObject 
     * @param {string} countryId 
     * @param {string} cntry_name 
     * @param {number} type 
     */
    zoomSelectedCountry(latVal,lonVal,mapObject,countryId,cntry_name,type){
        var  $worldObj = mapObject;

        var zoomLevel = $worldObj.data()["mapael"].zoomData.zoomLevel;
        var newZoomLevel=2;
        if(zoomLevel > newZoomLevel){
            newZoomLevel = zoomLevel;
        }
        //Preloader
            if(type == 2){
                $worldObj.trigger('zoom', {level: newZoomLevel, latitude: latVal, longitude: lonVal});
            }
        //End preloader
      else{
        //check the current zoomed country.zoom out if same country is selected,else zoom the country which is selected
       // var country = 'IND';
        var deletedPlots = [this.zoomedCountryId];
            
        if(this.zoomed){
            $('.mapTooltip').css('display','none');
            if(this.zoomedCountryId === countryId){
                
                //zoom out current country 
                 $worldObj.trigger('update', [{
                    //mapOptions: updatedOptions, 
                    deletePlotKeys: deletedPlots, 
                    animDuration: 0
                }]);
                //$worldObj.trigger('zoom', {level: .25, latitude: this.zoomedLat, longitude: this.zoomedLong});
                 this.setState({selectedCountry_Id:''},function(){
                    sessionStorage.setItem('MainPillarSelectedCountyID','');
                    sessionStorage.setItem('MainPillarSelectedCountyName','');
                    sessionStorage.setItem('country_info',"");
                });
                this.zoomed = false;
                //Close country Info
                this.refs.headerPanel.closeCountryPanel();
            }

    else{
                          
        //
             $worldObj.trigger('update', [{
                    //mapOptions: updatedOptions, 
                    deletePlotKeys: deletedPlots, 
                    animDuration: 0
                }]);
        //    
                //Zoom clicked country
        $('.mapTooltip').css('display','none');
        $worldObj.trigger('zoom', {level: newZoomLevel, latitude: latVal, longitude: lonVal});
         this.zoomedLat = latVal;
         this.zoomedLong = lonVal;
         this.zoomed = true;
         this.zoomedCountryId = countryId;
         this.zoomedCntryName = cntry_name;
                var newPlots = {
                        
        [this.zoomedCountryId]:{
                                type:'svg',
                            // path: "M 24.267286,27.102843 15.08644,22.838269 6.3686216,27.983579 7.5874348,17.934248 0,11.2331 9.9341158,9.2868473 13.962641,0 l 4.920808,8.8464793 10.077199,0.961561 -6.892889,7.4136777 z",
                                path:"M14.7,0C8.7,0,3.9,4.9,3.9,10.9c0,6,10.7,18.7,10.9,18.7c0,0,10.9-12.7,10.9-18.7C25.6,4.9,20.8,0,14.7,0zM14.8,15.3c-2.5,0-4.6-2-4.6-4.6c0,0,0,0,0,0c0-2.5,2.1-4.6,4.6-4.6c0,0,0,0,0,0c2.5,0,4.6,2,4.6,4.6c0,0,0,0,0,0C19.4,13.2,17.4,15.3,14.8,15.3L14.8,15.3z",
                                //path:"M-29.16,207.37a10.9,10.9,0,0,0-10.9,10.9c0,6,10.69,18.68,10.9,18.68,0.05,0,10.9-12.66,10.9-18.68A10.9,10.9,0,0,0-29.16,207.37Zm0.07,15.3a4.59,4.59,0,0,1-4.6-4.59,4.59,4.59,0,0,1,4.6-4.59,4.59,4.59,0,0,1,4.6,4.59A4.59,4.59,0,0,1-29.08,222.67Z",
                                
                                width: 9,
                                height: 12,
                                latitude: latVal,
                                longitude: lonVal,
                                zoom:{
                                        enabled:true
                                    },
                                attrs: {
                                    opacity: 1,
                                    fill: "#ffffff"
                                }
                            }

                    
                        };
                    $worldObj.trigger('update', [{
                                //mapOptions: updatedOptions, 
                                newPlots: newPlots, 
                                animDuration: 0
                            }]);
                        if(countryId == null){
                            countryId=this.zoomedCountryId;
                        }
                        if(cntry_name == null){
                            cntry_name = this.zoomedCntryName;
                        }
                       //this.mapCountryChange(countryId,cntry_name);
               
            }
          
            
                
        }
        else{
        $('.mapTooltip').css('display','none');
         $worldObj.trigger('zoom', {level: newZoomLevel, latitude: latVal, longitude: lonVal});
         this.zoomedLat = latVal;
         this.zoomedLong = lonVal;
         this.zoomed = true;
         this.zoomedCountryId = countryId;
         var newPlots_d = {
                   
        [this.zoomedCountryId]:{
                        type:'svg',
                       // path: "M 24.267286,27.102843 15.08644,22.838269 6.3686216,27.983579 7.5874348,17.934248 0,11.2331 9.9341158,9.2868473 13.962641,0 l 4.920808,8.8464793 10.077199,0.961561 -6.892889,7.4136777 z",
                       path:"M14.7,0C8.7,0,3.9,4.9,3.9,10.9c0,6,10.7,18.7,10.9,18.7c0,0,10.9-12.7,10.9-18.7C25.6,4.9,20.8,0,14.7,0zM14.8,15.3c-2.5,0-4.6-2-4.6-4.6c0,0,0,0,0,0c0-2.5,2.1-4.6,4.6-4.6c0,0,0,0,0,0c2.5,0,4.6,2,4.6,4.6c0,0,0,0,0,0C19.4,13.2,17.4,15.3,14.8,15.3L14.8,15.3z",
                       // path:"M-29.16,207.37a10.9,10.9,0,0,0-10.9,10.9c0,6,10.69,18.68,10.9,18.68,0.05,0,10.9-12.66,10.9-18.68A10.9,10.9,0,0,0-29.16,207.37Zm0.07,15.3a4.59,4.59,0,0,1-4.6-4.59,4.59,4.59,0,0,1,4.6-4.59,4.59,4.59,0,0,1,4.6,4.59A4.59,4.59,0,0,1-29.08,222.67Z",
                        width: 9,
                        height: 12,
                        latitude: latVal,
                        longitude: lonVal,
                        zoom:{
                            enabled:true
                        },
                        attrs: {
                            opacity: 1,
                            fill: "#ffffff"
                        }
                    }

            
                };
         $worldObj.trigger('update', [{
                    //mapOptions: updatedOptions, 
                    newPlots: newPlots_d, 
                    animDuration: 0
                }]);

              
        }
    }
    }
    /**
     * Plot Worldmap with data from API
     * @param {number} loadType 
     * LoadType = 1 initial loadType
     * LoadType = 2 Reload on year change
     */
    plotWorldMap(loadType){
        var $world = jQuery('.world');
        var countrDetails = this.cData;
        var zoomCountry = this.zoomSelectedCountry;
        var mapClick = this.mapCountryClick;
        var multiClick = this.plotMultiClick;
        wrldMap = $world;
        if(loadType === 1){
           //start map plot
           if(this.state.data[this.state.year]['areas']){
            $world.mapael({
                map: {
                    name: "world_countries",
                    defaultArea: {
                        attrs: {
                            fill: "#A9A9A9",
                            //stroke: "#232323",
                            //stroke:"#9d588",
                            "stroke-width": 0.3
                        },
                         eventHandlers: {
                            click: function (e, id, mapElem, textElem) {
                                /*var newData = {
                                    'areas': {}
                                };*/
                              
                                 let countryID = id;
                                 let lat = countrDetails[countryID].latitude,
                                     lon = countrDetails[countryID].longitude;
                                //Get country name
                                var cntryName='';
                                if(mapElem.tooltip){
                                var mapHoverText=mapElem.tooltip.content;
                                //var cntryName='';
                                if(mapHoverText){
                                    var startIndex = mapHoverText.indexOf("'>");
                                    startIndex +=2;
                                    var endIndex = mapHoverText.indexOf("</span>");
                                    cntryName = mapHoverText.slice(startIndex,endIndex);

                                if(sessionStorage.getItem('compareOpened') == "true"){
                                    
                                    multiClick(lat,lon,$world,countryID,cntryName,1);
                                 }
                                 else{
                                     
                                    //zoomCountry(lat,lon,$world,countryID,cntryName,1);
                                    mapClick(lat,lon,$world,countryID,cntryName,1);
                                    
                                
                                 }
                                }
                                }
                            
                                
                                
                                
                                //$world.trigger('update', [{mapOptions: newData}]);
                            },
                            mouseover:function (e, id, mapElem, textElem){
                                if(mapElem.tooltip === undefined){
                                    $('.mapTooltip').css('display','none');
                                }
                            }
                        }
                    },
                    defaultPlot: {
                        text: {
                            attrs: {
                                fill: "#b4b4b4"
                            },
                            attrsHover: {
                                animDuration:0,
                                fill: "#fff",
                                "font-weight": "bold"
                                

                            }
                        }
                    }
                    , zoom: {
                        enabled: true
                        , step: 0.25
                        , maxLevel: 10
                        ,minLevel:.5
                        ,mousewheel: false
                        ,init: {
                            latitude: 17.6078,
                            longitude: 8.0817,
                            level: 0
                        }
                        ,animDuration:500
                        ,animEasing:"linear"
                    }
                },
                legend: {
                    area: {
                        display: false,
                        marginBottom: 7,
                        slices: [
                            {
                                min:4.5,
                               
                                attrs: {
                                    fill: "#009A8D"
                                },
                                label: ""
                            },
                            {
                                min:4,
                                max:4.49,
                               
                                attrs: {
                                    fill: "#00B386"
                                },
                                label: ""
                            },
                            {
                                min:3.5,
                                max:3.99,
                               
                                attrs: {
                                    fill: "#8DBE6D"
                                },
                                label: ""
                            },
                            {
                                min: 3,
                                max: 3.49,
                                attrs: {
                                    fill: "#BDD72A"
                                },
                                label: ""
                            },
                            {
                                min: 2.5,
                                max: 2.99,
                                attrs: {
                                    fill: "#F2D616"
                                },
                                label: ""
                            },
                            {
                                min: 2,
                                max: 2.49,
                                attrs: {
                                    fill: "#FFC000"
                                },
                                label: ""
                            },
                            {
                                min: 1.5,
                                max: 1.99,
                                attrs: {
                                    fill: "#FFA019"
                                },
                                label: ""
                            },
							{
                                min: 1,
                                max: 1.49,
                                attrs: {
                                    fill: "#FE8523"
                                },
                                label: ""
                            },
                            {
                                min: 0.5,
                                max: .99,
                                attrs: {
                                    fill: "#eb5541"
                                },
                                label: ""
                            },
                            {
                                min:0,
                                max: 0.49,
                                attrs: {
                                    fill: "#e12d2d"
                                },
                                label: ""
                            },

                            {
                                max:-1,
                                attrs:{
                                    fill:"#A9A9A9"
                                },
                                label:""
                            }

                        ]
                    }
                },
                areas: this.state.data[this.state.year]['areas']
            });
            // window.test1($world);

             //Zoom
              if(this.selectedCountryCode){
              let lat = this.cData[this.selectedCountryCode].latitude,
              lon = this.cData[this.selectedCountryCode].longitude;
                       
              this.zoomSelectedCountry(lat,lon,$world,this.selectedCountryCode,this.selectedCountryName,0);
              
             
            }
            else{
                 if(sessionStorage.getItem('Preloader')== "true"){
                 this.zoomSelectedCountry(33.93911,67.709953,$world,"SA","SaudiArabia",2);
              }
            }

          }
          
          jQuery('.zoomReset').html("<img src='icons/map-reset.png'></img>");
          jQuery('.zoomOut').html("<img src='icons/minus-selected.png'></img>"); 
          jQuery('.zoomIn').html("<img src='icons/add-selected.png'></img>");
          this.refs.headerPanel.disableClickEvent();
          //End map plot
        }
        else{
            
         $world.trigger('update', [{
                    mapOptions: this.state.data[this.state.year], 
                    animDuration: 0
                }]);
               
       }
        

    }
    /**
     * React LifeCycle event
     */
     componentWillUnmount(){
        document.body.classList.remove("worldmap-component");
        sessionStorage.setItem("fromOtherpage",false);
    }    

    /**
     * React lifecycle event
     * Renders  contents on the page
     */
    render() {
        return (  
            <div dir={this.state.arabic ? 'rtl':'ltr'} lang={this.state.arabic?'ar':'en'}>
               <MainHeader ref="headerPanel" loadType={this.loadType} loading={this.props.loading} selectedKpi={this.kpiId} countryData={this.countriesData} selectedTimeLine={this.state.year} reloadMap={this.reloadMap} countrySelected={this.state.selectedCountry_Id} countryName={this.selectedCountryName} mapPlotChange={this.mapPlotChange} 
                    countrySearchCallback={this.countrySearchCallback.bind(this)} removeMapPin={this.removeMapPin}/> 
                
                <div className="col-md-12 col-lg-12 col-sm-12 world-map-page"> 
                    <WorldMap timeLineYears={this.timeLineYears} timeLine={this.timeLine} year={this.state.year}/>
                </div>
            </div>
        );
    }
}

export default WorldMapPage;