import React from "react";
import Layout from "../../../../components/Admin/Layout";
import { useRouter } from "next/router";
import { AiOutlineMail, AiOutlinePhone, AiOutlineRight } from "react-icons/ai";
import { BiHash, BiRefresh } from "react-icons/bi";
import { BsGenderAmbiguous, BsPerson } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { MdOutlineLocationOn } from "react-icons/md";
import SearchInput from "../../../../components/admincomponents/SearchInput";
import Pagination from "../../../../components/common/Pagination";
// import { account_officers, driverList } from '../../../../dummy';
import OfficerCompo from "../../../../components/admincomponents/OfficerCompo";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import { BASE_URL } from "../../../../api/base";
import { useState } from "react";
import ChatModal from "../../../../components/admincomponents/ChatModal";
import { validateToken } from "../../../../components/services/validateToken";

const Manager_details = ({ data }) => {
  const [search, setSearch] = useState("");
  const [openChat, setOpenChat] = useState(false);

  const router = useRouter();

  const { id, first_name, last_name, state, account_managers, picture } = data;

  const officer_name =
    first_name?.charAt(0).toUpperCase() +
    first_name?.slice(1) +
    " " +
    last_name?.charAt(0).toUpperCase() +
    last_name?.slice(1);

  console.log(account_managers);

  // const accts1 = account_managers[0]?.account_manager;
  // const accts2 = account_managers[1]?.account_manager;
  // const accts3 = account_managers[2]?.account_manager;

  return (
    <div>
      {" "}
      <BreadCrumbs
        secondItem={`${officer_name}`}
        indexPath="/admin/support/officer_manager/officer_mgt"
        index={"Officers Managers"}
      />
      <div className="py-3 px-3 mb-8 bg-white rounded-lg border  flex-col md:flex-row w-full flex md:items-center md:justify-between ">
        <div className="flex flex-col md:flex-row md:space-y-0 justify-center mb-10 md:mb-0 items-center md:space-x-2">
          <div>
            {" "}
            <img
              src={picture === null || picture === undefined ? "/user.png" : picture}
              className="w-20 mb-4 md:mb-0 md:mr-2 h-20"
              alt=""
            />
            <div className="w-2.5 border border-white h-2.5 rounded-full relative z-40 -mt-4  ml-[4rem] bg-green-600"></div>
          </div>

          <div className="flex flex-col justify-center items-center md:justify-start md:items-start space-y-1">
            <p className="text-textColor font-semibold">{officer_name}</p>
            <span className="flex space-x-1">
              <MdOutlineLocationOn className="text-scudGreen mt-0.5" />
              <p className="text-textColor  text-sm">{state?.name} State</p>
            </span>
            <div className="flex items-center space-x-1">
              <div className="flex">
                {account_managers.slice(0, 3).map((el, idx) => (
                  <div key={idx} className="rounded-full  border-2 -ml-1 border-white z-0">
                    {" "}
                    <img
                      src={
                        el.account_manager.picture === null ||
                        el.account_manager.picture === undefined
                          ? "/user.png"
                          : el.account_manager.picture
                      }
                      className="w-3 h-3 "
                    />
                  </div>
                ))}
              </div>

              <p className="text-xs text-textColor/50">
                Managing {account_managers?.length} Account officers
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => setOpenChat(true)}
            className="flex rounded-lg text-sm text-scudGreen px-2 py-2 border border-scudGreen"
          >
            <FiSend className="mt-1 mr-1" />
            <p>Send Message</p>
          </button>
          <button
            onClick={() =>
              router.push({
                pathname: "/admin/support/officer_manager/manager_profile",
                query: id
              })
            }
            className="flex rounded-lg text-sm text-white px-2 py-2 border bg-scudGreen"
          >
            <BsPerson className="text-lg mr-1" />
            <p>View Profile</p>
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mb-4 md:items-center md:justify-between">
        <p className="text-textColor">Managing Account Officers </p>

        <SearchInput value={search} setValue={setSearch} style={"mt-7 md:mt-0"} />
      </div>
      <div className="grid mb-5 grid-flow-row-dense place-items-center grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {account_managers
          ?.filter((it) => {
            if (search === "") return it;
            else if (it.account_manager.first_name.toLowerCase().includes(search.toLowerCase())) {
              return it;
            }
          })
          .map((item, idx) => (
            <OfficerCompo key={idx} item={item.account_manager} />
          ))}
      </div>
      {/* <Pagination total={account_managers.length} /> */}
      <ChatModal open={openChat} onClose={() => setOpenChat(false)} />
    </div>
  );
};
Manager_details.getLayout = Layout;
export default Manager_details;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const id = Object.keys(context.query)[0];

  const res = await fetch(`${BASE_URL}users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  if (data?.statusCode !== undefined && data?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      data
    }
  };
}
