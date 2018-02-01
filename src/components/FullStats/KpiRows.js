import React from 'react';
import $ from 'jquery';
import './StatsPage.css';
import global from '../../global.js';
import '../../../public/dataTable/fixedColumns.min.js';


class KpiRows extends React.Component {
    mapdata = [];
    constructor(props) {
        super(props);
       
        //this.mapdata = props.rowData
        //this.countryList = props.countryList
        this.onClick = this.handleClick.bind(this);
        this.getStyle = this.getStyle.bind(this);
        this.state={
        		countryList:props.countryList,
        		mapdata:props.rowData,
        }
        this.ar = false;
        this.locale="en";
        this.defaultCountry=sessionStorage.getItem('MainPillarSelectedCountyName');
        
        if(sessionStorage.getItem('arabic')== "true"){
            this.ar = true;
            this.locale="ar";
        }
        
    }
    shouldComponentUpdate(nextProps, nextState) {
	    //log('shouldComponentUpdate');
	   //console.log(nextState.countryList !== this.state.countryList)
	   // return nextState.countryList !== this.state.countryList;
    	return true;
	  }
    
    componentWillReceiveProps(nextProps){
    	if(this.props.selectedYear != nextProps.selectedYear){
    		this.setState({mapdata:nextProps.rowData});
    	}
    }
    getStyle(Country){
    	/*var defaultCountry=sessionStorage.getItem('MainPillarSelectedCountyName');
    	if(Country == defaultCountry ){
    		display:'none'
    	}else{
    		cursor:'pointer'
    	}*/
    }

    
   /**
    * This function deletes the table column of country name specified.
    */
   handleClick(clickedCountryName) {
      
              
      /* var target = $('table').find('th[data-name="' + clickedCountryName +'"]');
       // Find its index among other this 
       var index = (target).index();
       // For each tr, remove all th and td that match the index.
        $('table tr').find('th:eq(' + index + '),td:eq(' + index + ')' ).remove();*/
        

        
    }


    render() {
    	/*console.log("Mapdata---");
    	console.log(this.state.mapdata);
    	console.log("CLIST data---");
    	console.log(this.state.countryList);*/
        var ar = this.ar;
        var countryCount = 0;
        var keyColumn, rowCounter = 0
        var headers = []
        var rows = this.state.mapdata.map((row, index)=> {
        	
        		keyColumn = <td key={index}>{row.kpiName} ({row.denominator})</td>
        	
            
            rowCounter++;
            var dataColumn = []
            if(!ar){
            	  if (rowCounter == 1) {
                      headers.push(<th key='0'>{global.KpiText_en} </th>)
                  }
            }
           else{
               if(rowCounter == 1){
               headers.push(<th key='0'>{global.KpiText_ar}  </th>)
               }
           }
            var countryScores = row.countryScores.map((row1, index1) => {
            	
            	var rowColor;
            	if(row1.score == null || row1.weightedScore == null){
                    rowColor="hyphenClass";
                } 
            	else if(row1.weightedScore < 0.5){
            		rowColor="range1";
            		
            	}
            	else if(row1.weightedScore < 1){
            		
            		rowColor = "range2";
            	}
				else if(row1.weightedScore < 1.5){
				            		
				    rowColor = "range3";
				}
				else if(row1.weightedScore < 2){
            		
				    rowColor = "range4";
				}
				else if(row1.weightedScore < 2.5){
            		
				    rowColor = "range5";
				}
				else if(row1.weightedScore < 3){
            		
				    rowColor = "range6";
				}
				else if(row1.weightedScore < 3.5){
            		
				    rowColor = "range7";
				}
				else if(row1.weightedScore < 4){
            		
				    rowColor = "range8";
				}
				else if(row1.weightedScore < 4.5){
            		
				    rowColor = "range9";
				}
				else{
            		
				    rowColor = "range10";
				}
            	
            	if(row1.score == null){
            		row1.score = ' - ';
            	}
                dataColumn.push(<td key={index1} className={rowColor} id={row1.countryName}>{row1.score}</td>)
                if (rowCounter == 1) {
                	//console.log(sessionStorage.getItem('MainPillarSelectedCountyName'));
                    headers.push(
                    
                    <th key={100000 + index1} id={100000 + index1} data-name={row1.countryName}>
                    {row1.countryName}  <a className="stats-col-close" data-column={1 + index1}><img src="icons/close-small-normal.png" onClick={this.onClick.bind(this,(row1.countryName))} style={{'cursor':'pointer'}}></img></a>
                    </th>
                    
                    
                    )
                    countryCount = index1;
                }
            },this);

           
            	return <tr key={index}>{keyColumn}{dataColumn}</tr>
            
            
        });
        /*<table id="full-stats-table" className="table table-striped">
                        <thead>
                            <tr>
                                {headers}
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table> */

        return (
                  <table id="full-stats-table" className="stripe row-border order-column" cellSpacing="0" width="100%">
                        <thead>
                            <tr>
                                {headers}
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>

        );

    }
}

export default KpiRows;
