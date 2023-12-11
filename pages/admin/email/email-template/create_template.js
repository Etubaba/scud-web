import React, { useCallback, useReducer } from "react";
import Layout from "../../../../components/Admin/Layout";
import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
// import CodeMirror from "@uiw/react-codemirror";
import Button from "../../../../components/common/Button";
import Input from "../../../../components/common/Input";
import Modal from "../../../../components/common/Modal";
import Select from "../../../../components/common/Select";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
// import { html } from "@codemirror/lang-html";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../../../../api/base";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

const create_template = () => {
  const router = useRouter();

  const templateToEdit = router.query;

  const [status, setStatus] = useState(
    templateToEdit === undefined ? "Select" : templateToEdit?.is_active ? "Active" : "Inactive"
  );
  const [templateType, setTemplateType] = useState(
    templateToEdit === undefined ? "Select" : templateToEdit?.template_type
  );
  const [successModal, setSuccessModal] = useState(false);
  const [file, setFile] = useState(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const reducer = (state, action) => {
    switch (action.type) {
      case "update templateName":
        return { ...state, templateName: action.payload };
      case "toggle loading":
        return { ...state, loading: !state.loading };
      default:
        return state;
    }
  };
  const initialState = {
    templateName: templateToEdit === undefined ? "" : templateToEdit?.name,
    loading: false
  };

  const [states, dispatch] = useReducer(reducer, initialState);

  const disabled =
    status === "Select" || states.templateName === "" || templateType === "" || file === null
      ? true
      : false;

  const createTemplate = async () => {
    dispatch({ type: "toggle loading" });

    try {
      const AUTH_TOKEN = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + AUTH_TOKEN;
      axios.defaults.headers.get["Content-Type"] = "multipart/form-data";

      const formData = new FormData();
      const active = status == "Active" ? true : false;
      const template_type =
        templateType === "Trip Completed" ? "trip_completed" : templateType.toLowerCase();
      formData.append("template", file[0]);
      formData.append("name", states.templateName);
      formData.append("template_type", template_type);
      formData.append("is_active", active);

      const { data } = await axios.post(`${BASE_URL}mail-templates`, formData);
      if (data) {
        dispatch({ type: "toggle loading" });
        setSuccessModal(true);
        setStatus("Select");
        setFile(null);
        setTemplateType("Select");
        dispatch({ type: "update templateName", payload: "" });
      }
    } catch (err) {
      dispatch({ type: "toggle loading" });
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

  const editTemplate = async () => {
    try {
      const AUTH_TOKEN = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + AUTH_TOKEN;
      axios.defaults.headers.get["Content-Type"] = "multipart/form-data";

      const formData = new FormData();
      const active = status == "Active" ? true : false;
      const template_type =
        templateType === "Trip Completed" ? "trip_completed" : templateType.toLowerCase();
      formData.append("template", file[0]);
      formData.append("name", states.templateName);
      formData.append("template_type", template_type);
      formData.append("is_active", active);

      const { data } = await axios.patch(
        `${BASE_URL}mail-templates${templateToEdit?.id}`,
        formData
      );
      if (data) {
        dispatch({ type: "toggle loading" });
        setSuccessModal(true);
        setStatus("Select");
        setFile(null);
        setTemplateType("Select");
        dispatch({ type: "update templateName", payload: "" });
      }
    } catch (err) {
      dispatch({ type: "toggle loading" });
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
      <BreadCrumbs
        secondItem={"Create Template"}
        indexPath={"/admin/email/email-template"}
        index={" Email Templates"}
      />
      <div className="md:mt-10 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
          <p className="text-sm text-textColor mb-7">
            {" "}
            <p className="text-sm text-textColor mb-2">Enter Templates Details</p>
          </p>
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Template Name</p>
              <Input
                value={states.templateName}
                onChange={(e) => dispatch({ type: "update templateName", payload: e.target.value })}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Template Type </p>

              <Select
                data={["Otp", "Welcome", "Trip Completed", "Notification"]}
                style={"w-full p-2"}
                positon={"p-4"}
                value={templateType}
                setValue={setTemplateType}
                dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                color=""
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Template Code </p>

              <Input type={"file"} value={file} setFile={setFile} />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Status</p>
              <Select
                data={["Active", "Inactive"]}
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
          onClick={() => router.push("/driver_profile/driver_payment")}
          className="bg-white border min-w-[120px] md:min-w-[150px] hover:bg-slate-50 px-4 py-1 rounded-md text-sm  text-textColor mr-2"
        >
          Back
        </button>
        <Button
          disabled={disabled}
          onClick={templateToEdit === undefined || {} ? createTemplate : editTemplate}
          text={"Create"}
        />
      </div>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Template Added </p>
            <p className="text-sm text-center text-textColor mt-2">
              Email Template has been added successfully .
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
create_template.getLayout = Layout;
export default create_template;
