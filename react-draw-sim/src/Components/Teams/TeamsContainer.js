import { connect } from 'react-redux';
import Teams from './Teams';

const mapStateToProps = (state) => {
  return {
    teams: state.reducer.teams,
  }
}

const mapDispatchToProps = {}

const TeamsContainer = connect(mapStateToProps, mapDispatchToProps)(Teams)

export default TeamsContainer;