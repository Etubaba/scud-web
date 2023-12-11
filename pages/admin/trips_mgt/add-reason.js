import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsTranslate } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";
import BreadCrumbs from "../../../components/common/BreadCrumbs";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Modal from "../../../components/common/Modal";
import Select from "../../../components/common/Select";
import Layout from "../../../components/Admin/Layout";
import axios from "axios";
import { BASE_URL } from "../../../api/base";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { getToken } from "../../../components/services/refresh";
import { useSelector } from "react-redux";

const Add_reasons = () => {
  const [text, setText] = useState("");

  const [code, setCode] = useState("");
  const [canceledby, setCanceledBy] = useState("Select User");
  const [status, setStatus] = useState("Select Status");
  const [disabled, setDisabled] = useState(true);
  const [successModal, setSuccessModal] = useState(false);
  const [successAction, setSuccessAction] = useState("");

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter();

  useEffect(() => {
    const admin = true;
    getToken(admin);
  }, []);
  //change button from disable to able
  useEffect(() => {
    if (
      canceledby !== "Select User" &&
      code !== "" &&
      status !== "Select Status" &&
      text !== ""
    ) {
      setDisabled(false);
      setSuccessAction(text);
    }
  }, [code, canceledby, status, text]);

  const createReason = async () => {
    const token = Cookies.get("adminAccessToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.get["Content-Type"] = "application/json";

    const whoCanceled =
      canceledby === "Driver"
        ? ["driver"]
        : canceledby === "Rider"
        ? ["rider"]
        : ["driver", "rider"];

    const formData = {
      reason: text,
      is_active: status === "Active" ? true : false,
      groups: whoCanceled,
      deductible_score: +code,
    };
    try {
      const { data } = await axios.post(`${BASE_URL}cancel-reasons`, formData);

      if (data) {
        setSuccessModal(true);
        setCode("");
        setText("");
        setStatus("Select Status");
        setCanceledBy("Select User");
      }
    } catch (err) {
      if (err.response) {
        const msg = err.response.data.message;
        if (typeof msg === "string") {
          enqueueSnackbar(msg, {
            variant: "error",
          });
        } else {
          for (let i = 0; i < msg.length; i++) {
            enqueueSnackbar(msg[i], {
              variant: "error",
            });
          }
        }
      }
    }
  };

  // for editing of reason
  const reasonToEdit = useSelector((state) => state.edit.cancel_reason);
  useEffect(() => {
    if (reasonToEdit !== null) {
      setCode(reasonToEdit.deductible_score);
      setText(reasonToEdit.reason);
      setStatus(reasonToEdit.is_active === true ? "Active" : "Inactive");

      if (reasonToEdit.groups[0] && reasonToEdit.groups[1]) {
        setCanceledBy("Both");
      } else if (
        reasonToEdit.groups[0] === "driver" &&
        reasonToEdit.groups[1] === undefined
      ) {
        setCanceledBy("Driver");
      } else {
        setCanceledBy("Rider");
      }

      // setCanceledBy(reasonToEdit.groups.includes())
    }
  }, [reasonToEdit]);

  const updateReason = async () => {
    const formData = {
      reason: text,
      is_active: status === "Active" ? true : false,
      groups: reasonToEdit.groups,
      deductible_score: +code,
    };
    // if (formdata.question === question) delete formdata.question;
    // if (formdata.answer === ans) delete formdata.answer;
    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.patch(
        `${BASE_URL}cancel-reasons/${reasonToEdit.id}`,
        formData
      );

      if (data) {
        setSuccessModal(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (successModal) {
    setTimeout(() => setSuccessModal(false), 3000);
  }

  return (
    <div>
      <BreadCrumbs
        secondItem={"Add Reasons"}
        indexPath={"/admin/trips_mgt/canceled_reasons"}
        index={"Canceled Reason"}
      />
      <div className="md:mt-10 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
          <p className="text-sm text-textColor mb-7">
            {" "}
            <p className="text-sm text-textColor mb-2">Enter reasons details</p>
          </p>
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Reason Text</p>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                inputbg={"bg-white"}

                // Icon={TbWorld}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Canceled By</p>
              <Select
                data={["Driver", "Rider", "Both"]}
                style={"w-full p-2.5"}
                positon={"p-4"}
                value={canceledby}
                setValue={setCanceledBy}
                dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                color=""
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Scores</p>
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                inputbg={"bg-white"}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Status</p>
              <Select
                data={["Active", "Inactive"]}
                style={"w-full p-2.5"}
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
          onClick={() => router.push("/driver_profile/driver_payment")}
          className="bg-white border min-w-[120px] md:min-w-[150px] hover:bg-slate-50 px-4 py-1 rounded-md text-sm  text-textColor mr-2"
        >
          Back
        </button>
        <Button
          disabled={disabled}
          onClick={reasonToEdit === null ? createReason : updateReason}
          text={"Add Reason"}
        />
      </div>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Reason added.</p>
            <p className="text-sm text-center text-textColor mt-2">
              Reason has been added successfully.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Add_reasons.getLayout = Layout;
export default Add_reasons;
