import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import MyStatefulEditor from "../../../components/common/Editor";
import { AiOutlineCheckCircle } from "react-icons/ai";
// import refresh from "../../../components/services/refresh";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Modal from "../../../components/common/Modal";
import LastSection from "../../../components/homeComponents/sections/LastSection";
import MobileLastsection from "../../../components/homeComponents/sections/MobileLastsection";
import axios from "axios";
import { BASE_URL } from "../../../api/base";
import { useSnackbar } from "notistack";
import { encrypt } from "../../../components/common/lib/encrypt";
import Cookies from "js-cookie";
import { getToken } from "../../../components/services/refresh";

const ticket = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [searching, setSearching] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [successModal, setSuccessModal] = useState(false);

  const router = useRouter();
  //change button from disable to able
  const disabled = email === "" || subject === "" || msg === "" ? true : false;
  const handleSubmit = () => {
    setLoading(true);
    getToken();

    const token = Cookies.get("accessToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.get["Content-Type"] = "application/json";
    axios
      .post(BASE_URL + "support-questions/raise-issue", {
        email: email,
        subject: subject,
        content: msg
      })
      .then((res) => {
        setLoading(false);
        setSuccessModal(true);

        setEmail("");
        setMsg("");
        setSubject("");
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar(`${err.message}`, {
          variant: "error"
        });
      });
  };
  return (
    <div>
      {" "}
      <div className="px-3 md:px-10 pt-10 pb-32">
        <p className="text-lg tracking-wide font-semibold">Tickets </p>
        <div className="md:mt-10 mt-8 w-full  bg-white border shadow-sm rounded-md p-3 md:p-6">
          <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
            <div className="">
              <div className="mb-6">
                <p className="text-sm text-textColor mb-2">Email</p>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  inputbg={"bg-white"}

                  // Icon={TbWorld}
                />
              </div>

              <div className="mb-6">
                <p className="text-sm text-textColor mb-2">Subject</p>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  inputbg={"bg-white"}
                />
              </div>
              <div className="">
                <p className="text-sm text-textColor mb-2">Body</p>
                <div className="flex space-x-10 mb-40 md:mb-20">
                  <Input textArea={true} value={msg} onChange={(e) => setMsg(e.target.value)} />
                </div>
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
          <Button loading={loading} disabled={disabled} onClick={handleSubmit} text={"Submit"} />
        </div>
        <Modal onClose={() => setSuccessModal(false)} open={successModal}>
          <div className=" w-[20rem] md:w-[24rem]  h-auto">
            <div className="flex flex-col space-y-3 justify-center items-center">
              <AiOutlineCheckCircle className="text-green-600 text-5xl" />
              <p className="text-lg font-semibold mt-2">Ticket Sent.</p>
              <p className="text-sm text-center text-textColor mt-2">
                Your ticket has been submitted successfully and a response will be sent to your
                email.
              </p>
            </div>
          </div>
        </Modal>
      </div>
      <LastSection />
      <MobileLastsection />
    </div>
  );
};

export default ticket;
