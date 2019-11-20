import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import { IdsContext, IdsDispatchContext } from '../../contexts/idsContext';
import useDataApi from '../../hooks/useDataApi';
import { getTeamUrl } from '../../utils/fplDataHelpers';
import LeagueSelect from './LeagueSelect';

const useStyles = makeStyles(theme => ({
  editBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    '& div': {
      marginRight: theme.spacing(0.25),
      marginLeft: theme.spacing(0.25),
    },
    '& input': {
      color: '#212121',
    },
  },
  selectedIdsBox: {
    display: 'flex',
    width: '100%',
  },
  selectedIds: {
    flexGrow: 1,
  },
  teamBox: {
    display: 'flex',
    alignItems: 'center',
  },
  leagueBox: {
    display: 'flex',
    maxHeight: 250,
  },
  editActionsButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  apiLink: {
    textAlign: 'center',
    '& p, button, span': {
      fontSize: '.8em',
      color: '#f6247b',
    },
  },
}));

export default function TeamSearch({ handleCancel, handleClose }) {
  const classes = useStyles();
  const {
    teamData: { id },
  } = useContext(IdsContext);
  const [team, setTeam] = useState(id || '');
  const [league, setLeague] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useContext(IdsDispatchContext);
  const {
    data: teamData,
    error: teamError,
    callApi: callTeamApi,
  } = useDataApi();
  const {
    data: leagueData,
    error: leagueError,
    callApi: callLeagueApi,
  } = useDataApi();

  const handleChange = e => {
    setTeam(e.target.value);
  };

  function handleSetTeam() {
    callTeamApi(getTeamUrl(team));
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      handleSetTeam();
    }
  }

  function handleSetIds() {
    setIsUpdating(true);
    dispatch({ type: 'SET_TEAM', teamData: teamData });
    dispatch({
      type: 'SET_LEAGUE',
      leagueData: leagueData ? leagueData : '',
    });
    setTimeout(() => {
      setIsUpdating(false);
      handleClose();
    }, 1500);
  }

  function getCookies() {
    const wnd = window.open(
      `https://fantasy.premierleague.com/api/leagues-classic/${league}/standings/?page_new_entries=1&page_standings=1&phase=1`,
    );
    setTimeout(() => {
      wnd.close();
      callLeagueApi('');
    }, 200);
  }

  const leagueDisplayText = leagueError ? 'Auth Error' : league;

  return (
    <div className={classes.editBox}>
      <div className={classes.teamBox}>
        {!teamData ? (
          <>
            <TextField
              error={teamError !== null}
              id='team-id'
              label='Set Team ID'
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              value={team}
              margin='dense'
              autoComplete='team-id'
              type='number'
              variant='outlined'
              helperText={teamError !== null ? 'Invalid Team ID' : ''}
            />
            <Button
              onClick={handleSetTeam}
              variant='contained'
              size='small'
              color='secondary'
              className={classes.editActionsButton}>
              Set Team
            </Button>
          </>
        ) : (
          <div className={classes.selectedIdsBox}>
            <div className={classes.selectedIds}>
              <Typography variant='subtitle1' gutterBottom>
                Team: {team}
              </Typography>
            </div>
            <div className={classes.selectedIds}>
              <Typography
                variant='subtitle1'
                style={{
                  color: leagueError ? '#e0004c' : 'inherit',
                }}
                gutterBottom>
                League: {leagueDisplayText}
              </Typography>
            </div>
          </div>
        )}
      </div>
      {teamData && (
        <Slide direction='up' in={!!teamData} mountOnEnter unmountOnExit>
          <div>
            <div className={classes.leagueBox}>
              <LeagueSelect
                teamData={teamData}
                setLeague={setLeague}
                callLeagueApi={callLeagueApi}
                leagueError={leagueError}
              />
              <Button
                disabled={!league}
                onClick={handleSetIds}
                variant='contained'
                size='small'
                style={{
                  backgroundColor: leagueError ? '#f6a418' : '#01f780',
                }}
                className={classes.editActionsButton}>
                Set Ids
              </Button>
            </div>
            {leagueError && (
              <div className={classes.apiLink}>
                <Typography>Try this link to force auth from FPL</Typography>
                <Button variant='outlined' size='small' onClick={getCookies}>
                  FPL API
                </Button>
              </div>
            )}
          </div>
        </Slide>
      )}
      <div>
        <Dialog
          open={isUpdating}
          aria-labelledby='alert-dialog-updating-title'
          aria-describedby='alert-dialog-updating-description'>
          <DialogTitle id='alert-dialog-updating-title'>
            {'FPL Team/League IDs'}
          </DialogTitle>
          <Typography
            variant='h5'
            align='center'
            color='secondary'
            gutterBottom>
            UPDATING
          </Typography>
        </Dialog>
      </div>
    </div>
  );
}
