import { useRouter } from "next/router";
import React from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { account_officers } from "../../dummy";

const OfficerCompo = ({
  officerManager,
  accountOfficer,
  item: { id, first_name, last_name, state, drivers, account_managers, picture }
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        if (officerManager) {
          router.push({
            pathname: "/admin/support/officer_manager/manager_details",
            query: id
          });
        } else if (accountOfficer) {
          router.push({
            pathname: "/officer_profile/officers_manager/officers_details",
            query: id
          });
        } else
          router.push({
            pathname: "/admin/support/acct_officer/acctofficer_details",
            query: id
          });
      }}
      className="border p-4 h-auto w-full md:min-w-[234px]  rounded-md space-y-1.5 flex-col flex justify-center items-center bg-white"
    >
      <div>
        <img
          src={picture === null || picture === undefined ? "/user.png" : picture}
          alt=""
          className="w-20 h-20 rounded-full"
        />{" "}
        <div className="w-2.5 border border-white h-2.5 rounded-full relative z-40 -mt-4  ml-[3.8rem] bg-green-600"></div>
      </div>
      <p className="text-textColor text-sm font-semibold">
        {first_name?.charAt(0).toUpperCase() +
          first_name?.slice(1) +
          " " +
          last_name?.charAt(0).toUpperCase() +
          last_name?.slice(1)}
      </p>

      <span className="flex space-x-1">
        <MdOutlineLocationOn className="text-scudGreen" />
        <p className="text-textColor mb-6 text-sm"> {state?.name},Nigeria</p>
      </span>
      <div className="flex items-center space-x-1">
        {officerManager !== undefined ? (
          <div className="flex">
            {account_managers.slice(0, 3).map((el, idx) => (
              <div
                className={`rounded-full  border-2 border-white ${
                  idx === 1 ? "z-20 ml-1" : idx === 2 ? "z-10 -ml-2" : "z-0 -ml-2"
                } `}
              >
                {" "}
                <img
                  src={
                    el.account_manager?.picture === null ? "/user.png" : el.account_manager?.picture
                  }
                  className="w-5 h-5 rounded-full"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex">
            {drivers.slice(0, 3).map((el, idx) => (
              <div
                className={` rounded-full border-2 border-white ${
                  idx === 1 ? "z-20  -ml-2" : idx === 2 ? "z-10 -ml-2" : "z-0 -ml-2"
                } `}
              >
                {" "}
                <img
                  src={el.driver?.picture === null ? "/user.png" : el.driver?.picture}
                  className="w-5 h-5  rounded-full"
                />
              </div>
            ))}
          </div>
        )}
        <p className="text-xs text-textColor/50">
          {officerManager !== undefined
            ? `Managing ${account_managers?.length} officers`
            : `Managing ${drivers?.length} drivers`}
        </p>
      </div>
    </div>
  );
};

export default OfficerCompo;
