import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Grid, Row, Col, Table} from 'react-bootstrap'
import moment from 'moment';

// import CalendarModal from '../common/calendarModal'
// import TimeInput from '../common/timeInput'
import ExerciseForm from '/src/app/components/exercises/exerciseForm'
import {deepClone} from '/src/app/utils/tools'


class WorkoutForm extends Component {
  constructor(props) {
    super(props);

    this.updateWorkoutField = (event) => {
      var workout = deepClone(this.props.workout)
      workout[event.target.name] = event.target.value
      this.props.update(workout)
    }

    this.addExercise = () =>{
      var workout = deepClone(this.props.workout)
      workout.exercises.push({name: '', weight: '', repetitions: '', exercise_sets: []})
      this.props.update(workout)
    }

    this.removeExercise = (index) =>{
      var workout = deepClone(this.props.workout)
      workout.exercises.splice(index, 1)
      this.props.update(workout);
    }

    this.updateExercise = (exercise, index) => {
      var workout = deepClone(this.props.workout)
      workout.exercises[index] = exercise;
      this.props.update(workout)
    }

    this.save = (event) => {
      event.preventDefault();
      var workout = deepClone(this.props.workout)

      workout.date = moment(workout.date).unix();
      workout.start_time = moment(workout.start_time, "HH:mm aA").unix();
      workout.end_time = moment(workout.end_time, "HH:mm aA").unix();

      workout.exercises_attributes = workout.exercises
      var exercises = workout.exercises_attributes

      for ( let exercise in exercises ) {
        exercises[exercise].exercise_sets_attributes =  exercises[exercise].exercise_sets
        delete exercises[exercise].exercise_sets
      }

      delete workout.exercises

      this.props.save({workout: workout})
    }

  }

  render(){

    const date = moment(this.props.workout.date).format('l')
    const { start_time, end_time, name } = this.props.workout

    var exercises = this.props.workout.exercises.map((exercise, index)=> {
      return ( 
        <ExerciseForm 
          exercise={exercise} 
          updateExercise={this.updateExercise} 
          removeExercise={this.removeExercise}
          toggleEdit={this.props.toggleEdit} 
          index={index} 
          key={index}
        />
      )
    })

    return (

      <div className='workout-form'>
        <div className='workout-form__actions row'>
          
          { this.props.cancel && (
            <div className='col-2'>
              <button className='button -light workout-single__button' onClick={this.props.cancel}>Cancel</button>
            </div> 
          )}
          <div className='col-2'>
            <button className='button workout-single__button' onClick={this.save}>Save</button>
          </div>

          { this.props.delete && (<div className='col-2'>
            <button className='button workout-single__button' onClick={this.props.delete}>Delete</button>
          </div>
          )}

        </div>

        <div className='workout-form__fields row'>
          <div className='col-3'>
            <h4>Name</h4>
            <input type='text' name='name' value={this.props.workout.name} onChange={this.updateWorkoutField}/>
          </div>
          <div className='col-3'>
            <h4>Date</h4>
            <input type='date' name='date' value={this.props.workout.date} onChange={this.updateWorkoutField}/>
          </div>
          <div className='col-3'>
            <h4>Start</h4>
            <input type='time' name='start_time' value={this.props.workout.start_time} onChange={this.updateWorkoutField}/>
          </div>
          <div className='col-3'>
            <h4>End</h4>
            <input type='time' name='end_time' value={this.props.workout.end_time} onChange={this.updateWorkoutField}/>
          </div>
        </div>

        {exercises}

        <button className='button' onClick={this.addExercise}>Add Exercise</button>

      </div>
    
    )
  }
}

// WorkoutForm.propTypes = {
//   onSave: React.PropTypes.func.isRequired,
//   onChange: React.PropTypes.func.isRequired,
// }

export default WorkoutForm;
