import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
  },
}));

export default function LeagueTeamCards({ teams }) {
  const classes = useStyles();
  const [cardData, setCardData] = useState();
  const [expanded, setExpanded] = useState(false);

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

  return (
    <div className={classes.teamCardRoot}>
      <div className={classes.scrollWrapper}>
        {cardData &&
          cardData.map(card => (
            <TeamCard
              key={card.id}
              teamData={card}
              expanded={expanded}
              setExpanded={setExpanded}
              className={classes.scrollCard}
            />
          ))}
      </div>
    </div>
  );
}
