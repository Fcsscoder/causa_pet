import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";

const ButtonHome = () => {
  return (
    <Link to={"/"}>
      <div className="hidden sm:flex justify-center items-center absolute top-5 left-5 bg-whiter px-5 py-2 rounded outline-2 bg-white outline-primary-color z-50 text-primary-color cursor-pointer hover:text-white hover:bg-primary-color hover:outline-primary-color duration-200 ">
        <IoHome className="text-xl" />
      </div>
    </Link>
  );
};

export default ButtonHome;
