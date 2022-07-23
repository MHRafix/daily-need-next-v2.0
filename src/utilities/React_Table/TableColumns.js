// import { format } from 'date-fns';
export const MINI_USER_TABLE_COLUMNS = [
  {
    Header: "User pic",
    accessor: "user_pic",
    // Cell: ({value}) => {return format(new Date(value), 'dd/MM/yyy')}
  },
  {
    Header: "User Name",
    accessor: "user_name",
  },
  {
    Header: "User Email",
    accessor: "user_email",
  },
];

export const PRODUCTS_TABLE_COLUMNS = [
  {
    Header: "ID",
    accessor: "_id",
    // Cell: ({value}) => {return format(new Date(value), 'dd/MM/yyy')}
  },
  {
    Header: "Image",
    accessor: "thumbnail",
  },
  {
    Header: "Products",
    accessor: "title",
  },
  {
    Header: "Price",
    accessor: "prices.regular_price",
  },
  {
    Header: "Status",
    accessor: "product_status",
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Type",
    accessor: "product_type",
  },
  {
    Header: "Available",
    accessor: "stock_available",
  },
];
