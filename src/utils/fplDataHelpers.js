export function getTeamUrl(team) {
  return `/api/entry/${team.entry}/history/`;
}

export function convertTeamData(teamData) {
  const currentGW = teamData[teamData.length - 1];
  const currentTotals = {
    totalPoints: currentGW.total_points,
    rank: currentGW.overall_rank,
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
