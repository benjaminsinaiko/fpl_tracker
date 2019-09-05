import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { IdsContext, IdsDispatchContext } from '../contexts/idsContext';

const useStyles = makeStyles(theme => ({
  drawerRoot: {
    width: 350,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
  },
}));

export default function NavDrawer({ open, toggle }) {
  const classes = useStyles();
  const ids = useContext(IdsContext);
  const dispatch = useContext(IdsDispatchContext);

  console.log('ids', ids);

  function handleSetTeam(params) {
    dispatch({ type: 'SET_TEAM', teamId: 12345 });
  }
  function handleClearTeam(params) {
    dispatch({ type: 'CLEAR_TEAM' });
  }

  return (
    <div>
      <Drawer anchor="right" open={open} onClose={toggle(false)}>
        <div className={classes.drawerRoot}>
          <Typography>Enter Team and League</Typography>
          <TextField
            id="outlined-number"
            label="Team Number"
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="outlined"
          />
          <Button variant="outlined" color="primary" onClick={handleSetTeam}>
            Set
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClearTeam}>
            clear
          </Button>
        </div>
      </Drawer>
    </div>
  );
}
