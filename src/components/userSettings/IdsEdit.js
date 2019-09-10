import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';

import { IdsContext, IdsDispatchContext } from '../../contexts/idsContext';

const useStyles = makeStyles(theme => ({
  editRoot: {
    width: '100%',
  },
  editButton: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  buttonIcon: {
    marginLeft: theme.spacing(1),
  },
  editBox: {
    display: 'flex',
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
  const dispatch = useContext(IdsDispatchContext);

  const { leagueId, teamId } = useContext(IdsContext);
  const noIds = !leagueId && !teamId;
  const [isEdit, setIsEdit] = useState(noIds ? true : false);
  const [ids, setIds] = useState(initialState);

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
    setIsEdit(false);
    ids.leagueId && dispatch({ type: 'SET_LEAGUE', leagueId: ids.leagueId });
    ids.teamId && dispatch({ type: 'SET_TEAM', teamId: ids.teamId });
    setIds(initialState);
  }

  return (
    <div className={classes.editRoot}>
      {isEdit ? (
        <Slide direction='left' in={isEdit} mountOnEnter unmountOnExit>
          <form>
            <div className={classes.editBox}>
              <TextField
                id='league-id'
                label='Set League ID'
                onChange={handleChange('leagueId')}
                value={ids.leagueId}
                autoComplete='league-id'
                type='number'
                margin='normal'
                variant='outlined'
                inputProps={{
                  maxLength: 8,
                }}
              />
              <TextField
                id='team-id'
                label='Set Team ID'
                onChange={handleChange('teamId')}
                value={ids.teamId}
                autoComplete='team-id'
                type='number'
                margin='normal'
                variant='outlined'
                inputProps={{
                  max: '99999999',
                }}
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
          Edit IDs
          <EditIcon className={classes.buttonIcon} />
        </Button>
      )}
    </div>
  );
}
