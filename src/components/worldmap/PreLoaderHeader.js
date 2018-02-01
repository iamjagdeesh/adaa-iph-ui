import React,{PropTypes} from 'react';
import '../common/Header.css';
import SkyLight from 'react-skylight';
import {Link,IndexLink} from 'react-router';
import $ from 'jquery';
class PreLoaderHeader extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            pillarBtn: 'Pillars',
                plillarSubtext:'',
            GlobalRankingBtn: 'Global Ranking',
                GlobalRankingSubtext:'World countries',
            CompareBtn: 'Compare',
               CompareBtntext: 'Multiple Countries',
            AboutBtn: 'About',
            LanguageBtn: 'عربى',
            plillarSubtext:''
           
        }

        this.ar = false;

    }

    componentDidMount(){
       var pillarSelected=sessionStorage.getItem('pillarSelected');
       var subpillarSelected=sessionStorage.getItem('subpillarSelected');
       var pillarIdSelected =sessionStorage.getItem('pillarIdSelected');
         if(sessionStorage.getItem('arabic')== "true"){
            this.ar = true;
            
        }
        else{
            this.ar = false;
        }
         if(this.ar){
             document.getElementsByTagName('html')[0].setAttribute('dir','rtl'); 
              document.getElementsByTagName('html')[0].setAttribute('lang','ar'); 
               
            this.setState({LanguageBtn:'English',pillarBtn:'المحاور',GlobalRankingBtn:'التصنيف العالمي',GlobalRankingSubtext:'دول العالم',CompareBtn:'المقارنة',CompareBtntext:'دول متعددة',AboutBtn:'عن المنصة'},function(){
              $('.disableClick').addClass('StopClickEvent');
              $('.disableClick').css('pointer-events','none');
            });

        }
        else{
      
       //sessionStorage.setItem('pillarIdSelected',pillarId);
      
             $('.disableClick').addClass('StopClickEvent');
             $('.disableClick').css('pointer-events','none');
        }

         this.setState({plillarSubtext: pillarSelected +" "+" > "+" "+ subpillarSelected},function(){
            
                    $('.disableClick').addClass('StopClickEvent');
                      $('.disableClick').css('pointer-events','none');
       
       });
    }

    render(){
        let mainheaderData;
        if(!this.ar){
            mainheaderData = (
                <div className="col-md-12 col-lg-12 col-sm-12 headerNav" >
                    <div className="row">
                            <div className="col-md-2 col-lg-2 col-sm-2 " >       
                                <div className="col-md-12 col-lg-12 col-sm-12" style={{paddingLeft:'0px'}}>
                                    <IndexLink to="/" >Home</IndexLink> 
                                </div>
                            </div>
                        
                                <div className="col-md-3 col-lg-3 col-sm-3">
                                    <div  className="menu-items">
                                        <div className="media disableClick pillar-menu-item">
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
                                <div className="col-md-2 col-lg-2 col-sm-2">
                                    <div  className="menu-items">
                                        <div className="media disableClick ranking-menu-item">
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
                                        <div className="media disableClick compare-menu-item">
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
                                    <span className="language_sa disableClick" onClick={this.onClick}>{this.state.LanguageBtn}</span>

                                        <div className='about-en'>
                                            <SkyLight hideOnOverlayClicked ref="simpleDialog" title={this.state.AboutBtn} titleStyle={{ textAlign: 'center',color:'white',fontSize:'250%',paddingTop:'4%',paddingBottom:'4%',paddingRight:'33%'}} closeButtonStyle={{ top:'8%',right:'20%',fontSize:'50px',color:'white'}}>
                                                <div className = "modalTextContent"></div>
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
                          <span className="nav-link disableClick abt-btn" onClick={() => this.refs.simpleDialog.show()}>{this.state.AboutBtn}</span>
                          <span className="language_sa disableClick" onClick={this.onClick}>{this.state.LanguageBtn}</span>
                          
                          <div className="about-ar" style={{textAlign:'right'}}>
                                <SkyLight hideOnOverlayClicked ref="simpleDialog" title={this.state.AboutBtn} titleStyle={{ color:'white',fontSize:'250%',paddingTop:'4%',paddingBottom:'4%',paddingRight:'30%'}} closeButtonStyle={{ top:'8%',right:'80%',fontSize:'50px',color:'white'}} >
                                    <div className = "modalTextContent"></div>
                                </SkyLight>
                                </div>
                        </div>    
                     
                        <div className="col-md-2 col-lg-2 col-sm-2">
                            <div  className="menu-items">   
                                <div className="media disableClick compare-menu-item">
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
                          <div className="col-md-2 col-lg-2 col-sm-2">
                            <div  className="menu-items">
                                <div className="media disableClick ranking-menu-item">
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
                                <div className="media disableClick pillar-menu-item">
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
                            
            {mainheaderData}
            
    </div>
    );
    }
}
export default PreLoaderHeader;

