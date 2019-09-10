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
    return err.response;
  }
}
