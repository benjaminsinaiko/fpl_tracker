import React, { useState, useEffect, useContext } from 'react';
import { ResponsivePie } from '@nivo/pie';
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

function makeChartData(pointsObj) {
  const total = Object.values(pointsObj).reduce((acc, cur) => acc + cur);
  const data = Object.entries(pointsObj).map(pos => {
    return { id: pos[0], label: pos[0], value: pos[1] };
  });
  return [[...data], total];
}

export default function PointsPie() {
  const classes = useStyles();
  const weeklyPicks = useContext(WeeklyPicksContext);
  const [pointsByPosition, setPointsByPosition] = useState();
  const [chartData, setChartData] = useState();
  const [btnIndex, setBtnIndex] = useState(1);

  useEffect(() => {
    function getPoints() {
      const points = getPtsByPosition(weeklyPicks.flat());
      setPointsByPosition(points);
    }
    weeklyPicks && getPoints();
  }, [weeklyPicks]);

  useEffect(() => {
    function makeChart() {
      const dataArray = pointsByPosition.map(ptsType => {
        return makeChartData(ptsType);
      });
      setChartData(dataArray);
    }
    pointsByPosition && makeChart();
  }, [pointsByPosition]);

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
        Total - {chartData[btnIndex][1]}
      </Typography>
      <ResponsivePie
        data={chartData[btnIndex][0]}
        margin={{ top: -20, right: 50, bottom: 120, left: 50 }}
        startAngle={-90}
        endAngle={270}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={['#e2f700', '#04e8f7', '#01f780', '#f6247b']}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor='#333333'
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={10}
        radialLabelsLinkHorizontalLength={10}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: 'color' }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor='#333333'
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        tooltip={({ id, value, color }) => (
          <div style={{ color }}>
            {id}: {value} ({Math.floor((value / chartData[btnIndex][1]) * 100)}
            %)
            <hr />
            Total: {chartData[btnIndex][1]}
          </div>
        )}
        theme={{
          tooltip: {
            container: {
              background: '#333',
            },
          },
        }}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            translateY: -10,
            itemWidth: 70,
            itemHeight: 18,
            itemTextColor: '#999',
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}
