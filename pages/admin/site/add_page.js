import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsHash, BsTranslate } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";
import Layout from "../../../components/Admin/Layout";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Modal from "../../../components/common/Modal";
import Select from "../../../components/common/Select";
import MyStatefulEditor from "../../../components/common/Editor";

const Add_page = () => {
  const [question, setQuestion] = useState("");
  const [content, setContent] = useState("");

  const [ans, setAns] = useState("");
  const [status, setStatus] = useState("Status");
  const [footer, setFooter] = useState(" Footer");

  const [disabled, setDisabled] = useState(true);
  const [successModal, setSuccessModal] = useState(false);
  const [successAction, setSuccessAction] = useState("");

  const router = useRouter();

  const statusList = ["Active", "Inactive"];

  //change button from disable to able
  useEffect(() => {
    if (question !== "" && ans !== "") {
      setDisabled(false);
    }
  }, [question, ans]);
  return (
    <div>
      {" "}
      <span className="text-lg flex space-x-2  cursor-pointer font-semibold">
        <p
          className="text-gray-500/60 tracking-wide hover:underline"
          onClick={() => router.push("/admin/site/static_page")}
        >
          Manage static pages
        </p>{" "}
        &nbsp; &gt; <p className="tracking-wide">Add Page</p>
      </span>
      <div className="md:mt-10 mt-8 w-full bg-white border shadow-sm rounded-md  md:p-6">
        <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
          <p className="text-sm text-textColor mb-7">
            {" "}
            <p className="text-sm text-textColor mb-2">Enter page Details</p>
          </p>
          <div className="">
            <div className="mb-5">
              <p className="text-sm text-textColor mb-2">Page Name</p>
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                Icon={TbWorld}
              />
            </div>
            <div className="">
              <p className="text-sm text-textColor mb-2">Content</p>
              {/* <textarea
                value={ans}
                onChange={(e) => setAns(e.target.value)}
                rows={5}
                className="border p-2 w-full rounded-md outline-none"
                cols={5}
              /> */}

              <div className="flex space-x-10 mb-40 md:mb-20">
                <MyStatefulEditor searching={content} />
              </div>
            </div>

            <div className="grid mt-5 grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-2">Footer</p>
                <Select
                  data={["Yes", "No"]}
                  style={"w-full p-3"}
                  positon={"p-4"}
                  value={footer}
                  setValue={setFooter}
                  dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                  color=""
                />
              </div>
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-2">Status</p>
                <Select
                  data={statusList}
                  style={"w-full p-3"}
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
      </div>
      <div className="flex my-7 justify-between ">
        <button
          onClick={() => router.push("/admin/support/faqs")}
          className="bg-white border min-w-[120px] md:min-w-[150px] hover:bg-slate-50 px-4 py-1 rounded-md text-sm  text-textColor mr-2"
        >
          Back
        </button>
        <Button
          //   disabled={disabled}
          onClick={() => {
            setSuccessModal(true);
            // setOpen(false);
          }}
          text={"Save Changes"}
        />
      </div>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">
              FAQ added successfully.
            </p>
            <p className="text-sm text-center text-textColor mt-2">
              The question and answer has been added as admin .
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Add_page.getLayout = Layout;
export default Add_page;
