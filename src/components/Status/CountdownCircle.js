import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  const d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(' ');

  return d;
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100,
    height: 100,
  },
}));

export default function CountdownCircle({ radius }) {
  const classes = useStyles();

  return (
    <svg className={classes.root}>
      <path
        fill='none'
        stroke={radius > 275 ? '#e0004c' : '#01f780'}
        strokeWidth='4'
        d={describeArc(50, 50, 48, 0, radius)}
      />
    </svg>
  );
}
