import { useState } from "react";
import useFlashMessage from "./useFlashMessages";

export default function useValidation() {
  const { setFlashMessage } = useFlashMessage();

  function validateRegisterInput(values) {
    const newErrors = {};

    if (!values.name) {
      newErrors.name = "O nome é obrigatório";
    }

    if (!values.email) {
      newErrors.email = "O email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Adicione um email válido";
    }

    if (!values.phone) {
      newErrors.phone = "O número de telefone é obrigatório.";
    } else if (!/^\d{2}9\d{8}$/.test(values.phone.replace(/\D/g, ""))) {
      newErrors.phone =
        "Número de celular inválido. Adicione o DDD e o 9 antes do seu número.";
    }

    if (!values.password) {
      newErrors.password = "A senha é obrigatória";
    } else if (values.password.length < 6) {
      newErrors.password = "A senha deve ter no mínimo 6 caracteres";
    } else if (values.password !== values.confirmpassword) {
      newErrors.password = "As senhas não conferem. Tente novamente.";
    }

    const isValid = Object.keys(newErrors).length === 0;

    if (!isValid) {
      const firstError = Object.values(newErrors)[0];
      setFlashMessage(firstError);
    }

    return isValid;
  }

  function validateLoginInput(values) {
    const newErrors = {};

    if (!values.email) {
      newErrors.email = "O email é obrigatório";
    }

    if (!values.password) {
      newErrors.password = "A senha é obrigatória";
    }

    const isValid = Object.keys(newErrors).length === 0;

    return isValid;
  }

  return { validateRegisterInput, validateLoginInput };
}
