import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom'

import Home from '/src/app/components/home/home'
import Profile from '/src/app/components/profile/profile'
import Workouts from '/src/app/components/workouts/workouts'

function Main(props) {

  return (
    <main className='main'>
      <Switch>

        <Route exact path='/' component={Home} />
        <Route path='/profile' component={Profile} />
        <Route path='/workouts' component={Workouts} />

       
      </Switch>
    </main>
  )
}

export default Main;


 // <Route exact path='/workouts/:id' component={SingleWorkout} />
 //        <Route exact path='/workouts/new' component={NewWorkout} />