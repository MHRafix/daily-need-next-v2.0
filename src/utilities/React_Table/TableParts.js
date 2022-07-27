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
          borderRadius: "none",
          height: "46px",
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
        id={!canPreviousPage ? "form_btn_disabled" : "form_btn"}
        style={{
          borderRadius: "none",
          height: "46px",
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
  const { setPageSize, pageSize } = dependency;

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

      <div id="table_data_filter_wrapper">
        <div id="filter_btn">
          <button>Fixed Sale</button>
        </div>
      </div>
    </div>
  );
};
