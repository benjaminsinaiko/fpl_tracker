import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { makeStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  barRoot: {
    width: '100%',
    maxWidth: 450,
    height: 500,
  },
  pointsBar: {
    width: '100%',
    height: '100%',
  },
}));

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

export default function PointsByPositionBar({ points }) {
  const classes = useStyles();
  const [chartData, setChartData] = useState();
  const [btnIndex, setBtnIndex] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const data = makeChartData(points[btnIndex], btnIndex);
    setChartData([data[0]]);
    setTotal(data[1]);
  }, [points, btnIndex]);

  const onSelectBtn = index => e => {
    setBtnIndex(index);
  };

  return (
    <div className={classes.pointsBar}>
      <div className={classes.buttonsGroup}>
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
      </div>
      <ResponsiveBar
        data={chartData}
        keys={['GKP', 'DEF', 'MID', 'FWD']}
        indexBy='type'
        margin={{ top: 50, right: 80, bottom: 50, left: 40 }}
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
