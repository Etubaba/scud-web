import React, { useState } from "react";
import Layout from "../../../../components/Admin/Layout";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import MyStatefulEditor from "../../../../components/common/Editor";
import Input from "../../../../components/common/Input";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../../../api/base";
import { useSnackbar } from "notistack";
import Modal from "../../../../components/common/Modal";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Button from "../../../../components/common/Button";

const Add_question = () => {
  const [searching, setSearching] = useState("");
  const [heading, setHeading] = useState("");
  const [question, setQuestion] = useState("");
  const [ans, setAns] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const createTicketCategory = async () => {
    setLoading(true);
    try {
      const value = {
        name: heading,
        question,
        answer: ans
      };
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const { data } = await axios.post(`${BASE_URL}support-categories`, value);
      if (data) {
        setSuccessModal(true);
        setAns("");
        setHeading("");
        setQuestion("");
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
      } else {
        enqueueSnackbar("Something went wrong", {
          variant: "error"
        });
      }
    }
  };

  const disable = ans === "" || question === "" || heading === "" ? true : false;

  return (
    <>
      <BreadCrumbs
        index={"Manage support questions  "}
        indexPath={"/admin/support/manage_support"}
        secondItem={"Add new"}
      />
      <div className="md:mt-5 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="">
          <p className="text-sm text-textColor mb-7">
            <p className="text-sm text-textColor font-bold mb-2">Support Question Heading</p>
          </p>
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8 mb-10">
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Question Heading</p>
              <Input
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                inputbg={"bg-white"}

                // Icon={TbWorld}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Question</p>
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                inputbg={"bg-white"}

                // Icon={TbWorld}
              />
            </div>
          </div>
          <p>Write your message</p>
          <div className="flex space-x-10 mb-40 md:mb-20">
            <MyStatefulEditor searching={searching} value={ans} onChange={(e) => setAns(e)} />
          </div>
          <div className="flex items-center justify-between">
            <button
              // onClick={() => router.push("/admin/admin_mgt/create_admin")}
              className="bg-white border-red-500 border flex space-x-2  text-[14px] text-red-500 px-4 rounded-md p-1 "
            >
              <span className="flex justify-between">
                <p>Cancel</p>
              </span>
            </button>

            <Button
              disabled={disable}
              loading={loading}
              text={"Save Question"}
              onClick={createTicketCategory}
            />
          </div>
        </div>
        <Modal onClose={() => setSuccessModal(false)} open={successModal}>
          <div className=" w-[20rem] md:w-[24rem]  h-auto">
            <div className="flex flex-col space-y-3 justify-center items-center">
              <AiOutlineCheckCircle className="text-green-600 text-5xl" />
              <p className="text-lg font-semibold mt-2"> Support Category added.</p>
              <p className="text-sm text-center text-textColor mt-2">
                Support category and a question added successfully
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

Add_question.getLayout = Layout;
export default Add_question;
