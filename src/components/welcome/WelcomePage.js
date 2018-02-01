import React from 'react';
import {Link} from 'react-router';
import './WelcomePage.css';
import Header from '../common/Header';
import global from '../../global.js';

class WelcomePage extends React.Component {

    constructor(props){
        super(props);
        this.state={
            arabic:false
        }

        this.locale = "";
        this.toggleLocale = this.toggleLocale.bind(this);
      

    }

    toggleLocale(locale){
        if(locale == "ar"){
             this.setState({arabic:true});
        }
        else{
             this.setState({arabic:false});
        }
       
    }
    componentDidMount(){
        
        sessionStorage.clear();
        document.body.classList.add("welcome-component");
        sessionStorage.setItem("selectedYear","2015");
      
    }
     componentWillUnmount(){
        document.body.classList.remove("welcome-component");
    }
   
    render() {
        let welcomeText;
        if(!this.state.arabic){
             document.getElementsByTagName('html')[0].setAttribute('dir','ltr'); 
              document.getElementsByTagName('html')[0].setAttribute('lang','en'); 

            welcomeText = (

               <div className="home-srch-panel panel panel-default" lang="en">
                    <h1>{global.iph_text_line1_en}</h1>  
                    <h1>{global.iph_text_line2_en}</h1>                    
                    <p>{global.welcomeText_en} <br/>{global.startText_en}</p>
                    <Link to="/welcome" activeClassName="active" className="btn btn-outline btn-default btn-start">{global.startbtn_en_wel}</Link>
                </div>
            )
        }
        else{

            document.getElementsByTagName('html')[0].setAttribute('dir','rtl'); 
              document.getElementsByTagName('html')[0].setAttribute('lang','ar');
              
             welcomeText = (

               <div className="home-srch-panel home-srch-panel-ar panel panel-default" lang="ar" dir = "rtl">
                    <h1 style={{textAlign:'right'}}>{global.iph_text_line1_ar}</h1>  
                    <h1 style={{textAlign:'right'}}>{global.iph_text_line2_ar}</h1>                    
                    <p style={{textAlign:'right'}}>{global.welcomeText_ar} <br/> {global.startText_ar}</p>
                
                    
                    <Link to="/welcome" activeClassName="active" className="btn btn-outline btn-default btn-start" style={{float:'right'}}>{global.startbtn_ar_wel}</Link>
                </div>
            )
        }
        return (  
            
            <div style={{paddingLeft:'30px',paddingRight:'30px'}}> 
              <Header loading={this.props.loading} toggle ={this.toggleLocale.bind(this)}/>          
               {welcomeText}
            </div>
        );
    }
}

export default WelcomePage;