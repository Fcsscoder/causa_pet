import React from "react";

const Input = ({ type, name, id, label, onChange }) => {
  return (
    <div className={`relative mb-5 z-0 w-full group`}>
      <input
        type={type}
        name={name}
        id={id}
        className="block py-2.5 outline-primary-color px-0 w-full text-sm text-primary-color bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer"
        placeholder=" "
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="peer-focus:font-medium absolute text-sm text-primary-color duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        {label}
      </label>
    </div>
  );
};

export default Input;
