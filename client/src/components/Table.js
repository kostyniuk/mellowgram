import React from 'react';
import {
  makeStyles,
  withStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core';

import { adjustToTable } from '../helpers';

import '../styles/input.css';
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

const SimpleTable = ({ tab, data, handler }) => {
  const classes = useStyles();
  console.log({ data });
  const infoRows = adjustToTable(data);
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
                    <input
                      id='txt'
                      name={row.field}
                      value={row.value}
                      onChange={handler}
                    />
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
