import React, { useState, useEffect } from 'react';

import { convertTeamData } from '../../utils/fplDataHelpers';

export default function LeagueTeamCards({ teams }) {
  const [cardData, setCardData] = useState([]);
  console.log(cardData);

  useEffect(() => {
    if (teams.length) {
      const convert = teams.map(team => convertTeamData(team.current));
      setCardData(convert);
    }
  }, [teams]);

  return (
    <div>
      <h1>Team cards</h1>
    </div>
  );
}
