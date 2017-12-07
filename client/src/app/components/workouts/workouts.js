import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux'; 

import $R_Workout from '/src/app/utils/workout'


class Workouts extends Component {
  componentWillMount(){
    this.props.actions.dispatchAction('query')
  }

  render() {
    let workouts;

    if ( this.props.workouts.length > 0 ){
      workouts = this.props.workouts.map(function(workout){
        return (<div className='workouts__row' key={workout.id}>
          <h3 className='workouts__row__title'>{workout.name}</h3>
          <p className='workouts__row__date'>Date: {workout.date}</p>
          <p className='workouts__row__start-time'>Start: {workout.start_time}</p>
          <p className='workouts__row__end-time'>End: {workout.end_time}</p>
        </div>)
      })
    }
    
    return (
      <div className="workouts">
        <h1>Workouts</h1>
        {workouts}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({dispatchAction: $R_Workout.dispatchAction}, dispatch)
  }
}

function mapStateToProps(state, ownProps){
  return{
    workouts: state.workouts
  }
}

Workouts.propTypes = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Workouts);