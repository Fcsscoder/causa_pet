import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// Hooks

import useInputValidation from "../../../hooks/useInputValidation.jsx";

// Components

import Input from "../../Input.jsx";
import Form from "../../Form.jsx";
import ButtonHome from "../../ButtonHome";

// Images

import Pets from "../../../assets/imgs/pets_auth_pages.png";
import CausaPet from "../../../assets/imgs/logos/causa_pet_logo.png";
import Unilab from "../../../assets/imgs/logos/logo_with_name.png";

// Contexts

import { useContext } from "react";
import { Context } from "../../../context/UserContext";

const Register = () => {
  const { register } = useContext(Context);
  const { validateRegisterInput } = useInputValidation();

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [phone, setPhone] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      name: name,
      email: email,
      phone: phone,
      password: password,
      confirmpassword: confirmPassword,
    };

    const isValid = validateRegisterInput(user);

    if (!isValid) return;

    const sucess = await register(user);
    if (sucess) {
      navigate("/");
    }
  };

  return (
    <section className="relative flex flex-row max-w-screen min-h-screen">
      <ButtonHome />
      <div
        className="hidden xl:block w-5/4 relative"
        style={{
          backgroundImage: `url(${Pets})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}></div>
      <div className="relative flex flex-col w-full items-center bg-secondary-color font-semibold">
        <div className="flex flex-row justify-center gap-10 items-center w-100 h-35">
          <img src={CausaPet} alt="causa-pet" className="w-15 sm:w-20 my-10" />
          <img src={Unilab} alt="causa-pet" className="w-45 sm:w-50 my-10" />
        </div>
        <Form
          onSubmit={handleSubmit}
          title="Cadastre-se"
          submitText="Cadastrar">
          <Input
            type="text"
            name="name"
            id="name"
            label="Nome"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            name="email"
            id="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="text"
            name="phone"
            id="phone"
            label="Celular"
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            type="password"
            name="password"
            id="password"
            label="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            label="Confirmar senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form>
        <div className="h-18 w-70 sm:w-90 flex justify-around items-center gap-5">
          <Link
            to={"/entrar"}
            className="text-sm my-5 sm:text-lg text-white hover:text-primary-color duration-200 cursor-pointer">
            Já tem uma conta?
          </Link>
          <Link
            to={"/entrar"}
            className="sm:hidden block text-sm my-5 sm:text-lg text-white hover:text-primary-color duration-200 cursor-pointer">
            Voltar ao início
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
