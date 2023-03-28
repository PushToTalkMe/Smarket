import { useState } from "react";
import { Box } from "@mui/material";
import { Header } from "./components/header";
import { Ticker } from "./components/ticker";
import { WaitingList } from "./components/waiting_list";
import { Auth } from "./components/auth";
import { anonym } from "./consants";
function App() {
  const userJson = localStorage.getItem("user");
  const currentUser = userJson !== null ? JSON.parse(userJson) : anonym;

  const [isLogin, setIsLogin] = useState(currentUser.isLogin);
  const [openAuth, setOpenAuth] = useState(false);
  const [openTicker, setOpenTicker] = useState(false);
  const [tickers, setTickers] = useState([]);
  return (
    <Box>
      <Header
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        setOpenAuth={setOpenAuth}
        setOpenTicker={setOpenTicker}
      ></Header>
      <Auth
        openAuth={openAuth}
        setOpenAuth={setOpenAuth}
        setIsLogin={setIsLogin}
      ></Auth>
      <Ticker
        openTicker={openTicker}
        setOpenTicker={setOpenTicker}
        setTickers={setTickers}
      ></Ticker>
      <WaitingList tickers={tickers}></WaitingList>
    </Box>
  );
}

export { App };
