import React, { useMemo } from "react";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { usePagination, useSortBy, useTable } from "react-table";
import ReactTooltip from "react-tooltip";
import { PRODUCTS_TABLE_COLUMNS } from "../TableColumns";

export default function ReactPaginationTable({ PRODUCTS_DATA }) {
  const columns = useMemo(() => PRODUCTS_TABLE_COLUMNS, []);
  const data = useMemo(() => PRODUCTS_DATA);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
  } = tableInstance;

  const { pageIndex, pageSize } = state;
  return (
    <>
      {/* data sorter  */}
      <div className="sorter_input_wrapper">
        <select
          className="sorting_input"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[1, 2, 3].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      {/* react table here */}
      <ReactTooltip place="left" type="warning" effect="solid" />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getFooterGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <span
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "10px",
                    }}
                  >
                    {column.render("Header")}
                    <span>
                      <span className="flex items-center">
                        <BiUpArrowAlt />

                        <BiDownArrowAlt />
                      </span>
                    </span>
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (cell.column.id === "thumbnail") {
                    return (
                      <div
                        className="!p-extra_padding4"
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderLeft: "1px solid #ddd",
                        }}
                      >
                        <img src={cell.value} alt="img" id="user_image" />
                      </div>
                    );
                  } else {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  }
                })}
                {/* <td data-tip="Delete">del</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* table data pagination here  */}
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>

        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>

        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>

        <span>
          | Go to page :{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>

        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>

        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
    </>
  );
}
