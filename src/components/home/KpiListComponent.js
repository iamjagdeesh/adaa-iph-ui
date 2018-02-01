import React from 'react';
import jQuery from 'jquery';
import $ from 'jquery';

class KpiListComponent extends React.Component {
     constructor (props) {
        super(props);
        this.state={
        		nextButton2:'javascript:void(0)',	
        }
        this.onClick = this.handleClick.bind(this);
    }
     handleClick(clicked) {
         var selArray = clicked.split(';');
         var kpiName = selArray[1];
         var selIndex=selArray[0];
         var kpiNameOtherLang=selArray[2];
         var kpiId = jQuery('.sp-'+this.props.topicName+'-'+selIndex).attr('data-kpi');
         jQuery('.subpillar-row .active').removeClass('active');
         jQuery('.sp-'+this.props.topicName+'-'+selIndex).addClass('active');  
         this.setState({nextButton2:"#worldcountries"});
         
        this.props.subPillarSelectionCallback(kpiId + ";"+kpiName+";"+kpiNameOtherLang);
    }
    render() { 
               var subPillars = this.props.data.map((row,index) => {
                    if(this.props.data != undefined){
                        return (
                        		<a href={this.state.nextButton2} style={{'textDecoration':'none'}} key={index}>
                        		<div className={`subpillar-text subpillar-text-en sp-${this.props.topicName+'-'+index}`} key={index} data-kpi={row.id} onClick={this.onClick.bind(this, index+";"+row.name+";"+row.nameOtherLang)}>{row.name}</div>
                        		</a>
                        		);
                       }
                    });
           
		     return (<div>{subPillars}</div>) ;
         }
}

export default KpiListComponent;