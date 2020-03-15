import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core';
import {Link} from 'react-router-dom';



interface Iprops {
  nameDialog: string
  idDialog: string
}

const useStyles = makeStyles({
  dialog: {
    padding: 0,
  },
  dialog__link: {
    boxSizing: 'border-box',
    display: 'block',
    height: '100%',
    width: '100%',
    padding: 15,
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.04)',
      cursor: 'pointer',
    },
    '&:visited': {
      color: 'rgba(0, 0, 0, 0.87)'
    }
  }
})

export default function DialogItem(props: Iprops) {
  const styles = useStyles();
  return (
    <TableRow className={styles.dialog}>
      <TableCell className={styles.dialog}>
        <Link className={styles.dialog__link} to={`/dialogs/${props.idDialog}`}>
          {props.nameDialog}
        </Link>
      </TableCell>
    </TableRow>
  )
}
