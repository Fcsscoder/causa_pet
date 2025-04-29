const Form = ({ children, onSubmit, title, submitText }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative w-70 sm:w-100 bg-white outline-2 outline-primary-color px-7 py-8 sm:py-15 rounded-2xl shadow-form`}>
      {title && <p className="text-2xl text-primary-color mb-5">{title}</p>}
      {children}
      <button
        type="submit"
        className="text-white bg-primary-color rounded outline-2 p-2 px-3 duration-100 cursor-pointer hover:text-primary-color hover:bg-white hover:outline-primary-color">
        {submitText}
      </button>
    </form>
  );
};

export default Form;
