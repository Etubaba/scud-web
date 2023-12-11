import { AiOutlineCheckCircle, AiOutlinePlus } from "react-icons/ai";
import { BsPeople, BsPerson } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Layout from "../../../../components/Admin/Layout";
import Button from "../../../../components/common/Button";
import EmptyTable from "../../../../components/common/EmptyTable";
import Modal from "../../../../components/common/Modal";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { useRouter } from "next/router";
import { validateToken } from "../../../../components/services/validateToken";
import { BASE_URL } from "../../../../api/base";
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
import { MdErrorOutline } from "react-icons/md";

const Setting = ({ referralSettings }) => {
  const [id, setId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //refresh serverside fetching
  function refreshData() {
    router.replace(router.asPath);
  }

  const deleteReferralSetting = async () => {
    setLoading(true);
    try {
      const AUTH_TOKEN = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + AUTH_TOKEN;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.delete(`${BASE_URL}referral-reward/${id}`);
      if (data) {
        setDeleteModal(false);
        setSuccessModal(true);
        setLoading(false);
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
      {" "}
      <div className="flex mb-5 md:mb-10  justify-center md:flex-row flex-col space-y-3 md:space-y-0  md:justify-between items-center">
        <p className="text-lg tracking-wide font-semibold">Referral Management</p>
        <Button
          onClick={() => router.push("/admin/referral_mgt/settings/create")}
          custom={"px-2 py-2"}
          social={true}
          SocialIcon={AiOutlinePlus}
          text={"Create Setting"}
        />
      </div>
      {referralSettings?.length === 0 ? (
        <div className="mt-4">
          <EmptyTable Icon={BsPeople} title="No Referral Setting" name="referral setting" />
        </div>
      ) : (
        <div className="border bg-white rounded-md p-3 space-y-2">
          {referralSettings.map((item, idx) => (
            <div
              key={idx}
              className="border bg-white p-3 space-y-3 sm:space-y-0 sm:flex items-center justify-between rounded-md"
            >
              <div className="flex space-x-1 items-center">
                {item.type === "rider" ? (
                  <div className="p-1 bg-[#ffbd3d1a] rounded-full">
                    <div
                      className={`bg-scudyellow p-3 flex justify-center items-center rounded-full text-white`}
                    >
                      <BsPerson className="text-lg" />
                    </div>
                  </div>
                ) : (
                  <div className="p-1 bg-[#F2F5FF] rounded-full">
                    <div
                      className={`bg-scudGreen p-3 flex justify-center items-center rounded-full text-white`}
                    >
                      <GiPoliceOfficerHead className="text-lg" />
                    </div>
                  </div>
                )}
                <p className="text-textColor text-sm">
                  {" "}
                  {`${item.type?.charAt(0).toUpperCase() + item.type?.slice(1)}  referal settings`}
                </p>
              </div>

              <div className="flex  space-x-8  justify-between items-center">
                <div className="flex justify-center items-center">
                  {item.is_active ? (
                    <div className=" max-w-[100px] px-3 py-1 rounded-lg bg-[#f2fbf6]">
                      <p className="text-green-600 text-xs">Active</p>
                    </div>
                  ) : (
                    <div className=" max-w-[100px] px-3 p-1 rounded-lg bg-[#fff4f4]">
                      <p className="text-red-600  text-xs">Inactive</p>
                    </div>
                  )}
                </div>
                <span className="flex space-x-3 justify-center">
                  <button
                    onClick={() => {
                      router.push({
                        pathname: "/admin/referral_mgt/settings/create",
                        query: item
                      });
                    }}
                    className="bg-scudGreen border flex space-x-2 hover:to-blue-500   rounded-md p-1"
                  >
                    <FiEdit className="text-white" />
                  </button>
                  <button
                    onClick={() => {
                      setDeleteModal(true);
                      setId(item.id);
                    }}
                    className="bg-red-600 border flex space-x-2 hover:to-red-300   rounded-md p-1"
                  >
                    <RiDeleteBin6Line className="text-white" />
                  </button>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* delete modal start here  */}
      <Modal onClose={() => setDeleteModal(false)} open={deleteModal}>
        <div className="w-[18rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <MdErrorOutline className="text-red-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Delete Referal Setting</p>
            <p className="text-sm text-textColor mt-2">
              You are about to delete a referral setting.
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              Cancel
            </button>
            <Button loading={loading} onClick={deleteReferralSetting} text={" Delete"} />
          </div>
        </div>
      </Modal>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Referral Setting deleted</p>
            <p className="text-sm text-center text-textColor mt-2">
              Referral settings has been deleted successfully.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Setting.getLayout = Layout;
export default Setting;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}referral-reward`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const referralSettings = await res.json();

  if (referralSettings?.statusCode !== undefined && referralSettings?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      referralSettings
    }
  };
}
