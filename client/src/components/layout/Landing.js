import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';


class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/home');
    }
  }
  
  render() {
    return (
      <main className='container-fluid landing'>
  			<div className='corner-login'>
  				<Link to='/login' className='btn btn-theme-outline-bluegray'>Log In</Link>
  			</div>
  		  <div className='row h-100 align-items-center'>
  			<div className='col-sm-3 h-100 theme-bg-bluegray'>
  			  <div className='landing-content'>
  			    <h1 className='display-3'><strong>RPG Name</strong></h1>
  			    <p className='lead'><strong>Some information here.</strong></p>
  			  </div>
  			</div>
  			<div className='col-sm-9 mt-2 landing-buttons'>
  			    <Link to='/register' className='btn btn-block btn-theme-bluegray'>Sign Up</Link>
  			    <Link to='/login' className='btn btn-block btn-theme-outline-bluegray'>Log In</Link>
  			</div>
  		  </div>
  		</main>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
