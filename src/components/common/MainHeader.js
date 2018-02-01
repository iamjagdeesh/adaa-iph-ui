import React,{PropTypes} from 'react';
import {Link,IndexLink,Router,browserHistory} from 'react-router';
import './Header.css';
//import * as ReactBootstrap from 'react-bootstrap';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import GlobalRanking from './Navmenu/GlobalRanking';
//import CompareCountries from './Navmenu/CompareCountries';
import CompareCountries from './Navmenu/CompareCountriesN';
import PillerSideBar from './Navmenu/PillerSideBar';
import CountryInfoPanel from './Navmenu/CountryInfoPanel';
import SkyLight from 'react-skylight';


class MainHeader extends React.Component{
     constructor (props) {
        super(props);
        this.state = {
            pillarBtn: 'Pillars',
             //   plillarSubtext:'',
            GlobalRankingBtn: 'Global Ranking',
                GlobalRankingSubtext:'World countries',
            CompareBtn: 'Compare',
               CompareBtntext: 'Multiple Countries',
            AboutBtn: 'About',
            LanguageBtn: 'عربى',
            height: props.height,
            width: props.width,
            heightPanel:props.height,
            selectedKpi:props.selectedKpi,
            countryData:'',
            selTimeLine:this.props.selectedTimeLine,
            pillarSelected:'',
            subpillarSelected:'',
            pillarIdSelected:'',
            SelectedCountry: this.props.countrySelected,
            SelectedcountryName: this.props.countryName ,
            SelectedYear:sessionStorage.getItem('selectedYear'),
            AboutDescription:"The International Performance Hub (IPH) is designed to track Saudi Arabia’s performance in relevant indicators against 150 countries around the world. Developed from over 300 global indicators and with over 2,000 KPIs across 12 pillars of measurement, the International Performance Hub will provide an overview of the Kingdom’s standing from a big picture level. It is also a reference for international rankings, as it makes it possible to find out how different countries tally across multiple areas of activity, from industry and commerce to social affairs, and monitor progress periodically."
            
        }
    
        this.sidebarOpened = 0; //1=country info,2=global ranking,3=compare panel,pillar=4,0=nothing
        this.changeSelectedPillarInfoCallback = this.changeSelectedPillarInfoCallback.bind(this);
        this.updateSideNavStatus = this.updateSideNavStatus.bind(this);
        this.mapPlotCompareLink = this.mapPlotCompareLink.bind(this);
         this.onClick = this.localeChange.bind(this);
        this.fromOtherpage = false;
        this.ar=false;
        this.locale="en";
        this.countrySelectedMap = this.props.countryName;
    }
 updateSideNavStatus(){
    this.sidebarOpened = 0;
 }
  componentWillReceiveProps(nextProps) {
     this.setState({selTimeLine: nextProps.selectedTimeLine,SelectedCountry:nextProps.countrySelected},function(){
         //alert(this.state.selTimeLine);
     });
     
   }
 
   shouldComponentUpdate(nextProps, nextState){
       return true;
 
   }
   disableClickEvent(){
        $('.disableClick').addClass('StopClickEvent');
   }
   openCountryPanel(){
        $('.disableClick').addClass('StopClickEvent');
       if(this.sidebarOpened === 0 ){
            //document.getElementById("root").classList.add("move-root"); 
           $('.headerNav').addClass("move-root");             //$('#CountryInfoPanel').css('width','450px'); 
           $('.footer').addClass("move-root"); 
           $('.zoomButton').css('visibility','hidden'); 
            if(this.ar){
                     $('#CountryInfoPanel').css('left','0px');
                    // $('#CountryInfoPanel').css('transition','0.3s'); 
                     $('.mapael svg').css('right','-250px');
            }else{
                     $('#CountryInfoPanel').css('right','0px');
                      //$('#CountryInfoPanel').css('transition','0.3s');
                     //$('.mapael svg').css('right','-250px'); 
            }
             
        this.sidebarOpened = 1;

       }
       
        
   }
   closeCountryPanel(){
       this.refs.countryPanel.closeNav();
   }

    openCountryPanel_Piller(){
        $('.disableClick').addClass('StopClickEvent');
       if(this.sidebarOpened === 0 ){

            //document.getElementById("root").classList.add("move-root");
             $('.headerNav').addClass("move-root");
             $('.footer').addClass("move-root");
              $('.zoomButton').css('visibility','hidden'); 
            if(this.ar){
                     $('#CountryInfoPanel').css('left','0px'); 
                     //$('.mapael svg').css('right','200px');
            }else{
                     $('#CountryInfoPanel').css('right','0px'); 
                     //$('.mapael svg').css('right','-250px');
            }
          
        this.sidebarOpened = 1;
        this.refs.pillerBar.closeNavPillar();

       }
       setTimeout(function(){
            $('#CountryInfoPanel').css('transition','0.3s');
            $('#PillarSidenav').css('transition','0.3s');
            $('#PillarSidenav-sub').css('transition','0.3s');

       },2000);
        
   }

  closePillerBar(){
     this.sidebarOpened = 0;
     this.openCountryPanel_Piller();
     
  }

    closePillerBar_from_pillar(){
     if(sessionStorage.getItem('MainPillarSelectedCountyID') != '' && sessionStorage.getItem('MainPillarSelectedCountyID') !=""){
       $('#PillarSidenav').css('transition','0s');
       $('#PillarSidenav-sub').css('transition','0s');
       $('#CountryInfoPanel').css('transition','0s');
     this.sidebarOpened = 0;
     this.openCountryPanel_Piller();
    }
    else{
         if(this.ar){
                $('#PillarSidenav-sub').css('left','-385px');
                $('#PillarSidenav').css('left','-450px');
          }else
          {
                $('#PillarSidenav-sub').css('right','-385px');
                $('#PillarSidenav').css('right','-450px');
          }
        $('.disableClick').removeClass('StopClickEvent');
        $('.headerNav').removeClass("move-root");
        $('.footer').removeClass("move-root"); 
        $('.zoomButton').css('visibility','visible');
        this.sidebarOpened = 0;
    }     
  }
   changeSelectedPillarInfoCallback(topicName) {
       var array = topicName.split(';');
        var kpiId = array[1];
        var subTopicName =  array[0];
        var pillarName = array[2];
            sessionStorage.setItem('pillarSelected',pillarName);
            sessionStorage.setItem('subpillarSelected',subTopicName);
            sessionStorage.setItem('selectedKpiID',kpiId);
        this.setState({selectedKpi:kpiId})
        this.setState({plillarSubtext:pillarName +" "+" > "+" "+ subTopicName},function(){
            
            this.props.reloadMap(kpiId);
            //Highlight selected Pillar,KPI
            var pillar_id = sessionStorage.getItem('pillarIdSelected');
            $('.pillar-row .active').removeClass('active');

            $('.img-'+pillar_id).addClass('active');
            $('#id-'+kpiId).addClass('active');

        });
            
    }

    localeChange(){
      
           
       if(this.state.LanguageBtn === 'عربى'){
          //this.setState({plillarSubtext: sessionStorage.getItem('pillarSelected_otherLang') +" "+" > "+" "+ sessionStorage.getItem('kpiNameOtherLang')});
          //save previous values
          let histPillarName=sessionStorage.getItem('pillarSelected');
          let histSubPilarName=sessionStorage.getItem('subpillarSelected');
          let histCountryName=sessionStorage.getItem('MainPillarSelectedCountyName');
          sessionStorage.setItem('pillarSelected',sessionStorage.getItem('pillarSelected_otherLang'));
          sessionStorage.setItem('subpillarSelected',sessionStorage.getItem('kpiNameOtherLang'));
          sessionStorage.setItem('MainPillarSelectedCountyName',sessionStorage.getItem('SelectedCountyNameOtherLang'));
          sessionStorage.setItem('pillarSelected_otherLang',histPillarName);
          sessionStorage.setItem('kpiNameOtherLang',histSubPilarName);
          sessionStorage.setItem('SelectedCountyNameOtherLang',histCountryName);
          this.countrySelectedMap = histCountryName;
          //sessionStorage.setItem('kpiNameOtherLang',kpiNameOtherLang);
          var  pillarSelected=sessionStorage.getItem('pillarSelected');
          var  subpillarSelected=sessionStorage.getItem('subpillarSelected');
          var  pillarIdSelected =sessionStorage.getItem('pillarIdSelected');
           
           
           this.setState({LanguageBtn:'English',pillarBtn:'المحاور',GlobalRankingBtn:'المقارنات الدولية',GlobalRankingSubtext:'دول العالم',CompareBtn:'المقارنة',
                          plillarSubtext: pillarSelected +" "+" > "+" "+ subpillarSelected,pillarSelected:pillarSelected,subpillarSelected:subpillarSelected,pillarIdSelected:pillarIdSelected,CompareBtntext:'دول متعددة',AboutBtn:'عن المنصة',AboutDescription:'The International Performance Hub (IPH) is designed to track Saudi Arabia’s performance in relevant indicators against 150 countries around the world. Developed from over 300 global indicators and with over 2,000 KPIs across 12 pillars of measurement, the International Performance Hub will provide an overview of the Kingdom’s standing from a big picture level. It is also a reference for international rankings, as it makes it possible to find out how different countries tally across multiple areas of activity, from industry and commerce to social affairs, and monitor progress periodically.'},function(){
                sessionStorage.setItem('lang','ar');
                sessionStorage.setItem('arabic',true);
                //this.props.localeChange();
              // var htDom =ReactDOM.findDOMNode('html');
              document.getElementsByTagName('html')[0].setAttribute('dir','rtl'); 
              document.getElementsByTagName('html')[0].setAttribute('lang','ar'); 
           });
           this.setState({arabic:true},function(){
               //this.props.localeChange();
              // location.reload();
              // this.props.localeChange();
              
               browserHistory.push('/PreLoader');
              // this.props.toggle("ar");
           })
           
           this.ar = true;
           
       }
       else{
          let histPillarName=sessionStorage.getItem('pillarSelected');
          let histSubPilarName=sessionStorage.getItem('subpillarSelected');
          let histCountryName=sessionStorage.getItem('MainPillarSelectedCountyName');
          sessionStorage.setItem('pillarSelected',sessionStorage.getItem('pillarSelected_otherLang'));
          sessionStorage.setItem('subpillarSelected',sessionStorage.getItem('kpiNameOtherLang'));
          sessionStorage.setItem('MainPillarSelectedCountyName',sessionStorage.getItem('SelectedCountyNameOtherLang'));
          sessionStorage.setItem('pillarSelected_otherLang',histPillarName);
          sessionStorage.setItem('kpiNameOtherLang',histSubPilarName);
          sessionStorage.setItem('SelectedCountyNameOtherLang',histCountryName);
          this.countrySelectedMap = histCountryName;
          var pillarSelected=sessionStorage.getItem('pillarSelected');
          var subpillarSelected=sessionStorage.getItem('subpillarSelected');
          var pillarIdSelected =sessionStorage.getItem('pillarIdSelected');
          this.setState({LanguageBtn:"عربى",pillarBtn:'Pillars',GlobalRankingBtn:'Global Ranking',GlobalRankingSubtext:'World countries',CompareBtn:'Compare',
                          plillarSubtext: pillarSelected +" "+" > "+" "+ subpillarSelected,pillarSelected:pillarSelected,subpillarSelected:subpillarSelected,pillarIdSelected:pillarIdSelected,CompareBtntext:'Multiple Countries',AboutBtn:'About',AboutDescription:'صممت منصة المقارنات الدولية لمتابعة أداء المملكة العربية السعودية مقارنةً  بـ 150 دولة أخرى حول العالم، حيث تم تطوير المنصة ضمن 300 مؤشر قياس دولي وأكثر من 2000 مؤشر قياس أداء رئيسي عبر 12 محور قياس. منصة المقارنات الدولية تتيح الفرصة  للحصول على نظرة شاملة عن أداء المملكة، كما تمثل المنصة مرجعاُ للمؤشرات الدولية، تمكَن الجهات المهتمة والمختصين في أنحاء العالم من إجراء مقارنات خاصة بالأداء دول مختلفة في عدة مجالات من الصناعة والتجارة إلى الشؤون الاجتماعية وبشكل دوري.'},function(){
                sessionStorage.setItem('lang','en');
                sessionStorage.setItem('arabic',false);
                 document.getElementsByTagName('html')[0].setAttribute('dir','ltr'); 
                 document.getElementsByTagName('html')[0].setAttribute('lang','en'); 
           });
           this.ar = false;
           this.setState({arabic:false},function(){
              //location.reload();
             //this.props.localeChange();
            
            browserHistory.push('/PreLoader');
             //  this.props.toggle("en");
           })

       }

       
       //sessionStorage.setItem('pillarIdSelected',pillarId);
       this.setState({plillarSubtext: pillarSelected +" "+" > "+" "+ subpillarSelected,pillarSelected:pillarSelected,subpillarSelected:subpillarSelected,pillarIdSelected:pillarIdSelected},function(){
            if(this.props.loadType !== 1){
                    $('.disableClick').addClass('StopClickEvent');
       }
       });
   }
     componentDidMount(){
        if(sessionStorage.getItem('arabic')== "true"){
            this.ar = true;
            this.locale="ar";
        }
        if(this.ar){
             document.getElementsByTagName('html')[0].setAttribute('dir','rtl'); 
              document.getElementsByTagName('html')[0].setAttribute('lang','ar'); 
               
            this.setState({LanguageBtn:'English',pillarBtn:'المحاور',GlobalRankingBtn:'التصنيف العالمي',GlobalRankingSubtext:'دول العالم',CompareBtn:'المقارنة',CompareBtntext:'دول متعددة',AboutBtn:'عن المنصة',AboutDescription:'صممت منصة المقارنات الدولية لمتابعة أداء المملكة العربية السعودية مقارنةً  بـ 150 دولة أخرى حول العالم، حيث تم تطوير المنصة ضمن 300 مؤشر قياس دولي وأكثر من 2000 مؤشر قياس أداء رئيسي عبر 12 محور قياس. منصة المقارنات الدولية تتيح الفرصة  للحصول على نظرة شاملة عن أداء المملكة، كما تمثل المنصة مرجعاُ للمؤشرات الدولية، تمكَن الجهات المهتمة والمختصين في أنحاء العالم من إجراء مقارنات خاصة بالأداء دول مختلفة في عدة مجالات من الصناعة والتجارة إلى الشؤون الاجتماعية وبشكل دوري.'});

        }
         if(this.props.loadType == 1 )
         {
              this.fromOtherpage = sessionStorage.getItem('fromOtherpage');
              $('.disableClick').addClass('StopClickEvent');
             if(this.fromOtherpage == "true")
             {
               
                setTimeout(function(){ 
                   // document.getElementById("root").classList.add("move-root");
                    $('.headerNav').addClass("move-root");          
                    $('.footer').addClass("move-root"); 
                    
                    // $('#CompareSidenav').css('width','450px'); 
                        if(sessionStorage.getItem('arabic')== "true"){
                            $('#CompareSidenav').css('left','0px'); 
                            //$('.mapael svg').css('right','200px');
                    }else{
                            $('#CompareSidenav').css('right','0px');
                             //$('.mapael svg').css('right','-250px'); 
                    }


                    },500);
                this.sidebarOpened = 3;
                this.fromOtherpage = "false";
                sessionStorage.setItem('compareOpened',true);
                
             }
             /*else{
                    setTimeout(function(){ 
                                    document.getElementById("root").classList.add("move-root");
                                    $('#CountryInfoPanel').css('width','450px'); 
                                    },500);
                                    this.sidebarOpened = 1;
                                    
         }*/
            
            
         }
         else
         {   
              //$('.disableClick').addClass('StopClickEvent');
              $('.disableClick').css('pointer-events','none');
         }
        this.setState({height:window.innerHeight+'px',width:(window.innerWidth-120)+'px',heightPanel:(window.innerHeight-200)+'px'});
        document.body.classList.add("common-component");
        this.countryData = JSON.parse(sessionStorage.getItem('countriesData'));
         document.getElementById("root").classList.add("move-root-transition");
       
              //  document.getElementById("root").classList.add("move-root");
              //  $('#CountryInfoPanel').css('width','450px'); 
         $('.disableClick').addClass('StopClickEvent');
       var pillarSelected=sessionStorage.getItem('pillarSelected');
       var subpillarSelected=sessionStorage.getItem('subpillarSelected');
       var pillarIdSelected =sessionStorage.getItem('pillarIdSelected');
       //sessionStorage.setItem('pillarIdSelected',pillarId);
       this.setState({plillarSubtext: pillarSelected +" "+" > "+" "+ subpillarSelected,pillarSelected:pillarSelected,subpillarSelected:subpillarSelected,pillarIdSelected:pillarIdSelected},function(){
            if(this.props.loadType !== 1){
                    $('.disableClick').addClass('StopClickEvent');
       }
       });
      /* this.setState({pillarSelected:pillarSelected});
       this.setState({subpillarSelected:subpillarSelected});
       this.setState({pillarIdSelected:pillarIdSelected},function(){
           if(this.props.loadType !== 1){
           $('.disableClick').addClass('StopClickEvent');
       }
       });*/


       if(this.props.loadType !== 1){
           $('.disableClick').addClass('StopClickEvent');
       }
    }
     componentWillUnmount(){
        document.body.classList.remove("common-component");
        document.getElementById("root").classList.remove("move-root");
         $('.disableClick').removeClass('StopClickEvent');
        
    }

     openNav() {
          $('.disableClick').addClass('StopClickEvent');
          $('.pillar-menu-item').addClass('active');
           $('.headerNav').addClass("move-root");
           $('.footer').addClass("move-root"); 
            $('.zoomButton').css('visibility','hidden');
         //document.getElementById("root").classList.add("move-root");
         $(ReactDOM.findDOMNode(this)).find('#root').css({
            'margin-left' :'-450px',
            'position': 'relative'
        });
        if(this.ar)
        {
            $(ReactDOM.findDOMNode(this)).find('#PillarSidenav').css({'left' :'0px'});
            //$('.mapael svg').css('right','200px');

        }else{
             $(ReactDOM.findDOMNode(this)).find('#PillarSidenav').css({'right' :'0px'});
            // $('.mapael svg').css('right','-250px');

        }
        
        this.sidebarOpened = 4;
        
        
    }
    openGlobalNav()
    {   
         $('.disableClick').addClass('StopClickEvent');
         $('.ranking-menu-item').addClass('active');
         //document.getElementById("root").classList.add("move-root");
          $('.headerNav').addClass("move-root");
          $('.footer').addClass("move-root"); 
           $('.zoomButton').css('visibility','hidden');
         $(ReactDOM.findDOMNode(this)).find('#root').css({
            'margin-left' :'-450px',
            'position': 'relative'
        });
        if(this.ar)
        {
            $(ReactDOM.findDOMNode(this)).find('#GlobalSidenav').css({'left' :'0px'});
            // $('.mapael svg').css('right','200px');

        }else{
             $(ReactDOM.findDOMNode(this)).find('#GlobalSidenav').css({'right' :'0px'});
              //$('.mapael svg').css('right','-250px');

        }

      //  $(ReactDOM.findDOMNode(this)).find('#GlobalSidenav').css({'width' :'450px'});
        this.sidebarOpened = 2;
    }
    addCountriesToCompare(value){
        this.refs.comparePanel.addCountriesToCompare(value);
    }
   mapPlotCompareLink(value,type){
       //Map plot change
       this.props.mapPlotChange(value,type);
   }
     compareCountriesNav()
    {
        this.refs.comparePanel.addDefaultCountryToDropDown();
        $('.disableClick').addClass('StopClickEvent');
        $('.compare-menu-item').addClass('active');
         $('.headerNav').addClass("move-root");          
         $('.footer').addClass("move-root"); 
         $('.zoomButton').css('visibility','hidden'); 
        //document.getElementById("root").classList.add("move-root");
         $(ReactDOM.findDOMNode(this)).find('#root').css({
            'margin-left' :'-450px',
            'position': 'relative'
        });
         if(this.ar)
        {

            $(ReactDOM.findDOMNode(this)).find('#CompareSidenav').css({'left' :'0px'});
             //$('.mapael svg').css('right','200px');

        }else{
             $(ReactDOM.findDOMNode(this)).find('#CompareSidenav').css({'right' :'0px'});
              //$('.mapael svg').css('right','-250px');

        }

       // $(ReactDOM.findDOMNode(this)).find('#CompareSidenav').css({'width' :'450px'});
        this.sidebarOpened = 3;
        sessionStorage.setItem('compareOpened',true);
    }

    render() {
        let mainheaderData;
        if(!this.ar){
            mainheaderData = (
                <div className="col-md-12 col-lg-12 col-sm-12 headerNav" >
                    <div className="row">
                            <div className="col-md-2 col-lg-2 col-sm-2 " >       
                                <div className="col-md-12 col-lg-12 col-sm-12" style={{paddingLeft:'0px'}}>
                                    <IndexLink to="/" style={{margin:'8px'}}>Home</IndexLink> 
                                </div>
                            </div>
                        
                                <div className="col-md-3 col-lg-3 col-sm-3">
                                    <div  className="menu-items">
                                        <div className="media disableClick pillar-menu-item"  onClick={this.openNav.bind(this)}>
                                                <div className="media-left">
                                                    <p className="pillar-img-icon" title={this.state.pillarBtn}></p>
                                                </div>
                                                <div className="media-body">
                                                    <h4 className="media-heading">{this.state.pillarBtn}</h4>
                                                    <p>{this.state.plillarSubtext}</p>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2 col-lg-2 col-sm-2 Global-Ranking-menu-Btn">
                                    <div  className="menu-items">
                                        <div className="media disableClick ranking-menu-item"  onClick={this.openGlobalNav.bind(this)}>
                                                <div className="media-left">
                                                <p className="ranking-img-icon" title={this.state.GlobalRankingBtn}></p>
                                                </div>
                                                <div className="media-body">
                                                    <h4 className="media-heading">{this.state.GlobalRankingBtn}</h4>
                                                    <p>{this.state.GlobalRankingSubtext}</p>
                                                </div>
                                        </div>    
                                    </div>
                                </div>
                                <div className="col-md-2 col-lg-2 col-sm-2">
                                    <div  className="menu-items">   
                                        <div className="media disableClick compare-menu-item" onClick={this.compareCountriesNav.bind(this)}>
                                                <div className="media-left">
                                                <p className="compare-img-icon" title={this.state.CompareBtn}></p>
                                                </div>
                                                <div className="media-body">
                                                    <h4 className="media-heading">{this.state.CompareBtn}</h4>
                                                    <p>{this.state.CompareBtntext}</p>
                                                </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3 col-lg-3 col-sm-3" style={{paddingTop:' 40px',textAlign:'right'}}>
                                    <span className="nav-link disableClick abt-btn"onClick={() => this.refs.simpleDialog.show()}>{this.state.AboutBtn}</span>
                                    {/*<span className="language_sa disableClick" onClick={this.onClick}>{this.state.LanguageBtn}</span>*/}

                                        <div className='about-en' style={{textAlign:'left'}}>
                                            <SkyLight hideOnOverlayClicked ref="simpleDialog" title={this.state.AboutBtn} titleStyle={{ textAlign: 'center',color:'white',fontSize:'250%',paddingTop:'4%',paddingBottom:'4%',paddingRight:'33%'}} closeButtonStyle={{ top:'8%',right:'20%',fontSize:'50px',color:'white'}}>
                                                <div className = "modalTextContent">{this.state.AboutDescription}</div>
                                            </SkyLight>
                                        </div>
                                </div> 
                           </div>
                     </div>
            )
        }
        else{
            mainheaderData =(
               
                    <div className="col-md-12 col-lg-12 col-sm-12 headerNav">
                        <div className = "row">
                     
                        <div className="col-md-3 col-lg-3 col-sm-3" style={{paddingTop:' 40px',textAlign:'left'}}> 
                          <span className="nav-link disableClick abt-btn"onClick={() => this.refs.simpleDialog.show()}>{this.state.AboutBtn}</span>
                          <span className="language_sa disableClick" onClick={this.onClick}>{this.state.LanguageBtn}</span>
                          
                          <div className="about-ar" style={{textAlign:'right'}}>
                                <SkyLight hideOnOverlayClicked ref="simpleDialog" title={this.state.AboutBtn} titleStyle={{ color:'white',fontSize:'250%',paddingTop:'4%',paddingBottom:'4%',paddingRight:'30%'}} closeButtonStyle={{ top:'8%',right:'80%',fontSize:'50px',color:'white'}} >
                                    <div className = "modalTextContent">{this.state.AboutDescription}</div>
                                </SkyLight>
                                </div>
                        </div>                           
                        <div className="col-md-2 col-lg-2 col-sm-2">
                            <div  className="menu-items">   
                                <div className="media disableClick compare-menu-item" onClick={this.compareCountriesNav.bind(this)}>
                                        <div className="media-left">
                                        <p className="compare-img-icon" title={this.state.CompareBtn}></p>
                                        </div>
                                        <div className="media-body">
                                            <h4 className="media-heading">{this.state.CompareBtn}</h4>
                                            <p>{this.state.CompareBtntext}</p>
                                        </div>
                                </div>
                            </div>
                        </div>
                          <div className="col-md-2 col-lg-2 col-sm-2 Global-Ranking-menu-Btn">
                            <div  className="menu-items">
                                <div className="media disableClick ranking-menu-item"  onClick={this.openGlobalNav.bind(this)}>
                                        <div className="media-left">
                                           <p className="ranking-img-icon" title={this.state.GlobalRankingBtn}></p>
                                        </div>
                                        <div className="media-body">
                                            <h4 className="media-heading">{this.state.GlobalRankingBtn}</h4>
                                            <p>{this.state.GlobalRankingSubtext}</p>
                                        </div>
                                </div>    
                            </div>
                        </div> 
                        <div className="col-md-3 col-lg-3 col-sm-3">
                            <div  className="menu-items">
                                <div className="media disableClick pillar-menu-item"  onClick={this.openNav.bind(this)}>
                                        <div className="media-left">
                                        <p className="pillar-img-icon" title={this.state.pillarBtn}></p>
                                        </div>
                                        <div className="media-body">
                                            <h4 className="media-heading">{this.state.pillarBtn}</h4>
                                            <p>{this.state.plillarSubtext}</p>
                                        </div>
                                </div>
                            </div>
                        </div>
                    <div className="col-md-2 col-lg-2 col-sm-2 " >       
                        <div className="col-md-12 col-lg-12 col-sm-12" style={{paddingLeft:'0px'}}>
                            <IndexLink to="/" className="header-logo" ><img className="adaa-logo" src="icons/logo.png" style={{margin:'8px'}} title="International Performance Hub"></img></IndexLink> 
                        </div>
                    </div>
                </div>
            </div>
            )
        }
    return (  
        <div lang = {this.ar ? 'ar':'en'}>
            
            <PillerSideBar loadType = {this.props.loadType} ref="pillerBar"  Breadcrumbs = {this.state.plillarSubtext}  statusChange = {this.changeSelectedPillarInfoCallback.bind(this)} reloadMap = {this.props.reloadMap} sideNavClose = {this.updateSideNavStatus.bind(this)}/>
            <GlobalRanking loadType = {this.props.loadType} Breadcrumbs = {this.state.plillarSubtext} SelYear = {this.state.selTimeLine} sideNavClose = {this.updateSideNavStatus.bind(this)}  /> 
            <CountryInfoPanel countrySearchCallback={this.props.countrySearchCallback} loadType = {this.props.loadType} ref="countryPanel" Breadcrumbs = {this.state.plillarSubtext} selectedYear={this.state.selTimeLine} selectedKPI={this.state.selectedKpi} SelectedCountry={this.state.SelectedCountry} SelectedcountryName={this.countrySelectedMap} sideNavClose = {this.updateSideNavStatus.bind(this)} selectHandler={this.changeSelectedPillarInfoCallback.bind(this)} removeMapPin ={this.props.removeMapPin} /> 
            <CompareCountries loadType = {this.props.loadType} ref="comparePanel" SelectedCountry={this.state.SelectedCountry} Breadcrumbs = {this.state.plillarSubtext} selectedKPI={this.state.selectedKpi} selectedYear = {this.state.selTimeLine} sideNavClose = {this.updateSideNavStatus.bind(this)} mapPlotChange={this.mapPlotCompareLink.bind(this)} />
                 
            {mainheaderData}
            
    </div>
    );
    }
}

export default MainHeader;
//<span className="ar-link menu-items language_sa disableClick" onClick={this.onClick}>{this.state.LanguageBtn}</span>
//<span className="en-link menu-items language_sa disableClick" onClick={this.onClick}>{this.state.LanguageBtn}</span>

//<CompareCountries loadType = {this.props.loadType} Breadcrumbs = {this.state.plillarSubtext}  selectedYear={this.state.selTimeLine} SelectedCountry={this.state.SelectedCountry} selectedKPI = {this.state.selectedKpi}/>