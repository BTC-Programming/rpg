import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { loginUser } from '../../actions/authActions';
import TextField from '../shared/TextField';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      isHovered: false,
      email: '',
      password: '',
      confirm: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/home');
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (this.props.errors && (this.props.errors !== prevProps.errors)) {
      this.setState({ errors: this.props.errors });
    }
  }
  
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  
  onSubmit = (event) => {
    event.preventDefault();
    
    const newUser = {
      email: this.state.email,
      password: this.state.password,
      confirm: this.state.confirm
    };
    
    this.props.loginUser(newUser, this.props.history, true);
  }

  render() {
    const { errors } = this.state;
    const btnClass = classNames({
     ' btn': true,
      'btn-block': true,
      'btn-theme-bluegray': !this.state.isHovered,
      'btn-theme-bluegray-mo': this.state.isHovered
    });
    
    return (
      <main className='container-fluid registration'>
        <div className='row'>
          <div className='col-md-7 m-auto'>
            <h1 className='display-4 text-center'>
              <strong>Welcome to RPG!</strong>
            </h1>
            <p className='lead text-center'>
              Register now to play
            </p>
            <form onSubmit={this.onSubmit}>
              <TextField
                name='email'
                type='email'
                placeholder='Email Address'
                value={this.state.email}
                error={errors.email}
                onChange={this.onChange}
              />
              <TextField
                name='password'
                type='password'
                placeholder='Password'
                value={this.state.password}
                error={errors.password}
                onChange={this.onChange}
              />
              <TextField
                name='confirm'
                type='password'
                placeholder='Confirm Password'
                value={this.state.confirm}
                error={errors.confirm}
                onChange={this.onChange}
              />
              <input
                id='submitform'
                type='submit'
                className={btnClass}
                onMouseOver={() => {
                  this.setState(prevState => ({
                    isHovered: !prevState.isHovered
                  }));
                }}
                onMouseOut={() => {
                  this.setState(prevState => ({
                    isHovered: !prevState.isHovered
                  }));
                }}
              />
            </form>
          </div>
        </div>
      </main>
    );
  }
}

Register.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(withRouter(Register));
