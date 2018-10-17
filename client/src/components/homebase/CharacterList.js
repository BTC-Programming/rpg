import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import CharacterCard from './CharacterCard';
import PageLoading from '../shared/PageLoading';

// Actions
import { getCharacters } from '../../actions/characterActions';

class CharacterList extends Component {
  componentDidMount() {
    this.props.getCharacters();
  }
  
  render() {
    console.log('PROPS', this.props);
    const { characters, loading } = this.props.character;
    let display;
    
    if (characters === null || loading) {
      display = <PageLoading />;
    } else {
      display = characters.map(character => (
        <CharacterCard key={character._id} character={character} />
      ));
    }
    
    return (
      <div className='charlist'>
        {display}
      </div>
    );
  }
}

CharacterList.propTypes = {
  getCharacters: PropTypes.func.isRequired,
  character: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  character: state.character
});

export default connect(mapStateToProps, { getCharacters })(CharacterList);
