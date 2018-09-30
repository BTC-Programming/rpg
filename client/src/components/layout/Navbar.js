import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Actions
import { logoutUser } from '../../actions/authActions';
import { clearAccount } from '../../actions/accountActions';

class Navbar extends Component {
  onLogoutClick(event) {
    event.preventDefault();
    this.props.clearAccount();
    this.props.logoutUser();
  }
  
  render() {
    const { isAuthenticated, user } = this.props.auth;
    
    const userLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a href='' id='navatar' className='nav-link' data-toggle='dropdown'>
            <img
              className='rounded d-inline-block'
              src={user.avatar}
              alt={user.name}
              title={user.name}
            />
          </a>
          <div className='dropdown-menu dropdown-menu-right'>
            <a
              href=''
              className='dropdown-item'
              onClick={this.onLogoutClick.bind(this)}
            >Logout</a>
          </div>
        </li>
      </ul>
    );
    
    const guestLinks = (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link to='/register' className='nav-link'>Sign Up</Link>
        </li>
        <li className='nav-item'>
          <Link to='/login' className='nav-link'>Log In</Link>
        </li>
      </ul>
    );
    
    return (
      <nav className='navbar navbar-expand-sm navbar-dark theme-bg-bluegray'>
        <div className='container-fluid'>
          <Link to='/' className='navbar-brand'>RPG</Link>
          <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#mobile-nav'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div id='mobile-nav' className='collapse navbar-collapse'>
            {isAuthenticated ? userLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearAccount })(Navbar);
