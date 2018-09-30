import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import PageLoading from '../shared/PageLoading';
import TextAreaField from '../shared/TextAreaField';
import TextField from '../shared/TextField';

import { getUserAccount } from '../../actions/accountActions';
import { createCharacter } from '../../actions/characterActions';

class NewCharacter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
      name: '',
      descript: '',
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
    
    const characterData = {
      name: this.state.name,
      descript: this.state.descript
    };
    
    this.props.createCharacter(characterData, this.props.history);
  }
  
  render() {
    const { account, loading } = this.props.account;
    let display;
    
    if (account === null || loading) {
      display = <PageLoading />
    } else if (!Object.keys(account).length) {
      // The user doesn't yet have an account.
      return (
        <Redirect to='/newuser' />
      );
    } else if (account.characters && account.characters.length >= 2) {
      // The user already has the maximum number of characters.
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
              <h1 className='display-4 text-center'>Create a Character</h1>
              <p className='lead text-center'>Please provide the following information.</p>
              <form onSubmit={this.onSubmit}>
                <TextField
                  placeholder="Name [required]"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                  info="Choose your character's name."
                />
                <TextAreaField
                  name='descript'
                  placeholder='Description'
                  value={this.state.descript}
                  error={errors.descript}
                  onChange={this.onChange}
                  info='Describe your character in 500 characters or less.'
                />
                <input
                  id='submitform'
                  type='submit'
                  value='Create Character'
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
      <div className='new-character'>
        {display}
      </div>
    );
  }
}

NewCharacter.propTypes = {
  createCharacter: PropTypes.func.isRequired,
  getUserAccount: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  account: state.account,
  errors: state.errors
});

export default connect(mapStateToProps, { createCharacter, getUserAccount })(withRouter(NewCharacter));
