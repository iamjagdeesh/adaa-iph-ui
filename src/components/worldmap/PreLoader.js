import React from 'react';
import {browserHistory} from 'react-router';
import PreLoaderHeader from './PreLoaderHeader';
//PreLoaderHeader

class PreLoader extends React.Component {
    constructor(props){
        super(props);
    }
componentDidMount(){
    setTimeout(function(){
        sessionStorage.setItem("Preloader","true");
        browserHistory.push('/worldmap');
    },3000);
    
}
    render(){
       return( 
            <div>
                <PreLoaderHeader />
                <div className="page-perLoader">
                    <img className="loading-gif" src="loadingCells.gif" role="presentation"></img>    
                </div>
             </div>
       );
    }
}
export default PreLoader;
//<div className="page-preLoader-img"></div>