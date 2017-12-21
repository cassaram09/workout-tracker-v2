import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux'; 

import moment from 'moment';

import $R_Workout from '/src/app/utils/workout'
import Store from '/src/app/store/store'

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
      return $R_Workout.dispatchAction('update', state)
    }

    this.delete = (event) => {
      event.preventDefault();
      return $R_Workout.dispatchAction('delete', {id: this.state.workout.id})

    }

    this.toggleEdit = () =>{
      this.setState({editing: !this.state.editing})
    }

  }

  componentDidMount(){
    return $R_Workout.dispatchAction('get', {id: this.props.match.params.id})
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
    if (this.props.workout && !this.state.editing ) {
      const { name, date, start_time, end_time } = this.props.workout;

      console.log(this.props.workout)

      const exercises = this.props.workout.exercises.map(function(exercise){
        return (
          <div className='workout-single__exercise row' key={exercise.id}>
            <h3>{exercise.name}</h3>
            {exercise.exercise_sets.map(function(set, index){
              return (<p key={set.id}>Set {index + 1} {set.weight} : {set.repetitions}</p>)
            })}
          </div>
        )
      })
      return (
        <div className="page workout-single">
          <h1>{name}</h1> 

          <div className='workout-single__actions row'>
            <div className='col-2'>
              <button className='button' onClick={this.toggleEdit}>Edit</button>
            </div>
          </div>
            
          <div className='workout-single__details row'>
            <div className='col-3'>
              <h4>Date</h4>
              <p>On: {date}</p>
            </div>
            <div className='col-3'>
              <h4>Start</h4>
              <p>Start: {start_time}</p>
            </div>
            <div className='col-3'>
              <h4>End</h4>
              <p>End: {end_time}</p>
            </div>
          </div>

           {exercises}

        </div>
      )
    } else if  (this.props.workout && this.state.editing ){
      const { name, date, start_time, end_time } = this.props.workout;
      return (
        <div className="page workout-single">
          <h1>{name}</h1> 
          <WorkoutForm  workout={this.state.workout} update={this.update} cancel={this.toggleEdit} save={this.save} delete={this.delete} />
        </div>
      )
    } else {
      return (
        <div className="page workout-single">
          <h1>Loading...</h1>
        </div>
      )
    }
    
  }
}

WorkoutSingle.propTypes = {

}

function mapStateToProps(state, ownProps) {
  return {
    workout: findById(state.workouts, ownProps.match.params.id)
  };
};

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({dispatchAction: $R_Workout.dispatchAction}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutSingle);
