import React from 'react';
import jQuery from 'jquery';
import ReactDOM from 'react-dom';
import './NavMenuCss.css';
import SubPillarComponentBar from './SubPillarComponentBar';
import myConfig from '../../../conf.js';
import global from '../../../global.js';

class PillerSideBar extends React.Component {

      constructor (props) {
        super(props);
        var conf= myConfig;
         this.locale = "en";
         this.ar = false;
         if(sessionStorage.getItem('arabic')== "true"){
            this.ar = true;  
            this.locale = "ar";
			            
        }
        this.state = {         
           dataURL : conf.apiUrl+"pillarList?locale="+this.locale,
           data :[],
           pillarsDescription: global.pillar_decr_en,
           MainPillar:"",
           selectedPillar:props.selPillar,
           Breadcrumbs:this.props.Breadcrumbs,
           pillars:global.pillar_en,
           subPillars:global.subPillars_en  
        }
        
         this.onClick = this.handleClick.bind(this);	
         this.closeMenu = this.closeMenu.bind(this);
         this.closeNavSub = this.closeNavSub.bind(this);
         this.pillarSelected=sessionStorage.getItem('pillarSelected');
         this.subpillarSelected=sessionStorage.getItem('subpillarSelected');
         this.selectedKpiID = sessionStorage.getItem('selectedKpiID');
         this.selectedKpiName = sessionStorage.getItem('selectedKpiName');
         this.loadSelected = this.loadSelected.bind(this);
        
    }

    closeMenu() {
         jQuery('.pillar-menu-item').removeClass('active');
         jQuery('.disableClick').removeClass('StopClickEvent');
        //document.getElementById("root").classList.remove("move-root");
         jQuery('.headerNav').removeClass("move-root");
         jQuery('.footer').removeClass("move-root"); 
         jQuery('.zoomButton').css('visibility','visible');
          if(this.ar){
              jQuery(ReactDOM.findDOMNode(this)).find('#PillarSidenav').css({'left' :'-450px'});
             // jQuery('.mapael svg').css('padding-right','15%');
             jQuery('.mapael svg').css('right','0px');
          }else
          {
              jQuery(ReactDOM.findDOMNode(this)).find('#PillarSidenav').css({'right' :'-450px'});
              jQuery('.mapael svg').css('right','0px');

          }
        this.props.sideNavClose();
    }
    closeNavPillar(){
        if(this.ar){
                jQuery('#PillarSidenav-sub').css('left','-385px');
                jQuery('#PillarSidenav').css('left','-450px');
                //jQuery('.mapael svg').css('right','0px');
          }else
          {
                jQuery('#PillarSidenav-sub').css('right','-385px');
                jQuery('#PillarSidenav').css('right','-450px');
               // jQuery('.mapael svg').css('left','0px');
          }
      
    }
    closeNavSub(){
         jQuery('.pillar-menu-item').removeClass('active');
         jQuery('#pillar-selected').css('visibility','hidden');
        if(this.ar){
                jQuery('#PillarSidenav-sub').css('left','-385px');
                jQuery('#PillarSidenav').css('left','-450px');
                jQuery('.mapael svg').css('right','0px');
          }else
          {
                jQuery('#PillarSidenav-sub').css('right','-385px');
                jQuery('#PillarSidenav').css('right','-450px');
                jQuery('.mapael svg').css('right','0px');
          }
        jQuery('.disableClick').removeClass('StopClickEvent');
       // document.getElementById("root").classList.remove("move-root");
       jQuery('.headerNav').removeClass("move-root");
       jQuery('.footer').removeClass("move-root");
        jQuery('.zoomButton').css('visibility','visible'); 
        
            this.props.sideNavClose();
           
        
    }
    componentWillReceiveProps(nextProps) {
        
        this.setState({Breadcrumbs: nextProps.Breadcrumbs});  
     
       }

     componentDidMount(){
           jQuery(function(){
            var height1= (jQuery(".pillarMenu-title").height());
             // var height2=   (jQuery(".pillarsDescription").height());
            jQuery('.accordion-sub-pillars').css({ height: jQuery(window).innerHeight()- (height1 + 200) });
             jQuery('.accordion-sub-pillars:lang(ar)').css({ height: jQuery(window).innerHeight()- (height1 + 160) });
            jQuery(window).resize(function(){
                jQuery('.accordion-sub-pillars').css({ height: jQuery(window).innerHeight()- (height1 + 160) });
            });
        });

         jQuery(function(){
            var height1= (jQuery(".pillarMenu-title").height());
             // var height2=   (jQuery(".pillarsDescription").height());
            jQuery('.Accordion-sub-Pillar-data').css({ height: jQuery(window).innerHeight()- (height1 + 120) });
            jQuery(window).resize(function(){
                jQuery('.Accordion-sub-Pillar-data').css({ height: jQuery(window).innerHeight()- (height1 + 120) });
            });
        });

         if(this.ar){
            this.setState({pillarsDescription:global.pillar_decr_ar});
            this.setState({pillars:global.pillar_ar});
            this.setState({subPillars:global.subPillars_ar});
         }
      jQuery.ajax({
            url: this.state.dataURL,
            dataType: 'json',
            type: "GET",
            success: function(data) {
                 //this.props.responseData(data);
                 this.setState({data:data});
                 this.setState({selectedPillar:this.pillarSelected},function(){
                     this.loadSelected();
                 })
            }.bind(this),
                error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });  

        //Get data from localState
        document.body.classList.add("pillar-component");

     }
     componentWillUnmount(){
        document.body.classList.remove("pillar-component");
         

    }
    loadSelected(){
          jQuery('.pillar-row .active').removeClass('active');
          jQuery(ReactDOM.findDOMNode(this)).find('#'+this.pillarSelected).addClass('active');
    }
     handleClick(clicked,name,otherLangName) {
        //
       // document.getElementById("root").classList.remove("move-root");
         //jQuery('.pillar-row .active').removeClass('active');
         //jQuery('.img-'+clicked).addClass('active');
         //this.props.pillarSelectionCallback(jQuery('.img-'+clicked).html());
         this.setState({selectedPillar:name},function(){
                sessionStorage.setItem('tempPillarSelected',clicked);
               // sessionStorage.setItem('pillarIdSelected',clicked);
                sessionStorage.setItem('pillarSelected_otherLang',otherLangName);
                jQuery('#id-'+sessionStorage.getItem('selectedKpiID')).addClass('active');
                 if(this.ar){
                        jQuery('#PillarSidenav-sub').css('left','0px');
                }else
                {
                        jQuery('#PillarSidenav-sub').css('right','0px');
                }
                //jQuery('#PillarSidenav-sub').css('width','385px');

                jQuery('#pillar-selected').css('visibility','visible');
                });
        
         //jQuery('.pillar-row .active').removeClass('active'); <div className={`pillar-text img-jQuery{row.pillarId}`} onClick={this.onClick.bind(this, row.pillarId)}>{row.pillarName}</div>
         //jQuery('.img-'+clicked).addClass('active'); <li href="#" className="openbtn" onClick={this.onClick.bind(this,row.pillarId,row.pillarName)}><img src="icons/education-normal.png"></img>{row.pillarName}</li>
        // this.props.pillarSelectionCallback(jQuery('.img-'+clicked).html());.pillar-component .pillar-text{

    }
    pillarBar(){
         if(this.ar){
                jQuery('#PillarSidenav-sub').css('left','-385px');
                jQuery('#PillarSidenav').css('left','0px');
          }else
          {
                jQuery('#PillarSidenav-sub').css('right','-385px');
                jQuery('#PillarSidenav').css('right','0px');
          }
            //jQuery('#PillarSidenav').css('width','450px');
            //jQuery('#PillarSidenav-sub').css('width','0px');  
    }

    
    render() { 
               var pillars = this.state.data.map((row,index) => {
                   var imgSrc = row.pillarId;
                    return <div className="accordion-sub-pillar-content" key={index} style={{minHeight:40}} dir={this.ar?'rtl':'ltr'}>
                                <div className={`pillar-component pillar-text pillar-text-en inner-subpanel img-${row.pillarId}`} id ={row.pillarName} onClick={this.onClick.bind(this,row.pillarId,row.pillarName,row.pillarNameOtherLang)}><span>{row.pillarName}</span></div>
                                
                            </div>
                    });
           
		     return (<div><div id="PillarSidenav" className="sidenav PillarSidenav ">
                        <div className="pillarMenu-title col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                <span className="accordion-menu col-md-10 col-lg-10 col-sm-10 col-xs-10">01</span> 
                                <span className="accordion-Close col-md-2 col-lg-2 col-sm-2 col-xs-2"><img src="icons/close-panel-normal.png" onClick={this.closeMenu.bind(this)} alt="close"></img></span>
                        </div>
                      <div  className="pillarMenu-body" >
                            <h4 id="pillar-selected" className="compare-pillar-breadcrumb" onClick={this.pillarBar.bind(this)}>{this.state.Breadcrumbs}>({sessionStorage.getItem('denominator')})</h4>
                            <h2>{this.state.pillars} ({this.state.data.length})</h2>
                            <p className="pillarsDescription">{this.state.pillarsDescription}</p> 
                            <div className="accordion-sub-pillars  pillar-row">{pillars}</div>
                    </div>
                    </div>
                    
                    <div id="PillarSidenav-sub" className="sidenav-sub PillarSidenav-sub">
                        <div className="pillarMenu-title">
                         <h4 className="pillar-selected"></h4>
                                <span className="accordion-menu">02</span>
                               
                                <span className="accordion-Close"><img src="icons/close-panel-normal.png" onClick={this.closeNavSub.bind(this)} alt="close"></img></span>
                        </div>
                        <div  className="Sub-pillarMenu-body">
                            <h2>{this.state.subPillars} <span id="innerPanelSubCount"></span></h2>
                             <SubPillarComponentBar data={this.state.data} pillarSelected={this.state.selectedPillar} selectedSubPillar = {this.selectedKpiID} statusChange= {this.props.statusChange} reloadMap = {this.props.reloadMap}/> 
                           
                        </div>
                    </div>

                    </div>
                    ) ;
         }

}

export default PillerSideBar;
