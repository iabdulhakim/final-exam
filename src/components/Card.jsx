import React, { useState } from "react";
import { Link } from "react-router-dom";

function Card({ img, title, time, id, addToCart }) {
  const [count, setCount] = useState(1);

  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count > 0) setCount(count - 1);
  };

  return (
    <div className="container p-5 ">
      <div className="flex flex-col mx-auto lg:mx-0 max-w-[355px] rounded-xl w-full bg-[#edf2f4] dark:bg-[#001d3d] shadow-lg">
        <Link to={"/item/" + id}>
          <img
            src={img}
            className="w-full bg-white cursor-pointer rounded-t-xl h-[240px] object-cover"
            alt="Recipe img"
          />
        </Link>
        <div className="flex flex-col p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-xl">{title}</h3>
            <div className="bg-[#802392] text-white text-sm px-2 py-1 rounded-full">
              {title}
            </div>
          </div>
          <h4 className="font-bold text-lg text-red-600 mb-4">{time} minutes</h4>
          <div className="flex justify-between w-full">
            <div className=" flex items-center w-[68%] justify-between">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-l"
                onClick={decrement}
              >
                -
              </button>
              <span className="text-lg font-medium mx-4">{count}</span>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r"
                onClick={increment}
              >
                +
              </button>
            </div>
            <button
              onClick={() => addToCart(id, count)}
              className="btn btn-primary text-white w-[30%] font-bold"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Card;
