export default function idsReducer(state, action) {
  switch (action.type) {
    case 'SET_LEAGUE':
      return {
        ...state,
        leagueId: action.leagueId,
      };
    case 'CLEAR_LEAGUE':
      return {
        ...state,
        leagueId: '',
      };
    case 'SET_TEAM':
      return {
        ...state,
        teamId: action.teamId,
      };
    case 'CLEAR_TEAM':
      return {
        ...state,
        teamId: '',
      };
    default:
      return state;
  }
}
