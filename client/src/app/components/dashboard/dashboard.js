import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';  
import { Link } from 'react-router-dom'
import request from 'superagent';

import {deepClone, findById} from '/src/app/utils/tools'

class Home extends Component {
  constructor(props){
    super(props)

    this.state = {
      reports: undefined,
    }
    
  }
  componentWillMount(){
   const req = request.get('/api/v1/dashboard').set('AUTHORIZATION', `Bearer ${sessionStorage.jwt}`)
      req.end((error, response) => {
        this.setState({reports: response.body})
      });
  }

  render(){
    return (
      <div className='page home'>
        <h1 className='home__title'>Your Dashboard</h1>

        <div className='home__actions row'>
          <div className='col-2'>
            <Link className='button' to={'/workouts/new'}>New Workout</Link>
          </div>
        </div>

        { this.state.reports && (
          <div>
        <Link to={`workouts/${this.state.reports.last_workout.id}`} className='workouts__row row'>
          <h3 className='workouts__row__title'>{this.state.reports.last_workout.name}</h3>
          <p className='workouts__row__date'>Date: {this.state.reports.last_workout.date}</p>
          <p className='workouts__row__start-time'>Start: {this.state.reports.last_workout.start_time}</p>
          <p className='workouts__row__end-time'>End: {this.state.reports.last_workout.end_time}</p>
        </Link>
        <div className='home__reports row'>
          <h3>Total Workouts</h3>
          <p>{this.state.reports.total_workouts}</p>
          <h3>Total Hours</h3>
          <p>{this.state.reports.workout_hours}</p>
        </div>
        </div>)}

      </div>
    )
  }
}


function mapStateToProps(state, ownProps){
  return{
    workout: state.workouts[state.workouts.length-1]
  }
}


Home.propTypes = {

}

export default connect(mapStateToProps)(Home);