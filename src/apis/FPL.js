import axios from 'axios';

export async function getAllData() {
  try {
    const { data } = await axios('/api/bootstrap-static/');
    return data;
  } catch (err) {
    return err;
  }
}

export async function getGWStatus() {
  try {
    const { data } = await axios('/api/event-status');
    return data;
  } catch (err) {
    return err;
  }
}

export function leagueUrl(leagueId) {
  return `/api/leagues-classic/${leagueId}/standings/?page_new_entries=1&page_standings=1&phase=1`;
}

export function teamUrl(teamId) {
  return `/api/entry/${teamId}/`;
}
