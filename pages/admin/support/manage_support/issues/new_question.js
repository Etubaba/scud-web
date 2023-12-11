import React, { useState } from "react";
import Layout from "../../../../../components/Admin/Layout";
import BreadCrumbs from "../../../../../components/common/BreadCrumbs";
import MyStatefulEditor from "../../../../../components/common/Editor";
import Input from "../../../../../components/common/Input";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../../../../api/base";
import Modal from "../../../../../components/common/Modal";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useSnackbar } from "notistack";
import Button from "../../../../../components/common/Button";
import { useSelector } from "react-redux";

const Add_question = () => {
  const [searching, setSearching] = useState("");

  const forEdit = useSelector((state) => state.edit.questionEdit);

  const [question, setQuestion] = useState(forEdit.question);
  const [answer, setAnswer] = useState(forEdit.answer);
  const [successModal, setSuccessModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter();
  const categoryDetails = router.query;

  const addQuestion = async () => {
    console.log("create");
    try {
      const value = {
        question,
        answer,
        category_id: +categoryDetails.id
      };
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const { data } = await axios.post(`${BASE_URL}support-questions`, value);

      if (data) {
        setSuccessModal(true);
        setQuestion("");
        setAnswer("");
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

  const editQuestion = async () => {
    console.log("edit");
    try {
      const value = {
        question,
        answer
      };
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const { data } = await axios.patch(`${BASE_URL}support-questions/${forEdit.id}`, value);

      if (data) {
        setSuccessModal(true);
        setQuestion("");
        setAnswer("");
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

  const disabled = answer === "" || question === "" ? true : false;
  return (
    <>
      <BreadCrumbs
        index={"Manage support questions  "}
        indexPath={"/admin/support/manage_support"}
        secondItem={categoryDetails.name}
        thirditem={"Add new"}
      />
      <div className="md:mt-5 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="">
          <p className="text-sm text-textColor mb-7">
            <p className="text-sm text-textColor font-bold mb-2">{categoryDetails.name}</p>
          </p>
          <div className="grid grid-cols-1   gap-5 md:gap-8 mb-10">
            <div className="">
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
            <MyStatefulEditor onChange={(e) => setAnswer(e)} value={answer} searching={searching} />
          </div>
          <div className="flex items-center justify-between">
            <div className="mt-2">
              <button
                // onClick={() => router.push("/admin/admin_mgt/create_admin")}
                className="bg-white border-red-500 border flex space-x-2  text-[14px] text-red-500 px-4 rounded-md p-1 "
              >
                <span className="flex justify-between">
                  <p>Cancel</p>
                </span>
              </button>
            </div>
            <Button
              onClick={
                forEdit.question === "" && forEdit.answer === "" ? addQuestion : editQuestion
              }
              loading={loading}
              disabled={disabled}
              text={forEdit.question === "" && forEdit.answer === "" ? "Create" : "Update"}
            />
          </div>
        </div>
        {/* success modal */}
        <Modal onClose={() => setSuccessModal(false)} open={successModal}>
          <div className=" w-[20rem] md:w-[24rem]  h-auto">
            <div className="flex flex-col space-y-3 justify-center items-center">
              <AiOutlineCheckCircle className="text-green-600 text-5xl" />
              <p className="text-lg font-semibold mt-2">Question added.</p>
              <p className="text-sm text-center text-textColor mt-2">
                Question has been added successfully.
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
