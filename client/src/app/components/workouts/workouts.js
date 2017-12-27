import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';  
import moment from 'moment';

import $R_Workout from '/src/app/utils/workout'

class Workouts extends Component {
  componentWillMount(){
    $R_Workout.dispatchAction('query')
  }

  render() {
    let workouts;

    if ( this.props.workouts.length > 0 ){
      workouts = this.props.workouts.map(function(workout){
        return (
          <Link to={`workouts/${workout.id}`} className='workouts__row row' key={workout.id}>
            <h3 className='workouts__row__title'>{workout.name}</h3>
            <p className='workouts__row__date'>Date: {moment(workout.date).format("M/D/YY")}</p>
            <p className='workouts__row__start-time'>Start: {moment(workout.start_time, 'hh:mm').format('h:mma')}</p>
            <p className='workouts__row__end-time'>End: {moment(workout.end_time, 'hh:mm').format('h:mma')}</p>
          </Link>
        )
      })
    }

    return (
      <div className="page workouts">
        <h1 className="workouts__title">Workouts</h1>
        {workouts}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  return{
    workouts: state.workouts
  }
}

Workouts.propTypes = {

}

export default connect(mapStateToProps)(Workouts);