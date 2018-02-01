import React from 'react';
import {Link,browserHistory} from 'react-router';
import jQuery from 'jquery';
import $ from 'jquery';
import './HomePage.css';
import {Icon} from 'react-fa';
import PillarComponent  from './PillarComponent';
import CountryComponent from './CountryComponent';
import SubPillarComponent  from './SubPillarComponent';
import myConfig from '../../conf.js';
import global from '../../global.js';
 var conf= myConfig;
  /**
  HomePage:There are three sections on this.<br>
  1-Pillar section <br>
  2-Subpillar/kpi section <br>
  3-Country list <br>
   */




class HomePage extends React.Component {
  
    constructor (props) {
        super(props);
        
        this.state = {
            selectedPillar: '',
            selectedSubPillar: '',
            selectedCountry: '',
            selectedCountryName: '',
            selectedKpiID:'',
            countrysearch: '',
            height: props.height,
            width: props.width,
            heightPanel:props.height,
            data :[{ "pillarName": "Loading..."}],
            countrydata:[{"countryName":"loading..."}],
            prevButton1:'/',
            nextButton1:'javascript:void(0)',
            nextButton2:'javascript:void(0)',
            nextButtonTitle1Ar : 'المعوقين: من فضلك إختر من عمود',
            nextButtonTitle2Ar : 'المعوقين: من فضلك إختر من عمود من الباطن',
            nextButtonTitle1 : 'Disabled : Please select one of the pillars.',
            nextButtonTitle2 : 'Disabled : Please select one of the sub pillars.',
            accordionTabHeight:props.height,
            arabic:false,
            pillarTitle:"Pillars",
            pillarDescription:"Select a pillar to see relevant country data and map visualization.",
            subpillarTitle:"Sub Pillars",
            countryTitle:"World Countries",
            getStarted:"GET STARTED",
            searchText:"Search",
            HomeText:"Home"

        }
            this.pillarSelectionCallback = this.pillarSelectionCallback.bind(this);
            this.subPillarSelectionCallback = this.subPillarSelectionCallback.bind(this);
            this.countrySelectionCallback = this.countrySelectionCallback.bind(this);
            this.localSearch = this.localSearch.bind(this);
            this.responseData = this.responseData.bind(this);
            this.countryData = this.countryData.bind(this);
            this.handleClick = this.handleClick.bind(this);
            this.ar = false;

    }
    /**
     * Data load callback
     * @param {object} response 
     */
    responseData(response) {
        this.setState({data:response});       
    }
    countryData(response) {
        this.setState({countrydata:response});       
    }
    handleClick(e) {
          if(this.state.selectedCountry === undefined || this.state.selectedCountry === null || this.state.selectedCountry ==''){
               e.preventDefault();
          }
    }
    _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if( $( ".countries-name:visible" ).length == 1){
        $( ".countries-name:visible" ).trigger("click");
      }
      
    }
  }
    pillarSelectionCallback(topicName) {
         var array = topicName.split(',');
         var pillarId = array[1];
         var pillarName =  array[0];
         var pillarName_otherLang =  array[2];
        this.setState({selectedPillar:pillarName,nextButton1:"#subpillar",nextButtonTitle1:'Click to choose sub pillar'});
        sessionStorage.setItem('pillarSelected',pillarName);
        sessionStorage.setItem('pillarIdSelected',pillarId);
        sessionStorage.setItem('pillarSelected_otherLang',pillarName_otherLang);
        this.loadCountryData();   
    }
    subPillarSelectionCallback(topicName) {
       var array = topicName.split(';');
        var kpiId = array[0];
        var subTopicName =  array[1];
        var kpiNameOtherLang = array[2];
        this.setState({selectedKpiID:kpiId});
        this.setState({selectedSubPillar:subTopicName,nextButton2:"#worldcountries ",nextButtonTitle2:'Click to choose world countries'});
        sessionStorage.setItem('subpillarSelected',subTopicName); 
        sessionStorage.setItem('selectedKpiID',kpiId); 
        sessionStorage.setItem('kpiNameOtherLang',kpiNameOtherLang);

        //Load Country data
        //this.loadCountryData(kpiId);        
    }
    loadCountryData(){
    var dataURL;
    if(!this.state.arabic){
         dataURL = conf.apiUrl+"countryAlphaList?locale=en";
    }
    else{
         dataURL = conf.apiUrl+"countryAlphaList?locale=ar";
    }
     
      jQuery.ajax({
            url: dataURL,
            dataType: 'json',
            type: "GET",
            success:function(data) {
                  this.setState({countrydata:data});
                  var countriesCount = 0;
                  data.map((row,index) => {
                    countriesCount += row.countriesList.length;                        
                  });                  
                  jQuery('.countries-count-num').html('('+countriesCount+')');
            }.bind(this),
                error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });        

    }
    localSearch(event){      
      var txtsearchvalue = event.target.value;
      if (txtsearchvalue.length >= 2 || txtsearchvalue.length == 0)
      {
        this.setState({countrysearch:txtsearchvalue});      
      }
    }
    mapScroll(country){
        if(country=='SA' && document.getElementById('SA')){
        setTimeout(
      () => { document.getElementById('SA').scrollIntoView();jQuery('.pillar-worldCountries .active').removeClass('active');
         jQuery('.ctry-SA').addClass('active');   },
      500
    ); 
        }
    }
    countrySelectionCallback(countryName) {
        let cntryDetails = countryName.split(';');

        sessionStorage.setItem('MainPillarSelectedCountyID',cntryDetails[0]);
        sessionStorage.setItem('MainPillarSelectedCountyName',cntryDetails[1]);
        sessionStorage.setItem('SelectedCountyNameOtherLang',cntryDetails[2]);
        
        this.setState({selectedCountry:cntryDetails[0]});    
        this.setState({selectedCountryName:cntryDetails[1]}); 
        browserHistory.push("/worldmap");
    }
     shouldComponentUpdate(nextProps, nextState){
        $(function(){
             if (navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1))
                {
                   $('#pillar .row.pillar-row, #subpillar .pillar-content.subpillar-content, #worldcountries .pillar-content.pillar-worldCountries,.subPillar-heading').css( "visibility", "hidden" );
                     setTimeout(function() {
                        $('#pillar .row.pillar-row, #subpillar .pillar-content.subpillar-content, #worldcountries .pillar-content.pillar-worldCountries, .subPillar-heading').css( "visibility", "visible" );
                    }, 300);
                 }
            $('article.accordion section').css( "width", "75px" );
            $('article.accordion section:target').css( "width", window.innerWidth- 152 );
            $(window).resize(function(){
                $('article.accordion section:target').css("width", window.innerWidth- 152);
            });
                  
        });

        return true;
   }
    componentDidMount(){

        /* $(function(){
        var width1= ($(".pillar").width());
        var widht2= ($(".subpillar").width());

            $('article.accordion section:target').css( "width", "80%" );
            $(window).resize(function(){
                $('article.accordion section:target').css("width", "80%" );
            });
        });*/
        sessionStorage.setItem('subpillarCount',0); 
        sessionStorage.setItem('countriesCount',0);
        sessionStorage.setItem("fromOtherpage",false);
        sessionStorage.setItem('compareOpened',false);
        window.location.href = window.location.origin + "/welcome#pillar";
        this.setState({height:window.innerHeight+'px',width:(window.innerWidth-120)+'px',heightPanel:(window.innerHeight-230)+'px',accordionTabHeight:(window.innerHeight+100)+'px'});
        document.body.classList.add("pillar-component");
        if(sessionStorage.getItem('arabic')== "true"){
            this.ar = true;
        }
        if(this.ar){

              document.getElementsByTagName('html')[0].setAttribute('dir','rtl'); 
              document.getElementsByTagName('html')[0].setAttribute('lang','ar'); 
            this.setState({arabic:true,getStarted:'ابدأ'},function(){
                if(this.state.arabic === true){
                    
                    this.setState({pillarTitle:'المحاور'});
                    this.setState({pillarDescription:'اختر أحد المحاور لعرض البيانات ذات الصلة على خارطة الدول'});
                    this.setState({subpillarTitle:'المحاور الثانوية '});
                    this.setState({countryTitle:'الدول'});
                    this.setState([{pillarName:'الدول'}])
                    this.setState({data: [{"pillarName": "جاري التحميل..."}]}); [{ }];
                    this.setState({countrydata: [{"countryName": "جاري التحميل..."}]}); [{ }];
                    this.setState({searchText:"البحث" });
                    this.setState({HomeText:"الهدف" });
        } 
            })
        }
        else{
              document.getElementsByTagName('html')[0].setAttribute('dir','ltr'); 
              document.getElementsByTagName('html')[0].setAttribute('lang','en'); 
        }

        
     
    }
     componentWillUnmount(){
        document.body.classList.remove("pillar-component");
         

    }
    // <a href={this.state.prevButton1} className="btn btn-outline btn-default btn-prev"></a>
    render() {

 let pillarPage;
        if(!this.state.arabic){
              pillarPage = (
              <article className="accordion">
                        <section id="pillar" style={{height: this.state.height}}>
                            <h3 style={{float:'left'}}>01</h3>
                              <span className="accnav">
                                <Link to={"/"} className="btn btn-outline btn-default btn-prev"> {this.state.HomeText}</Link>
                              </span>
                            <div className="clearfix"></div>
                            <h2 style={{width: this.state.height,top:this.state.accordionTabHeight}}><a href="#pillar">{this.state.selectedPillar}</a></h2>
                            <div id="main-pillars-list" className="pillar-content">
                                <h1>{this.state.pillarTitle} <span className="pillar-count-num"></span></h1>
                                <p>{this.state.pillarDescription}</p>
                                    <div className="row pillar-row">
                                        <PillarComponent arabic={this.state.arabic} pillarSelectionCallback={this.pillarSelectionCallback} responseData={this.responseData} data={this.state.data}/>
                                     </div>  
                            </div>
                        </section>
                        
                        <section id="subpillar" style={{height: this.state.height}}>
                            <h2 style={{width: this.state.height,top:this.state.accordionTabHeight}}><a href="#subpillar">{this.state.selectedSubPillar}</a></h2>
                            <h3 style={{float:'left'}}>02</h3>
                             <span className="accnav">
                                <Link to={"/"} className="btn btn-outline btn-default btn-prev"> {this.state.HomeText}</Link>
                                 <a href="#pillar" className="btn btn-outline btn-default btn-prev hypen-icon">{this.state.selectedPillar}</a>    
                              </span>
                              <div className="clearfix"></div>
			                <h1 className="subPillar-heading">{this.state.subpillarTitle} ({sessionStorage.getItem('subpillarCount')})</h1>
                             <div id="sub-pillars-list" className="pillar-content subpillar-content" style={{height: this.state.heightPanel}}>                                
                              <div className="row subpillar-row">
                                  <SubPillarComponent arabic={this.state.arabic} data={this.state.data} pillarSelected={this.state.selectedPillar} subPillarSelectionCallback={this.subPillarSelectionCallback}/>                                           
                              </div>      
                              {/*  <span className="accnav" onClick={this.mapScroll(this.state.selectedCountry)}>
                                 <a href="#pillar" className="btn btn-outline btn-default btn-prev"></a>                                    
                                </span>*/}

                             </div> 
                        </section>
			
			            <section id="worldcountries" style={{height: this.state.height}}>
                            <h2 style={{width: this.state.height,top:this.state.accordionTabHeight}}>{this.state.selectedCountry}</h2>
                            <h3 style={{float:'left'}}>03</h3> 
                             <span className="accnav">
                                <Link to={"/"} className="btn btn-outline btn-default btn-prev"> {this.state.HomeText}</Link>
                                <a href="#pillar" className="btn btn-outline btn-default btn-prev hypen-icon">{this.state.selectedPillar}</a>  
                                <a href="#subpillar" className="btn btn-outline btn-default btn-prev hypen-icon">{this.state.selectedSubPillar}</a> 
                              </span>
                            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 ">                     
                                <div className="col-md-8 col-lg-8 col-sm-8 col-xs-8 World-countries-list">
                                    <h1 className="worldCountries-heading">{this.state.countryTitle} <span className="countries-count-num"></span></h1> 
                                </div>    
                                <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4 Pillar_Coutry_serach">    
                                    <input type="search" ref="txtsearch" id="txtsearch" onKeyPress={this._handleKeyPress} placeholder={this.state.searchText} onChange={this.localSearch} style={{float: 'right !important',backgroundColor: '#1A0D1A'}}></input>                           
                                </div>
                            </div>
                            <div id="worldCountries-list" className="pillar-content pillar-worldCountries" style={{height: this.state.heightPanel}}>                                                                            
                             
                                <div className="row subpillar-row">
                                <CountryComponent arabic={this.state.arabic} countrysearch={this.state.countrysearch} countrySelectionCallback={this.countrySelectionCallback} countryData={this.countryData} countrydata={this.state.countrydata}/>
                                </div>                                       
                                        
                             </div> 
                            {/* <span className="accnav worldCountries-panel">
                                <a href="#subpillar" className="btn btn-outline btn-default btn-prev"></a> 
                               <Link to={"/worldmap"} activeClassName="active" className="btn btn-worldCountries" onClick={this.handleClick}>{this.state.getStarted} </Link>
                            </span>*/}
                        </section>

                    </article>
            )
        }else{
            pillarPage = (
              <article className="accordion">
                        <section id="pillar" style={{height: this.state.height}}>
                            <h3 style={{float:'left'}}>01</h3>
                              <span className="accnav" style={{textAlign:' right', marginRight:' 80px'}}>
                                <Link to={"/"} className="btn btn-outline btn-default btn-prev"> {this.state.HomeText}</Link>
                              </span>
                            <div className="clearfix"></div>
                            <h2 style={{width: this.state.height,top:this.state.accordionTabHeight}}><a href="#pillar">{this.state.selectedPillar}</a></h2>
                            <div id="main-pillars-list" className="pillar-content">
                                <h1>{this.state.pillarTitle} <span className="pillar-count-num"></span></h1>
                                <p>{this.state.pillarDescription}</p>
                                    <div className="row pillar-row">
                                        <PillarComponent arabic={this.state.arabic} pillarSelectionCallback={this.pillarSelectionCallback} responseData={this.responseData} data={this.state.data}/>
                                     </div>  
                            </div>
                        </section>
                        
                        <section id="subpillar" style={{height: this.state.height}}>
                            <h2 style={{width: this.state.height,top:this.state.accordionTabHeight}}><a href="#subpillar">{this.state.selectedSubPillar}</a></h2>
                            <h3 style={{float:'left'}}>02</h3>
                             <span className="accnav" style={{textAlign:' right', marginRight:' 80px'}}>
                                 <a href="#pillar" className="btn btn-outline btn-default btn-prev hypen-icon">{this.state.selectedPillar}</a>  
                                <Link to={"/"} className="btn btn-outline btn-default btn-prev"> {this.state.HomeText}</Link>
                                   
                              </span>
                              <div className="clearfix"></div>
			                <h1 className="subPillar-heading">{this.state.subpillarTitle} ({sessionStorage.getItem('subpillarCount')})</h1>
                             <div id="sub-pillars-list" className="pillar-content subpillar-content" style={{height: this.state.heightPanel}}>                                
                              <div className="row subpillar-row">
                                  <SubPillarComponent arabic={this.state.arabic} data={this.state.data} pillarSelected={this.state.selectedPillar} subPillarSelectionCallback={this.subPillarSelectionCallback}/>                                           
                              </div>      
                              {/*  <span className="accnav" onClick={this.mapScroll(this.state.selectedCountry)}>
                                 <a href="#pillar" className="btn btn-outline btn-default btn-prev"></a>                                    
                                </span>*/}

                             </div> 
                        </section>
			
			            <section id="worldcountries" style={{height: this.state.height}}>
                            <h2 style={{width: this.state.height,top:this.state.accordionTabHeight}}>{this.state.selectedCountry}</h2>
                            <h3 style={{float:'left'}}>03</h3> 
                             <span className="accnav" style={{textAlign:' right', marginRight:' 80px'}}>
                                <a href="#subpillar" className="btn btn-outline btn-default btn-prev hypen-icon">{this.state.selectedSubPillar}</a> 
                                 <a href="#pillar" className="btn btn-outline btn-default btn-prev hypen-icon">{this.state.selectedPillar}</a> 
                                 <Link to={"/"} className="btn btn-outline btn-default btn-prev"> {this.state.HomeText}</Link> 
                              </span>
                            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 ">                     
                                <div className="col-md-8 col-lg-8 col-sm-8 col-xs-8 World-countries-list">
                                    <h1 className="worldCountries-heading">{this.state.countryTitle} <span className="countries-count-num"></span></h1> 
                                </div>    
                                <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4 Pillar_Coutry_serach">    
                                    <input type="search" ref="txtsearch" id="txtsearch" onKeyPress={this._handleKeyPress} placeholder={this.state.searchText} onChange={this.localSearch} style={{float: 'right !important',backgroundColor: '#1A0D1A'}}></input>                           
                                </div>
                            </div>
                            <div id="worldCountries-list" className="pillar-content pillar-worldCountries" style={{height: this.state.heightPanel}}>                                                                            
                             
                                <div className="row subpillar-row">
                                <CountryComponent arabic={this.state.arabic} countrysearch={this.state.countrysearch} countrySelectionCallback={this.countrySelectionCallback} countryData={this.countryData} countrydata={this.state.countrydata}/>
                                </div>                                       
                                        
                             </div> 
                            {/* <span className="accnav worldCountries-panel">
                                <a href="#subpillar" className="btn btn-outline btn-default btn-prev"></a> 
                               <Link to={"/worldmap"} activeClassName="active" className="btn btn-worldCountries" onClick={this.handleClick}>{this.state.getStarted} </Link>
                            </span>*/}
                        </section>

                    </article>
            )

        }


        return (
            <div className="" lang={this.state.arabic ? 'ar' : 'en'} dir={this.state.arabic ? 'rtl' : 'ltr'}>
               {pillarPage}
            </div>
        );
    }
}

export default HomePage;

// <Link to={"/worldmap?"+this.state.selectedKpiID+"?"+this.state.selectedCountry+"?"+this.state.selectedCountryName} activeClassName="active" className="btn btn-worldCountries" onClick={this.handleClick}>GET STARTED </Link>
//<a href="#worldcountries"></a>