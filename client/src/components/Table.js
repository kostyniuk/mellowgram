import React from 'react';
import {
  makeStyles,
  withStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import '../styles/table.css';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'iCiel Gotham',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

const StyledTableCellField = withStyles((theme) => ({
  root: {
    border: 'none',
    borderColor: 'black',
  },
  body: {
    fontSize: 14,
    backgroundColor: 'rgb(44, 44, 44)',
    color: 'rgb(177, 176, 176)',
  },
}))(TableCell);

const StyledTableCellValue = withStyles((theme) => ({
  root: {
    border: 'none',
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
    font: 'iCiel Gotham',
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

const SimpleTable = ({ tab }) => {
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
    Object.keys(obj).map((field, i) => ({ field, value: obj[field] }));

  const infoRows = adjustToTable(information);

  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableBody>
            {infoRows.map((row) => (
              <StyledTableRow key={row.field}>
                <StyledTableCellField align='left'>
                  {row.field}
                </StyledTableCellField>
                <StyledTableCellValue align='left'>
                  {tab === 'overview' ? (
                    row.value
                  ) : (
                    <input id='txt' value={row.value} />
                  )}
                </StyledTableCellValue>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export default SimpleTable;
