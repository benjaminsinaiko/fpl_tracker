import React, { useState, useEffect, useContext } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { makeStyles } from '@material-ui/core/styles';

import { WeeklyPicksContext } from '../../contexts/weeklyPicksContext';

const useStyles = makeStyles(theme => ({
  avgBar: {
    width: '100%',
    height: '100%',
    marginBottom: 60,
  },
}));

function getAvgPts(gameweeks) {
  const sumCount = gameweeks.reduce(
    (acc, player) => {
      if (player.multiplier > 0) {
        acc[player.position.singular_name_short][0] += player.gw_points;
        acc[player.position.singular_name_short][1]++;
      }
      return acc;
    },
    { GKP: [0, 0], DEF: [0, 0], MID: [0, 0], FWD: [0, 0] },
  );
  const avgData = [
    { position: 'GKP', avg: +(sumCount.GKP[0] / sumCount.GKP[1]).toFixed(2) },
    { position: 'DEF', avg: +(sumCount.DEF[0] / sumCount.DEF[1]).toFixed(2) },
    { position: 'MID', avg: +(sumCount.MID[0] / sumCount.MID[1]).toFixed(2) },
    { position: 'FWD', avg: +(sumCount.FWD[0] / sumCount.FWD[1]).toFixed(2) },
  ];
  return avgData;
}

export default function AvgPointsPositionBar() {
  const classes = useStyles();
  const weeklyPicks = useContext(WeeklyPicksContext);
  const [chartData, setChartData] = useState();

  useEffect(() => {
    function avg() {
      const avgPts = getAvgPts(weeklyPicks.flat());
      setChartData(avgPts);
    }
    weeklyPicks && avg();
  }, [weeklyPicks]);

  if (!weeklyPicks) {
    return null;
  }

  return (
    <div className={classes.avgBar}>
      <ResponsiveBar
        data={chartData}
        keys={['avg']}
        indexBy='position'
        margin={{ top: 10, right: 40, bottom: 100, left: 40 }}
        padding={0.25}
        groupMode='stacked'
        colorBy='index'
        colors={['#e2f700', '#04e8f7', '#01f780', '#f6247b']}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        tooltip={({ id, value, color }) => (
          <div style={{ color }}>
            {id}: {value} pts
          </div>
        )}
        theme={{
          tooltip: {
            container: {
              background: '#333',
            },
          },
        }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
}
