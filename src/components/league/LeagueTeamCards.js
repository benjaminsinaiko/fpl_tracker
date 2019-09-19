import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import NextIcon from '@material-ui/icons/NavigateNext';
import BeforeIcon from '@material-ui/icons/NavigateBefore';

import { convertTeamData } from '../../utils/fplDataHelpers';
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

export default function LeagueTeamCards({ teams }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [cardData, setCardData] = useState();
  const [page, setPage] = useState(0);
  const numPages = Math.ceil(teams.length / cardsPerPage) - 1;

  console.log('page', page);

  useEffect(() => {
    if (teams.length) {
      const cardData = teams.map(team => {
        const newCurrent = convertTeamData(team.current);
        return {
          ...team,
          past: team.past,
          chips: team.chips,
          current: newCurrent,
        };
      });
      setCardData(cardData);
    }
  }, [teams]);

  function handlePageNext() {
    setPage(page => page + 1);
  }
  function handlePageBack() {
    setPage(page => page - 1);
  }

  return (
    <div className={classes.teamCardRoot}>
      <div className={classes.scrollWrapper}>
        {page > 0 ? (
          <IconButton onClick={handlePageBack}>
            <BeforeIcon className={classes.nextIcon} />
          </IconButton>
        ) : null}
        {cardData &&
          cardData
            .slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage)
            .map(card => (
              <TeamCard
                key={card.id}
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
