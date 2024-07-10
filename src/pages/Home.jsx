// redux
import { useDispatch, useSelector } from "react-redux";

// custom hook
import { useCollection } from "../hooks/useCollection";

// components
import TodosList from "../components/TodosList";
import { FormInput } from "../components";
import FormCheckbox from "../components/FormCheckbox";

// rrd imports
import { Form, Link, useActionData } from "react-router-dom";
import { useEffect, useState } from "react";

// action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let completed = formData.get("completed");
  return { title, completed };
};

// firebase
import { database, db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { onValue, ref } from "firebase/database";
import Card from "../components/Card";
import { setCatItem } from "../app/userSlice";

function Home() {
 
  const [data, setData] = useState([]);
  const getData = async () => {
    const starCountRef = ref(database, "recips/");
    await onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const pureData = Object.values(data);

      setData(pureData);
    });
  };
  useEffect(() => {
    getData();
  }, []);
 
  const dispatch = useDispatch();
  const addToCart = (id, count) => {
    const findData = data.find((e) => e.id == id);

    const pureData = { ...findData, count: count };
    dispatch(setCatItem(pureData));
  };

  return (
    <div className="container">
      <div className=" flex h-full justify-end mb-2 mr-2">
        <Link to={"/create"}>
          <button className="btn btn-primary  text-white flex gap-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="rgba(255,255,255,1)"
            >
              <path d="M13.0001 10.9999L22.0002 10.9997L22.0002 12.9997L13.0001 12.9999L13.0001 21.9998L11.0001 21.9998L11.0001 12.9999L2.00004 13.0001L2 11.0001L11.0001 10.9999L11 2.00025L13 2.00024L13.0001 10.9999Z"></path>
            </svg>
            <span className="font-bold">Add Recipe</span>
          </button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-6">
        {data &&
          data.map((e) => (
            <Card
              title={e.title}
              id={e.id}
              time={e.cookingTime}
              category={e.category}
              img={e.imgsUrl}
              addToCart={addToCart}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
