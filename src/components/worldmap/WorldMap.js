import React from 'react';
import Timeline from './Timeline';
import './WorldMapPage.css';

/**
 * WorldMap Component
 */
class WorldMap extends React.Component {

    /**
     * React LifeCycle Event
     */
    render() {
        let arabiclegend;
        let ar =false;
         if(sessionStorage.getItem('arabic')=== "true"){
            ar = true;
         }

         if(ar=== true)
         {
          arabiclegend = (    <div className="areaLegendimg">
                    <div className="legent-text">
                                <div className="low-legend">مرتفع</div>
                                <div className="medium-legend">متوسط  </div>
                                <div className="high-legend">منخفض</div>
                         </div>
                           <img src="icons/legend-bar.png" role="presentation" alt="legends"/>
          </div>);

         }
         else{
              arabiclegend = ( <div className="areaLegendimg">
                        <div className="legent-text">
                                <div className="low-legend"> Low</div>
                                <div className="medium-legend">Medium</div>
                                <div className="high-legend">High</div>
                         </div>
                          <img src="icons/legend-bar.png" role="presentation" alt="legends"/>
              </div>);
         }
        return (  
            <div className="world">
                <div id="overlay"><img className="loading-gif" src="loadingCells.gif" role="presentation" ></img></div>
                <div id="initialLoad"><img className="loading-gif" src="loadingCells.gif" role="presentation"></img></div>
                <div id="initialLoadPanel"><img className="loading-gif" src="loadingCells.gif" role="presentation"></img></div>
               
                <div id="overlay_reload"></div>
                <div className="map" style={{minHeight:500}}></div>
                <div className="areaLegend"></div>
                    {arabiclegend}
                 <Timeline timeLineYears={this.props.timeLineYears} timeLine={this.props.timeLine} year={this.props.year}/>
            </div>
        );
    }
}

export default WorldMap;
/*<div id="overlay"><img className={ar ? "loading-gif-ar" : "loading-gif"} src="loadingCells.gif" role="presentation" ></img></div> */
// /<img className="loading-gif" src="loadingCells.gif" role="presentation"></img>
//<div id="initialLoad"><img className="loading-gif" src="loadingCells.gif" role="presentation"></img></div>