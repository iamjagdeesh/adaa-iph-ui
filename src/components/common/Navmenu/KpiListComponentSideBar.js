import React from 'react';
import jQuery from 'jquery';
import './NavMenuCss.css';
import ReactDOM from 'react-dom';

class KpiListComponent extends React.Component {
     constructor (props) {
        super(props);
        this.onClick = this.handleClick.bind(this);
         this.loadSelected = this.loadSelected.bind(this);
    }

    loadSelected(){
        //selectedSubPillar
        jQuery('.accordion-subpillar-row .active').removeClass('active');
        /*jQuery(ReactDOM.findDOMNode(this)).find('#'+"id-"+this.props.selectedSubPillar).addClass('active');*/
        //compare with selectedKPIID sessionStorage.setItem('selectedKpiID',kpiId);
        if(this.props.selectedSubPillar == sessionStorage.getItem('selectedKpiID') )
        {
            jQuery('#id-'+this.props.selectedSubPillar).addClass('active');
        }
        
    }
     handleClick(clicked,denominator,nameOtherLang) {
         var selArray = clicked.split(';');
         var kpiName = selArray[1];
         var selIndex=selArray[0];
         var kpiId = jQuery('.sp-'+this.props.topicName+'-'+selIndex).attr('data-kpi');
         jQuery('.accordion-subpillar-row .active').removeClass('active');
         jQuery('.sp-'+this.props.topicName+'-'+selIndex).addClass('active');  
         sessionStorage.setItem('pillarIdSelected',sessionStorage.getItem('tempPillarSelected'));
         this.props.statusChange(kpiName+";"+kpiId+";"+this.props.pillarSelected);
         sessionStorage.setItem('denominator',denominator);
         sessionStorage.setItem('kpiNameOtherLang',nameOtherLang);

         //this.props.reloadMap(kpiId);
        //this.props.subPillarSelectionCallback(kpiId + ","+kpiName);
        // return <div className={`subpillar-text sp-${this.props.topicName+'-'+index}`} key={index} data-kpi={row.id} onClick={this.onClick.bind(this, index)}>{row.name}</div>
        //<div  key={index} data-kpi={row.id} onClick={this.onClick.bind(this, index)}>{row.name}</div>
    }
    componentDidMount(){
         this.loadSelected();
    }
    render() { 
               var subPillars = this.props.data.map((row,index) => {
                    if(this.props.data != undefined){
                        return <div className={`subpillar-text inner-subpanel-text accordion-subpillar-text sp-${this.props.topicName+'-'+index}`} id={"id-"+row.id} key={index} data-kpi={row.id} onClick={this.onClick.bind(this, index+";"+row.name,row.denominator,row.nameOtherLang)}>{row.name}({row.denominator})</div>
                       }
                    });
        
		     return (<div className="accordion-subpillar-row">{subPillars}</div>) ;
         }
}

export default KpiListComponent;