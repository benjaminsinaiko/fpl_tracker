import React, { useState, useEffect } from 'react';

import { convertTeamData } from '../../utils/fplDataHelpers';
import TeamCard from './TeamCard';

export default function LeagueTeamCards({ teams }) {
  const [cardData, setCardData] = useState([]);
  console.log(cardData);

  useEffect(() => {
    if (teams.length) {
      const cardData = teams.map(team => {
        const newCurrent = convertTeamData(team.current);
        return {
          id: team.id,
          past: team.past,
          chips: team.chips,
          current: newCurrent,
        };
      });
      setCardData(cardData);
    }
  }, [teams]);

  return (
    <div>
      <h1>Team cards</h1>
      {cardData.length &&
        cardData.map((card, i) => (
          <TeamCard key={card.id} teamData={card} rank={i} />
        ))}
    </div>
  );
}
