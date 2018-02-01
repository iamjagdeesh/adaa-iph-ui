
import React from 'react';
//import MainHeader from '../common/MainHeader';
import './NavMenuCss.css';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import RankingTableComponent from './RankingTable.js';
//import Select from 'react-select';
//import GroupSelectComponent from './SingleGroupSelect.js'


//var GlobalRanking = React.createClass({
    var refHeader;
    class GlobalRanking extends React.Component {

        constructor (props) {
        super(props);
         if(sessionStorage.getItem('arabic')== "true"){
            this.ar = true;  
            this.locale = "ar";         
        }
         this.Breadcrumbs= this.props.breadcrumbs
        this.state = {     
            SelectedYear:this.props.SelYear ,
            Breadcrumbs: this.props.breadcrumbs  
        }   
        //this.updateSideStatus = this.props.sideNavClose;
        refHeader =this.props;

        this.ar = false;  
        this.locale = "en"
        this.panelTitle="World Ranking";
        
         if(sessionStorage.getItem('arabic')== "true"){
            this.ar = true;  
            this.locale = "ar"
            this.panelTitle="التصنيف العالمي";
        }

        }
        
   
    closeNav() {
         $('.ranking-menu-item').removeClass('active');
        //document.getElementById("root").classList.remove("move-root");
        $('.headerNav').removeClass("move-root");
         $('.footer').removeClass("move-root"); 
          $('.zoomButton').css('visibility','visible');
        $('.disableClick').removeClass('StopClickEvent');
        //console.log(this.ar);
        if(sessionStorage.getItem('arabic')== "true"){
            $('#GlobalSidenav').css('left','-450px');
           // $('.mapael svg').css('right','0');

        }else{
                $('#GlobalSidenav').css('right','-450px');
                 $('.mapael svg').css('right','0px');
        }
        //$('#GlobalSidenav').css('width' ,'0px');
        
        //this.updateSideStatus();
        refHeader.sideNavClose();
    }
      componentDidMount(){
        $(function(){
        var height1= ($(".pillarMenu-title ").height()+60);
        var height2=   ($(".Select-control").height()+80);
            $('.react-bs-container-body').css({ height: $(window).innerHeight()- (height1 + height2) });
            $(window).resize(function(){
                $('.react-bs-container-body').css({ height: $(window).innerHeight()- (height1 + height2) });
            });
        });
     }
     componentWillReceiveProps(nextProps) {
            this.setState({Breadcrumbs: nextProps.Breadcrumbs});
            this.setState({SelectedYear:nextProps.SelYear});
     }
  shouldComponentUpdate(nextProps, nextState){
       return true;
 
   }
    
     

    
    render() {
        return (  
            <div>
                <div id="GlobalSidenav" className="sidenav Global-ranking-nav" >
                        <div className="pillarMenu-title accordion-menu-title  menu-title-bar col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                <span className="accordion-menu menu-title-bar col-md-10 col-lg-10 col-sm-10 col-xs-10">
                                    <div>{this.panelTitle}</div>
                                       <h4 className="pillar-selected world-ranking-selection">{this.state.Breadcrumbs} ({sessionStorage.getItem('denominator')})</h4> 
                                    </span>
                                <div className="accordion-Close col-md-2 col-lg-2 col-sm-2 col-xs-2"><img src="icons/close-panel-normal.png" onClick={this.closeNav} alt="close"></img></div>
                        </div>
                        <div className="clearfix"></div>
                        <div  className="pillarMenu-body"> 
                            <RankingTableComponent loadType = {this.props.loadType} SelectedYear = {this.state.SelectedYear} />  

                        </div>    
                </div>
            </div>
        );
    }
}


export default GlobalRanking;


