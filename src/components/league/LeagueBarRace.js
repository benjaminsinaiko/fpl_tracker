import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { ResponsiveBar } from '@nivo/bar';

const useStyles = makeStyles(theme => ({
  raceRoot: {
    width: 800,
    height: 650,
    border: '1px solid red',
    [theme.breakpoints.down('xs')]: {
      width: 350,
    },
  },
}));

const barColors = [
  '#f6247b',
  '#e2f700',
  '#01f780',
  '#04e8f7',
  '#8d36f7',
  '#e0004c',
  '#f6a418',
  '#0155a2',
  '#320336',
  '#006831',
];

const BarComponent = props => {
  return (
    <g transform={`translate(${props.x},${props.y})`}>
      <rect
        x={-3}
        y={7}
        width={props.width}
        height={props.height}
        fill='rgba(0, 0, 0, .07)'
      />
      <rect width={props.width} height={props.height} fill={props.color} />
      <rect
        x={props.width - 5}
        width={5}
        height={props.height}
        fill={props.borderColor}
        fillOpacity={0.2}
      />
      <text
        x={props.width - 16}
        y={props.height / 2 - 8}
        textAnchor='end'
        dominantBaseline='central'
        fill={props.labelTextColor}
        style={{
          fontWeight: 900,
          fontSize: 18,
        }}>
        {props.data.indexValue}
      </text>
      <text
        x={props.width - 16}
        y={props.height / 2 + 10}
        textAnchor='end'
        dominantBaseline='central'
        fill={props.borderColor}
        style={{
          fontWeight: 700,
          fontSize: 15,
        }}>
        {props.data.value}
      </text>
    </g>
  );
};

export default function LeagueBarRace({ leagueTeams }) {
  const classes = useStyles();
  const [current, setCurrent] = useState(0);
  const [leaguePoints, setLeaguePoints] = useState(null);

  useEffect(() => {
    let weeklyPoints;
    if (leagueTeams.length) {
      weeklyPoints = leagueTeams.reduce((acc, team) => {
        team.current.forEach((week, i) => {
          if (!acc[i]) {
            acc[i] = [];
          }
          acc[i].push({ id: team.entry_name, value: week.total_points });
        });

        return acc;
      }, []);
      setLeaguePoints(weeklyPoints);
    }
  }, [leagueTeams]);

  function weekInc() {
    if (current < leaguePoints.length - 1) {
      const timer = setInterval(() => {
        setCurrent(cur => cur + 1);
        clearInterval(timer);
      }, 2000);
    }
  }

  useEffect(() => {
    // leaguePoints && weekInc();
  }, [leaguePoints, current]);

  if (!leaguePoints) {
    return null;
  }

  const barData = leaguePoints[current]
    .sort((a, b) => a.value - b.value)
    .slice(0, 10);

  return (
    <div className={classes.raceRoot}>
      <Typography variant='h6'>Pts Race - GW {current + 1}</Typography>
      <ResponsiveBar
        layout='horizontal'
        margin={{ top: 26, right: 10, bottom: 26, left: 10 }}
        data={barData}
        indexBy='id'
        keys={['value']}
        colors={barColors}
        colorBy='indexValue'
        borderColor={{ from: 'color', modifiers: [['darker', 2.6]] }}
        enableGridX
        enableGridY={false}
        axisTop={{
          format: '~s',
        }}
        axisBottom={{
          format: '~s',
        }}
        axisLeft={null}
        padding={0.3}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.4]] }}
        isInteractive={false}
        barComponent={BarComponent}
        motionStiffness={170}
        motionDamping={26}
      />
    </div>
  );
}
