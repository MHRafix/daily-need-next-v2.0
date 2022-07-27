import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

// table data pagination
export const TablePagination = ({ dependency }) => {
  const {
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageIndex,
  } = dependency;

  return (
    <div className="flex items-center justify-end my-10">
      <button
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
        id={!canPreviousPage ? "form_btn_disabled" : "form_btn"}
        style={{
          borderRadius: "0px",
          height: "45px",
          padding: "10px",
          fontSize: "18px",
        }}
      >
        <MdOutlineKeyboardArrowLeft />
      </button>

      <span id="pagination_content">
        {/* Page */}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>
      </span>

      <button
        onClick={() => nextPage()}
        disabled={!canNextPage}
        id={!canNextPage ? "form_btn_disabled" : "form_btn"}
        style={{
          borderRadius: "0px",
          height: "45px",
          padding: "10px",
          fontSize: "18px",
        }}
      >
        <MdOutlineKeyboardArrowRight />
      </button>
    </div>
  );
};

// table data Sorter
export const TableDataSorter = ({ dependency }) => {
  const {
    setPageSize,
    pageSize,
    handleTypeFilter,
    handleStatusFilter,
    handleResetFilter,
    show,
  } = dependency;

  return (
    <div id="table_sorter_wrapper">
      <div id="sorter_input_wrapper">
        Show
        <select
          className="sorting_input"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        entries
      </div>

      {show ? (
        <div id="table_data_filter_wrapper">
          <div id="filter_btn" onClick={() => handleResetFilter()}>
            <button>All Products</button>
          </div>
          <div id="filter_btn" onClick={() => handleTypeFilter("fixed-sale")}>
            <button>Fixed Sale</button>
          </div>
          <div id="filter_btn" onClick={() => handleTypeFilter("on-sale")}>
            <button>On Sale</button>
          </div>
          <div id="filter_btn" onClick={() => handleStatusFilter("in-stock")}>
            <button>In-Stock</button>
          </div>
          <div id="filter_btn" onClick={() => handleStatusFilter("stock-out")}>
            <button>Stock-Out</button>
          </div>
        </div>
      ) : (
        <div id="table_data_filter_wrapper">
          <div id="filter_btn" onClick={() => handleResetFilter()}>
            <button>All Orders</button>
          </div>
          <div id="filter_btn" onClick={() => handleStatusFilter("shipped")}>
            <button>Shipped Orders</button>
          </div>
          <div id="filter_btn" onClick={() => handleStatusFilter("canceled")}>
            <button>Canceled Orders</button>
          </div>
          <div id="filter_btn" onClick={() => handleStatusFilter("pendding")}>
            <button>Pendding Orders</button>
          </div>
          <div id="filter_btn" onClick={() => handleStatusFilter("inprogress")}>
            <button>Inprogress Orders</button>
          </div>
        </div>
      )}
    </div>
  );
};
