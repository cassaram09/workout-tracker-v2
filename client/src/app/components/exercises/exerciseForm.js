import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DropdownButton, MenuItem, Grid, Row, Col, Table} from 'react-bootstrap'

import ExerciseSet from '/src/app/components/exercises/exerciseSet'

import {deepClone} from '/src/app/utils/tools'

class ExerciseForm extends Component {
  constructor(props) {
    super(props);

    this.updateName = (event) => {
      var exercise = deepClone(this.props.exercise);
      exercise.name = event.target.value;
      this.props.updateExercise(exercise, this.props.index)
    }

    this.selectName = (value) => {
      var exercise = deepClone(this.props.exercise);
      exercise.name = value;
      this.props.updateExercise(exercise, this.props.index)
    }

    this.shouldItemRender = (item, value) => {
      if ( !item || !value ){
        return
      }
      var convertedItem = item.label.toLowerCase()
      var convertedValue = value.toLowerCase()
      return convertedItem.match(convertedValue) ? true : false ;
    }

    this.addSet = () => {
      var exercise = deepClone(this.props.exercise)
      var sets = exercise.exercise_sets
      sets.push({repetitions: 0, set_id: sets.length, weight: 0 });
      this.props.updateExercise(exercise, this.props.index)
    }

    this.removeSet = (index) => {
      var exercise = deepClone(this.props.exercise)
      exercise.exercise_sets = exercise.exercise_sets.filter(function(set, ix){
        return ix != index
      })
      this.props.updateExercise(exercise, this.props.index)
    }

    this.updateSet = (index, event) =>{
      var name = event.target.name
      var value = event.target.value
      var exercise = deepClone(this.props.exercise)
      exercise.exercise_sets[index][name] = value
      this.props.updateExercise(exercise, this.props.index)
    }

    this.remove = () =>{
      this.props.removeExercise(this.props.index)
    }
    
  }

  render(){

    var length = this.props.exercise.exercise_sets.length

    var sets = this.props.exercise.exercise_sets.map((set, index) => {
      return (
        <ExerciseSet set={set} index={index} removeSet={this.removeSet} updateSet={ (event) => this.updateSet(index, event) }/>
      )
    })

    return (
      <div className='exerciseForm' style={{border: '1px dotted blue', padding: '10px'}} >
        <div className='form-group' >
          <input className="form-control" type='text' value={this.props.exercise.name} name='name' onChange={this.updateName}/> 
        </div>
        <button onClick={this.remove}>Remove Exercise</button>
          <Table responsive>
            <thead>
              <tr>
                <th>Set</th>
                <th>Weight</th>
                <th>Reps</th>
              </tr>
            </thead>
            <tbody>
              {sets}
            </tbody>
          </Table>
        
        <button onClick={this.addSet}>Add Set</button>
      </div>
    )
  }
}

ExerciseForm.propTypes = {

}

export default ExerciseForm;
