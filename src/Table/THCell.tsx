//libraries
import { useContext } from "react";
import { useDrag, useDrop } from "react-dnd";
//models
import {
  Column,
  ColumnOrderState,
  Header,
  Renderable,
  Table,
} from "@tanstack/react-table";
//context
import { TableContext } from "../contexts/TableProvider";
//components
import FilterField from "./FilterField";
//models
import { Person } from "@/models";

interface Props {
  header: Header<Person, unknown>;
  table: Table<Person>;
  flexRender: <TProps extends object>(
    Comp: Renderable<TProps>,
    props: TProps
  ) => any;
}

const THCell = ({ header, flexRender, table }: Props) => {
  const { setLoading } = useContext(TableContext);
  const { column } = header;
  const { columnOrder, setColumnOrder } = useContext(TableContext);

  const [, dropRef] = useDrop({
    accept: "column",
    drop: (draggedColumn: Column<Person>) => {
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder
      );
      setColumnOrder(newColumnOrder);
    },
  });

  const reorderColumn = (
    draggedColumnId: string,
    targetColumnId: string,
    columnOrder: string[]
  ): ColumnOrderState => {
    columnOrder.splice(
      columnOrder.indexOf(targetColumnId),
      0,
      columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string
    );
    return [...columnOrder];
  };

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: "column",
  });

  return (
    <th
      key={header.id}
      colSpan={header.colSpan}
      ref={dropRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {header.isPlaceholder ? null : (
        <div
          ref={previewRef}
          {...{
            className: header.column.getCanSort()
              ? "cursor-pointer select-none"
              : "",
            onClick: header.column.getToggleSortingHandler(),
          }}
        >
          {header.column.getCanGroup() ? (
            // If the header can be grouped, let's add a toggle
            <button
              onClick={() => {
                setLoading(true);
                header.column.toggleGrouping();
              }}
            >
              {header.column.getIsGrouped()
                ? `🛑(${header.column.getGroupedIndex()}) `
                : `👊 `}
            </button>
          ) : null}{" "}
          {flexRender(header.column.columnDef.header, header.getContext())}
          {/* Sorting */}
          {{
            asc: " 🔼",
            desc: " 🔽",
          }[header.column.getIsSorted() as string] ?? null}
          {/* Dragging button */}
          <button ref={dragRef}>🟰</button>
        </div>
      )}
      <div>
        {header.column.getCanFilter() ? (
          <FilterField column={column} table={table} />
        ) : null}
      </div>
    </th>
  );
};

export default THCell;
