import React from "react";
import { useSelector } from "react-redux";

const EmptyTable = ({ title, Icon, name, style, user }) => {
  const userDetails = useSelector((state) =>
    user ? state.auth.userDetails : state.auth.adminDetails
  );
  return (
    <div className={`my-6  `}>
      <div
        className={`border ${
          style !== undefined ? style : ""
        }  flex flex-col bg-white space-y-3 p-5 md:p-20 justify-center items-center rounded-md`}
      >
        <div className=" bg-[#F2F5FF]  border rounded-full p-2">
          <Icon className="text-scudGreen text-lg" />
        </div>

        <p className="text-[#1E202B] my-2 text-lg font-semibold">{title}</p>

        <p className="text-sm  text-textColor text-center">{`Hi ${
          userDetails?.first_name === undefined ? "" : userDetails?.first_name
        }, there is no ${name} details available`}</p>
      </div>
    </div>
  );
};

export default EmptyTable;
