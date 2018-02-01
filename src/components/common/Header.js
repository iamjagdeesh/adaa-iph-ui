import React,{PropTypes} from 'react';
import {Link,IndexLink} from 'react-router';
import jQuery from 'jquery';
import './Header.css';
import ReactDOM from 'react-dom';
import SkyLight from 'react-skylight';
import global from '../../global.js';

class Header extends React.Component{ 
     constructor (props) {
        super(props);
        this.state = {
            LanguageBtnAr: 'عربى',
            arabic:false
        }

        this.onClick = this.onClick.bind(this);
        this.ar = false;
         if(sessionStorage.getItem('arabic')== "true"){
            this.ar = true;
            this.locale="ar";
        }
    }
    componentDidMount(){
        if(this.ar){
             this.setState({LanguageBtnAr:global.LanguageBtn_en,AboutBtn:global.AboutBtn_ar,AboutDescription:global.AboutDescription_ar},function(){
               sessionStorage.setItem('lang','ar');
                 sessionStorage.setItem('arabic',true);
              // var htDom =ReactDOM.findDOMNode('html');
              document.getElementsByTagName('html')[0].setAttribute('dir','rtl'); 
              document.getElementsByTagName('html')[0].setAttribute('lang','ar'); 
           });
           this.setState({arabic:true},function(){
               this.props.toggle("ar");
           })
        }
         else{
            
           this.setState({LanguageBtnAr:global.LanguageBtn_ar,AboutBtn:global.AboutBtn_en,AboutDescription:global.AboutDescription_en},function(){
                sessionStorage.setItem('lang','en');
                sessionStorage.setItem('arabic',false);
                 document.getElementsByTagName('html')[0].setAttribute('dir','ltr'); 
                   document.getElementsByTagName('html')[0].setAttribute('lang','en'); 
           });
           this.ar = false;
           this.setState({arabic:false},function(){
               this.props.toggle("en");
           })

       }
    }
   onClick(){
       if(this.state.LanguageBtnAr === 'عربى'){          
           this.setState({LanguageBtnAr:global.LanguageBtn_en,AboutBtn:global.AboutBtn_ar,AboutDescription:global.AboutDescription_ar},function(){
             sessionStorage.setItem('lang','ar');
                 sessionStorage.setItem('arabic',true);
              // var htDom =ReactDOM.findDOMNode('html');
              document.getElementsByTagName('html')[0].setAttribute('dir','rtl'); 
           });
           this.setState({arabic:true},function(){
               this.props.toggle("ar");
           })
           
           this.ar = true;
       }
       else{
            
         this.setState({LanguageBtnAr:global.LanguageBtn_ar,AboutBtn:global.AboutBtn_en,AboutDescription:global.AboutDescription_en},function(){
            sessionStorage.setItem('lang','en');
            sessionStorage.setItem('arabic',false);
            document.getElementsByTagName('html')[0].setAttribute('dir','ltr'); 
           });
           this.ar = false;
           this.setState({arabic:false},function(){
               this.props.toggle("en");
           })

       }
   }
    render() {
        let headerText;
        if(this.state.arabic){
            headerText=(
                <nav>            
                <IndexLink to="/" className="header-logo" activeClassName="active"><img src="icons/logo.png" style={{margin:'25px'}} title="International Performance Hub"></img></IndexLink> 
                <span className="en-link" onClick={this.onClick}>{this.state.LanguageBtnAr}</span>
                <span className="en-link abt-btn"onClick={() => this.refs.simpleDialog.show()}>{this.state.AboutBtn}</span>
                     <div className='about-ar'>
                       <SkyLight hideOnOverlayClicked ref="simpleDialog" title={this.state.AboutBtn} titleStyle={{ color:'white',fontSize:'250%',paddingTop:'4%',paddingBottom:'4%',paddingRight:'30%'}} closeButtonStyle={{ top:'8%',right:'80%',fontSize:'50px',color:'white'}} >
                            <div className = "modalTextContent">{this.state.AboutDescription}</div>
                        </SkyLight>
                    </div>
                </nav>
                )
        }
        else{
            headerText = ( 
                <nav> 
                <IndexLink to="/" activeClassName="active" style={{margin:'25px'}}>Home</IndexLink> 
                {/*<span className="ar-link" onClick={this.onClick}>{this.state.LanguageBtnAr}</span>*/}
                <span className="ar-link abt-btn"onClick={() => this.refs.simpleDialog.show()}>{this.state.AboutBtn}</span>
                     <div className='about-en'>
                        <SkyLight hideOnOverlayClicked ref="simpleDialog" title={this.state.AboutBtn} titleStyle={{ textAlign: 'center',color:'white',fontSize:'250%',paddingTop:'4%',paddingBottom:'4%',paddingRight:'33%'}} closeButtonStyle={{ top:'8%',right:'20%',fontSize:'50px',color:'white'}}>
                            <div className = "modalTextContent">{this.state.AboutDescription}</div>
                        </SkyLight>
                    </div>
               </nav>
            )
        }
        return ( 
            <div>    
             {headerText}
             </div>
             );
         }
}


export default Header;
//   <Link to="/startar" className="ar-link">{this.state.LanguageBtnAr}</Link>
//<Link to="/startar" className="ar-link">{this.state.LanguageBtnAr}</Link>




/*import React,{PropTypes} from 'react';
import {Link,IndexLink} from 'react-router';
import jQuery from 'jquery';
import './Header.css';

class Header extends React.Component{ 
     constructor (props) {
        super(props);
        this.state = {
            LanguageBtnAr: 'عربى'
        }
    }
    render() {
        return (        
            <nav>            
                <IndexLink to="/" activeClassName="active"><img src="icons/logo.png" style={{margin:'25px'}} title="International Performance Hub"></img></IndexLink> 
                <Link to="/startar" className="ar-link">{this.state.LanguageBtnAr}</Link>
            </nav>
             );
         }
}


export default Header;
*/