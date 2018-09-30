import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Actions
import { getCharacter } from '../../actions/characterActions';

// Components
import PageLoading from '../shared/PageLoading';
import CharPlaceholder from '../shared/CharPlaceholder';

class Character extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getCharacter(this.props.match.params.id);
    }
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.character.character === null && prevProps.character.loading) {
      this.props.history.push('/not-found');
    }
  }
  
  render() {
    const { character, loading } = this.props.character;
    let display;
    
    if (character === null || loading) {
      display = <PageLoading />;
    } else {
      display = (
        <div className='card card-body bg-light mb-3'>
          <div className='row'>
            <div className='col-4 col-md-3 m-auto text-center'>
              <CharPlaceholder />
            </div>
          </div>
          <div className='row'>
            <div className='col-8 col-md-4 m-auto'>
              <h1 className='text-center'>{character.name}</h1>
              <hr />
              <p>
                {character.descript}
              </p>
              <hr />
              <Link to='/home' className='btn btn-theme-bluegray m-auto'>
                Go Back
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className='show-character'>
        {display}
      </div>
    );
  }
}

Character.propTypes = {
  getCharacter: PropTypes.func.isRequired,
  character: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  character: state.character
});

export default connect(mapStateToProps, { getCharacter })(Character);
