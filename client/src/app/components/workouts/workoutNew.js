import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import $R_Workout from '/src/app/utils/workout'
import WorkoutForm from '/src/app/components/workouts/workoutForm'
import {deepClone} from '/src/app/utils/tools'

class NewWorkout extends Component {
  constructor(props){
    super(props)

    this.end_time = new Date().getHours() + 1  + ':' + new Date().getMinutes()
    this.start_time = new Date().getHours() + ':' + new Date().getMinutes()

    this.state ={
      workout: {
        name: '',
        date: new Date(),
        end_time: this.end_time,
        start_time: this.start_time,
        exercises: []
      }
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
      return $R_Workout.dispatchAction('create', state)
    
      $R_Workout.clearErrors();
    }

  }

  render() {
    var errors;
    if ( this.props.workoutErrors.length > 0 ) {
      errors = this.props.workoutErrors.map( (error,index) => {
        return ( <p className='login__error__details' key={index}>{error.title}: {error.detail}</p> )
      })
    }

    return (
      <div className="page new-workout">
        <h1 className="new-workout__title">New Workout</h1>
        <WorkoutForm  workout={this.state.workout} update={this.update} save={this.save} errors={errors} reset={this.reset} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => { 
  return {
    workoutErrors: state.workouts.errors,
  }
};

export default connect(mapStateToProps)(NewWorkout);
