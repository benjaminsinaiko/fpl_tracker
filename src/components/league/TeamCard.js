import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  cardRoot: {
    width: 305,
    height: 'fit-content',
    flex: '0 0 auto',
    margin: theme.spacing(2),
  },
  avatar: {
    backgroundColor: '#f6247b',
  },
  nameContent: {
    height: 50,
    backgroundColor: '#01f780',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  teamValue: {
    display: 'flex',
    justifyContent: 'space-around',
    textAlign: 'center',
  },
  teamChips: {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    padding: 0,
    '& div': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: 75,
      border: '1px solid #e7e7e7',
    },
    '& p:last-child': {
      fontSize: '.7em',
      color: '#f6247b',
    },
  },
  totals: {
    width: '60%',
    display: 'flex',
    justifyContent: 'space-between',
    '& p:last-child': {
      color: '#f6247b',
    },
  },
  historyTitle: {
    fontSize: '1.3em',
    color: '#fff',
    backgroundColor: '#320336',
    '& h6': {
      marginLeft: theme.spacing(2),
    },
    '& svg': {
      color: '#fff',
    },
  },
  history: {
    background: '#320336',
    height: '100%',
    color: '#fff',
  },
  historyHeaders: {
    display: 'flex',
    justifyContent: 'center',
    '& h6, p': {
      textAlign: 'center',
      width: '33%',
    },
    '& p': {
      color: '#e2f700',
    },
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function TeamCard({ teamData, expanded, setExpanded }) {
  const classes = useStyles();
  const { current, past, chips } = teamData;

  if (!teamData) {
    return null;
  }

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  function rankMove(rank, prevRank) {
    const movement = rank - prevRank;
    if (movement < 0) {
      return '#01f780';
    } else if (movement > 0) {
      return '#e0004c';
    } else {
      return '#6f6f68';
    }
  }

  function chipUsed(chipName) {
    const chip = chips.find(chip => chip.name === chipName);
    return chip || false;
  }

  return (
    <Card className={classes.cardRoot} raised>
      <CardHeader
        avatar={
          <Avatar
            aria-label='rank'
            style={{
              backgroundColor: rankMove(teamData.rank, teamData.last_rank),
            }}>
            {teamData.rank}
          </Avatar>
        }
        action={
          <Typography aria-label='points'>{current.totalPoints}pts</Typography>
        }
        title={`Global Rank: ${
          current.overallRank ? current.overallRank.toLocaleString('en') : '-'
        }`}
        subheader={`GW Rank: ${
          current.gwRank ? current.gwRank.toLocaleString('en') : '-'
        }`}
      />
      <CardContent className={classes.nameContent}>
        <Typography variant='h5'>{teamData.entry_name}</Typography>
        <Typography variant='subtitle1'>{teamData.player_name}</Typography>
      </CardContent>
      <CardContent className={classes.teamValue}>
        <div>
          <Typography variant='subtitle1'>Value</Typography>
          <Typography variant='subtitle2'>{current.value / 10}</Typography>
        </div>
        <div>
          <Typography variant='subtitle1'>Bank</Typography>
          <Typography variant='subtitle2'>{current.bank / 10}</Typography>
        </div>
      </CardContent>
      <CardContent className={classes.teamChips}>
        <div
          style={{
            backgroundColor: chipUsed('wildcard') ? '#04e8f7' : null,
          }}>
          <Typography variant='body1'>Wildcard</Typography>
          <Typography variant='body2'>
            {chipUsed('wildcard')
              ? `Used in GW ${chipUsed('wildcard').event}`
              : 'Not Used'}
          </Typography>
        </div>
        <div
          style={{
            backgroundColor: chipUsed('3xc') ? '#04e8f7' : null,
          }}>
          <Typography variant='body1'>Triple Captain</Typography>
          <Typography variant='body2'>
            {chipUsed('3xc')
              ? `Used in GW ${chipUsed('wildcard').event}`
              : 'Not Used'}
          </Typography>
        </div>
        <div
          style={{
            backgroundColor: chipUsed('bboost') ? '#04e8f7' : null,
          }}>
          <Typography variant='body1'>Bench Boost</Typography>
          <Typography variant='body2'>
            {chipUsed('bboost')
              ? `Used in GW ${chipUsed('wildcard').event}`
              : 'Not Used'}
          </Typography>
        </div>
        <div
          style={{
            backgroundColor: chipUsed('freehit') ? '#04e8f7' : null,
          }}>
          <Typography variant='body1'>Free Hit</Typography>
          <Typography variant='body2'>
            {chipUsed('freehit')
              ? `Used in GW ${chipUsed('wildcard').event}`
              : 'Not Used'}
          </Typography>
        </div>
      </CardContent>
      <CardContent>
        <div className={classes.totals}>
          <Typography>Total Transfers:</Typography>
          <Typography>{current.totalTransfers}</Typography>
        </div>
        <div className={classes.totals}>
          <Typography>Cost of Transfers:</Typography>
          <Typography>{current.totalTransfersCost}</Typography>
        </div>
        <div className={classes.totals}>
          <Typography>Points on Bench:</Typography>
          <Typography>{current.totalBenchPoints}</Typography>
        </div>
      </CardContent>
      <CardActions className={classes.historyTitle}>
        <Typography variant='subtitle1'>Player History</Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'>
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent className={classes.history}>
          {past.length ? (
            <>
              <div className={classes.historyHeaders}>
                <Typography variant='subtitle1' gutterBottom>
                  Season
                </Typography>
                <Typography variant='subtitle1' gutterBottom>
                  Total Points
                </Typography>
                <Typography variant='subtitle1' gutterBottom>
                  Rank
                </Typography>
              </div>
              {past.reverse().map(year => (
                <div key={year.season_name} className={classes.historyHeaders}>
                  <Typography variant='body1'>{year.season_name}</Typography>
                  <Typography variant='body1'>{year.total_points}</Typography>
                  <Typography variant='body1'>
                    {year.rank.toLocaleString('en')}
                  </Typography>
                </div>
              ))}
            </>
          ) : (
            <div>No History</div>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}
