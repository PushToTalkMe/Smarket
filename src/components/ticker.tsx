import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { instruments } from "../consants";

interface ITicker {
  open: boolean;
  setOpen: (arg0: boolean) => void;
}

function Ticker({ open, setOpen }: ITicker) {
  const [instrument, setInstrument] = useState("");
  const [amount, setAmount] = useState("");
  const [ticker, setTicker] = useState({
    side: "",
    price: "",
    amount: "",
    instrument: "",
    status: "",
    creationTime: new Date(),
    changeTime: new Date(),
  });

  const handleClose = () => {
    setOpen(false);
  };

  const priceUpperCase = (str: string) => {
    const newStr = str.split(".");
    const newSubstrUpper1 = newStr[1][0].toUpperCase();
    const newSubstrUpper2 = newStr[1][1].toUpperCase();
    return (
      <Box
        sx={{
          display: "flex",
          mb: "10px",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{newStr[0] + "."}</Typography>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {newSubstrUpper1 + newSubstrUpper2}
        </Typography>
        <Typography variant="h6">{newStr[1][3]}</Typography>
      </Box>
    );
  };

  return (
    <Dialog open={open} onClick={() => handleClose()}>
      <DialogContent
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="instrument">Instrument</InputLabel>
          <Select
            labelId="instrument"
            label="Amount"
            value={instrument}
            onChange={(e) => {
              const currentInstrument = e.target.value;
              setInstrument(currentInstrument);
            }}
          >
            {instruments.map((instrument, index) => (
              <MenuItem key={index} value={instrument}>
                {instrument}
              </MenuItem>
            ))}
          </Select>
          <TextField
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            value={amount}
            variant="outlined"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          ></TextField>
        </FormControl>
      </DialogContent>
      <Box
        sx={{ display: "flex" }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Stack sx={{ alignItems: "center", width: "50%", padding: "10px" }}>
          {priceUpperCase("64.22123123")}
          <Button
            variant="contained"
            fullWidth
            color="error"
            onClick={() => {
              handleClose();
              const currentTicker = {
                ...ticker,
                side: "Sell",
                price: "64.22123123",
                amount: amount,
                instrument: instrument,
                status: "active",
                creationTime: new Date(),
                changeTime: new Date(),
              };
              console.log(currentTicker);
            }}
          >
            Sell
          </Button>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack sx={{ alignItems: "center", width: "50%", padding: "10px" }}>
          {priceUpperCase("64.22123123")}
          <Button
            variant="contained"
            fullWidth
            color="success"
            onClick={() => {
              handleClose();
              const currentTicker = {
                ...ticker,
                side: "Buy",
                price: "64.22123123",
                amount: amount,
                instrument: instrument,
                status: "active",
                creationTime: new Date(),
                changeTime: new Date(),
              };
              console.log(currentTicker);
            }}
          >
            Buy
          </Button>
        </Stack>
      </Box>
      {/* <DialogActions
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Button
          variant="contained"
          fullWidth
          // onClick={() => {
          //   handleClose();
          //   dispatch({ type: "LOGIN", payload: user });
          // }}
          color="error"
        >
          Sell
        </Button>
        <Divider orientation="vertical" flexItem />

        <Button
          variant="contained"
          fullWidth
          // onClick={() => {
          //   handleClose();
          //   dispatch({ type: "LOGIN", payload: user });
          // }}
          color="success"
        >
          Buy
        </Button>
      </DialogActions> */}
    </Dialog>
  );
}

export { Ticker };
