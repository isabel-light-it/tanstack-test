import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import { TableProvider } from "./contexts/TableProvider";
import TanStackTable from "./Table/TanStackTable";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <TableProvider>
        <TanStackTable />
      </TableProvider>
    </DndProvider>
  );
}

export default App;
