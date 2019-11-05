export function getTeamUrl(team) {
  return `/api/entry/${team.entry}/`;
}

export function convertTeamData(teamData) {
  const currentGW = teamData[teamData.length - 1];
  const currentTotals = {
    totalPoints: currentGW.total_points,
    gwRank: currentGW.rank,
    overallRank: currentGW.overall_rank,
    value: currentGW.value,
    bank: currentGW.bank,
  };
  const allTotals = teamData.reduce(
    (acc, cur) => {
      acc['totalTransfers'] = acc.totalTransfers + cur.event_transfers;
      acc['totalTransfersCost'] =
        acc.totalTransfersCost + cur.event_transfers_cost;
      acc['totalBenchPoints'] = acc.totalBenchPoints + cur.points_on_bench;
      return acc;
    },
    {
      totalTransfers: 0,
      totalTransfersCost: 0,
      totalBenchPoints: 0,
    },
  );
  return { ...currentTotals, ...allTotals };
}

export function countWeeklyWins(teamId, allWinners) {
  return allWinners.reduce((acc, week) => {
    const isWinner = week.winners.find(winner => winner.id === teamId);
    return isWinner ? acc + 1 / week.winners.length : acc;
  }, 0);
}

export function getCurrentGW(events) {
  const currentGW = events.find(event => event.is_current === true);
  return currentGW;
}

export function getNextGW(events) {
  const nextGW = events.find(event => event.is_next === true);
  return nextGW;
}

export function getPlayerName(playerId, allPlayers) {
  const player = allPlayers.find(playerData => playerData.id === playerId);
  return `${player.first_name[0]}. ${player.second_name}`;
}

export function addPosition(positionId) {
  switch (positionId) {
    case 1: {
      return { singular_name: 'Goalkeeper', singular_name_short: 'GKP' };
    }
    case 2: {
      return { singular_name: 'Defender', singular_name_short: 'DEF' };
    }
    case 3: {
      return { singular_name: 'Midfielder', singular_name_short: 'MID' };
    }
    case 4: {
      return { singular_name: 'Forward', singular_name_short: 'FWD' };
    }
    default:
      return;
  }
}
