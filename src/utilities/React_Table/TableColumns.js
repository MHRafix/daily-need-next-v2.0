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
    Header: "Product",
    accessor: "title",
  },
  {
    Header: "Image",
    accessor: "thumbnail",
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Reg Price",
    accessor: "prices.regular_price",
  },
  {
    Header: "Sale Price",
    accessor: "prices.sale_price",
  },
  {
    Header: "Available",
    accessor: "stock_available",
  },
  {
    Header: "Status",
    accessor: "product_status",
  },

  {
    Header: "Type",
    accessor: "product_type",
  },
  {
    Header: "Action",
    // accessor: "product_type",
  },
];

export const ORDERS_TABLE_COLUMN = [
  { Header: "CM Name", accessor: "customer_info.customer_name" },
  { Header: "CM Mobile", accessor: "customer_info.customer_mobile" },
  {
    Header: "Order Date",
    accessor: "createdAt",
  },
  { Header: "Total Amount", accessor: "order_overview.total_amount" },
  { Header: "Payment Mode", accessor: "payment_info.payment_method" },
  { Header: "Status", accessor: "order_overview.order_status" },
  { Header: "Action", accessor: "_id" },
];
