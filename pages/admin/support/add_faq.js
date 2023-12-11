import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { TbWorld } from "react-icons/tb";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../api/base";
import Layout from "../../../components/Admin/Layout";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Modal from "../../../components/common/Modal";
import { getToken } from "../../../components/services/refresh";

const Add_faq = () => {
  const [question, setQuestion] = useState("");

  const [ans, setAns] = useState("");

  const [disabled, setDisabled] = useState(true);
  const [successModal, setSuccessModal] = useState(false);

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  //change button from disable to able
  useEffect(() => {
    if (question !== "" && ans !== "") {
      setDisabled(false);
    }
  }, [question, ans]);

  const createFAQ = async () => {
    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const formData = {
        question: question,
        answer: ans
      };

      const { data } = await axios.post(`${BASE_URL}faqs`, formData);

      if (data) {
        setSuccessModal(true);
        setAns("");
        setQuestion("");
      }
    } catch (err) {
      if (err.response) {
        const msg = err.response.data.message;
        if (typeof msg === "string") {
          if (msg === "Unauthorized" || err.response.data.statusCode == 401) {
            enqueueSnackbar(`Try again, something went wrong`, {
              variant: "info"
            });
          } else
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

  if (successModal) {
    setTimeout(() => setSuccessModal(false), 3000);
  }

  // for editing of faq
  const faqToEdit = useSelector((state) => state.edit.faq);
  useEffect(() => {
    if (faqToEdit !== null) {
      setAns(faqToEdit.answer);
      setQuestion(faqToEdit.question);
    }
  }, [faqToEdit]);

  const updateFAQ = async () => {
    const formdata = {
      question: question,
      answer: ans
    };
    // if (formdata.question === question) delete formdata.question;
    // if (formdata.answer === ans) delete formdata.answer;
    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.patch(`${BASE_URL}faqs/${faqToEdit.id}`, formdata);

      if (data) {
        setSuccessModal(true);

        setTimeout(() => {
          router.push("/admin/support/faqs");
        }, 4000);
      }
    } catch (err) {
      if (err.response) {
        const msg = err.response.data.message;
        if (typeof msg === "string") {
          if (msg === "Unauthorized" || err.response.data.statusCode == 401) {
            await getToken(true);
            enqueueSnackbar(`Try again, something went wrong`, {
              variant: "info"
            });
          } else
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
      <span className="text-lg flex space-x-2  cursor-pointer font-semibold">
        <p
          className="text-gray-500/60 tracking-wide hover:underline"
          onClick={() => router.push("/admin/support/faqs")}
        >
          Manage Faqs
        </p>{" "}
        &nbsp; &gt; <p className="tracking-wide">Add Faqs</p>
      </span>
      <div className="md:mt-10 mt-8 w-full bg-white border shadow-sm rounded-md  md:p-6">
        <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
          <p className="text-sm text-textColor mb-7">
            {" "}
            <p className="text-sm text-textColor mb-2">FAQs Details</p>
          </p>
          <div className="">
            <div className="mb-5">
              <p className="text-sm text-textColor mb-2">Question</p>
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                Icon={TbWorld}
              />
            </div>
            <div className="">
              <p className="text-sm text-textColor mb-2">Answer</p>
              <textarea
                value={ans}
                onChange={(e) => setAns(e.target.value)}
                rows={5}
                className="border text-sm p-2 w-full rounded-md outline-none"
                cols={5}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex my-7 justify-between ">
        <button
          onClick={() => router.push("/admin/support/faqs")}
          className="bg-white border min-w-[120px] md:min-w-[150px] hover:bg-slate-50 px-4 py-1 rounded-md text-sm  text-textColor mr-2"
        >
          Back
        </button>
        <Button
          disabled={disabled}
          onClick={faqToEdit === null ? createFAQ : updateFAQ}
          text={"Save Changes"}
        />
      </div>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">FAQ added successfully.</p>
            <p className="text-sm text-center text-textColor mt-2">
              The question and answer has been added as admin .
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Add_faq.getLayout = Layout;
export default Add_faq;
