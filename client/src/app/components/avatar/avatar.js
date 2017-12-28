import React, {Component} from 'react';
import { string } from 'prop-types';
import {connect} from 'react-redux';  

import { DefaultAvatar } from '/src/app/utils/constants'

class Avatar extends Component {
  // static PropTypes = {
  //   url: string,
  // }

  shouldComponentUpdate(nextProps){
    return nextProps.user.data.avatar != this.props.user.data.avatar
  }

  render(){
    return (
      <div className={ `avatar ${this.props.type}` }>
        <img src={this.props.user.data.avatar || DefaultAvatar} />
      </div>
    )
  }
  
}
function mapStateToProps(state, ownProps) { 
  return {user: state.user};
};

export default connect(mapStateToProps)(Avatar);
