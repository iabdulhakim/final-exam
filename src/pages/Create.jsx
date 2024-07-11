import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "../components";
import { ref, set } from "firebase/database";
import { database } from "../firebase/firebaseConfig";
import { toast } from "react-hot-toast";

function Create() {
  const [value, setValue] = useState({
    title: "",
    category: "",
    cookingTime: "",
    ingredeints: "",
    imgsUrl: "",
    method: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = Math.ceil(Math.random() * 100000000);

    try {
      await set(ref(database, "recips/" + id), { ...value, id: id });
      toast.success(value.title + " " + "recipe added");
      setValue({
        title: "",
        category: "",
        cookingTime: "",
        ingredeints: "",
        imgsUrl: "",
        method: "",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <div className="container dark:bg-[#000814]">
      <div className=" flex justify-start mb-2 ml-2 ">
        <Link to={"/"}>
          <button className="btn btn-primary  text-white flex gap-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="rgba(255,255,255,1)"
            >
              <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
            </svg>
            <span className="font-bold">Back</span>
          </button>
        </Link>
      </div>

      <div className=" max-w-[375px] w-full mx-auto flex flex-col pb-6   justify-center ">
        <h1 className="font-bold mb-4 text-xl mx-auto ">Add New Recipe</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col  items-center gap-3"
        >
          <FormInput
            type={"text"}
            label={"Title"}
            value={value.title}
            className="title-input"
            name={"title"}
            handleChange={handleChange}
            required
          />


          <label className="form-control w-full max-w-xs ">
            <div className="label">
              <span className="label-text capitalize">Category</span>
            </div>
            <select
              value={value.category}
              name="category"
              onChange={handleChange}
              className="select select-bordered w-full dark:bg-[#000814] dark:border-gray-500 dark:text-white max-w-xs text-black"
              required
            >
              <option>National Food</option>
              <option>Turkish Food</option>
              <option>Russian Food</option>
              <option>Italian Food</option>
              <option>Other...</option>
            </select>
          </label>

          <FormInput
            type={"text"}
            label={"Cooking Time"}
            value={value.cookingTime}
            name={"cookingTime"}
            handleChange={handleChange}
            required
          />

          <FormInput
            type={"text"}
            label={"Ingredeints"}
            value={value.ingredeints}
            name={"ingredeints"}
            handleChange={handleChange}
            required

          />

          <FormInput
            required
            type={"text"}
            label={"Images URL"}
            value={value.imgsUrl}
            name={"imgsUrl"}
            handleChange={handleChange}
          />

          <label className="form-control w-full text-white max-w-xs ">
            <div className="label">
              <span className="label-text capitalize">Method</span>
            </div>
            <textarea
              className="textarea dark:bg-[#000814] dark:border-gray-500 dark:text-white border-gray-300 w-full title-input"
              value={value.method}
              name="method"
              onChange={handleChange}
              required
              placeholder="Type here"
            ></textarea>
          </label>
          <button
            onClick={handleSubmit}
            className="btn btn-success mt-6 text-white w-[95%] "
          >
            Add Recipe
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;
