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

    const length = this.props.exercise.exercise_sets.length

    var sets;

    if ( length == 0 ) {
      sets = (
        <ExerciseSet key={0} set={{repetitions: 0, set_id: 0, weight: 0}} index={0} removeSet={this.removeSet} updateSet={ event => this.updateSet(0, event) }/>
      )
    } else {
      sets = this.props.exercise.exercise_sets.map((set, index) => {
        return (
          <ExerciseSet key={set.id || index} set={set} index={index} removeSet={this.removeSet} updateSet={ event => this.updateSet(index, event) }/>
        )
      })
    }

    return (
      <div className='exercise-form' >
        <div className='form-group row' >
          <div className='col-12'>
          <input className="form-control" type='text' value={this.props.exercise.name} name='name' onChange={this.updateName} placeholder='Name' />
          </div> 
        </div>

        <table className='exercise-form__fields row'>
          <thead>
            <tr>
              <th>
                <h5>Set</h5>
              </th>
              <th>
                <h5>Weight</h5>
              </th>
              <th>
                <h5>Reps</h5>
              </th>
            </tr>
          </thead>
          <tbody>
           {sets}
          </tbody>
        </table>
 
       

        <div className='row' >
          <div className='col-2'>
            <button onClick={this.addSet} className='button'>Add Set</button>
          </div>
          <div className='col-3'>
            <button onClick={this.remove} className='button'>Remove Exercise</button>
          </div>
        </div>
      </div>
    )
  }
}

ExerciseForm.propTypes = {

}

export default ExerciseForm;
