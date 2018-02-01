import React from 'react';

class KpiRow extends React.Component {
  constructor (props) {
    
        super(props);
  }
   componentDidMount(){
    
    }
  render () {
    return (
      <tr key={this.props.key}>
          <td>{this.props.index}</td>
          
      
      
      </tr>
    );
  };
}
 
 export default KpiRow;
