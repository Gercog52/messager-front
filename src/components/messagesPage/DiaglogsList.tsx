import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Irooms } from '../../redux/dialogsReducerType';
import DialogItem from './DialogItem';


const useStyles = makeStyles({
  table: {
    maxWidth: 200
  },
  title: {
    textAlign: 'center'
  },
  dialogItem: {
    padding: '0 15'
  }
});


interface Iprops {
  roomsList: Irooms
}

export default function DiaglogsList(props: Iprops) {
  const classes = useStyles();
  const dialogsList = Object.values(props.roomsList).map(dialog => 
    <DialogItem key={dialog.idRoom}
                idDialog={dialog.idRoom}
                nameDialog={dialog.nameRoom}
    />
  )
  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6" id="tableTitle" className={classes.title}>
                Dialogs
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dialogsList}
        </TableBody>
      </Table>
    </TableContainer>
  );
}