import { Link } from "react-router-dom";

// Image

import Dog from "../../assets/imgs/error_minecraft_gif.gif";

const Error = () => {
  return (
    <div className="h-screen w-screen font-semibold">
      <div className="w-full h-full flex flex-col justify-center items-center bg-secondary-color p-10">
        <img src={Dog} alt="Pet dormindo" className="w-100 mb-10" />
        <p className="text-xl text-center text-white sm:text-2xl lg:text-3xl duration-200">
          Ops! Não conseguimos encontrar a página!
        </p>
        <Link
          to={"/"}
          className="text-primary-color bg-white rounded p-2 duration-100 cursor-pointer my-5 hover:text-white hover:bg-secondary-color hover:border-white hover:outline-2 text-xs sm:text-sm md:text-lg">
          Voltar para o início
        </Link>
      </div>
    </div>
  );
};

export default Error;
