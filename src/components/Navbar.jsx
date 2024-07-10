// toast
import { toast } from "react-hot-toast";

// firebase
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
// redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/userSlice";
import { Link } from "react-router-dom";
import Weather from "./Weather";
import { useEffect, useState } from "react";

import useDarkMode from "use-react-dark-mode";
import Badge from "./Badge";

function Navbar() {
  const { isDark, toggle } = useDarkMode();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const logOutProfile = async (e) => {
    e.stopPropagation();
    try {
      await signOut(auth);
      toast.success("See you soon");
      dispatch(logout());
    } catch (error) {
      toast.error(error.message);
    }
  };
  const data = useSelector((s) => s.user.cartItems);

  return (
    <div className="container">
      <div className=" border-b border-b-[#000814] dark:border-white dark:border-opacity-[15%] border-opacity-[15%] flex justify-between mb-6  items-center">
        <Link to={"/"}>
          <img src="/logo.png" className="w-[100px] lg:w-[200px] " alt="Logo" />
        </Link>

        <div className="flex gap-4 items-center">
          <Weather />

          <button type="button" onClick={toggle}>
            {isDark ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M11.3807 2.01886C9.91573 3.38768 9 5.3369 9 7.49999C9 11.6421 12.3579 15 16.5 15C18.6631 15 20.6123 14.0843 21.9811 12.6193C21.6613 17.8537 17.3149 22 12 22C6.47715 22 2 17.5228 2 12C2 6.68514 6.14629 2.33869 11.3807 2.01886Z"></path>
              </svg>
            )}
          </button>
          <Badge
            count={data ? data.reduce((acc, e) => acc + e.count, 0) : 0}
          />
          <button className=" relative" onClick={() => setShow(!show)}>
            <img
              src="/reactImg.png"
              className="w-[44px] border border-[#000814] dark:border-white border-opacity-[50%] rounded-[999px] bg-inherit"
              alt=""
            />
            {show ? (
              <div className=" absolute w-[150px] top-12 right-2 lg:right-0 lg:left-0  rounded-lg shadowCard bg-white text-[#000814] px-4 py-2 flex flex-col">
                <div className="w-full pb-2 mb-2 flex gap-2 border-b border-b-[#000814] border-opacity-[50%] items-center">
                  <img src="/settings.svg" alt="" />

                  <span className="font-bold">Profile</span>
                </div>

                <button
                  className="flex gap-2 items-center"
                  onClick={(e) => logOutProfile(e)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="rgba(255,0,0,1)"
                  >
                    <path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"></path>
                  </svg>

                  <h1 className="text-red-600 font-bold">Log out</h1>
                </button>
              </div>
            ) : null}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
