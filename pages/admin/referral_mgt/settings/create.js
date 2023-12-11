import Layout from "../../../../components/Admin/Layout";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import { useReducer, useState } from "react";
import Input from "../../../../components/common/Input";
import Select from "../../../../components/common/Select";

import Button from "../../../../components/common/Button";

import Modal from "../../../../components/common/Modal";

import { TbCurrencyNaira } from "react-icons/tb";
import { BASE_URL } from "../../../../api/base";
import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useRouter } from "next/router";

const createSetting = () => {
  const reducer = (state, action) => {
    const { payload, type } = action;
    switch (type) {
      case "referral_type":
        return { ...state, referralType: payload };
      case "amount":
        return { ...state, amount: payload };
      case "referral_trips":
        return { ...state, referral_trips: payload };
      case "referred_user_trips":
        return { ...state, referred_user_trips: payload };
      case "successAction":
        return { ...state, successAction: payload };
      case "success":
        return { ...state, success: !state.success };
      case "loading":
        return { ...state, loading: !state.loading };
      default:
        state;
    }
  };

  const router = useRouter();

  const settingsToEdit = router.query;

  const initialState = {
    referralType: settingsToEdit.type !== undefined ? settingsToEdit?.type : "driver",
    amount: settingsToEdit.amount !== undefined ? settingsToEdit?.amount : "",
    referral_trips:
      settingsToEdit.referral_trips !== undefined ? settingsToEdit?.referrer_trips : "",
    referred_user_trips:
      settingsToEdit.referred_user_trips !== undefined ? settingsToEdit?.referred_user_trips : "",
    successAction: "Added",
    success: false,
    loading: false
  };
  const statusValue =
    settingsToEdit.is_active !== undefined
      ? settingsToEdit?.is_active
        ? "Active"
        : "Inactive"
      : "Select";

  const [state, dispatch] = useReducer(reducer, initialState);
  const [status, setStatus] = useState(statusValue);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const createReferralReward = async () => {
    dispatch({ type: "loading" });
    try {
      const formDetails = {
        type: state.referralType,
        amount: +state.amount,
        referrer_trips: +state.referral_trips,
        referred_user_trips: +state.referred_user_trips,
        is_active: status === "Active" ? true : false
      };

      const token = Cookies.get("adminAccessToken");

      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.post(`${BASE_URL}referral-reward`, formDetails);
      if (data) {
        dispatch({ type: "amount", payload: "" });
        dispatch({ type: "referral_trips", payload: "" });
        dispatch({ type: "referred_user_trips", payload: "" });
        dispatch({ type: "success" });
        dispatch({ type: "loading" });
        setStatus("Select");
      }
    } catch (err) {
      dispatch({ type: "loading" });
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

  const updateReferralReward = async () => {
    dispatch({ type: "loading" });
    try {
      const formDetails = {
        type: state.referralType,
        amount: +state.amount,
        referrer_trips: +state.referral_trips,
        referred_user_trips: +state.referred_user_trips,
        is_active: status === "Active" ? true : false
      };
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.patch(
        `${BASE_URL}referral-reward/${settingsToEdit?.id}`,
        formDetails
      );
      if (data) {
        dispatch({ type: "loading" });
        dispatch({ type: "success" });
        dispatch({ type: "successAction", payload: "Update" });
        setTimeout(() => {
          router.push("/admin/referral_mgt/settings");
        }, 3000);
      }
    } catch (err) {
      dispatch({ type: "loading" });
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

  const disable =
    state.amount === "" ||
    state.referral_trips === "" ||
    state.referred_user_trips === "" ||
    status === "Select"
      ? true
      : false;

  return (
    <div>
      {" "}
      <BreadCrumbs
        indexPath={"/admin/referral_mgt/settings"}
        index={"Referral Management"}
        secondItem={settingsToEdit !== undefined ? "Update" : "Create"}
      />
      <div className="md:mt-10 mt-8 w-full space-y-5 bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div>
          <div className="flex mb-4 justify-center space-y-2 md:space-y-0 flex-col md:flex-row md:justify-between items-center">
            <p className="text-sm font-semibold text-title md:mb-7">Referral Details</p>

            <div className="flex space-x-2">
              <div
                onClick={(e) => dispatch({ type: "referral_type", payload: "driver" })}
                className={`rounded-lg border py-2 px-4 flex justify-center ${
                  state.referralType === "driver"
                    ? "border-scudGreen text-scudGreen bg-adminbg"
                    : "text-textColor"
                } items-center`}
              >
                <p className="text-sm ">Driver Referral</p>
              </div>
              <div
                onClick={(e) => dispatch({ type: "referral_type", payload: "rider" })}
                className={`rounded-lg py-2 px-4 border flex justify-center ${
                  state.referralType === "rider"
                    ? "border-scudGreen text-scudGreen bg-adminbg"
                    : "text-textColor"
                } items-center`}
              >
                <p className="text-sm">Rider Referral</p>
              </div>
            </div>
          </div>

          <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
            <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4"> Reward amount per active referee </p>

                <div className="">
                  <Input
                    type={"number"}
                    value={state.amount}
                    onChange={(e) => dispatch({ type: "amount", payload: e.target.value })}
                    iconbg={true}
                    Icon={TbCurrencyNaira}
                    // value={formDetails.offerType}
                    // onChange={(e) => setFormDetails({ ...formDetails, offerType: e.target.value })}
                  />
                </div>
              </div>
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">
                  {state.referralType === "driver" ? "Driver" : "Rider"} number of trips to complete{" "}
                </p>
                <div className="">
                  <Input
                    type={"number"}
                    style={"py-0.5"}
                    value={state.referral_trips}
                    onChange={(e) => dispatch({ type: "referral_trips", payload: e.target.value })}
                  />
                </div>
              </div>
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">
                  {" "}
                  Referee number of trips/rides to complete{" "}
                </p>
                <div className="">
                  <Input
                    type={"number"}
                    value={state.referred_user_trips}
                    onChange={(e) =>
                      dispatch({ type: "referred_user_trips", payload: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="col-span-1">
                {" "}
                <p className="text-sm text-textColor mb-4">Select Status</p>
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
      </div>
      <div className="flex my-7 justify-between ">
        <button className="bg-white border min-w-[120px] md:min-w-[130px] hover:bg-slate-50 px-4 py-1 rounded-md text-sm  text-textColor mr-2">
          Back
        </button>
        <Button
          style={"min-w-[120px] md:min-w-[130px]"}
          loading={state.loading}
          disabled={disable}
          onClick={
            settingsToEdit?.amount !== undefined ? updateReferralReward : createReferralReward
          }
          text={"Save"}
        />
      </div>
      <Modal onClose={() => dispatch({ type: "success" })} open={state.success}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Referral Reward {state.successAction} </p>
            <p className="text-sm text-center text-textColor mt-2">
              Referral Reward has been {state.successAction.toLowerCase()} successfully.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
createSetting.getLayout = Layout;
export default createSetting;
