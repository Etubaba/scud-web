import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { getToken } from "../services/refresh";
import { useState } from "react";
import { useEffect } from "react";

const Pagination = ({ noText, setData, serverData, isAdmin }) => {
  const total = Math.ceil(serverData.total_records / serverData.page_size);
  const pageNumber = [];
  for (let i = 1; i <= total; i++) {
    pageNumber.push(i);
  }

  // just to prevent page break to be re
  if (noText) {
    return (
      <div className="flex md:flex-row flex-col items-center justify-center  md:justify-between">
        <div className="flex space-x-3 justify-center items-center">
          <BsArrowLeft className="text-scudGreen text-lg" />
          {pageNumber.map((element, index) => (
            <span key={index} className="flex">
              <p className={`text-sm font-[400] ${"text-textColor"} `}>{element}</p>
            </span>
          ))}
          <div className="bg-scudGreen hover:bg-scudGreenHover rounded-full shadow-md p-2 ">
            <BsArrowRight className="text-white text-sm" />
          </div>
        </div>
      </div>
    );
  }

  const [dataCopy, setDataCopy] = useState(serverData);

  useEffect(() => {
    setData(dataCopy.data);
  }, [dataCopy?.page_count]);

  const fetchData = async (action) => {
    if (dataCopy.next_page === null && action === "next") return;
    if (dataCopy.previous_page_page === null && action === "prev") return;

    const url = action === "next" ? dataCopy?.next_page : dataCopy?.previous_page;

    try {
      const AUTH_TOKEN = isAdmin ? Cookies.get("adminAccessToken") : Cookies.get("accessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + AUTH_TOKEN;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.get(url);
      if (data) {
        setDataCopy(data);
        console.log(data);
      }
    } catch (e) {
      console.log(e.message);
      if (e.status === 401 || e.response?.data?.message === "Unauthorized") {
        isAdmin ? await getToken(true) : await getToken();
      } else {
        console.log(e);
      }
    }
  };

  return (
    <div className="flex md:flex-row flex-col items-center justify-center  md:justify-between">
      {noText === undefined && (
        <p className="md:text-sm text-xs mb-4 md:mb-0 font-[400] text-textColor">
          Total Page : {total}
        </p>
      )}
      <div className="flex space-x-3 justify-center items-center">
        <BsArrowLeft
          onClick={() => fetchData("prev")}
          className="text-scudGreen cursor-pointer text-lg"
        />
        {pageNumber.map((element, index) => (
          <span key={index} className="flex">
            <p
              className={`text-sm font-[400] ${
                dataCopy?.page_count === element ? "text-scudGreen" : "text-textColor"
              } `}
            >
              {element}
            </p>
          </span>
        ))}
        <div
          onClick={() => fetchData("next")}
          className="bg-scudGreen cursor-pointer hover:bg-scudGreenHover rounded-full shadow-md p-2 "
        >
          <BsArrowRight className="text-white text-sm" />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
