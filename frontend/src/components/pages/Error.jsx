import { Link } from "react-router-dom";

import { IoHome } from "react-icons/io5";

// Image

import Dog from "../../assets/imgs/error_minecraft_gif.gif";

const Error = () => {
  return (
    <div className="h-screen w-screen font-semibold">
      <div className="w-full h-full flex flex-col justify-center items-center bg-secondary-color p-10">
        <img src={Dog} alt="Pet dormindo" className="w-100 mb-10 " />
        <div className="text-primary-color bg-white rounded py-3 px-5 duration-100 my-5 mine shadow-form">
          <p className="text-xs text-center text-primary-color sm:text-2xl lg:text-4xl mine duration-200">
            Ops! Nao conseguimos encontrar a pagina!
          </p>
        </div>

        <Link
          to={"/"}
          className="text-primary-color flex justify-center items-center gap-3 bg-white rounded py-3 px-5 duration-100 cursor-pointer my-2 hover:text-white hover:bg-secondary-color hover:outline-primary-color hover:outline-2 text-xs sm:text-sm md:text-xl mine shadow-form">
          Voltar para o inicio
          <IoHome className="text-xl" />
        </Link>
      </div>
    </div>
  );
};

export default Error;
