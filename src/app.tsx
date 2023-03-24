import { useState } from "react";
import { Box } from "@mui/material";
import { Header } from "./components/header";
import { Ticker } from "./components/ticker";
import { WaitingList } from "./components/waiting_list";
function App() {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Header setOpen={setOpen}></Header>
      <Ticker open={open} setOpen={setOpen}></Ticker>
      <WaitingList></WaitingList>
    </Box>
  );
}

export { App };
