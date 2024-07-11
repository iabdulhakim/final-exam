import { get, child, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { database } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { setCatItem } from "../app/userSlice";
import { toast } from "react-hot-toast";

function Item() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const getData = async () => {
    const dbRef = ref(database);
    await get(child(dbRef, `recips/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getData();
  }, [id]);

  const dispatch = useDispatch();
  const addToCart = (count) => {
    const pureData = { ...data, count: count };
    toast.success("Added to Cart")
    dispatch(setCatItem(pureData));
    toast.error(error.message)
  };

  const [count, setCount] = useState(1);

  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count > 0) setCount(count - 1);
  };

  return (
    <div className="container p-5">
      <div className="container pb-5">
        <div className=" flex justify-start mb-4 ml-2">
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

        <div className="flex flex-col lg:flex-row mx-auto lg:mx-0 max-w-[355px] lg:max-w-full  lg:gap-14 rounded-xl w-full bg-[#edf2f4] dark:bg-[#001d3d] shadow-lg">
          {data && (
            <>
              <img
                src={data.imgsUrl}
                className="w-full lg:rounded-tl-lg  lg:w-[400px] bg-white cursor-pointer rounded-t-xl lg:rounded-l-xl lg:rounded-t-none h-[240px] lg:h-[400px] object-cover"
                alt="Recipe img"
              />
              <div className="flex flex-col relative w-full p-4 lg:p-8">
                <div className="flex justify-between items-center mb-1 lg:mb-2 ">
                  <h3 className="font-bold text-lg lg:text-xl">Dish name: {data.title}</h3>
                  <div className="bg-[#802392] text-white text-sm px-2 py-1 rounded-full">
                    {data.title}
                  </div>
                </div>
                <h4 className="font-bold text-red-600 mb-1 lg:mb-2">
                  Preparing time: {data.cookingTime} minutes
                </h4>
                <h2 className="mb-1 lg:mb-2">Ingredients: {data.ingredeints}</h2>
                <p className="mb-4 lg:mb-2 text-xs">Method: {data.method}</p>
                <div className="flex  justify-between lg:absolute right-4 bottom-10  gap-3 w-full lg:w-[45%] ">
                  <div className="flex items-center w-[68%]  justify-between">
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
                    onClick={() => addToCart(count)}
                    className="btn btn-primary text-white w-[30%] font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>

  );
}

export default Item;
