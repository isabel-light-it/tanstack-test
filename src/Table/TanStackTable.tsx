import React, { useContext, useEffect } from "react";
import "./index.css";
import {
  GroupingState,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  flexRender,
  SortingState,
  Row,
  getSortedRowModel,
  ColumnFiltersState,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  FilterFn,
  Table,
  PaginationState,
} from "@tanstack/react-table";
//Models
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import { Person } from "@/models";
//components
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import Loader from "./Loader";
import TableControls from "./TableControls";
//context
import { TableContext } from "../contexts/TableProvider";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const TanStackTable = () => {
  const { columns, data, loading, setLoading, columnOrder, setColumnOrder } =
    useContext(TableContext);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [grouping, setGrouping] = React.useState<GroupingState>([]);

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageSize: 20,
    pageIndex: 0,
  });

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const updateTableData = (
    row: Row<Person>,
    columnId: string,
    value: unknown
  ) => {
    const updatedPerson: any = { ...row.original };
    updatedPerson[columnId as keyof Person] = value;
    //updatedPerson.id -> get the id of modified person
  };
  const table: Table<Person> = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      grouping,
      columnOrder,
      sorting,
      columnFilters,
      pagination,
    },
    onColumnOrderChange: setColumnOrder,
    onSortingChange: setSorting,
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    meta: {
      updateData: updateTableData,
    },
    onColumnFiltersChange: setColumnFilters,
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugHeaders: true,
    debugColumns: false,
    onPaginationChange: setPagination,
  });

  useEffect(() => {
    setLoading(false);
  }, [grouping]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-2">
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableHead
              headerGroup={headerGroup}
              flexRender={flexRender}
              key={headerGroup.id}
              table={table}
            />
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row: Row<Person>) => {
            return (
              <TableRow
                id={row.original.id}
                key={row.id}
                row={row}
                flexRender={flexRender}
              />
            );
          })}
        </tbody>
      </table>
      <TableControls table={table} grouping={grouping} />
    </div>
  );
};

export default TanStackTable;
