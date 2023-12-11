import React from "react";
import { useState } from "react";
import Layout from "../../../components/Admin/Layout";
import "animate.css";
import { useRouter } from "next/router";
import { BASE_URL } from "../../../api/base";
import SearchInput from "../../../components/admincomponents/SearchInput";
import Button from "../../../components/common/Button";
import EmptyTable from "../../../components/common/EmptyTable";
import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import MsgComponent from "../../../components/common/MsgComponent";
import { MdErrorOutline, MdOutlineTextsms } from "react-icons/md";
import Modal from "../../../components/common/Modal";
import { AiOutlineCheckCircle } from "react-icons/ai";

const Message = ({ notifications }) => {
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [deleteMail, setDeleteMail] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  // const [statModal, setStatModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState([]);

  const [searchState, setSearchState] = useState(false);

  const notificationList = notifications?.data.filter((item) => item.channel === "sms");

  const handleDeleteMessage = () => {
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

  return (
    <div>
      {" "}
      <div className="flex mb-5  md:mb-10 justify-between ">
        <p className="text-lg tracking-wide font-semibold"> Messages</p>
        <Button
          text={"Send message"}
          social={true}
          SocialIcon={MdOutlineTextsms}
          onClick={() => router.push("/admin/message/send_msg")}
        />
      </div>
      {notification?.length !== 0 && (
        <div className="my-7 block md:hidden">
          <SearchInput />
        </div>
      )}
      {notification?.length !== 0 && (
        <div className="md:flex justify-between">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <button
              // onClick={() => copyToClipboard("scud.io/ref:jamesanderson")}
              className={`bg-[#F2F5FF] text-textColor  hover:text-scudGreen hover:border-scudGreen justify-center items-center  border flex space-x-2 hover:to-blue-500 text-[14px]  rounded-md p-1 px-3`}
            >
              All message (3)
            </button>
            <button
              // onClick={() => copyToClipboard("scud.io/ref:jamesanderson")}
              className={`bg-[#F2F5FF] text-textColor  hover:text-scudGreen hover:border-scudGreen justify-center items-center  border flex space-x-2 hover:to-blue-500 text-[14px]  rounded-md p-1 px-3`}
            >
              For drivers (2){" "}
            </button>
            <button
              // onClick={() => copyToClipboard("scud.io/ref:jamesanderson")}
              className={`bg-[#F2F5FF] text-textColor  hover:text-scudGreen hover:border-scudGreen justify-center items-center  border flex space-x-2 hover:to-blue-500 text-[14px]  rounded-md p-1 px-3`}
            >
              For riders (1)
            </button>
          </div>
          <div className="mt-3 hidden md:block">
            <SearchInput />
          </div>
        </div>
      )}
      {notificationList.length === 0 ? (
        <EmptyTable name={"sms"} title={"No Recent SMS"} Icon={MdOutlineTextsms} />
      ) : (
        <div>
          {notificationList.map((item, index) => (
            <MsgComponent
              setDeleteModal={setDeleteModal}
              setDeleteMail={setDeleteMail}
              key={index}
              item={item}
            />
          ))}
        </div>
      )}
      <Modal onClose={() => setDeleteModal(false)} open={deleteModal}>
        <div className="w-[18rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <MdErrorOutline className="text-red-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Delete Message </p>
            <p className="text-sm text-center text-textColor mt-2">
              You are about to delete this message record from the database
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              No,Cancel
            </button>
            <Button loading={loading} onClick={handleDeleteMessage} text={"Yes, Delete"} />
          </div>
        </div>
      </Modal>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Message deleted successfully.</p>
            <p className="text-sm text-center text-textColor mt-2">
              You have deleted a message successfully.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Message.getLayout = Layout;
export default Message;

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
