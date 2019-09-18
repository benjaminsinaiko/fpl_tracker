export default function idsReducer(state, action) {
  switch (action.type) {
    case 'SET_LEAGUE':
      return {
        ...state,
        leagueData: action.leagueData,
      };
    case 'CLEAR_LEAGUE':
      return {
        ...state,
        leagueData: '',
      };
    case 'SET_TEAM':
      return {
        ...state,
        teamData: action.teamData,
      };
    case 'CLEAR_TEAM':
      return {
        ...state,
        teamData: '',
      };
    case 'CLEAR_IDS':
      return {
        ...state,
        leagueData: '',
        teamData: '',
      };
    default:
      return state;
  }
}
