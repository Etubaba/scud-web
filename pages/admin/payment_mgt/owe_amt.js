import React from "react";
import { useState } from "react";
import { FiCheck, FiEdit } from "react-icons/fi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { TbCurrencyNaira } from "react-icons/tb";
import Layout from "../../../components/Admin/Layout";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import axios from "axios";
import { BASE_URL } from "../../../api/base";
import Modal from "../../../components/common/Modal";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";

const Owe_amt = () => {
  const [firstTitle, setFirstTitle] = useState("");
  const [secondTitle, setSecondTitle] = useState("");
  const [thirdTitle, setThirdTitle] = useState("");

  const [firstmessage, setFirstMessage] = useState(false);
  const [secondmessage, setSecondMessage] = useState(false);
  const [thirdmessage, setThirdMessage] = useState(false);

  const [firstBody, setFirstBody] = useState("");
  const [secondBody, setSecondBody] = useState("");
  const [thirdBody, setThirdBody] = useState("");

  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [percentage, setPercentage] = useState("");
  const [template1, setTemplate1] = useState("template1");
  const [template2, setTemplate2] = useState("template1");
  const [template3, setTemplate3] = useState("template3");

  const [successModal, setSuccessModal] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const oweSetting = async () => {
    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const formData = {
        first: {
          subject: firstTitle,
          template: template1,
          body: firstBody
        },
        second: {
          subject: secondTitle,
          template: template2,
          body: secondBody
        },
        third: {
          subject: thirdTitle,
          template: template3,
          body: thirdBody
        },
        max_owe_amount: +maxAmount,
        min_owe_amount: +minAmount,
        percentage: +percentage
      };
      const { data } = await axios.patch(`${BASE_URL}settings/owe`, formData);

      if (data) {
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
      } else {
        enqueueSnackbar("Something went wrong", {
          variant: "error"
        });
      }
    }
  };

  if (successModal) setTimeout(() => setSuccessModal(false), 3000);

  return (
    <div className="md:p-5">
      <p className="tracking-wide font-semibold text-lg">Manage Owe Amount</p>
      <div className="space-y-5 my-10">
        {/* First section ################################################################## */}

        <div className="rounded-lg bg-white border transition-all p-2 md:p-4">
          <div className="md:flex justify-between space-y-5 md:space-y-0 ">
            <div className="flex space-x-4">
              <div className="h-7 w-7 rounded-full bg-blue-200 flex justify-center items-center ">
                <div className="h-5 w-5 rounded-full bg-scudGreen "></div>
              </div>

              <p className="mt-1">First Email Notification</p>
            </div>
            <div>
              {firstmessage ? (
                <button
                  onClick={() => setFirstMessage(false)}
                  className="bg-[#F2F5FF] justify-center items-center  text-scudGreen flex space-x-2 hover:to-blue-500 text-[14px]  rounded-md p-1 px-3"
                >
                  <FiCheck /> &nbsp;&nbsp; Done
                </button>
              ) : (
                <button
                  onClick={() => setFirstMessage(true)}
                  className="bg-[#F2F5FF] justify-center items-center  text-scudGreen flex space-x-2 hover:to-blue-500 text-[14px]  rounded-md p-1 px-3"
                >
                  <FiEdit /> &nbsp;&nbsp; Edit
                </button>
              )}
            </div>
          </div>

          {firstmessage && (
            <div className="animate__animated animate__fadeIn mt-10">
              <div className=" bg-adminbg rounded-md p-4">
                <div className="grid grid-cols-1 md:px-10 mb-4  md:grid-cols-2 gap-5 md:gap-8">
                  <div className="col-span-1">
                    <p className="text-sm text-textColor mb-4">Minimum Amount</p>
                    <Input
                      type={"number"}
                      value={minAmount}
                      onChange={(e) => setMinAmount(e.target.value)}
                      placeholder={"00.00"}
                      Icon={TbCurrencyNaira}
                    />
                  </div>
                  <div className="col-span-1">
                    <p className="text-sm text-textColor mb-4">Maximum Amount</p>
                    <Input
                      type={"number"}
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder={"00.00"}
                      Icon={TbCurrencyNaira}
                    />
                  </div>
                </div>

                <div className="col-span-1 mb-4 md:px-10">
                  <p className="text-sm text-textColor mb-4">Email Template</p>
                  <div className="p-2 border rounded-md flex items-center justify-between ">
                    <p className="text-sm text-textColor">Select </p>
                    <MdOutlineKeyboardArrowDown className=" text-textColor" />
                  </div>
                </div>

                <div className="col-span-1 mb-4 md:px-10">
                  <p className="text-sm text-textColor mb-4"> Email Subject</p>
                  <Input
                    rows={100}
                    cols={100}
                    type={"text"}
                    value={firstTitle}
                    onChange={(e) => setFirstTitle(e.target.value)}

                    // Icon={AiOutlineMail}
                  />
                </div>
                {/* adding aditional heading tags ##################################################3 */}
                <div className="col-span-1 mb-4 md:px-10">
                  <p className="text-sm text-textColor mb-4">Email Body</p>
                  <Input
                    textArea={true}
                    rows={100}
                    cols={100}
                    value={firstBody}
                    onChange={(e) => setFirstBody(e.target.value)}
                    placeholder={"Write your message..."}
                    // Icon={AiOutlineMail}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* second section ################################################################## */}

        <div className="rounded-lg bg-white border transition-all p-2 md:p-4">
          <div className="md:flex justify-between space-y-5 md:space-y-0 ">
            <div className="flex space-x-4">
              <div className="h-7 w-7 rounded-full bg-yellow-100 flex justify-center items-center ">
                <div className="h-5 w-5 rounded-full bg-yellow-500 "></div>
              </div>

              <p className="mt-1">Second Email Notification</p>
            </div>
            <div>
              {secondmessage ? (
                <button
                  onClick={() => setSecondMessage(false)}
                  className="bg-[#F2F5FF] justify-center items-center  text-scudGreen flex space-x-2 hover:to-blue-500 text-[14px]  rounded-md p-1 px-3"
                >
                  <FiCheck /> &nbsp;&nbsp; Done
                </button>
              ) : (
                <button
                  onClick={() => setSecondMessage(true)}
                  className="bg-[#F2F5FF] justify-center items-center  text-scudGreen flex space-x-2 hover:to-blue-500 text-[14px]  rounded-md p-1 px-3"
                >
                  <FiEdit /> &nbsp;&nbsp; Edit
                </button>
              )}
            </div>
          </div>
          {secondmessage && (
            <div className="animate__animated animate__fadeIn mt-10">
              <div className=" bg-adminbg rounded-md p-4">
                <div className="grid grid-cols-1 md:px-10 mb-4  md:grid-cols-2 gap-5 md:gap-8">
                  <div className="col-span-1">
                    <p className="text-sm text-textColor mb-4">
                      Set percentage for Maximum Notification
                    </p>
                    <Input
                      type={"number"}
                      value={percentage}
                      onChange={(e) => setPercentage(e.target.value)}
                      placeholder={"00.00"}
                      Icon={TbCurrencyNaira}
                    />
                  </div>
                </div>
                <div className="col-span-1 mb-4 md:px-10">
                  <p className="text-sm text-textColor mb-4">Second Email Title</p>
                  <Input
                    rows={100}
                    cols={100}
                    type={"text"}
                    value={secondTitle}
                    onChange={(e) => setSecondTitle(e.target.value)}
                    placeholder={"Enter email title..."}
                    // Icon={AiOutlineMail}
                  />
                </div>

                <div className="col-span-1 mb-4 md:px-10">
                  <p className="text-sm text-textColor mb-4">Second Email Template</p>
                  <div className="p-2 border rounded-md flex items-center justify-between ">
                    <p className="text-sm text-textColor">Select </p>
                    <MdOutlineKeyboardArrowDown className=" text-textColor" />
                  </div>
                </div>

                {/* adding aditional heading tags ##################################################3 */}
                <div className="col-span-1 mb-4 md:px-10">
                  <p className="text-sm text-textColor mb-4">Second Email Body</p>
                  <Input
                    textArea={true}
                    rows={100}
                    cols={100}
                    value={secondBody}
                    onChange={(e) => setSecondBody(e.target.value)}
                    placeholder={"Write your message..."}
                    // Icon={AiOutlineMail}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Last section ################################################################## */}
        <div className="rounded-lg bg-white border transition-all p-2 md:p-4">
          <div className="md:flex justify-between space-y-5 md:space-y-0 ">
            <div className="flex space-x-4">
              <div className="h-7 w-7 rounded-full bg-red-100 flex justify-center items-center ">
                <div className="h-5 w-5 rounded-full bg-red-500 "></div>
              </div>

              <p className="mt-1">Find/Block Email Notification</p>
            </div>
            <div>
              {thirdmessage ? (
                <button
                  onClick={() => setThirdMessage(false)}
                  className="bg-[#F2F5FF] justify-center items-center  text-scudGreen flex space-x-2 hover:to-blue-500 text-[14px]  rounded-md p-1 px-3"
                >
                  <FiCheck /> &nbsp;&nbsp; Done
                </button>
              ) : (
                <button
                  onClick={() => setThirdMessage(true)}
                  className="bg-[#F2F5FF] justify-center items-center  text-scudGreen flex space-x-2 hover:to-blue-500 text-[14px]  rounded-md p-1 px-3"
                >
                  <FiEdit /> &nbsp;&nbsp; Edit
                </button>
              )}
            </div>
          </div>

          {thirdmessage && (
            <div className="animate__animated animate__fadeIn mt-10">
              <div className=" bg-adminbg rounded-md p-4">
                <div className="col-span-1 mb-4 md:px-10">
                  <p className="text-sm text-textColor mb-4">Last Email Title</p>
                  <Input
                    rows={100}
                    cols={100}
                    type={"text"}
                    value={thirdTitle}
                    onChange={(e) => setThirdTitle(e.target.value)}
                    placeholder={"Enter email title..."}
                    // Icon={AiOutlineMail}
                  />
                </div>
                <div className="col-span-1 mb-4 md:px-10">
                  <p className="text-sm text-textColor mb-4">Email Template</p>
                  <div className="p-2 border rounded-md flex items-center justify-between ">
                    <p className="text-sm text-textColor">Select </p>
                    <MdOutlineKeyboardArrowDown className=" text-textColor" />
                  </div>
                </div>
                {/* adding aditional heading tags ##################################################3 */}
                <div className="col-span-1 mb-4 md:px-10">
                  <p className="text-sm text-textColor mb-4"> Last Email Body</p>
                  <Input
                    textArea={true}
                    rows={100}
                    cols={100}
                    value={thirdBody}
                    onChange={(e) => setThirdBody(e.target.value)}
                    placeholder={"Write your message..."}
                    // Icon={AiOutlineMail}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex my-16 justify-between ">
        <button
          // onClick={() => router.back()}
          className="bg-white border text-red-600 border-red-600 min-w-[120px] md:min-w-[150px] hover:bg-slate-50 px-4 py-1 rounded-md text-sm mr-2"
        >
          Back
        </button>
        <Button
          // disabled={disabled}
          onClick={oweSetting}
          text={"Save Changes"}
        />
      </div>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2"> Owe Settings added.</p>
            <p className="text-sm text-center text-textColor mt-2">
              Owe settings has been added successfully
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
Owe_amt.getLayout = Layout;
export default Owe_amt;
