import React, { useState } from "react";
import Layout from "../../../../components/Admin/Layout";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { validateToken } from "../../../../components/services/validateToken";
import { BASE_URL } from "../../../../api/base";
import { getTimeAgo } from "../../../../components/services/getTimeAgo";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Modal from "../../../../components/common/Modal";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useSnackbar } from "notistack";
import AudioPlayer from "../../../../components/admincomponents/AudioPayer";

const sos_details = ({ report, driverVehicle }) => {
  const [open, setOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();

  const {
    id,
    reason,
    sos_options,
    location,
    created_at,
    status,
    trip: { driver, rider },
    audio_url
  } = report;

  //refresh serverside fetching
  function refreshData() {
    router.replace(router.asPath);
  }

  const updateReport = async (report_status) => {
    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const { data } = await axios.patch(`${BASE_URL}sos/${id}`, { status: report_status });
      if (data) {
        refreshData();
        setSuccessModal(true);
      }
    } catch (err) {
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

  const audioOptions = {
    waveColor: "rgb(255,255,255)",
    progressColor: "rgb(211, 211, 211)",
    barWidth: 2,
    height: 40,
    hideScrollbar: true,
    barGap: 1,
    barRadius: 0.5,
    url: audio_url
  };
  return (
    <div>
      {" "}
      <BreadCrumbs indexPath={"/admin/support/sos"} index={"SOS Reports"} secondItem={"Details"} />
      <p className="text-textColor mb-2">Emergency reports</p>
      <div className="md:mt-3  w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
          <div className="flex flex-col space-y-4 md:w-[80%]">
            <div className="flex space-y-1 md:flex-row flex-col md:space-y-0 md:space-x-40 ">
              <p className="text-textColor/40">SOS option</p>
              <p className="text-textColor text-sm">{sos_options?.reason}</p>
            </div>
            <div className="flex space-y-1 md:flex-row flex-col md:space-y-0 md:space-x-44">
              <p className="text-textColor/40">Message </p>
              <p className="text-textColor text-xs md:text-sm">{reason}</p>
            </div>
            {audio_url !== null && (
              <div className="flex space-y-1 md:flex-row flex-col items-center md:space-y-0 md:space-x-48">
                <p className="text-textColor/40">Audio </p>
                <div>
                  {" "}
                  <AudioPlayer url={audio_url} />
                </div>
              </div>
            )}
            <div className="flex space-y-1 md:flex-row flex-col md:space-y-0 md:space-x-44">
              <p className="text-textColor/40">Location</p>
              <p className="text-textColor text-xs md:text-sm">{location}</p>
            </div>
            <div className="flex space-y-1 md:flex-row flex-col md:space-y-0 md:space-x-52">
              <p className="text-textColor/40">Time</p>
              <p className="text-textColor  text-xs md:text-sm">
                {getTimeAgo(created_at)},{" "}
                {new Date(created_at).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true
                })}
              </p>
            </div>
            <div className="flex space-y-1 md:flex-row flex-col md:space-y-0 md:space-x-48">
              <p className="text-textColor/40">Status</p>
              <div
                onClick={() => setOpen(!open)}
                className={` relative min-w-[40px] md:min-w-[120px] flex justify-between items-center p-1 rounded-md ${
                  status === "pending" ? "bg-[#fff4f4]" : "bg-[#f2fbf6]"
                } `}
              >
                {status === "pending" ? (
                  <p className="text-red-600 text-sm">Pending</p>
                ) : (
                  <p className="text-green-600 text-sm">Resolved</p>
                )}
                <MdOutlineKeyboardArrowDown className="text-sm" />
                {open && (
                  <div className="absolute -ml-1 p-2 mt-[100px] overflow-y-auto bg-white  min-w-[120px] rounded border transition duration-300 ease-in z-40 shadow-xl">
                    <p
                      onClick={() => updateReport("pending")}
                      className="py-1 text-xs text-textColor hover:bg-adminbg "
                    >
                      Pending
                    </p>
                    <p
                      onClick={() => updateReport("resolved")}
                      className="py-1 text-xs text-textColor hover:bg-adminbg "
                    >
                      Resolved
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full mt-4">
          <div className="bg-adminbg md:mr-4  md:w-1/2 rounded-md md:h-auto py-3 px-5">
            <p className="text-textColor mb-2 text-sm ">Rider</p>
            <div className="flex space-x-2 items-center">
              <img
                src={rider.picture === null ? "/user.png" : rider.picture}
                className="rounded-full w-14 h-14"
              />
              <p className="text-title font-semibold text-sm">{`${rider.first_name} ${rider.last_name}`}</p>
            </div>
          </div>
          <div className="bg-adminbg md:w-1/2 rounded-md md:h-auto py-3 px-5">
            <p className="text-textColor text-sm mb-2">Driver</p>
            <div className="flex space-x-2 items-center">
              <img
                src={driver.picture === null ? "/user.png" : driver.picture}
                className="rounded-full w-14 h-14"
              />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-title">{`${driver.first_name} ${driver.last_name}`}</p>
                <div className="flex items-center space-x-2">
                  <p className="text-textColor text-sm">{`${driverVehicle.vehicle_brand.name} ${driverVehicle.model}, ${driverVehicle.color}`}</p>{" "}
                  <span className="border rounded-md px-1 bg-[#F5F7FF]">
                    <p className="text-xs">{driverVehicle.frsc_number}</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Report Resolved</p>
            <p className="text-sm text-center text-textColor mt-2">
              This report is resolved successfully
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
sos_details.getLayout = Layout;
export default sos_details;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const id = Object.keys(context.query)[0];

  const res = await fetch(`${BASE_URL}sos/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const report = await res.json();

  const driverRes = await fetch(`${BASE_URL}users/${report.trip.driver.id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const user = await driverRes.json();
  const driverVehicle = user.vehicles.length > 0 && user.vehicles[0];

  //driver vehicle details

  if (
    (report?.statusCode !== undefined && report?.statusCode === 401) ||
    (user.statusCode !== undefined && user.statusCode === 401)
  ) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      report,
      driverVehicle
    }
  };
}
