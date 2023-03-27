import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";

interface IWaitingList {
  tickers: never[];
}

function RenderDate(props: GridRenderCellParams<any>) {
  const { value } = props;
  const newValue = value.split("T");

  return (
    <p>
      {newValue[0]}
      <br />
      {newValue[1]}
    </p>
  );
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
    headerClassName: "columnBorder",
    headerAlign: "center",
    cellClassName: "row columnBorder",
  },
  {
    field: "creationTime",
    headerName: "Creation time",
    width: 210,
    renderCell: RenderDate,
    headerClassName: "columnBorder",
    headerAlign: "center",
    cellClassName: "row columnBorder",
  },
  {
    field: "changeTime",
    headerName: "Change time",
    width: 210,
    renderCell: RenderDate,
    headerClassName: "columnBorder",
    headerAlign: "center",
    cellClassName: "row columnBorder",
  },
  {
    field: "status",
    headerName: "Status",
    type: "string",
    width: 100,
    headerClassName: "columnBorder",
    headerAlign: "center",
    cellClassName: "row columnBorder",
  },
  {
    field: "side",
    headerName: "Side",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 80,
    headerClassName: "columnBorder",
    headerAlign: "center",
    cellClassName: "row columnBorder",
  },
  {
    field: "price",
    headerName: "Price",
    width: 90,
    headerClassName: "columnBorder",
    headerAlign: "center",
    cellClassName: "row columnBorder",
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 100,
    headerClassName: "columnBorder",
    headerAlign: "center",
    cellClassName: "row columnBorder",
  },
  {
    field: "instrument",
    headerName: "Instrument",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 150,
    headerAlign: "center",
    headerClassName: "columnBorder",
    cellClassName: "row columnBorder ",
  },
];

function WaitingList({ tickers }: IWaitingList) {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        "& .sell": {
          color: "red",
        },
        "& .buy": {
          color: "green",
        },
      }}
    >
      <DataGrid
        rows={tickers}
        columns={columns}
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        pageSizeOptions={[15]}
        getCellClassName={(params: GridCellParams<any, any, string>) => {
          if (params.field !== "side") {
            if (params.field !== "price") {
              if (params.field !== "amount") {
                return "";
              }
            }
          }
          return params.row.side.toLowerCase();
        }}
        sx={{
          border: "0px solid black",
          borderColor: "rgba(0, 0, 0, 1)",
          marginTop: "10px",
          alignItems: "center",
          "& .row": {
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            borderTop: "1px solid black",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontSize: "18px",
            fontWeight: "bold",
          },
          "& .columnBorder": {
            borderRight: "1px solid black",
          },
          "& .MuiDataGrid-overlay": {
            borderTop: "1px solid black",
          },
          "& .columnBorder: last-child": {
            borderRight: "0px solid black",
          },
          "& .MuiDataGrid-main": {
            border: "1px solid black",
          },
        }}
      />
    </Box>
  );
}

export { WaitingList };
