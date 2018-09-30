import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import TextField from '../shared/TextField';

import { editAccount, getUserAccount } from '../../actions/accountActions';

class EditAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
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
    
    if (this.props.account && (this.props.account.account !== prevProps.account.account)) {
      const { account } = this.props.account;
      account.birthdate = !isEmpty(account.birthdate) ? account.birthdate : '';
      account.locale = !isEmpty(account.locale) ? account.locale : '';
      
      this.setState({
        birthdate: account.birthdate,
        locale: account.locale
      });
    }
  }
  
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  
  onSubmit = (event) => {
    event.preventDefault();
    
    const accountData = {
      birthdate: this.state.birthdate,
      locale: this.state.locale
    };
    
    this.props.editAccount(accountData, this.props.history);
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
      <div className='edit-account'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Edit Your Account</h1>
              <p className='lead text-center'>Please provide the following information.</p>
              <form onSubmit={this.onSubmit}>
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
                  value='Update Account'
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
      </div>
    );
  }
}

EditAccount.propTypes = {
  editAccount: PropTypes.func.isRequired,
  getUserAccount: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  account: state.account,
  errors: state.errors
});

export default connect(mapStateToProps, { editAccount, getUserAccount })(withRouter(EditAccount));