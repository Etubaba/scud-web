import React from "react";
import { AiOutlineClose, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import useFetch from "../../Hooks/useFetch";
import { BASE_URL } from "../../api/base";

const UserInfo = ({ setOpen, userDetails }) => {
  const { role, id } = userDetails;
  const { fetchData, loading } = useFetch(`${BASE_URL}users/${id}`, id, true);

  console.log(fetchData);

  return (
    <div className="border mt-10  bg-white shadow-lg rounded-md p-4">
      <div className="w-full flex justify-end items-end">
        <AiOutlineClose onClick={() => setOpen(false)} className="text-xs text-textColor" />
      </div>
      <div className="flex space-x-2 mb-2 items-center">
        <img
          className="w-10 h-10 rounded-full"
          src={
            fetchData?.picture === null || fetchData?.picture === undefined
              ? "/user.png"
              : fetchData?.picture
          }
          alt=""
        />
        <div>
          <p className="text-sm mb-1">{fetchData?.first_name + " " + fetchData?.last_name}</p>
          <p className="text-xs text-textColor">{role?.charAt(0).toUpperCase() + role?.slice(1)}</p>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <span className="flex space-x-1">
          <AiOutlinePhone className="text-scudGreen" />
          <p className="text-xs text-textColor">{fetchData?.phone}</p>
        </span>
        <span className="flex space-x-1">
          <AiOutlineMail className="text-scudGreen" />
          <p className="text-xs text-textColor">{fetchData?.email}</p>
        </span>
      </div>
    </div>
  );
};

export default UserInfo;
