import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export interface NTableColEntry {
  style?: React.CSSProperties;
  id?: string | number;
  data?:
    | null
    | string
    | number
    | React.ReactNode;
  value?:
    | null
    | string
    | number;
}

export interface NTableRowEntry {
  style?: React.CSSProperties;
  data?: NTableColEntry[];
  id?: number | string;
}

export interface NTableProps {
  loading?: boolean;
  headers: NTableColEntry[];
  rows: NTableRowEntry[];
  tableStyle?: React.CSSProperties;
  tableHeaderStyle?: React.CSSProperties;
  tableBodyStyle?: React.CSSProperties;
}

export default function BasicTable(
  props: NTableProps
) {
  return (
    <TableContainer
      component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label='simple table'>
        <TableHead>
          <TableRow>
            {props.headers.map(
              (header) => (
                <TableCell
                  key={
                    header.id
                  }
                  style={
                    header.style
                  }>
                  {
                    header.data
                  }
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map(
            (row) => (
              <TableRow
                data-testid='table-row'
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th":
                    {
                      border: 0,
                    },
                }}>
                {row.data?.map(
                  (
                    cell,
                    id
                  ) => (
                    <TableCell
                      key={id}
                      component='th'
                      scope='row'>
                      {
                        cell.data
                      }
                    </TableCell>
                  )
                )}
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
