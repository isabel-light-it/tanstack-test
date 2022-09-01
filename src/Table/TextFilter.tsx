import React from "react";
//models
import { Column } from "@tanstack/react-table";
import { Person } from "@/models";
//components
import DebouncedInput from "./DebouncedInput";

interface Props {
  column: Column<Person, unknown>;
}
const TextFilter = ({ column }: Props) => {
  const columnFilterValue = column.getFilterValue();
  const sortedUniqueValues = React.useMemo(
    () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );
  return (
    <>
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded"
        list={column.id + "list"}
      />
    </>
  );
};

export default TextFilter;
