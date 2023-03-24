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

interface IHeader {
  setOpen: (arg0: boolean) => void;
}

function Header({ setOpen }: IHeader) {
  const handleOpen = () => {
    setOpen(true);
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
              onClick={() => handleOpen()}
            >
              <ConfirmationNumberIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export { Header };
