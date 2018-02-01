import React from 'react';
import jQuery from 'jquery';
import {mapael} from 'jquery-mapael';
import countryData from './countriesData';
import WorldMap from './WorldMap';
import './WorldMapPage.css';

//import Header from '../common/Header';
import MainHeader from '../common/MainHeader';
import myConfig from '../../conf.js';

class WorldMapPage extends React.Component {
      constructor(props){
          super(props);
          var conf= myConfig;
          let queryString = window.location.search;
          queryString = queryString.substr(1);
          let qArray = queryString.split("?");
          this.cData =[];
          this.cData = countryData;
          this.selectedCountryCode = qArray[1];
          this.selectedCountryName = qArray[2];
          this.kpiId = qArray[0];
          this.dataURL = conf.apiUrl+"kpiScoreMap/"+qArray[0]+"?locale=en";
          this.state = {data :[],year:2012};
          this.countriesData =[];
          this.timeLine = this.timeLine.bind(this);
          this.reloadMap = this.reloadMap.bind(this);
          
      }
     

      reloadMap(selectedKPIId){
    	  var conf= myConfig;
          //alert(selectedKPIId + "KPI Changed");
                  //Ajax Request
              this.dataURL = conf.apiUrl+"kpiScoreMap/"+selectedKPIId+"?locale=en";
               jQuery.ajax({
                        url: this.dataURL,
                        dataType: 'json',
                        type: "GET",
                        success: function(data) {
                            
                            this.setState({data:data},function(){
                                sessionStorage.setItem("countriesData",JSON.stringify(this.state.data));
                                this.plotWorldMap(2);
                                this.countriesData =this.state.data;

                                 //update url
                             
                                var curUrl = window.location.origin + "/worldmap?"+selectedKPIId+"?"+this.selectedCountryCode;
                                window.history.replaceState({},"International Performance Hub",curUrl);

                            }); 
                            
                         
                            
                        }.bind(this),
                            error: function(xhr, status, err) {
                            console.error(this.props.dataURL, status, err.toString());
                        }.bind(this)
             });   
          //End Request
      
      }
      timeLine(response) {
          //console.log(response);

         this.setState({year:response},function(){
             //console.log(this.state.year);
             sessionStorage.setItem("selectedYear",this.state.year);
             this.plotWorldMap(2);
         });
         //
         
       }
       shouldComponentUpdate(nextProps, nextState){
           return true;
       }
      componentDidMount(){
          sessionStorage.setItem("selectedYear","2012");
          //Ajax Request
               jQuery.ajax({
                        url: this.dataURL,
                        dataType: 'json',
                        type: "GET",
                        success: function(data) {
                            
                            this.setState({data:data},function(){
                                sessionStorage.setItem("countriesData",JSON.stringify(this.state.data));
                                this.plotWorldMap(1);
                                this.countriesData =this.state.data;
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

           
           //zoom
          /*  $(".world svg").mouseup(function (e) {

                 var mapael = $world.data("mapael");
                    // We need to convert the mouse coordinate to map coordinate
                    // Fortunately, Mapael provides a handy function to do this for us!
                    var newCoordinates = mapael.mapPagePositionToXY(e.pageX, e.pageY);

                    // Zoom to this position
                    $world.trigger('zoom', {
                        fixedCenter: true,
                        level: "+1",
                        x: newCoordinates.x,
                        y: newCoordinates.y
                    });

            });*/
           //           
    }

    zoomSelectedCountry(latVal,lonVal,mapObject){
        var  $worldObj = mapObject;
         $worldObj.trigger('zoom', {level: 3, latitude: latVal, longitude: lonVal});


         var newPlots = {
                    "IN": {
                        type: "image",
                        url: "map_marker.png",
                        width: 12,
                        height: 20,
                        latitude: latVal,
                        longitude: lonVal,                                          
                         attrs: {
                            opacity: 1
                        }
                    }

                   /* 'IN':{
                        type:'svg',
                        path: "M 24.267286,27.102843 15.08644,22.838269 6.3686216,27.983579 7.5874348,17.934248 0,11.2331 9.9341158,9.2868473 13.962641,0 l 4.920808,8.8464793 10.077199,0.961561 -6.892889,7.4136777 z",
                        width: 30,
                        height: 30,
                        latitude: latVal,
                        longitude: lonVal,
                        attrs: {
                            opacity: 1
                        }
                    }*/

            
                };
         $worldObj.trigger('update', [{
                    //mapOptions: updatedOptions, 
                    newPlots: newPlots, 
                    animDuration: 1000
                }]);
    }
    plotWorldMap(loadType){
        var $world = jQuery('.world');
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
                            stroke:"#9d588",
                            "stroke-width": 0.3
                        },
                        eventHandlers: {
                            click: function (e, id, mapElem, textElem) {
                                var newData = {
                                    'areas': {}
                                };
                                if (mapElem.originalAttrs.fill == "#5ba4ff") {
                                    newData.areas[id] = {
                                        attrs: {
                                            fill: "#0088db"
                                        }
                                    };
                                } else {
                                    newData.areas[id] = {
                                        attrs: {
                                            fill: "#5ba4ff"
                                        }
                                    };
                                }
                                $world.trigger('update', [{mapOptions: newData}]);
                            }
                        }

                    },
                    defaultPlot: {
                        text: {
                            attrs: {
                                fill: "#b4b4b4"
                            },
                            attrsHover: {
                                fill: "#fff",
                                "font-weight": "bold"
                            }
                        }
                    }
                    , zoom: {
                        enabled: true
                        , step: 0.25
                        , maxLevel: 20
                        ,init: {
                            latitude: 17.6078,
                            longitude: 8.0817,
                            level: 1
                        }
                    }
                },
                legend: {
                    area: {
                        display: false,
                        marginBottom: 7,
                        slices: [
                            {
                                min:4,
                               
                                attrs: {
                                    fill: "#84bd00"
                                },
                                label: ""
                            },
                            {
                                min: 3,
                                max: 3.99,
                                attrs: {
                                    fill: "#13a287"
                                },
                                label: ""
                            },
                            {
                                min: 2,
                                max: 2.99,
                                attrs: {
                                    fill: "#0892b7"
                                },
                                label: ""
                            },
							{
                                min: 1,
                                max: 1.99,
                                attrs: {
                                    fill: "#3b63be"
                                },
                                label: ""
                            },
                            {
                                max: 0.99,
                                attrs: {
                                    fill: "#5b38ad"
                                },
                                label: ""
                            }
                        ]
                    }
                },

                
                areas: this.state.data[this.state.year]['areas']
            });
             window.test1($world);

             //Zoom
              if(this.selectedCountryCode){
              let lat = this.cData[this.selectedCountryCode].latitude,
              lon = this.cData[this.selectedCountryCode].longitude;

              this.zoomSelectedCountry(lat,lon,$world);
              }

          }
          
          jQuery('.zoomReset').html("<img src='icons/map-reset.png'></img>");
          jQuery('.zoomOut').html("<img src='icons/minus-selected.png'></img>"); 
          jQuery('.zoomIn').html("<img src='icons/add-selected.png'></img>");
        
          //End map plot
        }
        else{

         $world.trigger('update', [{
                    mapOptions: this.state.data[this.state.year], 
                    animDuration: 300
                }]);
                
            //
                    window.test1($world);

                    //Zoom
                    if(this.selectedCountryCode){
                    let lat = this.cData[this.selectedCountryCode].latitude,
                    lon = this.cData[this.selectedCountryCode].longitude;

                    this.zoomSelectedCountry(lat,lon,$world);
                    }
              //

             

        }

    }
     componentWillUnmount(){
        document.body.classList.remove("worldmap-component");
    }    
    render() {
        return (  
            <div>
               <MainHeader loading={this.props.loading} selectedKpi ={this.kpiId} countryData = {this.countriesData} selectedTimeLine = {this.state.year} reloadMap = {this.reloadMap} countrySelected = {this.selectedCountryCode} countryName = {this.selectedCountryName}  /> 
                <div className="col-md-12 col-lg-12 col-sm-12"> 
                    <WorldMap timeLine={this.timeLine} year={this.state.year}/>
                </div>
            </div>
        );
    }
}

export default WorldMapPage;