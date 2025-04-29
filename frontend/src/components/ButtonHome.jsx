import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";

const ButtonHome = () => {
  return (
    <Link to={"/"}>
      <div className="hidden sm:flex justify-center items-center absolute top-5 left-5 bg-primary-color px-5 py-2 rounded outline-2 outline-transparent z-50 text-white cursor-pointer hover:text-primary-color hover:bg-white hover:outline-primary-color duration-200 ">
        <IoHome className="text-xl" />
      </div>
    </Link>
  );
};

export default ButtonHome;
