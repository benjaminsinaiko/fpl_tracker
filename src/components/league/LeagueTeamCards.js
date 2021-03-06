import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import NextIcon from '@material-ui/icons/NavigateNext';
import BeforeIcon from '@material-ui/icons/NavigateBefore';

import { LeagueTeamsContext } from '../../contexts/leagueTeamsContext';
import TeamCard from './TeamCard';

const useStyles = makeStyles(theme => ({
  teamCardRoot: {
    width: '100%',
    overflow: 'hidden',
    marginBottom: theme.spacing(2),
  },
  scrollWrapper: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
      width: 0,
      background: 'transparent',
    },
    '&::-ms-overflow-style': '-ms-autohiding-scrollbar',
    '&::-webkit-overflow-scrolling': 'touch',
  },
  nextIcon: {
    margin: theme.spacing(-2),
    alignSelf: 'center',
    color: '#f6a418',
    fontSize: 70,
  },
}));

const cardsPerPage = 10;

export default function LeagueTeamCards() {
  const classes = useStyles();
  const { leagueTeams } = useContext(LeagueTeamsContext);
  const [expanded, setExpanded] = useState(false);
  const [page, setPage] = useState(0);
  const numPages = Math.ceil(leagueTeams.length / cardsPerPage) - 1;

  function handlePageNext() {
    setPage(page => page + 1);
  }
  function handlePageBack() {
    setPage(page => page - 1);
  }

  if (!leagueTeams) {
    return null;
  }

  return (
    <div className={classes.teamCardRoot}>
      <div className={classes.scrollWrapper}>
        {page > 0 ? (
          <IconButton onClick={handlePageBack}>
            <BeforeIcon className={classes.nextIcon} />
          </IconButton>
        ) : null}
        {leagueTeams
          .slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage)
          .map(card => (
            <TeamCard
              key={card.entry}
              teamData={card}
              expanded={expanded}
              setExpanded={setExpanded}
              className={classes.scrollCard}
            />
          ))}
        {page < numPages ? (
          <IconButton onClick={handlePageNext}>
            <NextIcon className={classes.nextIcon} />
          </IconButton>
        ) : null}
      </div>
    </div>
  );
}
