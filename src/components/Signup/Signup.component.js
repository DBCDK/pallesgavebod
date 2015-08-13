'use strict';

/**
 * @file
 * Signup component displays the signup form.
 */

import React from 'react';

import ProfileStore from '../../stores/Profile.store.js';


const Signup = React.createClass({

  getInitialState: function() {
    return {
      isPasswordMatching: false,
      isEmailFormatted: false
    };
  },

  componentDidMount: function () {
    ProfileStore.listen(this.updateProfile);
  },

  handleSubmit: function () {
  },

  handlePasswordTyping: function () {
    const password = this.refs.password.getDOMNode().value;
    const repeatedPassword = this.refs.repeatedPassword.getDOMNode().value;
    const isPasswordMatching = (password !== '' && repeatedPassword !== '' && password === repeatedPassword);
    this.setState({isPasswordMatching: isPasswordMatching});

  },

  handleEmailTyping: function () {
    // check if email is valid
    const email = this.refs.email.getDOMNode().value;
    const re = /\S+@\S+\.\S+/;
    const isEmailFormatted = re.test(email);
    this.setState({isEmailFormatted: isEmailFormatted});
  },

  render: function () {
    const passwordColor = this.state.isPasswordMatching ? 'green' : 'orange';
    const emailColor = this.state.isEmailFormatted ? 'green' : 'orange';
    return (
      <div>
        <form method='post' action='/signup'>
          <h2>Opret Profil</h2>
          <label>email</label>
          <input
            name='email'
            type='text'
            ref='email'
            style={{borderColor: emailColor}}
            onChange={this.handleEmailTyping}>
          </input>
          <label>password</label>
          <input
            name='password'
            type='password'
            ref='password'
            style={{borderColor: passwordColor}}
            onChange={this.handlePasswordTyping}>
          </input>
          <label>gentag password</label>
          <input
            name='repeatedPassword'
            type='password'
            ref='repeatedPassword'
            style={{borderColor: passwordColor}}
            onChange={this.handlePasswordTyping}>
          </input>
          <input
            className='button'
            type='submit'
            value='Opret profil'
            onKeyUp={this.handleSubmit}>
          </input>
        </form>
      </div>
    );
  }
});

export default Signup;