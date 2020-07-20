import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  root: {
    // border: 'none',
    borderColor: 'black',
  },
  body: {
    fontSize: 14,
    backgroundColor: 'rgb(44, 44, 44)',
    color: theme.palette.common.white,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 200,
  },
});

function createData(field, value) {
  return { field, value };
}

const SimpleTable = () => {
  const classes = useStyles();

  const information = {
    username: 'steph',
    fullName: 'Stephen Curry',
    bio: 'Baller',
    occupation: 'NBA player',
    location: 'Bay Area',
    email: 'steph@gmail.com',
    phoneNumber: '123-34-132-324',
  };

  const adjustToTable = (obj) =>
    Object.keys(obj).map((field, i, ctx) => ({ field, value: obj[field] }));

  const infoRows = adjustToTable(information);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableBody>
          {infoRows.map((row) => (
            <StyledTableRow key={row.field}>
              <StyledTableCell align='left'>{row.field}</StyledTableCell>
              <StyledTableCell align='left'>{row.value}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SimpleTable;
