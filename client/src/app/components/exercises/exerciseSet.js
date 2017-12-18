import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ExerciseSet extends Component {
  constructor(props){
    super(props)

    this.removeSet = () => {
      this.props.removeSet(this.props.index)
    }
  }
  
  render(){
    const index = this.props.index;
    
    return (  
      <tr className='exercise-set__fields'>
        <td>
          {index + 1}
        </td>
        <td>
          <input className="form-control" type='text' value={this.props.set.weight || ''} name='weight' onChange={this.props.updateSet} placeholder='Weight'/> 
        </td>
        <td>
          <input className="form-control" type='text' value={this.props.set.repetitions || ''} name='repetitions' onChange={this.props.updateSet} placeholder='Reps'/> 
        </td>
        <td>
          <button onClick={this.removeSet} className='button'>X</button>
        </td>
      </tr>
    )
  }

}

ExerciseSet.propTypes = {

}

export default ExerciseSet;
