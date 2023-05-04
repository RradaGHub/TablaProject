import React, { useState } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import {
  Table as MuiTable,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  TablePagination,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  styled,
} from "@mui/material";

import {
  Search as SearchIcon,
  TableViewRounded,
  Close as CloseIcon,
  DeleteSweep as DeleteSweepIcon,
} from "@mui/icons-material";
// import { data } from "./Components/Data";
// import { makeData } from "./Components/Data2,jsx";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${TableCell}-head`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    border: "1px solid rgba(224, 224, 224, 1)",
  },

  [`&.${TableCell}-body`]: {
    fontSize: 14,
    border: "1px solid rgba(224, 224, 224, 1)",
  },
}));

const Table = ({ columns, data }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setData] = useState(data);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page: currentPage,
    gotoPage,
    rows,
    setPageSize: setPageSizeTable,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: filteredData,
    },
    useSortBy,
    usePagination
  );

  const handleSearchInputChange = (e) => {
    const searchValue = e.target.value;
    setSearchValue(searchValue);
    const filteredData = data.filter((data) =>
      Object.values(data).some((value) =>
        value.toString().toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setData(filteredData);
  };

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
    gotoPage(newPage);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPageSizeTable(Number(e.target.value));
  };
  const handleDeleteRow = (rowIndex) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData.splice(rowIndex + pageIndex * pageSize, 1);
      return newData;
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setData(
      data.filter((data) =>
        Object.values(data).some((value) =>
          value.toString().toLowerCase().includes(searchValue.toLowerCase())
        )
      )
    );
  };

  const tableContainerStyle = {
    marginTop: "16px",
    border: "1px solid #ddd",
    borderRadius: "10px",
  };

  const gridStyle = {
    maxWidth: 600,
    margin: "0 auto",
    position: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: "10px",
    padding: "16px",
  };

  const titleStyle = {
    fontWeight: "bold",
    marginBottom: "16px",
  };

  const cellStyle = {
    padding: "8px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "white",
  };

  return (
    <Grid style={{ ...gridStyle, maxWidth: 600, margin: "0 auto" }}>
      <Typography variant="h5" align="center" style={{ ...titleStyle }}>
        <TableViewRounded style={{ marginRight: "10px" }} />
        <u style={{ fontWeight: "bold" }}>Table</u>
      </Typography>

      <form onSubmit={handleSubmit}>
        <div style={{ position: "relative" }}>
          {searchOpen && (
            <Button
              style={{
                position: "absolute",
                left: 0,
                top: 6,
              }}
              onClick={handleSubmit}
            >
              <SearchIcon style={{ position: "relative" }} />
            </Button>
          )}

          {searchOpen && (
            <TextField
              id="search-input"
              label="Buscar"
              value={searchValue}
              onChange={handleSearchInputChange}
              variant="outlined"
              margin="dense"
              style={{
                marginLeft: 60,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    {searchValue && (
                      <IconButton onClick={() => setSearchValue("")}>
                        <CloseIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
              onInput={handleSearchInputChange}
            />
          )}

          {!searchOpen && (
            <IconButton onClick={() => setSearchOpen(true)}>
              <SearchIcon style={{ position: "rigth" }} />
            </IconButton>
          )}
        </div>
      </form>

      <TableContainer variant="outlined" style={{ ...tableContainerStyle }}>
        <MuiTable {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, index) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <StyledTableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                  >
                    {column.render("Header")}
                    <TableSortLabel
                      active={column.isSorted}
                      direction={column.isSortedDesc ? "desc" : "asc"}
                    />
                  </StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {currentPage.map((row, index) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => (
                    <StyledTableCell key={index}>
                      {cell.render("Cell")}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell>
                    <IconButton onClick={() => handleDeleteRow(index)}>
                      <DeleteSweepIcon />
                    </IconButton>
                  </StyledTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <Box display="flex" justifyContent="space-between" marginTop="16px" />
      <Typography color="textSecondary">
        Mostrando {pageIndex * pageSize + 1} -{" "}
        {pageIndex * pageSize + rows.length} de {data.length}
      </Typography>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        page={pageIndex}
        onPageChange={handlePageChange}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handlePageSizeChange}
      />
    </Grid>
  );
};

export default Table;
