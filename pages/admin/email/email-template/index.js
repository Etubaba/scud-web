import React from "react";
import Layout from "../../../../components/Admin/Layout";
import { BASE_URL } from "../../../../api/base";
import { useRouter } from "next/router";
import Button from "../../../../components/common/Button";
import {
  AiOutlineCheckCircle,
  AiOutlinePlus,
  AiOutlinePrinter,
  AiOutlineSetting
} from "react-icons/ai";
import { MdErrorOutline, MdOutlineMarkEmailRead } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import Modal from "../../../../components/common/Modal";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
import { GrDocumentCsv } from "react-icons/gr";
import { SiMicrosoftexcel } from "react-icons/si";
import SearchInput from "../../../../components/admincomponents/SearchInput";
import EmptyTable from "../../../../components/common/EmptyTable";
import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { BiHash, BiRefresh } from "react-icons/bi";
import { validateToken } from "../../../../components/services/validateToken";
import PrintTable from "../../../../components/common/table/PrintTable";

const index = ({ data }) => {
  const [searchState, setSearchState] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successAction, setSuccessAction] = useState("Deleted");
  const [template_id, setTemplate_id] = useState(null);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter();

  const templates = data?.data;

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const rows = templates
    .filter((el) => {
      if (searchState === "") return el;
      else if (
        el.name.toLowerCase().includes(searchState.toLowerCase()) ||
        el.name.toLowerCase().includes(searchState.toLowerCase())
      )
        return el;
    })
    .map((element) => (
      <tr
        className=" text-center hover:translate-x-1 cursor-pointer transition-all hover:border text-sm  text-textColor border-b"
        key={element.id}
      >
        <td className="md:text-base text-xs p-3">{element.id}</td>
        <td className="flex justify-center py-2 items-center space-x-2">
          <p className="md:text-base text-xs  ">{element.name}</p>
        </td>{" "}
        <td className="md:text-base text-xs p-3">{new Date(element.created_at).toDateString()}</td>
        <td className="">
          {element.is_active ? (
            <div className=" max-w-[70px]   p-1 rounded-lg bg-[#f2fbf6]">
              <p className="text-green-600">Active</p>
            </div>
          ) : (
            <div className=" max-w-[70px]    p-1 rounded-lg bg-[#fff4f4]">
              <p className="text-red-600">Inactive</p>
            </div>
          )}
        </td>
        <td className="md:text-base text-xs p-3 ">
          <span className="flex space-x-3 justify-center">
            <button
              onClick={() => {
                router.push({
                  pathname: "/admin/email/email-template/create_template",
                  query: element
                });
                //   dispatch(editTemplate(element));
              }}
              className="bg-scudGreen border flex space-x-2 hover:to-blue-500   rounded-md p-1"
            >
              <FiEdit className="text-white" />
            </button>
            <button
              onClick={() => {
                setTemplate_id(element.id);
                setDeleteModal(true);
                setSuccessAction(element.name);
              }}
              className="bg-red-500 border flex space-x-2 hover:to-red-300   rounded-md p-1"
            >
              <RiDeleteBin6Line className="text-white" />
            </button>
          </span>
        </td>
      </tr>
    ));

  const deleteTemplate = async () => {
    setLoading(true);
    try {
      const AUTH_TOKEN = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + AUTH_TOKEN;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.delete(`${BASE_URL}mail-templates/${template_id}`);
      if (data) {
        setLoading(false);
        setSuccessModal(true);
        setSuccessAction("");
        setDeleteModal(false);
        refreshData();
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

  return (
    <div>
      <div className="flex flex-row  mb-5 justify-between items-center">
        <p className="text-lg md:text-sm text-title tracking-wide font-semibold">Email Templates</p>

        <Button
          onClick={() => router.push("/admin/email/email-template/create_template")}
          custom={"px-2 py-1"}
          text={"Add Template"}
          SocialIcon={AiOutlinePlus}
          social={true}
        />
      </div>
      <p className=" tracking-wide text-textColor text-sm md:text-base mb-5 ">
        Total templates ({templates?.length})
      </p>
      {templates?.length !== 0 && (
        <div className="flex flex-col-reverse items-center md:flex-row md:justify-between">
          <PrintTable />
          <SearchInput setValue={setSearchState} value={searchState} />
        </div>
      )}
      {/* table start here  */}
      {templates?.length === 0 ? (
        <div className="mt-4">
          <EmptyTable
            Icon={MdOutlineMarkEmailRead}
            title={"No Email Template"}
            name={"email template"}
          />
        </div>
      ) : (
        <div className="mt-10 mb-6 bg-white w-full md:overflow-x-hidden border shadow pb-4  rounded-xl">
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
                    <MdOutlineMarkEmailRead className="text-scudGreen mr-1 md:mr-2  md:mt-1" />
                    <p className="md:text-base text-xs ">Template Name</p>
                  </div>
                </td>
                <td className="md:py-4 py-2 ">
                  <div className="flex  md:text-base text-xs justify-center">
                    <BsCalendarDate className="text-scudGreen mr-1 md:mr-2  md:mt-1" />
                    <p className="md:text-base text-xs ">Added</p>
                  </div>
                </td>

                <td className=" ">
                  <div className="flex  ">
                    <div className="border h-4 w-4 mt-1 mr-1 border-scudGreen rounded-full">
                      <BiRefresh className="text-scudGreen text-sm " />
                    </div>

                    <p className="md:text-base text-xs text-center ">Status</p>
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
            <p className="text-lg font-semibold mt-2">Delete Email Template</p>
            <p className="text-sm text-textColor mt-2">
              You are about to delete {successAction} email template
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              No,Cancel
            </button>
            <Button loading={loading} onClick={deleteTemplate} text={"Delete"} />
          </div>
        </div>
      </Modal>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2"> Deleted successfully.</p>
            <p className="text-sm text-center text-textColor mt-2">
              You have deleted {successAction} template successfully.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

index.getLayout = Layout;
export default index;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}mail-templates`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();

  if (data?.statusCode !== undefined && data?.statusCode === 401) {
    const isAdmin = true;
    try {
      await validateToken(context, isAdmin);
    } catch (err) {
      const login_url = isAdmin ? `/admin/auth` : `/signin/driver-signin`;
      return { redirect: { destination: login_url, permanent: false } };
    }
  }

  return {
    props: {
      data
    }
  };
}
