export default function idsReducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'SET_TEAM':
      return {
        ...state,
        loading: false,
        teamId: action.teamId,
      };
    case 'CLEAR_TEAM':
      return {
        ...state,
        teamId: null,
      };
    case 'SET_LEAGUE':
      return {
        ...state,
        loading: false,
        leagueId: action.leagueId,
      };
    case 'CLEAR_LEAGUE':
      return {
        ...state,
        leagueId: null,
      };
    default:
      return state;
  }
}
