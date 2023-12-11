import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlinePlus,
  AiOutlinePrinter,
  AiOutlineSetting
} from "react-icons/ai";
import { BiHash, BiRefresh } from "react-icons/bi";
import { BsBarChart } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { GrDocumentCsv } from "react-icons/gr";
import { MdErrorOutline, MdOutlineLocationOn } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SiMicrosoftexcel } from "react-icons/si";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../../api/base";
import Layout from "../../../components/Admin/Layout";
import SearchInput from "../../../components/admincomponents/SearchInput";
import Button from "../../../components/common/Button";
import EmptyTable from "../../../components/common/EmptyTable";
import Modal from "../../../components/common/Modal";
import Pagination from "../../../components/common/Pagination";
import { getToken } from "../../../components/services/refresh";
import { editLocation } from "../../../features/editSlice";
import { validateToken } from "../../../components/services/validateToken";
import PrintTable from "../../../components/common/table/PrintTable";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
// import { citylist } from "../../../dummy";

const Locations = ({ data }) => {
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [location_id, setLocation_id] = useState(null);
  const [deleted, setDeleted] = useState("");
  const citylist = data;

  const rows = citylist
    ?.filter((item) => {
      if (search === "") return item;
      else if (item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
        return item;
      }
    })
    .map((element) => (
      <tr
        className=" text-center  hover:rounded-lg hover:border text-sm  text-textColor border-b"
        key={element.id}
      >
        <td className="md:text-base text-xs p-3">{element.id}</td>
        <td className="md:text-base  text-xs p-3">{element.name}</td>

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
            <button
              onClick={() => {
                dispatch(editLocation(element));
                router.push("/admin/location/add/add_location");
              }}
              className="bg-scudGreen border flex space-x-2 hover:to-blue-500   rounded-md p-1"
            >
              <FiEdit className="text-white" />
            </button>
            <button
              onClick={() => {
                setDeleteModal(true);
                setLocation_id(element.id);
                setDeleted(element.name);
              }}
              className="bg-red-600 border flex space-x-2 hover:to-red-300   rounded-md p-1"
            >
              <RiDeleteBin6Line className="text-white" />
            </button>
          </span>
        </td>
      </tr>
    ));

  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter();

  //refresh serverside fetching
  function refreshData() {
    router.replace(router.asPath);
  }

  useEffect(() => {
    const admin = true;
    getToken(admin);
    dispatch(editLocation(null));
  }, []);

  const deleteLocation = async () => {
    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const { data } = await axios.delete(`${BASE_URL}locations/${location_id}`);
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

  if (successModal) {
    setTimeout(() => setSuccessModal(false), 3000);
  }

  const componentToPrintRef = useRef();

  const handlePrintDoc = useReactToPrint({
    content: () => componentToPrintRef.current,
    documentTitle: "Location",
    onAfterPrint: () => null
  });
  return (
    <div>
      <div className="flex flex-row mb-7 md:mb-5 justify-between items-center">
        <p className="md:text-lg text-sm tracking-wide font-semibold">Manage Location</p>

        <span className="">
          <button
            onClick={() => router.push("/admin/location/add/add_location")}
            className="bg-scudGreen flex space-x-2 hover:bg-scudGreenHover text-[8px] md:text-[14px] text-white rounded-md p-2 "
          >
            <AiOutlinePlus className="md:text-xl md:mt-0 -mt-0.5 text-sm" />
            &nbsp;Add Location
          </button>
        </span>
      </div>
      <div className="flex flex-col-reverse md:flex-row md:justify-between">
        <PrintTable
          handlePrintDoc={handlePrintDoc}
          table_id={"#locations_"}
          file_name={"locations"}
        />
        <SearchInput value={search} setValue={setSearch} style={"mb-4 md:mb-0"} />
      </div>
      {/* table start here  */}
      {citylist.length === 0 ? (
        <div className="mt-4">
          <EmptyTable title={"No Location added"} Icon={MdOutlineLocationOn} name="location" />
        </div>
      ) : (
        <div
          id="locations_"
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
                    <MdOutlineLocationOn className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                    <p className="md:text-base text-xs ">Location</p>
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
      <Modal onClose={() => setDeleteModal(false)} open={deleteModal}>
        <div className="w-[18rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <MdErrorOutline className="text-red-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Delete Location</p>
            <p className="text-sm text-textColor mt-2">You are about to delete a location</p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              No,Cancel
            </button>
            <Button onClick={deleteLocation} text={"Yes, Delete"} />
          </div>
        </div>
      </Modal>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Location deleted successfully.</p>
            <p className="text-sm text-center text-textColor mt-2">
              You have successfully deleted {deleted} from locations.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Locations.getLayout = Layout;
export default Locations;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}locations`, {
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
  // console.log(data);

  return {
    props: {
      data
    }
  };
}
