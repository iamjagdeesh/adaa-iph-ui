import React from 'react';
import jQuery from 'jquery';
import myConfig from '../../conf.js';
import $ from 'jquery';

var conf= myConfig;
class PillarComponent extends React.Component {
    
     constructor (props) {
        super(props);
        
        this.state = {         
           arabic:props.arabic,
           nextButton1:'javascript:void(0)',
        }
         this.dataURL = conf.apiUrl+"pillarList?locale=en",
         this.onClick = this.handleClick.bind(this);
         this.ar = false;
    }
    
     componentDidMount(){
        if(sessionStorage.getItem('arabic')== "true"){
            this.ar = true;
        }
        else{
            this.ar = false;
        }
        
        this.setState({arabic:this.ar},function(){
                if(this.state.arabic === true){
                    
                    this.dataURL = conf.apiUrl+"pillarList?locale=ar";

                 } 
                 else{
                      this.dataURL = conf.apiUrl+"pillarList?locale=en";
                 }

                      jQuery.ajax({
          
                        url: this.dataURL,
                        dataType: 'json',
                        type: "GET",
                        success: function(data) {
                            this.props.responseData(data);
                            sessionStorage.setItem("pillarDetails",JSON.stringify(data));
                            jQuery('.pillar-count-num').html('('+this.props.data.length+')');
                        }.bind(this),
                            error: function(xhr, status, err) {
                            console.error(this.props.url, status, err.toString());
                        }.bind(this)
                    }); 
            });
     }
     
     handleClick(clicked) {
         jQuery('.pillar-row .active').removeClass('active');
         jQuery('.img-'+clicked).addClass('active');
         //this.props.pillarSelectionCallback(jQuery('.img-'+clicked).html());
         var pillarInfo_Sel = clicked;         
         var returnVal =jQuery('.img-'+clicked +'>span').text() + ","+pillarInfo_Sel;
         this.props.pillarSelectionCallback(returnVal);
         this.setState({nextButton1:"#subpillar"});

    }
    
    render() {             
               var pillars = this.props.data.map((row,index) => {                    
                    return <div className="col-xs-6 col-sm-4 col-md-4 col-lg-3 pillars-01-content pillars-cells" key={index}>
                    <a href={this.state.nextButton1} style={{'textDecoration':'none'}}><div className={`pillar-text pillar-text-en img-${row.pillarId}`} onClick={this.onClick.bind(this, row.pillarId+","+row.pillarNameOtherLang)}><span>{row.pillarName}</span></div></a>
                            </div>
                    });
           
		     return (<div dir = {this.state.arabic ? 'rtl' :'ltr'}>{pillars}</div>) ;
         }
}

export default PillarComponent;