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
        <td className='exercise-set__fields__set'>
          {index + 1}
        </td>
        <td className='exercise-set__fields__weight'>
          <input className="form-control" type='text' value={this.props.set.weight || ''} name='weight' onChange={this.props.updateSet} placeholder='Weight'/> 
        </td>
        <td className='exercise-set__fields__reps'>
          <input className="form-control" type='text' value={this.props.set.repetitions || ''} name='repetitions' onChange={this.props.updateSet} placeholder='Reps'/> 
        </td>
        <td className='exercise-set__fields__remove'>
          <button onClick={this.removeSet} className='exercise-set__button button'>X</button>
        </td>
      </tr>
    )
  }

}

ExerciseSet.propTypes = {

}

export default ExerciseSet;
