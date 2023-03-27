import React from "react";
import { MockWebSocket } from "../mock_web_socket";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
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
  setTickers: (arg0: any) => void;
}

function Ticker({ open, setOpen, setTickers }: ITicker) {
  const [instrument, setInstrument] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState<string[]>([]);
  const [defaultPrice, setDefaultPrice] = useState<string[]>([]);
  const ws: any = useRef(null);

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

  const currentPrice = (side: string) => {
    const priceSell = price[0];
    const priceBuy = price[1];
    if (side === "Sell") {
      return priceSell;
    } else {
      return priceBuy;
    }
  };

  useEffect(() => {
    // window.WebSocket = MockWebSocket;
    ws.current = new MockWebSocket("ws://localhost:5173/");
    ws.current.simulateOpen();
    ws.current.addEventListener("message", (event: any) => {
      console.log(`WebSocket message received`);
      let message = JSON.parse(event.data);
      switch (message.type) {
        case "create":
          if (
            message.side &&
            message.amount &&
            message.price &&
            message.instrument
          ) {
            setTickers((prev: any) => [
              ...prev,
              {
                ...message,
                id: prev.length + 1,
                status: "Active",
                amount: message.amount + ".00",
              },
            ]);
          } else {
            ws.current.simulateError("error");
            setTickers((prev: any) => [
              ...prev,
              {
                ...message,
                id: prev.length + 1,
                status: "Rejected",
                amount: message.amount + ".00",
              },
            ]);
          }
          break;
        case "fill":
          if (
            message.side &&
            message.amount &&
            message.price &&
            message.instrument
          ) {
            setTickers((prev: any) => [
              ...prev,
              {
                ...message,
                id: prev.length + 1,
                status: "Filled",
                amount: message.amount + ".00",
              },
            ]);
          } else {
            ws.current.simulateError("error");
            setTickers((prev: any) => [
              ...prev,
              {
                ...message,
                id: prev.length + 1,
                status: "Rejected",
                amount: message.amount + ".00",
              },
            ]);
          }
          break;
        case "cancel":
          if (
            message.side &&
            message.amount &&
            message.price &&
            message.instrument
          ) {
            setTickers((prev: any) => [
              ...prev,
              {
                ...message,
                id: prev.length + 1,
                status: "Cancelled",
                amount: message.amount + ".00",
              },
            ]);
          } else {
            ws.current.simulateError("error");
            setTickers((prev: any) => [
              ...prev,
              {
                ...message,
                id: prev.length + 1,
                status: "Rejected",
                amount: message.amount + ".00",
              },
            ]);
          }
          break;
      }
    });
  }, []);

  const sendTicker = async (side: "string") => {
    const message = {
      creationTime: new Date(),
      changeTime: new Date(),
      side: side,
      price: currentPrice(side),
      amount: amount,
      instrument: instrument,
      type: "create",
    };
    const message2 = {
      creationTime: new Date(),
      changeTime: new Date(),
      side: side,
      price: currentPrice(side),
      amount: amount,
      instrument: instrument,
      type: "fill",
    };
    const message3 = {
      creationTime: new Date(),
      changeTime: new Date(),
      side: side,
      price: currentPrice(side),
      amount: amount,
      instrument: instrument,
      type: "cancel",
    };
    ws.current.simulateMessage(JSON.stringify(message));
    ws.current.simulateMessage(JSON.stringify(message2));
    ws.current.simulateMessage(JSON.stringify(message3));
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
              instruments.map((price) => {
                if (price.name === currentInstrument) {
                  setPrice([price.priceSell, price.priceBuy]);
                  setDefaultPrice([price.priceSell, price.priceBuy]);
                } else {
                  return;
                }
              });
            }}
          >
            {instruments.map((instrument, index) => (
              <MenuItem key={index} value={instrument.name}>
                {instrument.name}
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
              const currentAmount = e.target.value;
              if (!price) {
                alert("First you need to select the instrument");
              } else {
                setAmount(currentAmount);
                const average = +currentAmount / 100000000;
                if (+currentAmount !== 0) {
                  const priceSell = (+defaultPrice[0] + average).toFixed(3);
                  const priceBuy = (+defaultPrice[1] + average).toFixed(3);
                  setPrice([priceSell, priceBuy]);
                } else {
                  return;
                }
              }
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
          {price.length === 0 ? null : priceUpperCase(price[0])}
          <Button
            variant="contained"
            fullWidth
            color="error"
            onClick={(e: any) => {
              sendTicker(e.target.textContent);
              handleClose();
            }}
          >
            Sell
          </Button>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack sx={{ alignItems: "center", width: "50%", padding: "10px" }}>
          {price.length === 0 ? null : priceUpperCase(price[1])}
          <Button
            variant="contained"
            fullWidth
            color="success"
            onClick={(e: any) => {
              sendTicker(e.target.textContent);
              handleClose();
            }}
          >
            Buy
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}

export { Ticker };
