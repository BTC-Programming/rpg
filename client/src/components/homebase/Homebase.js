import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Actions
import { getUserAccount } from '../../actions/accountActions';

// Components
import PageLoading from '../shared/PageLoading';
import ManageAccount from './ManageAccount';
import CharacterCard from './CharacterCard';

class Homebase extends Component {
  componentDidMount() {
    this.props.getUserAccount();
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (this.props.characters && (this.props.characters !== prevProps.characters)) {
      this.setState({
        characters: this.props.characters
      });
    }
  }
  
  render() {
    const { account, loading } = this.props.account;
    let display;
    
    if (account === null || loading) {
      display = <PageLoading />;
    } else if (!Object.keys(account).length) {
      // The user has not yet set up an account.
      return (
        <Redirect to='/newuser' />
      );
    } else {
      const characterList = account.characters.map(character => (
        <CharacterCard key={character._id} character={character} />
      ));
      display = (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-3'>
              <h2 className='mt-4 display-6 text-center'>
                {account.username}
              </h2>
              <img
                id='homebase-img'
                className='d-block m-auto rounded-circle'
                src={account.user.avatar}
                alt={account.indexname}
              />
            </div>
            <div className='col-md-9'>
              <div className='homebase-display'>
                <ManageAccount />
                {characterList}
              </div>
            </div>
          </div>
        </div>
        
      );
    }
    
    return (
      <div className='homebase'>
        {display}
      </div>
    );
  }
}

Homebase.propTypes = {
  getUserAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  account: state.account,
  auth: state.auth,
});

export default connect(mapStateToProps, { getUserAccount })(Homebase);
