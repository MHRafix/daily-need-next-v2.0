import React, { useMemo } from "react";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { useSortBy, useTable } from "react-table";
import { COLUMNS } from "../TableColumns";

export default function UsersTable({ USER_DATA }) {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => USER_DATA);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      <div className="sorter_input_wrapper">
        {/* <select
          className="sorting_input"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[1, 2, 3].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select> */}
      </div>
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
                  if (cell.column.id === "user_pic") {
                    return (
                      <div className="!p-extra_padding4 border-b-1 border-l-1 border-b-slate-300 border-l-slate-300">
                        <img
                          src={cell.value}
                          alt="img"
                          width="50"
                          height="50"
                          className="rounded-full"
                        />
                      </div>
                    );
                  } else {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
{
  /* <div>
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
      </div> */
}
