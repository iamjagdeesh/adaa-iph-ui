import React from 'react';
import {Link} from 'react-router';
import {Icon} from 'react-fa';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import MainHeader from '../common/MainHeader';
import './graphics.css';
//import * as ReactBootstrap from 'react-bootstrap';
import GraphComponent from './GraphComponent';



class GenerateGraphics extends React.Component {
    constructor(props){
        super(props);

        this.loadType = 2;
    }
    componentDidMount(){

           // disable browser back button
            history.pushState(null, null, document.URL);
                window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });

         document.body.classList.add("common-component");
        document.getElementById("root").classList.remove("move-root");
         $(ReactDOM.findDOMNode(this)).find('#CountryInfoPanel').css({
                'width' :'0px'
            });
        $('.disableClick').addClass('StopClickEvent');

        sessionStorage.setItem("fromOtherpage",true);
    }
     componentWillUnmount(){
        document.body.classList.remove("common-component");
    }


    render() {
        return (  
            <div> 
              <GraphComponent loading={this.props.loading} /> 
              

            </div> 
        );
    }
}

export default GenerateGraphics;