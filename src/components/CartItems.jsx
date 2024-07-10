import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CartItems({ img, title, time, id, addToCart, countt }) {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count > 0) setCount(count - 1);
  };
  useEffect(() => {
    setCount(countt);
  }, []);

  return (
    <>
      <div className="lg:flex hidden  flex-row mx-auto justify-between items-center lg:mx-0  lg:max-w-[100%] rounded-xl w-full bg-[#edf2f4] dark:bg-[#001d3d] shadow-lg">
        <Link to={"/item/" + id}>
          <img
            src={img}
            className="w-[90px] bg-white cursor-pointer rounded-t-xl h-[90px] object-cover"
            alt="Recipe img"
          />
        </Link>

        <h3 className="font-bold text-lg">{title}</h3>

        <h4 className="font-bold text-red-600 mb-4">{time}</h4>
        <div className="flex justify-between  w-[340px]">
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
            save
          </button>
        </div>
      </div>
      

      <div className=" lg:hidden flex flex-col mx-auto gap-4 lg:mx-0 max-w-[355px] lg:max-w-[100%] rounded-xl w-full bg-[#edf2f4] dark:bg-[#001d3d] shadow-lg">
        <div className="flex justify-between items-center pr-2">
          <Link to={"/item/" + id}>
            <img
              src={img}
              className="w-[90px] bg-white  rounded-tl-xl cursor-pointer h-[90px] object-cover"
              alt="Recipe img"
            />
          </Link>

          <h3 className="font-bold text-lg">{title}</h3>

          <h4 className="font-bold text-red-600 mb-4">{time}</h4>
        </div>
        <div className="flex justify-between w-[98%] mb-2 mx-auto ">
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
            save
          </button>
        </div>
      </div>
    </>
  );
}

export default CartItems;
