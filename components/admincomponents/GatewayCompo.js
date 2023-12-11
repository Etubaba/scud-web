import React, { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { MdErrorOutline, MdOutlineCancel } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Button from "../common/Button";
import Modal from "../common/Modal";
import Switch from "../common/Switch";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/base";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";

const GatewayCompo = ({ item: { image, name, description }, activeGateway, setDependant }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [active, setActive] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (activeGateway?.toLowerCase() === name.toLowerCase()) {
      setActive(true);
    }
  }, [active]);

  const handleActiveChange = async (evt) => {
    if (active) return setActive(evt.target.checked);
    const activedata = {
      key: "ACTIVE_PAYMENT_GATEWAY",
      value: name
    };
    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.patch(`${BASE_URL}settings`, activedata);
      if (data) {
        setActive(true);
        setDependant((prev) => prev + 1);
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

  return (
    <div className="bg-white w-full lg:flex p-4 mb-5  justify-between rounded-lg border">
      <div className="flex space-y-5 justify-start items-start flex-col">
        <div className="flex space-x-3 justify-center items-center">
          <img src={image} alt="" className="w-12 h-12 rounded-md" />
          <p className="text-xl text-textColor">{name}</p>
        </div>

        <p className="text-sm  text-textColor">{description}</p>
      </div>

      <div className=" flex flex-col  space-y-16">
        <Switch onChange={(e) => handleActiveChange(e)} value={active} />
      </div>

      {/* delete modal start here  */}
      <Modal onClose={() => setDeleteModal(false)} open={deleteModal}>
        <div className="w-[18rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <MdErrorOutline className="text-red-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Delete account details</p>
            <p className="text-sm text-textColor mt-2">
              You are about to delete your Fidelity account details
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              No,Cancel
            </button>
            <Button
              onClick={() => {
                setSuccessModal(true);
                setDeleteModal(false);
              }}
              text={"Yes, Delete"}
            />
          </div>
        </div>
      </Modal>

      {/* success modal */}

      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">successfully Deleted Gateway</p>
            <p className="text-sm text-center text-textColor mt-2">
              Your have successfully deleted a gateway.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GatewayCompo;
