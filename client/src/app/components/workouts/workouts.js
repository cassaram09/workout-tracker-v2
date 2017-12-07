import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux'; 




class Workouts extends Component {
  // componentWillMount(){
  //   this.props.actions.dispatchAction('query')
  // }

  render() {
    return (
      <div className="workouts">
        <h1>Workouts</h1>
      </div>
    )
  }
}

// function mapDispatchToProps(dispatch){
//   return {
//     actions: bindActionCreators({dispatchAction: Workout.dispatchAction}, dispatch)
//   }
// }

// function mapStateToProps(state, ownProps){
//   return{
//     workouts: state.workouts
//   }
// }

Workouts.propTypes = {

}

export default Workouts;