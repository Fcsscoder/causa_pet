const validatePetInput = (mode, { name, age, weight, color, images }) => {
  switch (mode) {
    case "create":
      if (!name) return "O nome do pet é obrigatório.";
      if (!age) return "A idade do pet é obrigatória.";
      if (!weight) return "O peso do pet é obrigatória.";
      if (!color) return "A cor do pet é obrigatória.";
      if (images.length === 0) return "A imagem do pet é obrigatória.";
      return null;
    default:
      return "Houve algum erro, tente novamente mais tarde.";
  }
};

module.exports = validatePetInput;
