import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineGift } from "react-icons/ai";
import { BASE_URL } from "../../api/base";
import Rating from "../common/Rating";

const Finder = ({ id }) => {
  const [result, setResult] = useState(null);

  // const { fetchData, loading } = useFetch(`${BASE_URL}users/${id}`, id,true);

  // console.log(fetchData);

  useEffect(() => {
    let first = true;
    if (first) {
      async function finder() {
        const AUTH_TOKEN = Cookies.get("adminAccessToken");
        axios.defaults.headers.common["Authorization"] = "Bearer " + AUTH_TOKEN;
        axios.defaults.headers.get["Content-Type"] = "application/json";
        await axios
          .get(`${BASE_URL}users/${id}`)
          .then((res) => {
            setResult(res.data);
            // console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      finder();
    }
    return () => {
      first = false;
    };
  }, [id]);
  return (
    <span className="flex space-x-2 justify-center items-center">
      <img
        className="w-8 h-8 rounded-full object-cover"
        src={result?.picture == undefined || result?.picture == null ? "/user.png" : result.picture}
        alt=""
      />
      <p className="font-semibol  text-textColor ">
        {result == null || result == undefined ? "" : result?.first_name + " " + result?.last_name}
      </p>
    </span>
  );
};
const Review = ({ item: { rating, comment, level, reviewer_id } }) => {
  // comment: "I love the way he check up on my problems";
  // created_at: "2023-07-17T13:19:20.703Z";
  // id: 37;
  // rating: 3;
  // reviewed_id: 50;
  // reviewer_id: 4;
  // trip_id: null;
  // updated_at: "2023-07-17T13:19:20.703Z";
  return (
    <div className="bg-white flex flex-col justify-between rounded-lg border p-4 w-full">
      <div>
        <Rating readOnly={true} rating={rating} size="xs" />
        <p className="text-sm mt-5 mb-10 text-textColor">{comment}</p>
      </div>
      <div className="flex items-end ">
        <div className="flex  items-center space-x-2">
          <Finder id={reviewer_id} key={reviewer_id} />

          {/* <div>
            {!rider && (
              <div
                className={` ${
                  level === 3 ? "bg-green-600/20" : level === 2 ? "bg-blue-600/20" : "bg-red-600/20"
                } py-[1.3px] px-4 rounded-md`}
              >
                <span
                  className={` ${
                    level === 3 ? "text-green-600" : level === 2 ? "text-blue-600" : "text-red-600"
                  }  flex space-x-1`}
                >
                  <AiOutlineGift className={`text-xs mt-0.5`} />
                  <p className="text-xs">Tier {level}</p>
                </span>
              </div>
            )} 
          </div>*/}
        </div>
      </div>
    </div>
  );
};

export default Review;
