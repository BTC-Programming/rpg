import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import isEmpty from 'lodash/isEmpty';

// Actions
import { deleteCharacter } from '../../actions/characterActions';

// Components
import Placeholder from '../shared/Placeholder';

class CharacterCard extends Component {
  onDeleteClick(id) {
    this.props.deleteCharacter(id);
  }
  
  render() {
    const { character } = this.props;
    
    return (
      <div className='card card-body bg-light mb-3'>
        <div className='row'>
          <div className='col-2'>
            <Placeholder />
          </div>
          <div className='d-block col-5 col-sm-6'>
            <h3 className='card-name'>{character.name}</h3>
            {isEmpty(character.descript) ? null : (<p>{character.descript}</p>)}
          </div>
          <div className='d-block d-sm-inline col-2 col-sm-3'>
            <Link to={`/character/${character._id}`} className='btn btn-block btn-theme-bluegray' style={{ 'width': '136px' }}>
              View Character
            </Link>
            <button
              className='btn btn-block btn-danger btn-theme-delete'
              style={{ 'width': '136px' }}
              onClick={this.onDeleteClick.bind(this, character._id)}
            >Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

CharacterCard.propTypes = {
  deleteCharacter: PropTypes.func.isRequired,
  character: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteCharacter })(CharacterCard);
