'use strict';

/**
 * @file
 * Header for Profile Component
 */

import React from 'react';
import ProfileActions from '../../actions/Profile.action.js';

const ProfileHeader = React.createClass({

  displayName: 'ProfileHeader',

  propTypes: {
    editable: React.PropTypes.bool
  },

  toggleEdit() {
    ProfileActions.toggleEdit();
  },

  render() {
    let buttonText = (this.props.editable === true) ? 'Gem' : 'Rediger';
    return (
      <div className={'profile--header'} >
        <div className='row' >
          <div className='small-4 columns' ><p> </p></div>
          <div className='small-4 columns' ><h2>Profil</h2></div>
          <div className='small-4 columns' >
            <a onClick={this.toggleEdit} ref='toggleButton' >{buttonText}</a>
          </div>
        </div>
      </div>
    );
  }
});

export default ProfileHeader;
