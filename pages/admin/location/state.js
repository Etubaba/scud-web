import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlinePhone, AiOutlinePlus, AiOutlinePrinter, AiOutlineSetting } from "react-icons/ai";
import { BiHash, BiRefresh } from "react-icons/bi";
import { BsBarChart, BsCheck2, BsEye } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { GrDocumentCsv } from "react-icons/gr";
import { HiOutlineDocumentText } from "react-icons/hi";
import { MdGTranslate, MdLanguage, MdLocationCity } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SiMicrosoftexcel } from "react-icons/si";
import { BASE_URL, STATE_URL } from "../../../api/base";
import Layout from "../../../components/Admin/Layout";
import SearchInput from "../../../components/admincomponents/SearchInput";
import EmptyTable from "../../../components/common/EmptyTable";
import Pagination from "../../../components/common/Pagination";
import axios from "axios";
import Modal from "../../../components/common/Modal";
import Button from "../../../components/common/Button";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";
import { validateToken } from "../../../components/services/validateToken";
import PrintTable from "../../../components/common/table/PrintTable";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const City = ({ states }) => {
  console.log(states);
  const [search, setSearch] = useState("");
  const [stateList, setStateList] = useState(states.data);
  const [activateModal, setActiveModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(null);
  const router = useRouter();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const activateCity = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.patch(`${BASE_URL}states/${state?.id}`, {
        is_active: state?.is_active ? false : true
      });

      if (data) {
        refreshData();
        setLoading(false);
        setActiveModal(false);
        // setActive(e.target.checked);
      }
    } catch (err) {
      setLoading(false);
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

  const rows = stateList
    ?.filter((item) => {
      if (search === "") return item;
      else if (item.name.toLowerCase().includes(search.toLowerCase())) return item;
    })
    .map((element, idx) => (
      <tr
        onClick={() => router.push({ pathname: "/admin/location/city", query: element.id })}
        className=" text-center  hover:rounded-lg hover:border text-sm  text-textColor border-b"
        key={element.id}
      >
        <td className="md:text-base text-xs p-3">{element.id}</td>
        <td className="md:text-base  text-xs p-3">{element.name}</td>
        <td className="md:text-base text-xs p-3">{element.code}</td>
        <td className="md:text-base text-xs p-3">{""}</td>

        <td className="text-center">
          <div className="flex justify-center items-center">
            {element.is_active ? (
              <div className=" max-w-[100px] px-3 py-1 rounded-lg bg-[#f2fbf6]">
                <p className="text-green-600 text-xs">Active</p>
              </div>
            ) : (
              <div className=" max-w-[100px] px-3 p-1 rounded-lg bg-[#fff4f4]">
                <p className="text-red-600  text-xs">Inactive</p>
              </div>
            )}
          </div>
        </td>
        <td className="md:text-base text-xs p-3 ">
          <span className="flex space-x-3 justify-center">
            <button className="bg-green-600 border flex space-x-2 hover:bg-green-800   rounded-md p-1">
              <BsEye className="text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveModal(true);
                setState(element);
              }}
              // onClick={() => copyToClipboard("scud.io/ref:jamesanderson")}
              className="bg-scudGreen border flex space-x-2 hover:to-blue-500   rounded-md p-1"
            >
              <FiEdit className="text-white" />
            </button>
          </span>
        </td>
      </tr>
    ));

  //refresh serverside fetching
  function refreshData() {
    router.replace(router.asPath);
  }

  const componentToPrintRef = useRef();

  const handlePrintDoc = useReactToPrint({
    content: () => componentToPrintRef.current,
    documentTitle: "states",
    onAfterPrint: () => null
  });

  return (
    <div>
      {" "}
      <div className="flex flex-row mb-7 md:mb-5 justify-between items-center">
        <p className="md:text-lg text-sm tracking-wide font-semibold">Manage State</p>
      </div>
      <div className="flex flex-col-reverse md:flex-row md:justify-between">
        <PrintTable handlePrintDoc={handlePrintDoc} table_id={"#states_"} file_name={"state"} />
        <SearchInput setValue={setSearch} value={search} style={"mb-4 md:mb-0"} />
      </div>
      {/* table start here  */}
      {states.length === 0 ? (
        <div className="mt-4">
          <EmptyTable Icon={MdLocationCity} title="No state " name="states" />
        </div>
      ) : (
        <div
          id="states_"
          style={{ height: window.innerHeight, width: "100%" }}
          ref={componentToPrintRef}
          className="mt-5 mb-6 bg-white w-full overflow-x-auto border shadow pb-4  rounded-xl"
        >
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
                    <BsBarChart className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                    <p className="md:text-base text-xs ">State</p>
                  </div>
                </td>
                <td className="md:py-4 py-2 ">
                  <div className="flex  md:text-base text-xs justify-center">
                    <HiOutlineDocumentText className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                    <p className="md:text-base text-xs ">Short Name</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <AiOutlinePhone className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Country</p>
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
      <Pagination isAdmin={true} serverData={states} setData={setStateList} />
      <Modal onClose={() => setActiveModal(false)} open={activateModal}>
        <div className="w-[18rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <BsCheck2 className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">
              {state?.is_active ? "Deactivate" : "Active"} State
            </p>
            <p className="text-sm text-textColor mt-2">
              You are about to {state?.is_active ? "deactivate" : "active"} this state.
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setActiveModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              Cancel
            </button>
            <Button loading={loading} onClick={activateCity} text={"Activate"} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

City.getLayout = Layout;
export default City;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}states/paginated?country_id=40`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const states = await res.json();

  if (states?.statusCode !== undefined && states?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      states
    }
  };
}
