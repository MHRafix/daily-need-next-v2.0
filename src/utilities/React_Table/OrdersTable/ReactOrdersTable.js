import Image from "next/image";
import React, { useMemo } from "react";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { FiBookOpen, FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { usePagination, useSortBy, useTable } from "react-table";
import ReactTooltip from "react-tooltip";
import Card from "../../../images/card_images/card.png";
import CashOn from "../../../images/card_images/cash.png";
import { ORDERS_TABLE_COLUMN } from "../TableColumns";
import { TableDataSorter, TablePagination } from "../TableParts";

export default function ReactOrdersTable({ ORDERS_DATA, handleModal }) {
  const columns = useMemo(() => ORDERS_TABLE_COLUMN, []);
  const data = useMemo(() => ORDERS_DATA);

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
                  if (cell.column.Header === "Total Amount") {
                    return <td className="font-semibold">৳ {cell.value}</td>;
                  } else if (cell.column.Header === "Order Date") {
                    return <td>{cell.value.slice(0, 10)}</td>;
                  } else if (cell.column.Header === "Status") {
                    if (cell.value === "shipped") {
                      return (
                        <td>
                          <span id="green_signal_status">{cell.value}</span>
                        </td>
                      );
                    }
                    if (cell.value === "canceled") {
                      return (
                        <td>
                          <span id="red_signal_status">{cell.value}</span>
                        </td>
                      );
                    }
                    if (cell.value === "pendding") {
                      return (
                        <td>
                          <span id="warning_signal_status">{cell.value}</span>
                        </td>
                      );
                    } else {
                      return (
                        <td>
                          <span id="info_signal_status">{cell.value}</span>
                        </td>
                      );
                    }
                  } else if (cell.column.Header === "Payment Mode") {
                    return (
                      <td className="capitalize flex justify-center items-center py-1">
                        {cell.value === "cash-on" ? (
                          <Image
                            data-tip="Cash On"
                            src={CashOn}
                            alt="cashon"
                            width={40}
                            height={40}
                          />
                        ) : (
                          <Image
                            data-tip="Card Payment"
                            src={Card}
                            alt="card"
                            width={40}
                            height={40}
                          />
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
                          &nbsp;&nbsp;
                          <FiBookOpen
                            onClick={() => handleModal(true, cell.value)}
                            data-tip="Details"
                            className="text-green cursor-pointer text-normal outline-none"
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
