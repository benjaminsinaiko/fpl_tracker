export function getTeamUrl(team) {
  return `/api/entry/${team}/`;
}

export function getLeagueUrl(leagueId) {
  return `/api/leagues-classic/${leagueId}/standings/?page_new_entries=1&page_standings=1&phase=1`;
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
      return {
        singular_name: 'Goalkeeper',
        singular_name_short: 'GKP',
        elementy_type: 1,
      };
    }
    case 2: {
      return {
        singular_name: 'Defender',
        singular_name_short: 'DEF',
        elementy_type: 2,
      };
    }
    case 3: {
      return {
        singular_name: 'Midfielder',
        singular_name_short: 'MID',
        elementy_type: 3,
      };
    }
    case 4: {
      return {
        singular_name: 'Forward',
        singular_name_short: 'FWD',
        elementy_type: 4,
      };
    }
    default:
      return;
  }
}
