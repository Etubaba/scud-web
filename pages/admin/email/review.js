import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import { useState } from "react";
import { AiOutlineCheckCircle, AiOutlineSend } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../../api/base";
import Layout from "../../../components/Admin/Layout";
import Button from "../../../components/common/Button";
import DatePicker from "../../../components/common/DatePicker";
import { Loader } from "../../../components/common/Loader";
import Modal from "../../../components/common/Modal";
import { getToken } from "../../../components/services/refresh";
import { handleEmailBody, handleEmailSubject, handleEmailUsers } from "../../../features/editSlice";
import BreadCrumbs from "../../../components/common/BreadCrumbs";

function review() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [scheduleModal, setScheduleModal] = useState(false);
  const [date, setDate] = useState("  select date  ");
  const [time, setTime] = useState("  select time  ");
  const emailBody = useSelector((state) => state.edit.emailOption.emailBody);
  const notificationType = useSelector((state) => state.edit.emailOption.notificationType);
  const subject = useSelector((state) => state.edit.emailOption.emailSubject);
  const Recipients = useSelector((state) => state.edit.emailOption.recipient);
  const usersTo = useSelector((state) => state.edit.emailOption.users);
  let eventTime = "";
  const sendEmail = async () => {
    if (subject === null) {
      enqueueSnackbar("subject field is required", {
        variant: "error"
      });
      return;
    }
    if (emailBody == null) {
      enqueueSnackbar("Email body field is required", {
        variant: "error"
      });
      return;
    }
    setLoading(true);
    const token = Cookies.get("adminAccessToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.get["Content-Type"] = "application/json";
    await axios
      .post(
        BASE_URL + "notifications/all-users",
        eventTime === ""
          ? {
              subject: subject,
              body: emailBody,
              channel: notificationType
            }
          : {
              subject: subject,
              body: emailBody,
              channel: notificationType,
              schedule: eventTime
            }
      )
      .then((res) => {
        if (res.status == 201 || res) {
          setLoading(false);
          setSuccessModal(true);
          dispatch(handleEmailBody(null));
          dispatch(handleEmailSubject(null));
          dispatch(handleEmailUsers([]));
          setTimeout(async () => {
            if (notificationType === "sms") {
              router.push("/admin/message/messages");
            } else {
              router.push("/admin/email/send_email");
            }
          }, 3000);
        }
        return res;
      })
      .catch((err) => {
        setLoading(false);
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
  const sendEmail2 = async () => {
    if (subject === null) {
      enqueueSnackbar("subject field is required", {
        variant: "error"
      });
      return;
    }
    if (emailBody == null) {
      enqueueSnackbar("Email body field is required", {
        variant: "error"
      });
      return;
    }
    setLoading(true);

    const token = Cookies.get("adminAccessToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.get["Content-Type"] = "application/json";
    await axios
      .post(
        BASE_URL + "notifications/roles",
        eventTime === ""
          ? {
              subject: subject,
              body: emailBody,
              channel: notificationType,
              roles: ["driver"]
            }
          : {
              subject: subject,
              body: emailBody,
              channel: notificationType,
              roles: ["driver"],
              schedule: eventTime
            }
      )
      .then((res) => {
        if (res) {
          setLoading(false);
          setSuccessModal(true);
          dispatch(handleEmailBody(null));
          dispatch(handleEmailSubject(null));
          dispatch(handleEmailUsers([]));
          setTimeout(async () => {
            if (notificationType === "sms") {
              router.push("/admin/message/messages");
            } else {
              router.push("/admin/email/send_email");
            }
          }, 3000);
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.data.message === "Unauthorized" || err.response.data.statusCode == 401) {
          setLoading(false);
          getToken(true);
          enqueueSnackbar(`Try again something happened`, {
            variant: "info"
          });
        } else {
          setLoading(false);
          enqueueSnackbar(err.message, {
            variant: "error"
          });
        }
      });
  };
  const sendEmail3 = async () => {
    if (subject === null) {
      enqueueSnackbar("subject field is required", {
        variant: "error"
      });
      return;
    }
    if (emailBody == null) {
      enqueueSnackbar("Email body field is required", {
        variant: "error"
      });
      return;
    }
    setLoading(true);

    const token = Cookies.get("adminAccessToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.get["Content-Type"] = "application/json";
    await axios
      .post(
        BASE_URL + "notifications/specific-users",
        eventTime === ""
          ? {
              subject: subject,
              body: emailBody,
              channel: notificationType,
              emails: usersTo
            }
          : {
              subject: subject,
              body: emailBody,
              channel: notificationType,
              emails: usersTo,
              schedule: eventTime
            }
      )
      .then((res) => {
        if (res) {
          setLoading(false);
          setSuccessModal(true);
          dispatch(handleEmailBody(null));
          dispatch(handleEmailSubject(null));
          dispatch(handleEmailUsers([]));
          setTimeout(async () => {
            if (notificationType === "sms") {
              router.push("/admin/message/messages");
            } else {
              router.push("/admin/email/send_email");
            }
          }, 3000);
        }
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthorized" || err.response.data.statusCode == 401) {
          setLoading(false);
          getToken(true);
          enqueueSnackbar(`Try again something happened`, {
            variant: "info"
          });
        } else {
          setLoading(false);
          enqueueSnackbar(err.message, {
            variant: "error"
          });
        }
      });
  };
  const sendEmail4 = async () => {
    if (subject === null) {
      enqueueSnackbar("subject field is required", {
        variant: "error"
      });
      return;
    }
    if (emailBody == null) {
      enqueueSnackbar("Email body field is required", {
        variant: "error"
      });
      return;
    }
    setLoading(true);

    const token = Cookies.get("adminAccessToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.get["Content-Type"] = "application/json";
    await axios
      .post(
        BASE_URL + "notifications/roles",
        eventTime === ""
          ? {
              subject: subject,
              body: emailBody,
              channel: notificationType,
              roles: ["rider"]
            }
          : {
              subject: subject,
              body: emailBody,
              channel: notificationType,
              roles: ["rider"],
              schedule: eventTime
            }
      )
      .then((res) => {
        if (res) {
          setLoading(false);
          setSuccessModal(true);
          dispatch(handleEmailBody(null));
          dispatch(handleEmailSubject(null));
          dispatch(handleEmailUsers([]));
          setTimeout(async () => {
            if (notificationType === "sms") {
              router.push("/admin/message/messages");
            } else {
              router.push("/admin/email/send_email");
            }
          }, 3000);
        }
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthorized" || err.response.data.statusCode == 401) {
          setLoading(false);
          getToken(true);
          enqueueSnackbar(`Try again something happened`, {
            variant: "info"
          });
        } else {
          setLoading(false);
          enqueueSnackbar(err.message, {
            variant: "error"
          });
        }
      });
  };

  const scheduleMail = async () => {
    const event = new Date();
    if (date === "  select date  ") {
      enqueueSnackbar("date field is required", {
        variant: "error"
      });
      return;
    }
    if (time == "  select time  ") {
      enqueueSnackbar("time field is required", {
        variant: "error"
      });
      return;
    }
    let dateArray = date.split("-");
    let timeArray = time.split(":");

    event.setFullYear(dateArray[0], dateArray[1] - 1, dateArray[2]);
    event.setHours(timeArray[0], timeArray[1]);
    const eventTimes = event.toISOString();
    eventTime = eventTimes;
    Recipients === 1
      ? await sendEmail()
      : Recipients === 2
      ? await sendEmail2()
      : Recipients === 3
      ? await sendEmail3()
      : Recipients === 4 && (await sendEmail4());
  };

  return (
    <div>
      <div className="flex flex-row mb-5  md:mb-10 justify-between items-center">
        <BreadCrumbs
          secondItem={"Review"}
          indexPath={
            notificationType === "sms" ? "/admin/message/send_msg" : "/admin/email/create_email"
          }
          index={notificationType === "sms" ? " Send Message" : "Send Emai"}
        />

        <span onClick={() => router.push("/admin/email/create_email")} className="mt-2">
          <button className="bg-scudGreen flex space-x-2 hover:to-blue-500 text-[14px] text-white rounded-md p-2 ">
            <FiEdit className="text-xl " />
            &nbsp; Edit
          </button>
        </span>
      </div>
      <div className="rounded-md border shadow-sm p-8 my-5 space-y-10">
        {notificationType !== "sms" && (
          <div>
            <p className="text-textColor text-xs">Email Template</p>
            <p className="font-bold">General</p>
          </div>
        )}
        <div>
          <p className="text-textColor text-xs">Email Subject</p>
          <p className="font-bold">{subject}</p>
        </div>
        <div>
          <p className="text-textColor text-xs">Email Body</p>
          <p className="">
            <p dangerouslySetInnerHTML={{ __html: emailBody }} />
          </p>
        </div>
      </div>
      <div className="rounded-md border shadow-sm p-8 my-5 space-y-10">
        <div>
          <p className="text-textColor text-xs">Recipients</p>
          <p className="font-bold">
            {Recipients === 1
              ? "All users"
              : Recipients === 2
              ? "All Drivers"
              : Recipients === 3
              ? "Specific Users"
              : "All riders"}
          </p>
        </div>
        {notificationType !== "sms" && (
          <div>
            <p className="text-textColor text-xs">Locations</p>
            <p className="font-bold">All Locations</p>
          </div>
        )}
      </div>
      <div className="rounded-md border shadow-sm p-8 my-5 space-y-10">
        <div>
          <p className="text-textColor text-xs">Send to</p>
          <p className="font-bold">{notificationType !== "sms" ? "Email" : "SMS"}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <button
            // onClick={() => copyToClipboard("scud.io/ref:jamesanderson")}
            className="bg-[#F2F5FF] justify-center px-4 items-center  border border-red-500 text-red-500 flex space-x-2  text-[14px]  rounded-md p-1.5"
          >
            <span className="flex justify-between">
              <p>Cancel</p>
            </span>
          </button>
        </div>
        <div className="flex space-x-3 mt-2">
          <div>
            <button
              onClick={() => setScheduleModal(true)}
              className="bg-[#F2F5FF] justify-center items-center  border border-scudGreen text-scudGreen flex space-x-2 hover:to-blue-500 text-[14px]  rounded-md p-1.5"
            >
              <span className="flex justify-between">
                <BiTime className="text-xl " />
                <p>Schedule</p>
              </span>
            </button>
          </div>
          <div
            onClick={
              Recipients === 1
                ? sendEmail
                : Recipients === 2
                ? sendEmail2
                : Recipients === 3
                ? sendEmail3
                : Recipients === 4 && sendEmail4
            }
          >
            <button
              // onClick={() => router.push("/admin/admin_mgt/create_admin")}
              className="bg-scudGreen flex space-x-2 hover:to-blue-500 text-[14px] text-white rounded-md p-2 "
            >
              {loading ? (
                <div className="justify-center  flex items-center">
                  <Loader />
                </div>
              ) : (
                <span className="flex justify-between">
                  <AiOutlineSend className="text-xl" />
                  <p>Send now</p>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Email has been Sent successfully</p>
            <p className="text-sm text-center text-textColor mt-2">
              Email has been Sent successfully to
              {Recipients === 1
                ? " All users"
                : Recipients === 2
                ? " All Drivers"
                : Recipients === 3
                ? " Specific Users"
                : " All riders"}
            </p>
          </div>
        </div>
      </Modal>
      <Modal
        title={"Schedule when to send this email"}
        onClose={() => setScheduleModal(false)}
        open={scheduleModal}
      >
        <div className="w-[18rem] md:w-[24rem]   h-auto ">
          <div className="flex   justify-between my-7 w-full">
            <div className="space-y-4">
              <p className="text-textColor text-sm">Select Date</p>
              <DatePicker type={"date"} onChange={(e) => setDate(e.target.value)} value={date} />
            </div>
            <div className="space-y-4">
              <p className="text-textColor text-sm">Select Time</p>
              <DatePicker type={"time"} onChange={(e) => setTime(e.target.value)} value={time} />
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border border-red-500 hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-red-500 mr-2"
            >
              Cancel
            </button>

            <Button loading={loading} onClick={() => scheduleMail()} text={"Confirm schedule"} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

review.getLayout = Layout;
export default review;
