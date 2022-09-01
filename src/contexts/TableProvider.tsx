import React, { createContext } from "react";
//models
import { ColumnDef, ColumnOrderState } from "@tanstack/react-table";
import { Person } from "@/models";
//utilities
import {makeData} from "../utilities/makeData"
//components
import EditableCell from "../Table/EditableCell";

const TableContext = createContext<any>({});

interface Props {
  children: JSX.Element;
}
const TableProvider = ({ children }: Props) => {
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "Id ",
        cell: (info) => info.getValue(),
        enableGrouping: false,
        enableColumnFilter: false,
      },
      {
        id: "firstName",
        accessorKey: "firstName",
        header: "First Name",
        cell: (info) => (
          <EditableCell
            getValue={info.getValue}
            row={info.row}
            column={info.column}
            table={info.table}
          />
        ),
      },
      {
        id: "lastName",
        accessorKey: "lastName",
        header: "Last Name",
        cell: (info) => (
          <EditableCell
            getValue={info.getValue}
            row={info.row}
            column={info.column}
            table={info.table}
          />
        ),
      },
      {
        id: "age",
        accessorKey: "age",
        header: () => "Age",
        aggregatedCell: ({ getValue }) =>
          Math.round(getValue<number>() * 100) / 100,
        aggregationFn: "median",
        cell: (info) => (
          <EditableCell
            getValue={info.getValue}
            row={info.row}
            column={info.column}
            table={info.table}
          />
        ),
      },
      {
        id: "visits",
        accessorKey: "visits",
        header: () => <span>Visits</span>,
        aggregationFn: "sum",
        cell: (info) => (
          <EditableCell
            getValue={info.getValue}
            row={info.row}
            column={info.column}
            table={info.table}
          />
        ),
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
        cell: (info) => (
          <EditableCell
            getValue={info.getValue}
            row={info.row}
            column={info.column}
            table={info.table}
          />
        ),
      },
      {
        id: "progress",
        accessorKey: "progress",
        header: "Profile Progress",
        cell: (info) => (
          <EditableCell
            getValue={info.getValue}
            row={info.row}
            column={info.column}
            table={info.table}
          />
        ),
        aggregationFn: "mean",
        aggregatedCell: ({ getValue }) =>
          Math.round(getValue<number>() * 100) / 100 + "%",
      },
    ],
    []
  );

  const [data, setData] = React.useState(() => makeData(100000));
  const [loading, setLoading] = React.useState(false);

  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(
    columns.map((column) => column.id as string) //must start out with populated columnOrder so we can splice
  );

  return (
    <TableContext.Provider
      value={{
        columns,
        data,
        loading,
        setLoading,
        columnOrder,
        setColumnOrder,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export { TableContext, TableProvider };
