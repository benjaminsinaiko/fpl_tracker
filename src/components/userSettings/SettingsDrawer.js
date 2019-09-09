import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { IdsContext, IdsDispatchContext } from '../../contexts/idsContext';
import IdDisplay from './IdDisplay';
import IdEdit from './IdsEdit';

const useStyles = makeStyles(theme => ({
  drawerRoot: {
    border: '1px red',
    width: '100%',
    height: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
    backgroundColor: '#04e8f7',
  },
  idSection: {
    border: '1px solid red',
    maxWidth: 600,
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      width: '90vw',
    },
  },
}));

export default function SettingsDrawer({ open, toggle }) {
  const classes = useStyles();
  const ids = useContext(IdsContext);
  const dispatch = useContext(IdsDispatchContext);

  function handleSetTeam(params) {
    dispatch({ type: 'SET_TEAM', teamId: 12345 });
  }
  function handleClearTeam(params) {
    dispatch({ type: 'CLEAR_TEAM' });
  }

  return (
    <Drawer anchor='bottom' open={open} onClose={toggle(false)}>
      <div className={classes.drawerRoot}>
        <div className={classes.idSection}>
          <IdDisplay />
          <IdEdit />
          {/* <Typography>Enter Team and League</Typography>
          <TextField
            id='outlined-number'
            label='Team Number'
            type='number'
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin='normal'
            variant='outlined'
          />
          <Button variant='outlined' color='primary' onClick={handleSetTeam}>
            Set
          </Button>
          <Button variant='outlined' color='primary' onClick={handleClearTeam}>
            clear
          </Button> */}
        </div>
      </div>
    </Drawer>
  );
}
