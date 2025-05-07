import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Components

import Modal from "../Modal";

// Icons

import { MdOutlineMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

// Images

import CausaPet from "../../assets/imgs/logos/causa_pet_logo.png";

// Contexts

import { Context } from "../../context/UserContext";

const Navbar = () => {
  const { authenticated, logout } = useContext(Context);

  const menuOptions = [
    { label: "Início", path: "/" },
    {
      label: "Quero adotar",
      path: "/adotar",
    },
    { label: "Quem somos", path: "/quem-somos" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    return;
  };
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <nav className="max-w-screen z-[999] font-semibold">
      <Modal
        isOpen={isModalOpen}
        handleModal={handleModal}
        text={"Deseja realmente sair?"}
        func={logout}
        buttons={["Sim", "Não"]}
        funcButtonIndex={0}
      />

      <div className="flex bg-primary-color min-w-full min-h-17 items-center z-20 relative shadow-navbar font-semibold">
        <ul className="flex relative lg:hidden items-center justify-between w-full">
          <li className="ml-2">
            <MdOutlineMenu
              className="cursor-pointer text-3xl text-white xl:hidden"
              onClick={handleMenu}
            />
          </li>
          <li className="cursor-pointer">
            <Link to={"/"}>
              <img src={CausaPet} className="w-10" />
            </Link>
          </li>

          {/* Verifica se o usuário está autenticado, se estiver exibe o botão para o logout, se não, o botão para entrar */}

          {authenticated ? (
            <li
              className="mr-4 text-white duration-100 cursor-pointer hover:text-secondary-color"
              onClick={() => handleModal()}>
              <button>Sair</button>
            </li>
          ) : (
            <div>
              <li className="mr-4 text-white duration-100 cursor-pointer hover:text-secondary-color">
                <Link to={"/entrar"}>Entrar</Link>
              </li>
            </div>
          )}
        </ul>

        {/* Navbar lg */}

        <ul className="hidden relative lg:flex items-center justify-between w-full">
          <div className="ml-15 flex flex-row justify-between items-center gap-10">
            <li className="cursor-pointer">
              <Link to={"/"}>
                <img src={CausaPet} className="w-10" />
              </Link>
            </li>

            {menuOptions.map((option, index) => (
              <li key={index}>
                <Link
                  to={option.path}
                  className="text-white hover:text-secondary-color duration-200">
                  {option.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://apoia.se/causapetunilabdoacao"
                className="text-white hover:text-secondary-color duration-200"
                target="_blank">
                Quero adotar
              </a>
            </li>
          </div>

          {/* Verifica se o usuário está autenticado, se estiver exibe o botão para entrar no perfil e sair, se não, o botão para entrar e cadastrar */}

          {authenticated ? (
            <ul className="mr-4 flex flex-row justify-center items-center gap-4">
              <li className="mr-4 duration-100 text-white cursor-pointer hover:text-secondary-color">
                <Link to={"/usuario/perfil"}>Perfil</Link>
              </li>
              <li onClick={() => handleModal()}>
                <button className="text-primary-color border-1 bg-white rounded py-2 duration-100 hover:text-white hover:bg-primary-color hover:border-white px-6 cursor-pointer">
                  Sair
                </button>
              </li>
            </ul>
          ) : (
            <ul className="flex flex-row justify-center items-center">
              <li className="mr-4 duration-100 text-white cursor-pointer hover:text-secondary-color">
                <Link to={"/entrar"}>Entrar</Link>
              </li>
              <li className="mr-4 ">
                <Link
                  className="text-primary-color border-1 bg-white rounded p-2 duration-100 cursor-pointer hover:text-white hover:bg-primary-color hover:border-white"
                  to={"/cadastrar"}>
                  Cadastre-se
                </Link>
              </li>
            </ul>
          )}
        </ul>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: -60 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-secondary-color z-[998] flex flex-col justify-center gap-8">
            <div className="absolute top-3 left-17">
              <Link to={"/"} onClick={handleMenu}>
                <img src={CausaPet} alt="Causa Pet" className="w-12" />
              </Link>
            </div>
            <ul className="absolute top-25 left-20">
              {menuOptions.map((option, index) => (
                <li key={index} className="text-2xl my-10">
                  <Link
                    to={option.path}
                    className="text-white hover:text-primary-color duration-200"
                    onClick={handleMenu}>
                    {option.label}
                  </Link>
                </li>
              ))}
              <li className="text-2xl my-10 text-white hover:text-primary-color duration-200">
                <a href="https://apoia.se/causapetunilabdoacao">Quero doar</a>
              </li>
            </ul>
            <IoMdClose
              className="absolute top-0 flex right-0 m-3 text-2xl cursor-pointer text-white hover:text-primary-color duration-200"
              onClick={handleMenu}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
