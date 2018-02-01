import React from 'react';
import KpiListComponent  from './KpiListComponentSideBar';
import jQuery from 'jquery';
class SubPillarComponentBar extends React.Component {
    render() { 
        var count = 0;
           var subPillars = this.props.data.map((row,index) => {
                if(row.subTopicList != undefined && row.pillarName == this.props.pillarSelected){
                     count += row.subTopicList.length;
                    var subTopicList = row.subTopicList.map((row1,index1) => {                       
                            return <div key={index1}>                                         
                                        <p className="Pillar-Sub-titles">{row1.topicName} ({row1.kpiList.length})</p>
                                        <KpiListComponent data={row1.kpiList} topicName={index1} pillarSelected={this.props.pillarSelected} selectedSubPillar = {this.props.selectedSubPillar} statusChange= {this.props.statusChange} reloadMap = {this.props.reloadMap} />
                                    </div>
                            });
                }
                return subTopicList
            });
            jQuery('#innerPanelSubCount').text('('+count+')');
            return (<div className="Accordion-sub-Pillar-data" >{subPillars}</div>) ;
            //return (<div>Hello</div>);
         }
}

export default SubPillarComponentBar;