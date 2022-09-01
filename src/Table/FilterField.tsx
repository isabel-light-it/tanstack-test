//models
import { Column, Table } from "@tanstack/react-table";
import { Person } from "@/models";
//components
import NumberFilter from "./NumberFilter";
import TextFilter from "./TextFilter";

interface Props {
  column: Column<Person, unknown>;
  table: Table<Person>;
}
const FilterField = ({ column, table }: Props) => {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  return typeof firstValue === "number" ? (
    <NumberFilter column={column} />
  ) : (
    <TextFilter column={column} />
  );
};

export default FilterField;