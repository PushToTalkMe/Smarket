import React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "creationTime", headerName: "Creation time", width: 130 },
  { field: "changeTime", headerName: "Change time", width: 130 },
  {
    field: "status",
    headerName: "Status",
    type: "string",
    width: 70,
  },
  {
    field: "side",
    headerName: "Side",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 70,
  },
  { field: "price", headerName: "Price", width: 100 },
  { field: "amount", headerName: "Amount", width: 150 },
  {
    field: "instrument",
    headerName: "Instrument",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 150,
  },
];

const rows = [
  {
    id: 1,
    creationTime: "Snow",
    changeTime: "Jon",
    status: "Fill",
    side: "Buy",
    price: "8.662",
    amount: "50000",
    instrument: "RUB/USD",
  },
];

function WaitingList() {
  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

export { WaitingList };
