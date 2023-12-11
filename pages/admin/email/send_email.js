import React from "react";
import { useState } from "react";
import { AiOutlineCheckCircle, AiOutlineMail, AiOutlineSend } from "react-icons/ai";
import { FiEdit, FiTrash, FiUsers } from "react-icons/fi";
import { MdAdsClick, MdErrorOutline, MdOutlineEmail, MdOutlineMail } from "react-icons/md";
import Layout from "../../../components/Admin/Layout";
import Divider from "../../../components/common/Divider";
import "animate.css";
import { promotionData } from "../../../dummy";
import { useRouter } from "next/router";
import { BiLineChart } from "react-icons/bi";
import Modal from "../../../components/common/Modal";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { IoMdOpen } from "react-icons/io";
import { BASE_URL } from "../../../api/base";
import { useEffect } from "react";
import { getToken } from "../../../components/services/refresh";
import { useSelector } from "react-redux";
import ReactTimeAgo from "react-time-ago";
import axios from "axios";
import Cookies from "js-cookie";
import Button from "../../../components/common/Button";
import { useSnackbar } from "notistack";
import { validateToken } from "../../../components/services/validateToken";
import SearchInput from "../../../components/admincomponents/SearchInput";
import MsgComponent from "../../../components/common/MsgComponent";
import EmptyTable from "../../../components/common/EmptyTable";

const Send = ({ notifications }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [statModal, setStatModal] = useState(false);
  const [searchState, setSearchState] = useState("");
  const [notification, setNotification] = useState(notifications?.data);
  const [successModal, setSuccessModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successAction, setSuccessAction] = useState("Deleted");
  const [deleteMail, setDeleteMail] = useState(null);
  const [loading, setLoading] = useState(false);

  const refreshData = async () => {
    await router.replace(router.asPath);
  };

  const handleDeleteMail = () => {
    setLoading(true);
    const token = Cookies.get("adminAccessToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.get["Content-Type"] = "application/json";
    axios
      .delete(BASE_URL + `notifications/${deleteMail.id}`)
      .then((res) => {
        if (res) {
          setDeleteModal(false);
          setLoading(false);
          setSuccessModal(true);

          router.push("/admin/email/send_email");
        }
      })
      .catch((err) => {
        if (
          err.response?.data?.message === "Unauthorized" ||
          err.response?.data?.statusCode == 401
        ) {
          setLoading(false);
          getToken(true);
          enqueueSnackbar(`Try again something happened`, {
            variant: "info"
          });
        } else {
          setLoading(false);
          enqueueSnackbar(err.response?.data?.message, {
            variant: "error"
          });
        }
      });
  };

  console.log(searchState);

  useEffect(() => {
    if (searchState == "") {
      setNotification(notifications.data);
    } else {
      let filter_data = notification.filter((item) => {
        return item.subject.toLocaleLowerCase().includes(searchState.toLocaleLowerCase());
      });
      setNotification(filter_data);
    }
  }, [searchState]);

  const handleSort = (all, drivers, riders) => {
    if (all) {
      setNotification(notifications.data);
    } else if (drivers) {
      let filter_data = notifications.data.filter((item) => {
        return item.tags[0].toLowerCase() == "to specific users";
      });
      setNotification(filter_data);
    } else if (riders) {
      let filter_data = notifications.data.filter((item) => {
        return item.tags[0].toLowerCase() == "all users";
      });
      setNotification(filter_data);
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-row mb-5  md:mb-10 justify-between items-center">
          <p className="text-lg tracking-wide font-semibold"> Emails</p>
          <Button
            text={"Send Email"}
            social={true}
            SocialIcon={FiEdit}
            onClick={() => router.push("/admin/email/create_email")}
          />
        </div>
        {notification?.length !== 0 && (
          <div className="my-5 block md:hidden">
            <SearchInput value={searchState} setValue={setSearchState} />
          </div>
        )}
        {notification?.length !== 0 && (
          <div className=" space-y-10 md:space-y-0 md:flex justify-between">
            <div className="flex space-x-5">
              <button
                onClick={() => handleSort(true, false, false)}
                className={`bg-[#F2F5FF] text-textColor  hover:text-scudGreen hover:border-scudGreen justify-center items-center  border flex space-x-2 hover:to-blue-500 text-[14px]  rounded-md p-1 px-3`}
              >
                <p className="text-xs md:text-base">All emails ({notifications.data?.length})</p>
              </button>
              <button
                onClick={() => handleSort(false, true, false)}
                className={`bg-[#F2F5FF] text-textColor  hover:text-scudGreen hover:border-scudGreen justify-center items-center  border flex space-x-2  text-[14px]  rounded-md p-1 px-3`}
              >
                <p className="text-xs md:text-base">
                  Specific users (
                  {
                    notifications.data?.filter((role) => {
                      return role.tags[0].toLowerCase() == "to specific users";
                    }).length
                  }
                  ){" "}
                </p>
              </button>
              <button
                onClick={() => handleSort(false, false, true)}
                className={`bg-[#F2F5FF] text-textColor  hover:text-scudGreen hover:border-scudGreen justify-center items-center  border flex space-x-2   rounded-md p-1 px-3`}
              >
                <p className="text-xs md:text-base">
                  All user (
                  {
                    notifications.data?.filter((role) => {
                      return role.tags[0].toLowerCase() == "all users";
                    }).length
                  }
                  )
                </p>
              </button>
            </div>
            <div className="mt-2 hidden md:block">
              <SearchInput value={searchState} setValue={setSearchState} />
            </div>
          </div>
        )}
        {notification?.length === 0 ? (
          <EmptyTable name={"email"} title={"No Recent Email"} Icon={MdOutlineEmail} />
        ) : (
          notification.map((item, index) => (
            <MsgComponent
              setStatModal={setStatModal}
              setDeleteModal={setDeleteModal}
              setDeleteMail={setDeleteMail}
              key={index}
              item={item}
            />
          ))
        )}

        <Modal title={"Email Statistics"} onClose={() => setStatModal(false)} open={statModal}>
          <div className=" w-[20rem] md:w-[24rem] mt-2  h-auto">
            <div className="flex flex-col space-y-3 ">
              <div className="flex border border-slate-200 rounded-md p-2">
                <div className="flex w-full">
                  <div className="flex space-x-2 p-1 text-xs ">
                    <FiUsers className="mt-0.5 text-sm text-scudGreen" />
                    <p>User type:</p>
                  </div>
                </div>
                <div className="flex justify-center items-center w-full">
                  <div className="flex  space-x-2 p-1 text-xs rounded-md bg-green-300/30 text-green-500">
                    <GiPoliceOfficerHead className="mt-0.5" />
                    <p>Driver</p>
                  </div>
                </div>
              </div>
              <div className="flex border border-slate-200 rounded-md p-2">
                <div className="flex w-full">
                  <div className="flex space-x-2 p-1 text-xs ">
                    <MdOutlineMail className="mt-0.5 text-sm text-scudGreen" />
                    <p>Email sent to:</p>
                  </div>
                </div>
                <div className="flex justify-center items-center w-full">
                  <div className="flex  space-x-2 p-1 text-xs ">
                    <p className="font-bold">500 drivers</p>
                  </div>
                </div>
              </div>
              <div className="flex border border-slate-200 rounded-md p-2">
                <div className="flex w-full">
                  <div className="flex space-x-2 p-1 text-xs ">
                    <IoMdOpen className="mt-0.5 text-sm text-scudGreen" />
                    <p>Opened by:</p>
                  </div>
                </div>
                <div className="flex justify-center items-center w-full">
                  <div className="flex  space-x-2 p-1 text-xs ">
                    <p className="font-bold">450 drivers (95%)</p>
                  </div>
                </div>
              </div>
              <div className="flex border border-slate-200 rounded-md p-2">
                <div className="flex w-full">
                  <div className="flex space-x-2 p-1 text-xs ">
                    <MdAdsClick className="mt-0.5 text-sm text-scudGreen" />
                    <p>Clicked by:</p>
                  </div>
                </div>
                <div className="flex justify-center items-center w-full">
                  <div className="flex  space-x-2 p-1 text-xs ">
                    <p className="font-bold">
                      <div className="flex  space-x-2 p-1 text-xs ">
                        <p className="font-bold">500 drivers</p>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal onClose={() => setDeleteModal(false)} open={deleteModal}>
          <div className="w-[18rem] md:w-[24rem]  h-auto">
            <div className="flex flex-col space-y-3 justify-center items-center">
              <MdErrorOutline className="text-red-600 text-5xl" />
              <p className="text-lg font-semibold mt-2">Delete Mail </p>
              <p className="text-sm text-center text-textColor mt-2">
                You are about to delete this mail from the database
              </p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setDeleteModal(false)}
                className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
              >
                No,Cancel
              </button>
              <Button loading={loading} onClick={handleDeleteMail} text={"Yes, Delete"} />
            </div>
          </div>
        </Modal>
        <Modal onClose={() => setSuccessModal(false)} open={successModal}>
          <div className=" w-[20rem] md:w-[24rem]  h-auto">
            <div className="flex flex-col space-y-3 justify-center items-center">
              <AiOutlineCheckCircle className="text-green-600 text-5xl" />
              <p className="text-lg font-semibold mt-2">{successAction} deleted successfully.</p>
              <p className="text-sm text-center text-textColor mt-2">
                The {successAction} has been deleted.
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
Send.getLayout = Layout;
export default Send;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  try {
    const [notificationRes] = await Promise.all([
      fetch(`${BASE_URL}notifications`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
    ]);

    const [notifications] = await Promise.all([notificationRes.json()]);

    if (notifications?.statusCode !== undefined && notifications?.statusCode === 401) {
      try {
        await validateToken(context, true);
      } catch (err) {
        return { redirect: { destination: `/admin/auth`, permanent: false } };
      }
    }

    return { props: { notifications } };
  } catch (err) {
    console.log(err);
  }
}
