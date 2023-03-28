import React from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import { users } from "../consants";

interface IAuth {
  openAuth: boolean;
  setOpenAuth: (arg0: boolean) => void;
  setIsLogin: (arg0: boolean) => void;
}

function Auth({ openAuth, setOpenAuth, setIsLogin }: IAuth) {
  const [currentUser, setCurrentUser] = useState({ login: "", password: "" });

  const handleLogin = () => {
    return users.find((user) => {
      if (
        user.login === currentUser.login &&
        user.password === currentUser.password
      ) {
        setIsLogin(true);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, isLogin: true })
        );
      } else {
        alert("Неправильный логин или пароль");
      }
    });
  };

  const handleClose = () => {
    setOpenAuth(false);
  };
  return (
    <Box>
      <Dialog open={openAuth} onClick={handleClose}>
        <DialogTitle
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Авторизация
        </DialogTitle>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogContentText>
            Чтобы воспользоваться функцией добавления тикера, пожалуйста,
            введите логин и пароль от своего аккаунта.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="login"
            label="Логин"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setCurrentUser({ ...currentUser, login: e.target.value });
            }}
          ></TextField>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Пароль"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setCurrentUser({ ...currentUser, password: e.target.value });
            }}
          ></TextField>
        </DialogContent>
        <DialogActions onClick={(e) => e.stopPropagation()}>
          <Button
            variant="contained"
            onClick={() => {
              handleLogin();
              handleClose();
            }}
          >
            Войти
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export { Auth };
