import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/ClearAll';
import Slide from '@material-ui/core/Slide';

import { IdsDispatchContext } from '../../contexts/idsContext';
import IdDisplay from './IdDisplay';
import TeamSearch from './TeamSearch';

const useStyles = makeStyles(theme => ({
  editRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
  clearButton: {
    width: '30%',
    color: '#fff',
    backgroundColor: '#f6247b',
    marginTop: theme.spacing(1),
    '&:hover': {
      backgroundColor: '#f6247b',
    },
  },
  editButton: {
    width: '60%',
    marginTop: theme.spacing(1),
  },
  cancelButton: {
    color: '#e0004c',
    alignSelf: 'flex-start',
    marginLeft: 2,
    marginBottom: theme.spacing(1),
  },
  buttonIcon: {
    marginLeft: theme.spacing(1),
  },
}));

export default function IdsEdit() {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useContext(IdsDispatchContext);

  function handleOpenEdit() {
    setIsEdit(true);
  }

  function handleCancel() {
    setIsEdit(false);
  }

  function handleClear() {
    dispatch({ type: 'CLEAR_IDS' });
  }

  return (
    <div className={classes.editRoot}>
      {isEdit ? (
        <Slide direction='up' in={isEdit} mountOnEnter unmountOnExit>
          <div>
            <Button
              onClick={handleCancel}
              size='small'
              className={classes.cancelButton}>
              Cancel
            </Button>
            <TeamSearch handleCancel={handleCancel} />
          </div>
        </Slide>
      ) : (
        <>
          <IdDisplay />
          <div className={classes.buttonGroup}>
            <Button
              onClick={handleClear}
              variant='contained'
              className={classes.clearButton}>
              Clear
              <ClearIcon className={classes.buttonIcon} />
            </Button>
            <Button
              onClick={handleOpenEdit}
              variant='contained'
              color='primary'
              className={classes.editButton}>
              Add / Edit
              <EditIcon className={classes.buttonIcon} />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
