import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux'; 

import moment from 'moment';
import $R_Workout from '/src/app/utils/workout'

import {deepClone, findById} from '/src/app/utils/tools'

class WorkoutSingle extends Component {
  constructor(props){
    super(props)

    this.delete = (event) => {
      event.preventDefault();
      return this.props.actions.dispatchAction('delete', this.state.workout.id);
    }

  }

  componentDidMount(){
    this.props.actions.dispatchAction('get', {id: this.props.match.params.id});
  }

  componentWillUpdate(nextProps, nextState) {

  }

  render() {
    if (this.props.workout) {
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
          <h1>{name}</h1>
          <p>On: {date}</p>
          <p>Start: {start_time}</p>
          <p>End: {end_time}</p>
          {exercises}
        </div>
      )
    } else {
      return (
        <div className="workout-single">
          
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
