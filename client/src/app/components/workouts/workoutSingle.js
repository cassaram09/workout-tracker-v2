import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';  
import moment from 'moment';

import $R_Workout from '/src/app/utils/workout'
import WorkoutForm from '/src/app/components/workouts/workoutForm'

import {deepClone, findById} from '/src/app/utils/tools'

class WorkoutSingle extends Component {
  constructor(props){
    super(props)

    this.end_time = new Date().getHours() + 1  + ':' + new Date().getMinutes()
    this.start_time = new Date().getHours() + ':' + new Date().getMinutes()

    this.state = {
      workout: this.props.workout,
      editing: false
    }

    this.update = (value) => {
      var state = deepClone(this.state)
      state.workout = value
      return this.setState(state);
    }

    this.save = (state) => {
      if ( !this.state.workout.name ) {
       return $R_Workout.throwError({title: "Invalid fields", detail: 'Name is required'})
      }
      return $R_Workout.dispatchAction('UPDATE', state)
    }

    this.delete = (event) => {
      event.preventDefault();
      return $R_Workout.dispatchAction('DELETE', {id: this.state.workout.id})

    }

    this.toggleEdit = () =>{
      this.setState({editing: !this.state.editing, workout: this.props.workout})
      $R_Workout.clearErrors();
    }
  }

  componentDidMount(){
    return $R_Workout.dispatchAction('GET', {id: this.props.match.params.id})
  }

  componentWillUpdate(nextProps, nextState) {
    if ( !this.state.workout && nextProps.workout && nextProps.workout.id ){
      this.setState({workout: nextProps.workout})
    }

    if ( this.state.workout && nextProps.workout && nextProps.workout.updated_at != this.props.workout.updated_at) {
      this.setState({workout: nextProps.workout, editing: false})
    }
  }

  render() {
    var errors;
    if ( this.props.errors.length > 0 ) {
      errors = this.props.errors.map( (error,index) => {
        return ( <p className='login__error__details' key={index}>{error.title}: {error.detail}</p> )
      })
    }

    if (this.props.workout && !this.state.editing ) {
      const { name, date, start_time, end_time } = this.props.workout;

      const exercises = this.props.workout.exercises.map(function(exercise){
        return (
          <div className='workout-single__exercise row' key={exercise.id}>
            <h3 className='workout-single__exercise__title'>{exercise.name}</h3>
            {exercise.exercise_sets.map(function(set, index){
              return (<p className='workout-single__exercise__set'key={set.id}>Set {index + 1} {set.weight} : {set.repetitions}</p>)
            })}
          </div>
        )
      })

      return (
        <div className="page workout-single">
          <h1 className="workout-single__title">{name}</h1> 

          <div className='workout-single__actions row'>
            <button className='button' onClick={this.toggleEdit}>Edit</button>
          </div>
            
          <div className='workout-single__details row'>
            <div className='col-3'>
              <h4>Date</h4>
              <p>On: {moment(date).format('M/D/YY')}</p>
            </div>
            <div className='col-3'>
              <h4>Start</h4>
              <p>Start: {moment(start_time, 'hh:mm').format('h:mma')}</p>
            </div>
            <div className='col-3'>
              <h4>End</h4>
              <p>End: {moment(end_time, 'hh:mm').format('h:mma')}</p>
            </div>
          </div>

          {exercises}

        </div>
      )
    } else if  (this.props.workout && this.state.editing ){
      const { name, date, start_time, end_time } = this.props.workout;

      return (
        <div className="page workout-single">
          <h1 className="workout-single__title">{name}</h1> 
          <WorkoutForm  workout={this.state.workout} update={this.update} cancel={this.toggleEdit} save={this.save} delete={this.delete} errors={errors} reset={this.reset} />
        </div>
      )
    } else {
      return (
        <div className="page workout-single">
          <h1 className="workout-single__title">Loading...</h1>
        </div>
      )
    }
    
  }
}

WorkoutSingle.propTypes = {

}

function mapStateToProps(state, ownProps) {
  return {
    workout: findById(state.workouts.data, ownProps.match.params.id),
    errors: state.workouts.errors
  }
}

export default connect(mapStateToProps)(WorkoutSingle);
