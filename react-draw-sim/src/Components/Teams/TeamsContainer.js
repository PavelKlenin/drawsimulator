import { connect } from 'react-redux';
import { changeTeamColorCreator } from '../../store/actions';
import Teams from './Teams';

const mapStateToProps = (state) => {
  return {
    teams: state.reducer.teams,
  }
}

const mapDispatchToProps = {
  changeTeamColorCreator, 
}

const TeamsContainer = connect(mapStateToProps, mapDispatchToProps)(Teams)

export default TeamsContainer;
