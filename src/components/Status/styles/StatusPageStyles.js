import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  statusRoot: {
    maxWidth: 800,
    marginBottom: 56,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

export default useStyles;
