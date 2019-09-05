import React from 'react';
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
          <Button variant="outlined" color="primary">
            Set
          </Button>
        </div>
      </Drawer>
    </div>
  );
}
