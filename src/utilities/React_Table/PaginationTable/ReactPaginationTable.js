import Image from "next/image";
import React, { useMemo } from "react";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { usePagination, useSortBy, useTable } from "react-table";
import ReactTooltip from "react-tooltip";
import { TableDataSorter, TablePagination } from "../TableParts";

export default function ReactPaginationTable({
  PRODUCTS_DATA,
  PRODUCTS_TABLE_COLUMNS,
}) {
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

  // pagination dependency
  const pagination_dependency = {
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageIndex,
  };

  // srting dependency
  const sorting_dependency = { setPageSize, pageSize };
  return (
    <>
      {/* data sorter  */}
      <TableDataSorter dependency={sorting_dependency} />
      {/* react table here */}
      <ReactTooltip place="left" type="dark" effect="solid" />
      <table id="products_table" {...getTableProps()}>
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
                    }}
                  >
                    {column.render("Header")}
                    <span>
                      <span className="flex items-center">
                        <span
                          className={
                            column.isSortedDesc ? "text-black" : "text-black4"
                          }
                        >
                          <BiUpArrowAlt />
                        </span>
                        <span
                          className={
                            !column.isSortedDesc ? "text-black" : "text-black4"
                          }
                        >
                          <BiDownArrowAlt />
                        </span>
                      </span>
                    </span>
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
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
                          textAlign: "center",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-table",
                            width: "50px",
                          }}
                        >
                          <Image
                            src={cell.value}
                            alt="img"
                            // layout="fill"
                            width={100}
                            height={100}
                            className="rounded-full"
                          />
                        </span>
                      </div>
                    );
                  } else if (cell.column.Header === "Reg Price") {
                    return <td className="font-semibold">৳ {cell.value}</td>;
                  } else if (cell.column.Header === "Sale Price") {
                    return <td className="font-semibold">৳ {cell.value}</td>;
                  } else if (cell.column.Header === "Available") {
                    return (
                      <td>
                        {cell.value === 0 ? (
                          <span id="red_signal_status">✖</span>
                        ) : (
                          <span id="green_signal_status">{cell.value} kg</span>
                        )}
                      </td>
                    );
                  } else if (cell.column.Header === "Status") {
                    return (
                      <td>
                        {cell.value === "stock-out" ? (
                          <span id="red_signal_status">{cell.value}</span>
                        ) : (
                          <span id="green_signal_status">{cell.value}</span>
                        )}
                      </td>
                    );
                  } else if (cell.column.Header === "Type") {
                    return (
                      <td>
                        {cell.value === "fixed-sale" ? (
                          <span id="warning_signal_status">{cell.value}</span>
                        ) : (
                          <span id="info_signal_status">{cell.value}</span>
                        )}
                      </td>
                    );
                  } else if (cell.column.Header === "Action") {
                    return (
                      <td>
                        <span className="flex justify-center items-center">
                          <FiEdit
                            data-tip="Edit"
                            className="text-light_purple cursor-pointer text-normal outline-none"
                          />
                          &nbsp;&nbsp;
                          <RiDeleteBinLine
                            data-tip="Delete"
                            className="text-red-500 cursor-pointer text-normal outline-none"
                          />
                        </span>
                      </td>
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

      {/* table data pagination here  */}
      <TablePagination dependency={pagination_dependency} />
    </>
  );
}
