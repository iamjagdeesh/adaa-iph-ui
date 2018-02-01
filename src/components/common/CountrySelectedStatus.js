import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import CircularProgressbar from './ProgressBar/CircularProgressbar';
import {Link} from 'react-router';
import myConfig from '../../conf.js';
import global from '../../global.js';
import jQuery from 'jquery';


class CountrySelectedStatus extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        if(this.props.statusType == 0){
        return(
            <div>
                <div>Uh oh...it's empty in here!</div><br/><br/>
                <p>You need to choose,from the dropdown or directly <br/>
                    from the map,at least 2 countries in order to<br/>
                    compare them and to see more statistics.</p>
               

            </div>
        )
    }
    else if(this.props.statusType == 1){
         return(
            <div>
                <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6 compreProgress-circle-empty">
                    <div className="Compare-progress-bar">
                     <CircularProgressbar  DataValue={0.0} percentage={0}/>
                    </div>
                <div className="Compare-progress-country">  Country name</div>                                  
                                                    
                </div>
                <div className="compare-warning"><b>It's lonely in here!</b></div><br/><br/>
                <p>You need to choose,from the dropdown or directly <br/>
                    from the map,one more country in order to<br/>
                    compare them and to see more statistics.</p>
               

            </div>
        )
    }
       
    }
}
export default CountrySelectedStatus;