import Unilab from "../../assets/imgs/logos/logo_with_name.png";

// Icons

import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  const helpOptions = [
    { label: "Quero adotar", path: "/" },
    { label: "Quero doar", path: "/" },
  ];

  return (
    <footer className=" bottom-0 min-w-full bg-primary-color min-h-50 flex justify-center items-center font-medium">
      <div className="grid grid-cols-1 lg:grid-cols-4 w-full">
        <div className="min-w-full flex justify-center items-center min-h-40">
          <a href="https://unilab.edu.br">
            <img src={Unilab} alt="Unilab" className="w-60 md:60 lg:w-60" />
          </a>
        </div>
        <ul className="flex flex-col justify-center items-start p-10">
          <p className="text-white text-2xl mb-5">Como ajudar?</p>
          {helpOptions.map((option, index) => (
            <li key={index} className="list-none text-[15px] my-2">
              <Link
                to={option.path}
                className="text-white hover:text-secondary-color duration-200">
                {option.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col justify-start items-start p-10">
          <p className="text-white text-2xl mb-5">Contatos</p>
          <li className="flex gap-7 items-center w-30">
            <a
              href="/"
              className="text-4xl text-white cursor-pointer hover:text-secondary-color duration-200">
              <FaWhatsapp />
            </a>
            <a
              href="https://www.instagram.com/causapetunilab/"
              target="_blank"
              className="text-4xl text-white cursor-pointer hover:text-secondary-color duration-200">
              <FaInstagram />
            </a>
          </li>
        </ul>
        <ul className="flex flex-col justify-start items-start p-10">
          <p className="text-white text-2xl mb-5">Sobre nós</p>
          <Link className="text-white cursor-pointer duration-200 hover:text-secondary-color">
            Causa Pet
          </Link>
          <li className="text-white cursor-pointer duration-200 hover:text-secondary-color my-3">
            <a href="https://unilab.edu.br" target="_blank">
              Unilab
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
