const validateUserInput = (
  mode,
  { name, email, password, confirmpassword, phone }
) => {
  switch (mode) {
    case "login":
      if (!email) return "O email é obrigatório.";
      if (!password) return "A senha é obrigatória.";
      break;
    case "register":
      if (!name) return "O nome é obrigatório.";
      if (!email) return "O número de telefone é obrigatório.";
      if (!phone) return "O número de telefone é obrigatório.";
      if (!password) return "A senha é obrigatória.";
      if (!confirmpassword) return "A confirmação de senha é obrigatória.";
      if (password !== confirmpassword) return "As senhas diferem.";
      break;
    case "edit":
      if (!name) return "O nome é obrigatório.";
      if (!email) return "O email é obrigatório.";
      if (!phone) return "O número de telefone é obrigatório.";
      break;
    default:
      return "Houve algum erro. Tente novamente mais tarde.";
  }

  return null;
};

module.exports = validateUserInput;
