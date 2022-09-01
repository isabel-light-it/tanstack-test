import { Column, Row, RowData, Table } from "@tanstack/react-table";
import React from "react";
import {Person} from "@/models";

interface cellProps {
  getValue: () => any;
  row: Row<Person>;
  column: Column<Person, unknown>;
  table: Table<Person>;
}

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (row: Row<Person>, columnId: string, value: unknown) => void;
  }
}

const EditableCell = ({ getValue, row, column, table }: cellProps) => {
  const initialValue = getValue();
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
    table.options.meta?.updateData(row, column.id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      value={value as string}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onBlur={onBlur}
    />
  );
};

export default EditableCell;
