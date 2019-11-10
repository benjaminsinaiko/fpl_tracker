import React, { useState, useEffect, useContext } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

import { WeeklyPicksContext } from '../../contexts/weeklyPicksContext';

const useStyles = makeStyles(theme => ({
  pointsBar: {
    width: '100%',
    height: '100%',
  },
}));

function getPtsByPosition(gameweek) {
  return gameweek.reduce(
    (acc, player) => {
      acc[0][player.position.singular_name_short] += player.gw_points;
      if (player.multiplier > 0) {
        acc[1][player.position.singular_name_short] += player.gw_points;
      } else {
        acc[2][player.position.singular_name_short] += player.gw_points;
      }
      return acc;
    },
    [
      { GKP: 0, DEF: 0, MID: 0, FWD: 0 },
      { GKP: 0, DEF: 0, MID: 0, FWD: 0 },
      { GKP: 0, DEF: 0, MID: 0, FWD: 0 },
    ],
  );
}

function makeChartData(pointsObj, index) {
  const total = calcTotal(pointsObj);
  let type;
  switch (index) {
    case 0: {
      type = 'All Points';
      break;
    }
    case 1: {
      type = 'Played Points';
      break;
    }
    case 2: {
      type = 'Bench Points';
      break;
    }
    default: {
      break;
    }
  }
  return [
    {
      type: type,
      ...pointsObj,
    },
    total,
  ];
}

function calcTotal(ptsObj) {
  return Object.values(ptsObj).reduce((acc, cur) => acc + cur);
}

export default function PointsByPositionBar() {
  const classes = useStyles();
  const weeklyPicks = useContext(WeeklyPicksContext);
  const [pointsByPosition, setPointsByPosition] = useState();
  const [chartData, setChartData] = useState();
  const [btnIndex, setBtnIndex] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    function getPoints() {
      const points = getPtsByPosition(weeklyPicks.flat());
      setPointsByPosition(points);
    }
    weeklyPicks && getPoints();
  }, [weeklyPicks]);

  useEffect(() => {
    function makeChart() {
      const data = makeChartData(pointsByPosition[btnIndex], btnIndex);
      setChartData([data[0]]);
      setTotal(data[1]);
    }
    pointsByPosition && makeChart();
  }, [pointsByPosition, btnIndex]);

  const onSelectBtn = index => e => {
    setBtnIndex(index);
  };

  if (!chartData) {
    return null;
  }

  return (
    <div className={classes.pointsBar}>
      <ButtonGroup fullWidth aria-label='full width outlined button group'>
        <Button
          variant={btnIndex === 0 ? 'contained' : 'outlined'}
          color='primary'
          onClick={onSelectBtn(0)}>
          All
        </Button>
        <Button
          variant={btnIndex === 1 ? 'contained' : 'outlined'}
          color='primary'
          onClick={onSelectBtn(1)}>
          Played
        </Button>
        <Button
          variant={btnIndex === 2 ? 'contained' : 'outlined'}
          color='primary'
          onClick={onSelectBtn(2)}>
          Bench
        </Button>
      </ButtonGroup>
      <Typography align='center' style={{ marginTop: 10 }}>
        Total - {total}
      </Typography>
      <ResponsiveBar
        data={chartData}
        keys={['GKP', 'DEF', 'MID', 'FWD']}
        indexBy='type'
        margin={{ top: 10, right: 80, bottom: 150, left: 40 }}
        padding={0.25}
        groupMode='stacked'
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
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        tooltip={({ id, value, color }) => (
          <div style={{ color }}>
            {id}: {value} ({Math.floor((value / total) * 100)}%)
            <hr />
            Total: {total}
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
