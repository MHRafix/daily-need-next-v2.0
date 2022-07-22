// import { format } from 'date-fns';
export const COLUMNS = [
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
