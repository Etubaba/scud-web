import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineCheckCircle, AiOutlineDollar, AiOutlinePercentage } from "react-icons/ai";
import { BsLock, BsPerson } from "react-icons/bs";
import { TbActivityHeartbeat } from "react-icons/tb";
import Layout from "../../../components/Admin/Layout";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Modal from "../../../components/common/Modal";
import Select from "../../../components/common/Select";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../../api/base";
import { useSnackbar } from "notistack";

const Fees = () => {
  const [rate, setRate] = useState("");
  const [status, setStatus] = useState("Select Status");

  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter();

  const statusList = ["Yes", "No"];
  //change button from disable to able
  const disable = rate === "" ? true : false;

  const addFees = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const formData = {
        keys: ["DRIVER_SERVICE_FARE"],
        values: [rate]
      };
      const { data } = await axios.patch(`${BASE_URL}settings/many`, formData);
      if (data) {
        setSuccessModal(true);
        setLoading(false);
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
      <span className="text-lg  font-semibold">
        <p className="tracking-wide">Manage Fees</p>
      </span>
      <div className="md:mt-10 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
          {/* <p className="text-sm text-textColor mb-7">Currency Details</p> */}
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            {/* <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Rider's Service Fee</p>
              <Input
                value={currencyname}
                onChange={(e) => setCurrencyname(e.target.value)}
                Icon={AiOutlinePercentage}
              />
            </div> */}
            {/* <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Driver's Peak Fare</p>
              <Input
                value={currencyname}
                onChange={(e) => setCurrencyname(e.target.value)}
                Icon={AiOutlinePercentage}
              />
            </div> */}

            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Driver's Service Fee</p>
              <Input
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                Icon={AiOutlinePercentage}
              />
            </div>

            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Apply Service Fee</p>
              <Select
                data={statusList}
                style={"w-full p-2"}
                positon={"p-4"}
                value={status}
                setValue={setStatus}
                dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                color=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex my-7 justify-between ">
        <button
          onClick={() => router.back()}
          className="bg-white border min-w-[120px] md:min-w-[150px] hover:bg-slate-50 px-4 py-1 rounded-md text-sm  text-textColor mr-2"
        >
          Back
        </button>
        <Button loading={loading} disabled={disable} onClick={addFees} text={"Update fees"} />
      </div>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Driver Service Fees Added.</p>
            <p className="text-sm text-center text-textColor mt-2">
              Driver service fee added successfully.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Fees.getLayout = Layout;
export default Fees;
