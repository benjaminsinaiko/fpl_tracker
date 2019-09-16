import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  cardRoot: {
    width: 345,
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
    backgroundColor: '#e7e7e7',
    '& div': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      border: '1px solid black',
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
    marginLeft: theme.spacing(2),
    fontSize: '1.3em',
    color: '#320336',
  },
  history: {
    background: '#320336',
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

export default function TeamCard({ teamData, rank }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(true);
  const { current, past, chips } = teamData;

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  function chipUsed(chipName) {
    const used = chips.some(chip => {
      return chip.name === chipName;
    });
    return used ? '#04e8f7' : null;
  }

  if (!teamData) {
    return null;
  }

  return (
    <div>
      <Card className={classes.cardRoot}>
        <CardHeader
          avatar={
            <Avatar aria-label='rank' className={classes.avatar}>
              {rank + 1}
            </Avatar>
          }
          action={
            <Typography aria-label='points'>
              {current.totalPoints}pts
            </Typography>
          }
          title={`Global Rank: ${current.overallRank.toLocaleString('en')}`}
          subheader={`GW Rank: ${current.gwRank.toLocaleString('en')}`}
        />
        <CardContent className={classes.nameContent}>
          <Typography variant='h5'>salahdtrossar</Typography>
          <Typography variant='subtitle1'>alex balick</Typography>
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
              backgroundColor: chipUsed('wildcard'),
            }}>
            <Typography variant='body1'>Wildcard</Typography>
          </div>
          <div
            style={{
              backgroundColor: chipUsed('3xc'),
            }}>
            <Typography variant='body1'>Triple Captain</Typography>
          </div>
          <div
            style={{
              backgroundColor: chipUsed('bboost'),
            }}>
            <Typography variant='body1'>Bench Boost</Typography>
          </div>
          <div
            style={{
              backgroundColor: chipUsed('freehit'),
            }}>
            <Typography variant='body1'>Free Hit</Typography>
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
        <CardActions>
          <Typography variant='subtitle1' className={classes.historyTitle}>
            Player History
          </Typography>
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
                  <div
                    key={year.season_name}
                    className={classes.historyHeaders}>
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
    </div>
  );
}
