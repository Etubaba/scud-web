import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsBarChartLine, BsCurrencyDollar, BsHash } from "react-icons/bs";
import Layout from "../../../components/Admin/Layout";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Modal from "../../../components/common/Modal";
import Select from "../../../components/common/Select";
import BreadCrumbs from "../../../components/common/BreadCrumbs";
import axios from "axios";
import { BASE_URL } from "../../../api/base";
import { useSnackbar } from "notistack";
import { getToken } from "../../../components/services/refresh";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { editIncentive } from "../../../features/editSlice";
import { validateToken } from "../../../components/services/validateToken";

const Edit_tier = ({ data }) => {
  const [prevTier, setPrevTier] = useState("Select Previous Tier");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rideNum, setRideNum] = useState("");
  const [daysNum, setDaysNum] = useState("");
  const [reward, setReward] = useState(0);
  const [status, setStatus] = useState("Select Status");
  const [successModal, setSuccessModal] = useState(false);
  const router = useRouter();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const tier = data?.data;

  const tier_levels = tier?.map((item) => item.name);
  const tier_id = tier?.filter((item) => item.name === prevTier)[0]?.id;

  // for editing of incentive.

  const incentive_id = useSelector((state) => state.edit.incentive);
  const incentiveToEdit = tier?.filter((item) => item.id === incentive_id)[0];

  useEffect(() => {
    if (incentive_id !== null) {
      const {
        id,
        name,
        rides,
        reward: reward2,
        description: des,
        duration,
        is_active
      } = incentiveToEdit;

      setTimeout(() => {
        setTitle(name);
        setDescription(des);
        setReward(reward2);
        setRideNum(rides);
        setDaysNum(duration);
        setStatus(is_active ? "Active" : "Inactive");
      }, 1000);
    }
  }, []);

  //refresh token

  useEffect(() => {
    const admin = true;
    getToken(admin);
  }, []);

  //refresh data from server
  const refreshData = () => {
    router.replace(router.asPath);
  };

  //create tier level

  const handleSubmit = async () => {
    if (title === "" || description === "" || rideNum === "" || daysNum === "" || reward === "")
      return enqueueSnackbar("Please, All fields are require", {
        variant: "error"
      });

    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.post(`${BASE_URL}incentives`, {
        name: title,
        description: description,
        rides: +rideNum,
        duration: +daysNum,
        reward: +reward,
        is_active: status === "Active" ? true : false,
        previous_tier_id: prevTier === "Select Previous Tier" ? null : tier_id
      });

      if (data) {
        setSuccessModal(true);
        setDaysNum("");
        setDescription("");
        setRideNum("");
        setTitle("");
        setReward("");
        setStatus("Select Status");
        setPrevTier("Select Previous Tier");
        refreshData();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const dispatch = useDispatch();
  //update tier level
  const updateTier = async () => {
    const formdata = {
      name: title,
      description: description,
      rides: +rideNum,
      duration: +daysNum,
      reward: +reward,
      is_active: status === "Active" ? true : false,
      previous_tier_id: prevTier === "Select Previous Tier" ? null : tier_id
    };

    //check which value is editted

    if (formdata.name === title) delete formdata.name;
    if (formdata.description === description) delete formdata.description;
    if (formdata.reward === reward) delete formdata.reward;
    if (formdata.duration === daysNum) delete formdata.duration;
    if (formdata.rides === rideNum) delete formdata.rides;
    if (formdata.is_active === status) delete formdata.is_active;

    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.patch(`${BASE_URL}incentives/${incentive_id}`, formdata);

      if (data) {
        enqueueSnackbar("Tier updated successfully", {
          variant: "success"
        });
        dispatch(editIncentive(null));
        setSuccessModal(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (successModal) {
    setTimeout(() => {
      setSuccessModal(false);
    }, 4000);
  }

  return (
    <div>
      {" "}
      <BreadCrumbs
        indexPath={"/admin/incentive_mgt/incentive"}
        index={"Manage Incentives"}
        secondItem="Edit incentive"
      />
      <div className="md:mt-10 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">Title</p>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={"Tier 1"}
                Icon={BsBarChartLine}
              />
            </div>

            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Previous tier</p>
              <Select
                data={tier_levels}
                style={"w-full p-2.5"}
                positon={"p-4"}
                value={prevTier}
                setValue={setPrevTier}
                dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                color=""
              />
            </div>

            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">Number of rides to complete</p>
              <Input
                value={rideNum}
                onChange={(e) => setRideNum(e.target.value)}
                placeholder={""}
                Icon={BsHash}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">Number of days</p>
              <Input
                value={daysNum}
                onChange={(e) => setDaysNum(e.target.value)}
                placeholder={""}
                Icon={BsHash}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">Amount to be rewarded</p>
              <Input
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                placeholder={""}
                Icon={BsCurrencyDollar}
              />
            </div>

            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">Status</p>

              <Select
                data={["Active", "Inactive"]}
                style={"w-full p-2.5"}
                positon={"p-4"}
                value={status}
                setValue={setStatus}
                dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                color=""
                // search={true}
              />
            </div>
          </div>
          <div className=" w-full mt-6">
            <p className="text-sm  text-textColor mb-2">Short description</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              cols={6}
              rows={6}
              className="w-full outline-none p-2 text-xs text-textColor rounded-md border-[#E5E5E4] border"
              minLength={7}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="flex my-7 justify-between ">
        <button
          onClick={() => router.push("/driver_profile/driver_payment")}
          className="border border-red-600 min-w-[120px] md:min-w-[150px] hover:bg-slate-50 px-4 py-1 rounded-md text-sm  text-red-600 mr-2"
        >
          Back
        </button>
        <Button
          //disabled={disabled}
          onClick={incentive_id === null ? handleSubmit : updateTier}
          text={"Add details"}
        />
      </div>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Tier level added successfully.</p>
            <p className="text-sm text-center text-textColor mt-2">
              A new tier has been added successfully.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Edit_tier.getLayout = Layout;
export default Edit_tier;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}incentives`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).catch((err) => console.log(err));

  const data = await res.json();

  if (data?.statusCode !== undefined && data?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }
  return {
    props: {
      data
    }
  };
}
