import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import UserCloseBtn from './UserCloseBtn';
import IDsDisplay from './IDsDisplay';
import IDsEdit from './IDsEdit';

const useStyles = makeStyles(theme => ({
  userRoot: {
    width: '100%',
    minHeight: '50vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBox: {
    width: '100%',
    maxWidth: 650,
  },
}));

export default function UserPage() {
  const classes = useStyles();

  return (
    <div className={classes.userRoot}>
      <UserCloseBtn />
      <div className={classes.editBox}>
        <IDsDisplay />
        <IDsEdit />
      </div>
    </div>
  );
}
