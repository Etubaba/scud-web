import Layout from "../../../components/Admin/Layout";
import { useState } from "react";
import Select2 from "../../../components/admincomponents/Select2";
import {
  AiOutlineCheckCircle,
  AiOutlineEdit,
  AiOutlinePercentage,
  AiOutlinePlus,
  AiOutlineSetting
} from "react-icons/ai";
import { BiHash, BiRefresh } from "react-icons/bi";
import Button from "../../../components/common/Button";
import { BsPeople } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

import { MdErrorOutline, MdOutlineLocationOn } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "../../../components/common/Modal";
import SearchInput from "../../../components/admincomponents/SearchInput";
// import { reasonsTable } from "../../../dummy";
import { useRouter } from "next/router";
import Pagination from "../../../components/common/Pagination";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { editReason } from "../../../features/editSlice";
import { BASE_URL } from "../../../api/base";
import EmptyTable from "../../../components/common/EmptyTable";
import { TbCarOff } from "react-icons/tb";
import { validateToken } from "../../../components/services/validateToken";
import { useEffect } from "react";

const Canceled_reasons = ({ data }) => {
  const [searchState, setSearchState] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [reason_id, setReason_id] = useState(null);
  const [user, setUser] = useState("All Users");
  const reasonsTable = data?.data;
  const [reasonList, setReasonList] = useState(reasonsTable);

  const router = useRouter();
  const dispatch = useDispatch();

  const states = ["All Users", "Rider", "Driver"];

  const rows = reasonList
    .filter((item) => {
      if (searchState === "") return item;
      else if (item.reason.toLocaleLowerCase().includes(searchState.toLocaleLowerCase())) {
        return item;
      }
    })
    .map((element) => (
      <tr
        className=" text-center hover:shadow-sm hover:border text-sm  text-textColor border-b"
        key={element.id}
      >
        <td className=" text-xs p-3">{element.id}</td>
        <td className=" text-xs p-3">{element.reason}</td>
        <td className=" text-xs p-3">{element.groups.length > 1 ? "Both" : element.groups[0]}</td>
        <td className=" text-xs p-3">{element.deductible_score}</td>

        <td className="text-center">
          {element.is_active ? (
            <div className=" max-w-[100px] ml-6 p-1 rounded-lg bg-[#f2fbf6]">
              <p className="text-green-600 text-xs">Active</p>
            </div>
          ) : (
            <div className=" max-w-[100px] ml-6 p-1 rounded-lg bg-[#fff4f4]">
              <p className="text-red-600 text-xs">Inactive</p>
            </div>
          )}
        </td>
        <td className=" text-xs p-3 ">
          <span className="flex space-x-3 justify-center">
            <button
              onClick={() => {
                router.push("/admin/trips_mgt/add-reason");
                dispatch(editReason(element));
              }}
              className="bg-scudGreen border flex space-x-2 hover:to-blue-500   rounded-md p-1"
            >
              <FiEdit className="text-white" />
            </button>
            <button
              onClick={() => {
                setDeleteModal(true), setReason_id(element.id);
              }}
              className="bg-red-500 border flex space-x-2 hover:to-red-300   rounded-md p-1"
            >
              <RiDeleteBin6Line className="text-white" />
            </button>
          </span>
        </td>
      </tr>
    ));

  //refresh serverside fetching
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const deleteReason = async () => {
    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const { data } = await axios.delete(`${BASE_URL}cancel-reasons/${reason_id}`);
      if (data) {
        setSuccessModal(true);
        setDeleteModal(false);
        refreshData();
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        const msg = err.response.data.message;
        if (typeof msg === "string") {
          enqueueSnackbar(msg, {
            variant: "error"
          });
        } else {
          for (let i = 0; i < msg.length; i++) {
            enqueueSnackbar(msg[i], {
              variant: "error"
            });
          }
        }
      }
    }
  };
  useEffect(() => {
    if (user === "All Users") return setReasonList(reasonsTable);
    const filtered = reasonsTable.filter((el) => {
      return el.groups.includes(user.toLowerCase());
    });
    setReasonList(filtered);
  }, [user]);

  if (successModal) {
    setTimeout(() => setSuccessModal(false), 3000);
  }
  return (
    <div>
      <div className="flex mb-5  md:mb-10 justify-between items-center">
        <p className="text-lg tracking-wide font-semibold">Canceled Reasons </p>
        <span className="">
          <button
            onClick={() => router.push("/admin/trips_mgt/add-reason")}
            className="bg-scudGreen flex space-x-2 hover:to-blue-500 text-xs  md:text-[14px] text-white rounded-md p-2 "
          >
            <span className="flex justify-between space-x-2">
              <AiOutlinePlus className="md:text-xl mt-1 md:mt-0 " />
              <p className="mt-0.5">Add Reason</p>
            </span>
          </button>
        </span>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="flex mb-2 md:mb-0">
          <Select2
            data={states}
            Icon={BsPeople}
            setValue={setUser}
            value={user}
            position={"mt-[8rem]"}
            showSearch={false}
          />
        </div>
        <SearchInput setValue={setSearchState} value={searchState} />
      </div>
      {/* table start here  */}
      {reasonsTable?.length === 0 ? (
        <EmptyTable Icon={TbCarOff} title={"No Reason List"} name={"reason"} />
      ) : (
        <div className="mt-5 mb-6 bg-white w-full overflow-x-auto border shadow pb-4  rounded-xl">
          <table className="w-full min-w-[700px] ">
            <thead className="border-b  bg-[#fbfbff] w-full rounded-t-lg">
              <tr className="border-b ">
                <td className="">
                  <div className="flex md:text-base text-xs justify-center">
                    <BiHash className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                    <p className="md:text-base  text-xs">id</p>
                  </div>
                </td>
                <td className="md:py-4 py-2 ">
                  <div className="flex  md:text-base text-xs justify-center">
                    <AiOutlineEdit className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                    <p className="md:text-base text-xs ">Reasons</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <BsPeople className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Canceled By</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <div className="border h-4 w-4 mt-1 mr-1 border-scudGreen rounded-full">
                      <AiOutlinePercentage className="text-scudGreen text-sm " />
                    </div>
                    <p className="md:text-base text-xs ">Scores</p>
                  </div>
                </td>

                <td className=" ">
                  <div className="flex  justify-center">
                    <div className="border h-4 w-4 mt-1 mr-1 border-scudGreen rounded-full">
                      <BiRefresh className="text-scudGreen text-sm " />
                    </div>

                    <p className="md:text-base text-xs ">Status</p>
                  </div>
                </td>
                <td className=" text-left">
                  <div className="flex   justify-center">
                    <AiOutlineSetting className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Actions</p>
                  </div>
                </td>
              </tr>
            </thead>

            <tbody className="mx-4">{rows}</tbody>
          </table>
        </div>
      )}
      {/* table end here  */}
      {/* <Pagination /> */}
      {/* delete modal start here  */}
      <Modal onClose={() => setDeleteModal(false)} open={deleteModal}>
        <div className="w-[18rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <MdErrorOutline className="text-red-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Delete Reason</p>
            <p className="text-sm text-textColor mt-2">You are about to delete a reason</p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              No,Cancel
            </button>
            <Button onClick={deleteReason} text={"Yes, Delete"} />
          </div>
        </div>
      </Modal>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Reason deleted successfully.</p>
            <p className="text-sm text-center text-textColor mt-2">The reason has been deleted.</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Canceled_reasons.getLayout = Layout;
export default Canceled_reasons;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}cancel-reasons`, {
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
