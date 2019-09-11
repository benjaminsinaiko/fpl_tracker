import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';

import { IdsDispatchContext } from '../../contexts/idsContext';
import useDataApi from '../../hooks/useDataApi';
import { leagueUrl, teamUrl } from '../../apis/FPL';

const useStyles = makeStyles(theme => ({
  editRoot: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  editButton: {
    width: '75%',
    marginTop: theme.spacing(3),
  },
  buttonIcon: {
    marginLeft: theme.spacing(1),
  },
  editBox: {
    display: 'flex',
    justifyContent: 'center',
    '& div': {
      marginRight: theme.spacing(0.25),
      marginLeft: theme.spacing(0.25),
    },
    '& input': {
      color: '#212121',
    },
  },
  editActionsBox: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2),
  },
  editActionsButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const initialState = { leagueId: '', teamId: '' };

export default function IdsEdit() {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const [ids, setIds] = useState(initialState);
  const dispatch = useContext(IdsDispatchContext);
  const {
    data: leagueData,
    error: leagueError,
    callApi: callLeagueApi,
  } = useDataApi();
  const {
    data: teamData,
    error: teamError,
    callApi: callTeamApi,
  } = useDataApi();

  useEffect(() => {
    if (leagueData) {
      dispatch({ type: 'SET_LEAGUE', leagueData: leagueData });
    }
  }, [leagueData, dispatch]);
  useEffect(() => {
    if (teamData) {
      dispatch({ type: 'SET_TEAM', teamData: teamData });
    }
  }, [teamData, dispatch]);
  useEffect(() => {
    if (leagueData && teamData) {
      setIsEdit(false);
      callLeagueApi('');
      callTeamApi('');
      setIds(initialState);
    }
  }, [leagueData, teamData, callLeagueApi, callTeamApi]);

  function handleOpenEdit() {
    setIsEdit(true);
  }
  const handleChange = name => e => {
    setIds({ ...ids, [name]: e.target.value });
  };
  function handleCancel() {
    setIsEdit(false);
  }
  function handleUpdate() {
    if (ids.leagueId) {
      callLeagueApi(leagueUrl(ids.leagueId));
    }
    if (ids.teamId) {
      callTeamApi(teamUrl(ids.teamId));
    }
  }

  return (
    <div className={classes.editRoot}>
      {isEdit ? (
        <Slide direction='down' in={isEdit} mountOnEnter unmountOnExit>
          <form>
            <div className={classes.editBox}>
              <TextField
                error={leagueError !== null}
                id='league-id'
                label='Set League ID'
                onChange={handleChange('leagueId')}
                value={ids.leagueId}
                autoComplete='league-id'
                type='number'
                margin='normal'
                variant='outlined'
                helperText={leagueError !== null ? 'Invalid League ID' : ''}
              />
              <TextField
                error={teamError !== null}
                id='team-id'
                label='Set Team ID'
                onChange={handleChange('teamId')}
                value={ids.teamId}
                autoComplete='team-id'
                type='number'
                margin='normal'
                variant='outlined'
                helperText={teamError !== null ? 'Invalid Team ID' : ''}
              />
            </div>
            <div className={classes.editActionsBox}>
              <Button
                onClick={handleCancel}
                variant='outlined'
                size='small'
                className={classes.editActionsButton}>
                Cancel
              </Button>
              <Button
                disabled={!ids.leagueId && !ids.teamId}
                onClick={handleUpdate}
                variant='contained'
                size='small'
                color='secondary'
                className={classes.editActionsButton}>
                Update
              </Button>
            </div>
          </form>
        </Slide>
      ) : (
        <Button
          onClick={handleOpenEdit}
          variant='contained'
          color='primary'
          className={classes.editButton}>
          Add / Edit
          <EditIcon className={classes.buttonIcon} />
        </Button>
      )}
    </div>
  );
}
