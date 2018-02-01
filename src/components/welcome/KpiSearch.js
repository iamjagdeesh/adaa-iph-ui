import React from 'react';
import jQuery from 'jquery';
import './search.css'
import $ from 'jquery';
import myConfig from '../../conf.js';


var conf= myConfig;
class SearchAll extends React.Component {
     constructor (props) {
        super(props);
        this.state ={
                    arabic:props.arabic,
                    data:[],
                    typed:'',
                    selectedPillar:'',
                    selectedSubPillar:'',
                    selectedKpiID:''
        }
        this.dataURL = conf.apiUrl+"pillarList?locale=en",
       
        this.ar = false;
        this.onChange = this.handleChange.bind(this);
        this.onClick = this.handleClick.bind(this);
        this.toggleIcon = this.toggleIcon.bind(this);
        this.onSearch = this.onSearch.bind(this);
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
                           
                           
                             //this.props.responseData(data);
                            this.setState({data:data});
                             sessionStorage.setItem("pillarDetails",JSON.stringify(data));
                             
                         }.bind(this),
                             error: function(xhr, status, err) {
                             console.error(this.props.url, status, err.toString());
                         }.bind(this)
                     }); 
                       
             });
       
    }
onSearch(event){
       
           //reset state of a div
           //$('#some_div').data('old-state', $('#some_div').html());
           //$('#some_div').html($('#some_div').data('old-state'));
       
       //toggle search button clicks
       if($('#accordion').css('display') == 'block'){
             $('#accordion').css('display','none');
       }else{
             $('#accordion').css('display','block');
             var panelContainerId;
             $('#accordion > .panel').each(function () {
                    panelContainerId = '#' + $(this).attr('id');
             //     $(panelContainerId).find('.panel-collapse').removeClass('in').addClass('out');
                    
             });
       }
       
    }
    handleClick(pillarName,pillarId,kpiId,kpiName){
       
       //this.setState({selectedPillar:pillarName});
       //this.setState({selectedSubpillar:subpillarName});
       sessionStorage.setItem('pillarSelected',pillarName);
        sessionStorage.setItem('pillarIdSelected',pillarId);
        //sessionStorage.setItem('subpillarSelected',subTopicName); 
        sessionStorage.setItem('selectedKpiID',kpiId); 
        sessionStorage.setItem('subpillarSelected',kpiName);
        //sessionStorage.setItem('pillarSelected_otherLang',pillarName_otherLang);
       
    }
   
    handleChange(event) {
        
        this.setState({typed: event.target.value})
        var searchTerm, panelContainerId;
         $('#accordion_search_bar').on('change keyup paste click', function () {
               
               //initially hide the panel-group
               $('#accordion').css('display','block');
               
                 searchTerm = $(this).val().toUpperCase();
               
                 if(searchTerm.length > 2){
                    $('#accordion > .panel').each(function () {
                          panelContainerId = '#' + $(this).attr('id');
                          //console.log(panelContainerId);
                          //case insensitive search
                          jQuery.expr[':'].contains = function(a, i, m) {
                             return jQuery(a).text().toUpperCase()
                                 .indexOf(m[3].toUpperCase()) >= 0;
                           };
                           
                          //hide/show panels based on search       
                          $(panelContainerId + ':not(:contains(' + searchTerm + '))').hide();
                          $(panelContainerId + ':contains(' + searchTerm + ')').show();
                         
                         // $(panelContainerId + ':contains(' + searchTerm + ')').removeClass('out').addClass('in');
                          //console.log( $(panelContainerId));
                          
                          //open panel body if content is found
                           $(panelContainerId + ':contains(' + searchTerm + ')').find('.panel-collapse').removeClass('out').addClass('in');
                           //console.log($(panelContainerId).children());
                           //$(panelContainerId).children().find('short-full glyphicon glyphicon-plus').removeClass('short-full glyphicon glyphicon-plus').addClass('short-full glyphicon glyphicon-minus');
                           
                           //code to toggle + button glyphs 
                           /*$(panelContainerId).find('.panel-title').each(function() {
                               $(this).find('a').children().removeClass('short-full glyphicon glyphicon-plus').addClass('short-full glyphicon glyphicon-minus');

                            })*/
                          
                        });
                    
                 }else{
                    
                    
                    $('#accordion > .panel').each(function () {
                           panelContainerId = '#' + $(this).attr('id');
                           $(panelContainerId).show();
                           $(panelContainerId).find('.panel-collapse').removeClass('in').addClass('out');
                           
                           /*$(panelContainerId).find('.panel-title').each(function() {
                        $(this).find('a').children().removeClass('short-full glyphicon glyphicon-minus').addClass('short-full glyphicon glyphicon-plus');

                     })*/
                           
                    });
                 }
                    
                 
               });
        /* $('#page_container').on('focusout', function () {
               
               $('#accordion').on('focusout', function (){
                      $('#accordion').css('display','none');
               });
               
                    
              });*/
        
      
    }
   toggleIcon(e){
          
          //console.log(e.target);
          if( $(e.target).attr('class') == 'short-full glyphicon glyphicon-plus'){
                $(e.target).removeClass('short-full glyphicon glyphicon-plus').addClass('short-full glyphicon glyphicon-minus');  
          }else if( $(e.target).attr('class') == 'short-full glyphicon glyphicon-minus'){
                $(e.target).removeClass('short-full glyphicon glyphicon-minus').addClass('short-full glyphicon glyphicon-plus');
          }
          //$(e.target).toggleClass('short-full glyphicon glyphicon-plus short-full glyphicon glyphicon-minus ')
          //$(e.target).removeClass('short-full glyphicon glyphicon-plus').addClass('short-full glyphicon glyphicon-minus');
       //$(e.target).prev('.panel-heading').find('.short-full').toggleClass('glyphicon-plus glyphicon-minus');
    }
    render() {
        
       
       if(this.state.data != undefined){
             
             var pillars= this.state.data.map((row,index)=>{
                    
                    var subTopicList = row.subTopicList.map((row1,index1)=>{
                           
                           var kpiList = row1.kpiList.map((row2,index2)=>{
                                 return (
                                               <a href="/welcome#worldcountries" key={index2} onClick={this.onClick.bind(this,row.pillarName,row.pillarName,row2.id,row2.name)}><ol>{row2.name}</ol></a>
                                               )
                           })
                           return(
                                        
                                         <div className="panel-body" key={index1}>
                                           <li>{row1.topicName}</li>
                                           <div>{kpiList}</div>
                                         </div>
                                        
                                        );
                    });
                    
                    return (
                                 
                                  <div className="panel panel-primary" id={`collapse-${row.pillarName}_Container`} key={index}>
                                    <div className="panel-heading" role="tab" id={`heading-${row.pillarName}`}>
                                       <h4 className="panel-title">
                                         {row.pillarName}
                                         <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href={`#collapse-${row.pillarName}`}  aria-expanded="false" aria-controls={`collapse-${row.pillarName}`}  onClick={this.toggleIcon.bind(this)} style={{'float':'right','textDecoration':'none'}}>
                                          <span className="short-full glyphicon glyphicon-plus"></span>
                                         </a>
                                       </h4>
                                    </div>
                                  
                               <div id={`collapse-${row.pillarName}`}  className="panel-collapse collapse out" role="tabpanel" aria-labelledby={`heading-${row.pillarName}`}>{subTopicList}</div>
                             </div>
                          
                            )
             });
             
             
             
          }else{
               var pillars = "No pillars/subpillars";
          }
       
    
        
        return (
                    <div className="container" 
                         id="page_container">
                     
                      <div id="accordion_search_bar_container">
                          <input type="search" id="accordion_search_bar" placeholder="Search pillars,subpillars or kpi" onChange={this.onChange.bind(this)}/> 
                          <img src="icons/black-search-icon.png" title="search" className = "searchAccordionIcon" onClick={this.onSearch.bind(this)}></img>
                      </div>
                      <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true" >
                           
                              {pillars}
                           
                      </div>
                    </div>
                                     
            
        );
    }
}

export default SearchAll;
/*<img src="icons/black-search-icon.png" title="search" className = "searchAccordionIcon" onClick={this.onClick.bind(this)}></img>*/
