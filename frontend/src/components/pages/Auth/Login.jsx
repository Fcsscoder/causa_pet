import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// Images

import Pets from "../../../assets/imgs/pets_auth_pages.png";
import CausaPet from "../../../assets/imgs/logos/causa_pet_logo.png";
import Unilab from "../../../assets/imgs/logos/logo_with_name.png";

// Components

import Input from "../../Input";
import Form from "../../Form";
import ButtonHome from "../../ButtonHome";

// Hooks

import useInputValidation from "../../../hooks/useInputValidation.jsx";

// Context

import { useContext } from "react";
import { Context } from "../../../context/UserContext";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { validateLoginInput } = useInputValidation();

  const { login } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    const isValid = validateLoginInput(user);

    if (!isValid) return;

    const sucess = await login(user);
    if (sucess) {
      navigate("/");
    }
  };

  return (
    <section className="relative flex flex-row justify-center max-w-screen h-screen font-semibold bg-secondary-color">
      <ButtonHome />
      <div
        className="hidden xl:block w-5/4 relative"
        style={{
          backgroundImage: `url(${Pets})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}></div>
      <div className="flex flex-col w-full items-center ">
        <div className="flex flex-row justify-center gap-10 items-center w-100 h-40">
          <img src={CausaPet} alt="causa-pet" className="w-15 sm:w-20 my-10" />
          <img src={Unilab} alt="causa-pet" className="w-45 sm:w-50 my-10" />
        </div>
        <Form title="Entrar" submitText="Avançar" onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            id="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            name="password"
            id="password"
            label="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form>
        <div className="h-18 w-70 sm:w-90 flex justify-around items-center">
          <Link
            to={"/entrar"}
            className="text-sm sm:text-lg text-white hover:text-primary-color duration-200 font-medium cursor-pointer">
            Esqueceu a senha?
          </Link>
          <Link
            to={"/cadastrar"}
            className="text-sm sm:text-lg text-white hover:text-primary-color duration-200 cursor-pointer">
            Não possui conta?
          </Link>
        </div>
        <Link
          to={"/entrar"}
          className="sm:hidden block text-sm sm:text-lg text-white hover:text-primary-color duration-200 cursor-pointer">
          Voltar ao início
        </Link>
      </div>
    </section>
  );
};

export default Login;
