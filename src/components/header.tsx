import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { anonym } from "../consants";

interface IHeader {
  isLogin: boolean;
  setIsLogin: (arg0: boolean) => void;
  setOpenAuth: (arg0: boolean) => void;
  setOpenTicker: (arg0: boolean) => void;
}

function Header({ isLogin, setIsLogin, setOpenAuth, setOpenTicker }: IHeader) {
  const handleLogout = () => {
    setIsLogin(false);
    localStorage.setItem("user", JSON.stringify(anonym));
  };

  const handleOpenTicker = () => {
    setOpenTicker(true);
  };

  const handleOpenAuth = () => {
    setOpenAuth(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <AccountBalanceIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            SMarket
          </Typography>
          <Box>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
              onClick={() => (isLogin ? handleOpenTicker() : handleOpenAuth())}
            >
              <ConfirmationNumberIcon />
            </IconButton>
          </Box>
          {!isLogin ? (
            <Button color="inherit" onClick={handleOpenAuth}>
              Войти
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogout}>
              Выйти
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export { Header };
