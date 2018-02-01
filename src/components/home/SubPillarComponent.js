import React from 'react';
import KpiListComponent  from './KpiListComponent';

class SubPillarComponent extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            arabic:props.arabic,
            lang:props.arabic ? 'ar':'en'
        }
    }
    render() { 
            var count =0;
            var subPillars = this.props.data.map((row,index) => {
                if(row.subTopicList != undefined && row.pillarName == this.props.pillarSelected){
                     count += row.subTopicList.length;
                    var subTopicList = row.subTopicList.map((row1,index1) => {                        
                            return <div className="kpi-listData col-xs-6 col-sm-4 col-md-4 col-lg-3" key={index1} style={{minHeight:'380px'}}>
                                        <div className="subpillar-title">{row1.topicName} ({row1.kpiList.length})</div>                                       
                                        <KpiListComponent arabic={this.state.arabic} data={row1.kpiList} subPillarSelectionCallback={this.props.subPillarSelectionCallback} topicName={index1}/>
                                    </div>
                            });
                }
                return subTopicList
            });
            sessionStorage.setItem('subpillarCount',count); 
            return (<div>{subPillars}</div>) ;
         }
}

export default SubPillarComponent;