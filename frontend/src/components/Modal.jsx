import { useNavigate } from "react-router-dom";

const LogoutModal = ({
  isOpen,
  handleModal,
  text,
  buttons,
  func,
  funcButtonIndex,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[1000] backdrop-brightness-80">
      <div className="fixed flex flex-col rounded outline-2 outline-secondary-color top-[50%] left-[50%] min-h-50 w-70 bg-white transform -translate-x-1/2 -translate-y-1/2 sm:w-100 sm:h-50 md:w-120">
        <div className="w-full h-30 flex justify-start ml-5 items-center">
          <p className="text-primary-color text-xl">{text}</p>
        </div>
        <div className="w-full flex justify-end items-end gap-3 h-20 p-5 border-t-2 border-secondary-color">
          {buttons &&
            buttons.map((button, index) => {
              return (
                <button
                  key={index}
                  className="text-primary-color border-1 bg-white rounded p-2 duration-100 cursor-pointer hover:text-white hover:bg-primary-color hover:border-white px-5"
                  onClick={() => {
                    if (funcButtonIndex === index) {
                      func();
                      handleModal();
                      navigate("/");
                    } else {
                      handleModal();
                    }
                  }}>
                  {button}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
