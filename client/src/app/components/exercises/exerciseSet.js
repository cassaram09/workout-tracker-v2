import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ExerciseSet extends Component {

  render(){
    const index = this.props.index;
    
    return (   
      <tr>
        <td>Set {index + 1}</td>
        <td>
          <div className='form-group'>
            <input className="form-control" type='text' value={this.props.set.weight} name='weight' onChange={this.props.updateSet}/> 
          </div>
        </td>
        <td>
          <div className='form-group'>
            <input className="form-control" type='text' value={this.props.set.repetitions} name='repetitions' onChange={this.props.updateSet}/> 
          </div>
        </td>
      </tr>
    )
  }

}

ExerciseSet.propTypes = {

}

export default ExerciseSet;
