import React from "react";

function FormInput({ name, label, value, handleChange, type }) {
  return (
    <label className="form-control w-full max-w-xs ">
      <div className="label">
        <span className="label-text capitalize">{label}</span>
      </div>
      <input
        required
        type={type}
        value={value}
        onChange={handleChange}
        placeholder="Type here"
        className="input input-bordered w-full max-w-x  dark:bg-[#000814] dark:border-gray-500"
        name={name}
      />
    </label>
  );
}

export default FormInput;
