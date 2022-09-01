//models
import { Cell, Renderable, Row } from "@tanstack/react-table";
import { Person } from "@/models";

interface Props {
  row: Row<Person>;
  flexRender: <TProps extends object>(
    Comp: Renderable<TProps>,
    props: TProps
  ) => any;
  id?: string;
}

const TableRow = ({ row, flexRender }: Props) => {
  return (
    <tr>
      {row.getVisibleCells().map((cell: Cell<Person, unknown>) => {
        return (
          <td
            {...{
              key: cell.id,
              style: {
                background: cell.getIsGrouped()
                  ? "#0aff0082"
                  : cell.getIsAggregated()
                  ? "#ffa50078"
                  : cell.getIsPlaceholder()
                  ? "#ff000042"
                  : "white",
              },
            }}
          >
            {cell.getIsGrouped() ? (
              // If it's a grouped cell, add an expander and row count
              <>
                <button
                  {...{
                    onClick: row.getToggleExpandedHandler(),
                    style: {
                      cursor: row.getCanExpand() ? "pointer" : "normal",
                    },
                  }}
                >
                  {row.getIsExpanded() ? "👇" : "👉"}{" "}
                  {flexRender(cell.column.columnDef.cell, cell.getContext())} (
                  {row.subRows.length})
                </button>
              </>
            ) : cell.getIsAggregated() ? (
              // If the cell is aggregated, use the Aggregated
              // renderer for cell
              flexRender(
                cell.column.columnDef.aggregatedCell ??
                  cell.column.columnDef.cell,
                cell.getContext()
              )
            ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
              // Otherwise, just render the regular cell
              flexRender(cell.column.columnDef.cell, cell.getContext())
            )}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;
