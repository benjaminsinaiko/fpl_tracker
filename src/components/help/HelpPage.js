import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import fpl_home from '../../ui/assets/fpl_home.png';
import fpl_pts from '../../ui/assets/fpl_pts.png';
import fpl_teamID from '../../ui/assets/fpl_teamID.png';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2),
    marginBottom: 70,
    '& img': {
      maxWidth: 600,
    },
    '& hr': {
      margin: theme.spacing(2),
      backgroundColor: '#8d36f7',
    },
    [theme.breakpoints.down('xs')]: {
      '& img': {
        width: '100%',
      },
    },
  },
  header: {
    fontSize: '3em',
    color: '#320336',
    [theme.breakpoints.down('xs')]: {
      fontSize: '2em',
    },
  },
  teamHelp: {
    color: '#8d36f7',
  },
  stepItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& a': {
      color: '#0155a2',
    },
    [theme.breakpoints.down('xs')]: {
      '& a': {
        fontSize: '.7em',
      },
      '& p:first-child': {
        fontSize: '.9em',
      },
    },
  },
  secondaryListItem: {
    color: '#6f6f68',
    [theme.breakpoints.down('xs')]: {
      fontSize: '.7em',
    },
  },
  teamID: {
    color: '#0155a2',
  },
}));

export default function HelpPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        className={classes.header}
        variant='h1'
        align='center'
        gutterBottom>
        FPL Tracker Help
      </Typography>
      <div>
        <List>
          <Typography variant='h6' className={classes.teamHelp}>
            Finding your Team ID
          </Typography>
          <ListItem className={classes.stepItem}>
            <Typography>
              Go to the FPL website:{' '}
              <a
                href='https://fantasy.premierleague.com/'
                target='_blank'
                rel='noopener noreferrer'>
                https://fantasy.premierleague.com
              </a>
            </Typography>
          </ListItem>
          <ListItem>
            <img src={fpl_home} alt='fpl home page demo' />
          </ListItem>
          <Divider variant='middle' />
          <ListItem className={classes.stepItem}>
            <Typography>Log in (if not already)</Typography>
          </ListItem>
          <Divider variant='middle' />
          <ListItem className={classes.stepItem}>
            <Typography>Click on the Points tab</Typography>
          </ListItem>
          <ListItem>
            <img src={fpl_pts} alt='fpl points tab demo' />
          </ListItem>
          <Divider variant='middle' />
          <ListItem className={classes.stepItem}>
            <Typography gutterBottom>Find Team ID number in URL</Typography>
            <Typography className={classes.secondaryListItem}>
              https://fantasy.premierleague.com/entry/
              <span className={classes.teamID}>{`{TEAM_ID}`}</span>/...
            </Typography>
          </ListItem>
          <ListItem>
            <img src={fpl_teamID} alt='fpl team idea location' />
          </ListItem>
        </List>
        <List>
          <Typography variant='h6' className={classes.teamHelp}>
            Issues with League Auth
          </Typography>
          <ListItem className={classes.stepItem}>
            <Typography gutterBottom>
              If there is an Auth Error try:{' '}
            </Typography>
            <Typography className={classes.secondaryListItem}>
              - Log out of Official FPL site, and back in{' '}
              <span role='img' aria-label='not thrilled face'>
                😩
              </span>{' '}
            </Typography>
            <Typography className={classes.secondaryListItem}>
              - Try the link in Settings to grab cookies from FPL Site...
            </Typography>
            <Typography className={classes.secondaryListItem}>
              ...then try entering IDs again.
            </Typography>
          </ListItem>
        </List>
      </div>
    </div>
  );
}
