import React, { PropTypes } from 'react';
//require('./css/main.css');
import '../Navmenu/NavMenuCss.css';

class CircularProgressbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      percentage: props.initialAnimation ? 0 : props.percentage,
      Datavalue: props.DataValue,
    };
    this.dValue ='';
    this.perc = '';
  }

  componentDidMount() {
    if (this.props.initialAnimation) {
      this.initialTimeout = setTimeout(() => {
        this.requestAnimationFrame = window.requestAnimationFrame(() => {
          this.setState({
            percentage: this.props.percentage,
            DataValue:this.props.DataValue
          });
        });
      }, 0);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      DataValue: nextProps.DataValue,
      percentage: nextProps.percentage
    });
  }

   shouldComponentUpdate(nextProps){
       return true; 
      
   }

  componentWillUnmount() {
    clearTimeout(this.initialTimeout);
    window.cancelAnimationFrame(this.requestAnimationFrame);
  }

  render() {

    //Color circle border

    var rowColor;
            	if(this.state.percentage == null){
                    rowColor="hyphenClass";
                } 
            	else if(this.state.percentage < 0.5){
            		rowColor="range1";
            		
            	}
            	else if(this.state.percentage < 1){
            		
            		rowColor = "range2";
            	}
				else if(this.state.percentage < 1.5){
				            		
				    rowColor = "range3";
				}
				else if(this.state.percentage < 2){
            		
				    rowColor = "range4";
				}
				else if(this.state.percentage < 2.5){
            		
				    rowColor = "range5";
				}
				else if(this.state.percentage < 3){
            		
				    rowColor = "range6";
				}
				else if(this.state.percentage < 3.5){
            		
				    rowColor = "range7";
				}
				else if(this.state.percentage < 4){
            		
				    rowColor = "range8";
				}
				else if(this.state.percentage < 4.5){
            		
				    rowColor = "range9";
				}
				else{
            		
				    rowColor = "range10";
				}
            	

    //end coloring
   // alert(this.dValue + "from circle");
    const radius = (50 - this.props.strokeWidth / 2);
    const pathDescription = `
      M 50,50 m 0,-${radius}
      a ${radius},${radius} 0 1 1 0,${2 * radius}
      a ${radius},${radius} 0 1 1 0,-${2 * radius}
    `;

    const diameter = Math.PI * 2 * radius;
    const progressStyle = {
      strokeDasharray: `${diameter}px ${diameter}px`,
      strokeDashoffset: `${((100 - this.state.percentage*20)/ 100 * diameter)}px`,
    };

    return (
      
      <svg
        className={`CircularProgressbar ${this.props.classForPercentage ? this.props.classForPercentage(this.props.percentage) : ''}`}
        viewBox="0 0 100 100"
      >
        <path
          className="CircularProgressbar-trail"
          d={pathDescription}
          strokeWidth={this.props.strokeWidth}
          fillOpacity={0}
        />

        <path
          className={`CircularProgressbar-path${rowColor}`}
          d={pathDescription}
          strokeWidth={this.props.strokeWidth}
          fillOpacity={0}
          style={progressStyle}
        />

        <text
          className="CircularProgressbar-text"
          x={50}
          y={50}
        >
          
          {this.props.textForPercentage(this.props.DataValue)}
        </text>
      </svg>
    );
  }
}

CircularProgressbar.propTypes = {
  percentage: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number,
  initialAnimation: PropTypes.bool,
  classForPercentage: PropTypes.func,
  textForPercentage: PropTypes.func,
};

CircularProgressbar.defaultProps = {
  strokeWidth: 3,
  textForPercentage: (percentage) => `${percentage}`,
  initialAnimation: false,
};

export default CircularProgressbar;