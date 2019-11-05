import React, { useState, useEffect } from 'react';

import useWeeklyPlayers from '../../hooks/useWeeklyPlayers';

export default function TeamPtsDist({ myTeam: { entry, current } }) {
  const { weeklyPicks, loading } = useWeeklyPlayers(entry, current.length);

  useEffect(() => {
    console.log('weeklyPicks', weeklyPicks);
  }, [weeklyPicks]);

  if (loading) {
    return null;
  }

  return (
    <div>
      <h1>team points</h1>
    </div>
  );
}
