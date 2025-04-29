import api from "../utils/api";

import { useState, useEffect } from "react";
import useFlashMessage from "./useFlashMessages";

export default function useAuth() {
  const [authenticated, setAutheticated] = useState(false);
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAutheticated(true);
    }
  }, []);

  async function register(user) {
    let msgText = "Cadastro realizado com sucesso!";
    let sucess;

    try {
      const data = await api.post("/users/register", user).then((response) => {
        return response.data;
      });

      await authUser(data);
      sucess = true;
    } catch (error) {
      msgText = error.response.data.message;
      sucess = false;
    }
    setFlashMessage(msgText);
    return sucess;
  }

  async function login(user) {
    let msgText = "Login realizado com sucesso!";
    let sucess;

    try {
      const data = await api.post("/users/login", user).then((response) => {
        return response.data;
      });

      await authUser(data);
      sucess = true;
    } catch (error) {
      msgText = error.response.data.message;
      sucess = false;
    }

    setFlashMessage(msgText);
    return sucess;
  }

  async function authUser(data) {
    setAutheticated(true);

    localStorage.setItem("token", JSON.stringify(data.token));
  }

  function logout() {
    const msgText = "Você saiu da conta com sucesso. Volte sempre!";

    setAutheticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;

    setFlashMessage(msgText);
  }

  return { authenticated, register, login, logout };
}
