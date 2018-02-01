import React from 'react';
import './StatsPage.css';
import $ from 'jquery';
import jQuery from 'jquery';
import {Icon} from 'react-fa';


class ExportToXL extends React.Component {

    constructor(props) {
        super(props);
        this.ar = false;
		this.locale = "en";
		this.exportBtnText ="Export";
		 if(sessionStorage.getItem('arabic')== "true"){
	            this.ar = true;
	            this.locale="ar";
	            this.exportBtnText = "تصدير"
	            
	        }
        // This binding is necessary to make `this` work in the callback
        this.exportData = this.exportData.bind(this);
    }
    /**
     * This method is used to export data in full stats table into excel
     */
    exportData(e) {
       
        e.preventDefault();
        //var table_html;
        if(this.ar){
           
        	//getting data from our table
            var data_type = 'data:application/vnd.ms-excel';
           // var table_div = document.getElementById('full-stats-table');
            
            (function($) {
			  $.fn.reverseChildren = function(childSelector) {
			    this.each(function(el, index) {
			      var children = $.makeArray($(childSelector, this).detach());
			      children.reverse();
			      $(this).append(children);
			    });
			    return this;
			  };
			}(jQuery));
			
			
			  var tableCopy = $('#full-stats-table_wrapper').clone(true);
			    
			
			  tableCopy.find('tr').reverseChildren('th, td'); // Reverse table columns
			  //tableCopy.find('tbody').reverseChildren('tr');  // Reverse table rows
			  var reversetableCopy = $(tableCopy)[0].children[1].children[1];
			  var table_html = reversetableCopy.outerHTML.replace(/ /g, '%20').replace(/<\s*img[^>]*>/gi,'').replace("‘","'");
			
            
        	
        }
        else{
        	//getting data from our table
            var data_type = 'data:application/vnd.ms-excel';
            //var table_div = document.getElementById('full-stats-table');
            var table_div = document.getElementById('full-stats-table_wrapper').children[1].children[1];
            var table_html = table_div.outerHTML.replace(/ /g, '%20').replace(/<\s*img[^>]*>/gi,'').replace("‘","'");
        	
        }
       
        var pillarSelected=sessionStorage.getItem('pillarSelected');
        var selectedYear = sessionStorage.getItem('selectedYear');
        var file_name = "";
        if(pillarSelected == undefined || selectedYear == undefined) {
            file_name = "exported_table.xls"
        } else {
            file_name = pillarSelected + '_' + selectedYear + ".xls"
        }

        var a = document.createElement('a');
        a.href = data_type + ', ' + table_html;
        a.download = file_name;
        a.click();
    }

    render() {
        return (
            <button id="btnExport" onClick={this.exportData} title={this.exportBtnText}><i className="fa fa-download"></i></button>

        );
    }
}

export default ExportToXL