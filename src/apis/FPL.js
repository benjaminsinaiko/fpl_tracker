import axios from 'axios';

export async function getAllData() {
  try {
    const { data } = await axios('/api/bootstrap-static/');
    return data;
  } catch (err) {
    return err;
  }
}

export function getLeagueUrl(leagueId) {
  return `/api/leagues-classic/${leagueId}/standings/?page_new_entries=1&page_standings=1&phase=1`;
}

export function getTeamUrl(teamId) {
  return `/api/entry/${teamId}/`;
}
