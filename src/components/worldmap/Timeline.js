import React from 'react';
import jQuery from 'jquery';
/**
 * Timeline Component
 */
class Timeline extends React.Component {
     constructor (props) {
        super(props);
        this.onClick = this.handleClick.bind(this);
        this.timeChanged=false;
    }
    /**
     * React LifeCycle event
     */
    componentDidMount(){
        jQuery('.year-'+this.props.year).addClass("active");
    }
     /**
     * React LifeCycle event
     */
    componentDidUpdate(){
        if(!this.timeChanged){
            jQuery('.year-'+this.props.year).addClass("active");
        }
    }
    /**
     * Timeline change event
     * @param {string} event 
     */
     handleClick(event) {
         this.timeChanged = true;
       jQuery('.timeline .active').removeClass("active");
       jQuery(event.target).addClass("active");
      
       this.props.timeLine(jQuery(event.target).html());

    }

     /**
     * React LifeCycle event
     */
    render() {
       
        var yearsList = this.props.timeLineYears.map((row,index) => {
             return  <li key={index}><a href="javascript:void(0)" onClick={this.onClick.bind(this)}  className={`year-${row}`}>{row}</a><hr/></li>
             
        });

        return (  
               <footer className="footer timeline">
                            <ul>
                              {yearsList}                          
                            </ul>                          
                </footer>
        );
    }
}

export default Timeline;
