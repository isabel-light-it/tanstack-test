//models
import { ReactNode } from "react";
import {
  Header,
  HeaderGroup,
  Renderable,
  Table,
} from "@tanstack/react-table";
import { Person } from "@/models";

import THCell from "./THCell";

interface Props {
  headerGroup: HeaderGroup<Person>;
  flexRender: <TProps extends object>(
    Comp: Renderable<TProps>,
    props: TProps
  ) => Element | ReactNode;
  table: Table<Person>;
}

const TableHead = ({ headerGroup, flexRender, table }: Props) => {
  return (
    <tr>
      {headerGroup.headers.map((header: Header<Person, unknown>) => {
        return (
          <THCell
            header={header}
            flexRender={flexRender}
            table={table}
            key={header.id}
          />
        );
      })}
    </tr>
  );
};

export default TableHead;
