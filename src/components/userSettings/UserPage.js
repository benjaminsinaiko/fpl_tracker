import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';

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
    minHeight: 300,
    border: '4px solid #04e8f7',
  },
}));

export default function UserPage() {
  const classes = useStyles();
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    setShowPage(true);
    return () => {
      setShowPage(false);
    };
  }, []);

  function handleClose() {
    setShowPage(false);
    setTimeout(() => {
      if (window.history.length > 2) {
        window.history.back();
      } else {
        navigate('/');
      }
    }, 1000);
  }

  return (
    <Fade in={showPage} timeout={1500}>
      <div className={classes.userRoot}>
        <UserCloseBtn handleClose={handleClose} />
        <Paper elevation={12} className={classes.editBox}>
          <IDsDisplay />
          <IDsEdit handleClose={handleClose} />
        </Paper>
      </div>
    </Fade>
  );
}
