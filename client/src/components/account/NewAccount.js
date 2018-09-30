import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextField from '../shared/TextField';
import PageLoading from '../shared/PageLoading';

import { createAccount, getUserAccount } from '../../actions/accountActions';

class NewAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
      username: '',
      birthdate: '',
      locale: '',
      errors: {}
    };
  }
  
  componentDidMount() {
    this.props.getUserAccount();
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
    
    const accountData = {
      username: this.state.username,
      birthdate: this.state.birthdate,
      locale: this.state.locale
    };
    
    this.props.createAccount(accountData, this.props.history);
  }
  
  render() {
    const { account, loading } = this.props.account;
    let display;
    
    if (account === null || loading) {
      display = <PageLoading />
    } else if (Object.keys(account).length) {
      // The user has already created an account.
      return (
        <Redirect to='/home' />
      );
    } else {
      const { errors } = this.state;
      const btnClass = classNames({
       ' btn': true,
        'btn-block': true,
        'btn-theme-bluegray': !this.state.isHovered,
        'btn-theme-bluegray-mo': this.state.isHovered
      });
      display = (
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Set Up Your Account</h1>
              <p className='lead text-center'>Please provide the following information.</p>
              <form onSubmit={this.onSubmit}>
                <TextField
                  placeholder="Username [required]"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                  error={errors.username}
                  info="Choose a username"
                />
                <TextField
                  name='birthdate'
                  type='date'
                  value={this.state.birthdate}
                  error={errors.birthdate}
                  onChange={this.onChange}
                  info='When were you born?'
                />
                <TextField
                  placeholder="Location"
                  name="locale"
                  value={this.state.locale}
                  onChange={this.onChange}
                  error={errors.locale}
                  info="Where are you from?"
                />
                <input
                  id='submitform'
                  type='submit'
                  value='Create Account'
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
        </div>
      );
    }
    
    return (
      <div className='new-account'>
        {display}
      </div>
    );
  }
}

NewAccount.propTypes = {
  createAccount: PropTypes.func.isRequired,
  getUserAccount: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  account: state.account,
  errors: state.errors
});

export default connect(mapStateToProps, { createAccount, getUserAccount })(withRouter(NewAccount));
