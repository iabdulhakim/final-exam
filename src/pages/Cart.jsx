import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { database } from "../firebase/firebaseConfig";
import CartItems from "../components/CartItems";
import { removeAll, setCatItem } from "../app/userSlice";

function Cart() {
  const dataa = useSelector((s) => s.user.cartItems);

  const dispatch = useDispatch();
  const addToCart = (id, count) => {
    const findData = dataa.find((e) => e.id == id);

    const pureData = { ...findData, count: count };

    dispatch(setCatItem(pureData));
  };
  const removeAllRecips = () => {
    dispatch(removeAll());
  };

  return (
    <div className="container">
      <div className="flex justify-between mb-4 ml-2 items-center">
        <div className=" flex justify-start ">
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

        <h1 className="font-bold text-xl mr-4 lg:mr-0">Recipe Cart</h1>

        <div className="font-bold hidden lg:block text-red-600">{`You have got ${
          dataa ? dataa.reduce((acc, e) => acc + e.count, 0) : 0
        } recipe items`}</div>
      </div>

      <div className="flex flex-col gap-4">
        {dataa &&
          dataa.map((e) => (
            <CartItems
              img={e.imgsUrl}
              title={e.title}
              time={e.cookingTime}
              addToCart={addToCart}
              id={e.id}
              countt={e.count}
            />
          ))}
      </div>

      <button
        onClick={removeAllRecips}
        className="btn text-white w-full my-6 btn-error "
      >
        Remove all recips
      </button>
    </div>
  );
}

export default Cart;
