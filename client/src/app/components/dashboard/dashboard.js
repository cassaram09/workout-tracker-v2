import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';  
import { Link } from 'react-router-dom'
import request from 'superagent';

import {deepClone, findById} from '/src/app/utils/tools'

class Dashboard extends Component {
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
      <div className='dashboard page'>
        <h1 className='dashboard__title'>Your Dashboard</h1>

        <div className='dashboard__actions row'>
          <div className='col-2'>
            <Link className='button' to={'/workouts/new'}>New Workout</Link>
          </div>
        </div>

        { this.state.reports && (
          <div>
        <div className='dashboard__reports row'>
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
    workout: state.workouts.data[state.workouts.data.length-1]
  }
}


Dashboard.propTypes = {

}

export default connect(mapStateToProps)(Dashboard);