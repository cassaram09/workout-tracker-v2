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
      <div className='exercise-set__fields row'>
        <div className='col-1'>
          <p>{index + 1}</p>
        </div>
        <div className='col-3'>
          <input className="form-control" type='text' value={this.props.set.weight} name='weight' onChange={this.props.updateSet}/> 
        </div>
        <div className='col-3'>
          <input className="form-control" type='text' value={this.props.set.repetitions} name='repetitions' onChange={this.props.updateSet}/> 
        </div>
        <div className='col-5'>
         <button onClick={this.removeSet} className='button'>Remove</button>
        </div>
      </div> 
    )
  }

}

ExerciseSet.propTypes = {

}

export default ExerciseSet;
