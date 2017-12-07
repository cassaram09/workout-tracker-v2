import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux'; 

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
      return this.props.actions.dispatchAction('update', state)
    }

    this.delete = (event) => {
      event.preventDefault();
      return this.props.actions.dispatchAction('delete', this.state.workout.id);
    }

    this.toggleEdit = () =>{
      this.setState({editing: !this.state.editing})
    }

  }

  componentDidMount(){
    this.props.actions.dispatchAction('get', {id: this.props.match.params.id});
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
          <div className='exercise' key={exercise.id}>
            <h3>{exercise.name}</h3>
            {exercise.exercise_sets.map(function(set, index){
              return (<p>Set {index + 1} {set.weight} : {set.repetitions}</p>)
            })}
          </div>
        )
      })
      return (
        <div className="page workout-single">
          <h1>{name}</h1> <button onClick={this.toggleEdit}>Edit</button>
          <p>On: {date}</p>
          <p>Start: {start_time}</p>
          <p>End: {end_time}</p>
          {exercises}

        </div>
      )
    } else {
      return (
        <div className="workout-single">
          <p>Editing</p>
          <button onClick={this.toggleEdit}>Back</button>
          { this.state.workout && <WorkoutForm  workout={this.state.workout} update={this.update} save={this.save} /> }
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
