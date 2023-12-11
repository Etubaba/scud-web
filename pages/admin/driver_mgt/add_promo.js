import React from "react";
import Layout from "../../../components/Admin/Layout";
import BreadCrumbs from "../../../components/common/BreadCrumbs";
import { useState } from "react";
import { BASE_URL, STATE_URL } from "../../../api/base";
import DatePicker from "../../../components/common/DatePicker";
import Input from "../../../components/common/Input";
import Select from "../../../components/common/Select";
import { BsHourglass, BsPercent } from "react-icons/bs";
import { BiTrip } from "react-icons/bi";
import Button from "../../../components/common/Button";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import Modal from "../../../components/common/Modal";
import { AiOutlineCheckCircle, AiOutlineGift } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { validateToken } from "../../../components/services/validateToken";
import { useSnackbar } from "notistack";
import { editDriverPromo } from "../../../features/editSlice";

const add_promo = ({ vehicle_type, locations }) => {
  const driverPromoToEdit = useSelector((state) => state.edit.driverPromoEdit);
  const { enqueueSnackbar } = useSnackbar();
  const [formDetails, setFormDetails] = useState({
    expiration: driverPromoToEdit.expires_at,
    minTimeOnline: driverPromoToEdit.online_hours,
    minTripsCompleted: driverPromoToEdit.trips,
    cancelationRate: driverPromoToEdit.cancellation_rate,
    acceptanceRate: driverPromoToEdit.acceptance_rate,
    driverScore: driverPromoToEdit.driver_score,
    offerType: driverPromoToEdit.name
  });

  const [successAction, setSuccessAction] = useState("Added");
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vehicleType, setVehicleType] = useState(driverPromoToEdit.vehicle_type_ids);
  const [vehicleTypeId, setVehicleTypeId] = useState([]);
  const [locationid, setLocationId] = useState([]);
  const [location, setLocation] = useState(driverPromoToEdit.location_ids);
  const [status, setStatus] = useState(driverPromoToEdit.is_active ? "Active" : "Status");

  const dispatch = useDispatch();
  const router = useRouter();
  // const stateList = locations.map((item) => item.name);
  // const vehicles = vehicle_type?.map((item) => item.name);

  // const vehicleCategories = ["All Vehicles", ...vehicles];
  
  const date = new Date().toISOString();
  const min = date.slice(0, 10);

  const createPromo = async () => {
    setLoading(true);
    const formData = {
      name: formDetails.offerType,
      vehicle_type_ids: vehicleType.map((item) => Number(item.id)),
      location_ids: location.map((item) => Number(item.id)),
      trips: +formDetails.minTripsCompleted,
      online_hours: +formDetails.minTimeOnline,
      expires_at: formDetails.expiration,
      acceptance_rate: +formDetails.acceptanceRate,
      cancellation_rate: +formDetails.cancelationRate,
      driver_score: +formDetails.driverScore,
      is_active: status === "Active" ? true : false
    };

    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const { data } = await axios.post(`${BASE_URL}driver-promos`, formData);
      if (data) {
        setSuccessModal(true);
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
        enqueueSnackbar(err.message, {
          variant: "error"
        });
      }
    }
  };

  const updatePromo = async () => {
    setLoading(true);
    const formData = {
      name: formDetails.offerType,
      vehicle_type_ids: vehicleType.map((item) => Number(item.id)),
      location_ids: location.map((item) => Number(item.id)),
      trips: +formDetails.minTripsCompleted,
      online_hours: +formDetails.minTimeOnline,
      expires_at: formDetails.expiration,
      acceptance_rate: +formDetails.acceptanceRate,
      cancellation_rate: +formDetails.cancelationRate,
      driver_score: +formDetails.driverScore,
      is_active: status === "Active" ? true : false
    };

    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const { data } = await axios.patch(
        `${BASE_URL}driver-promos/${driverPromoToEdit.id}`,
        formData
      );
      if (data) {
        setSuccessModal(true);
        setSuccessAction("Updated");
        setLoading(false);
        dispatch(
          editDriverPromo({
            id: null,
            name: "",
            vehicle_type_ids: [],
            location_ids: [],
            trips: null,
            online_hours: null,
            expires_at: "",
            acceptance_rate: null,
            cancellation_rate: null,
            driver_score: null,
            is_active: null
          })
        );
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
        enqueueSnackbar(err.message, {
          variant: "error"
        });
      }
    }
  };

  const disable =
    formDetails.minTimeOnline === null ||
    formDetails.acceptanceRate === null ||
    formDetails.driverScore === null ||
    formDetails.cancelationRate === null ||
    formDetails.expiration === "" ||
    formDetails.minTripsCompleted === null ||
    formDetails.offerType === "" ||
    vehicleType.length === 0 ||
    location.length === 0 ||
    status === null
      ? true
      : false;
  return (
    <div>
      {" "}
      <BreadCrumbs
        indexPath={"/admin/driver_mgt/driver_promo"}
        index={"Driver Promo"}
        secondItem="Add Promo"
      />
      <div className="md:mt-10 mt-8 w-full space-y-5 bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div>
          <p className="text-sm text-title mb-7"> Driver promo criterias</p>
          <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
            <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4"> Offer Type </p>
                {/* <Select
                  data={["Car Offer", "Cash Offer"]}
                  style={"w-full p-2.5"}
                  positon={"p-4"}
                  value={offerType}
                  setValue={setOfferType}
                  dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                  color=""
                /> */}

                <div className="">
                  <Input
                    iconbg={true}
                    Icon={AiOutlineGift}
                    value={formDetails.offerType}
                    onChange={(e) => setFormDetails({ ...formDetails, offerType: e.target.value })}
                  />
                </div>
              </div>
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4"> Vehicle Type </p>
                <div className="">
                  <Select
                    data={vehicle_type}
                    checkbox={true}
                    style={"w-full p-2.5"}
                    positon={"p-4"}
                    value={vehicleType}
                    setItemId={setVehicleTypeId}
                    itemid={vehicleTypeId}
                    setValue={setVehicleType}
                    dropDownWidth={" w-full mt-1"}
                    // color=""
                  />
                </div>
              </div>
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4"> Location </p>
                <div className="">
                  <Select
                    data={locations}
                    setItemId={setLocationId}
                    itemid={locationid}
                    checkbox={true}
                    style={"w-full p-2.5"}
                    positon={"p-4"}
                    value={location}
                    setValue={setLocation}
                    dropDownWidth={" w-full mt-1"}
                    // color=""
                  />
                </div>
              </div>
              <div className="col-span-1 ">
                <p className="text-sm text-textColor py-1 mb-2"> Expiration Date </p>
                <div className="">
                  <DatePicker
                    style={"py-[4px]"}
                    onChange={(e) => setFormDetails({ ...formDetails, expiration: e.target.value })}
                    value={formDetails.expiration}
                    min={min}
                  />
                </div>
              </div>
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">
                  {" "}
                  Minimum time to spend online{" "}
                  <small className="text-textColor/70 ">(in hours)</small>{" "}
                </p>
                <div className="">
                  <Input
                    iconbg={true}
                    Icon={BsHourglass}
                    value={formDetails.minTimeOnline}
                    onChange={(e) =>
                      setFormDetails({ ...formDetails, minTimeOnline: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4"> Minimum trips to complete </p>
                <div className="">
                  <Input
                    iconbg={true}
                    Icon={BiTrip}
                    value={formDetails.minTripsCompleted}
                    onChange={(e) =>
                      setFormDetails({ ...formDetails, minTripsCompleted: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">
                  {" "}
                  Ride acceptance rate
                  <small className="text-textColor/70 ">(in percentage)</small>{" "}
                </p>
                <div className="">
                  <Input
                    iconbg={true}
                    Icon={BsPercent}
                    value={formDetails.acceptanceRate}
                    onChange={(e) =>
                      setFormDetails({ ...formDetails, acceptanceRate: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">
                  {" "}
                  Cancelation Rate
                  <small className="text-textColor/70 ">(in percentage)</small>{" "}
                </p>
                <div className="">
                  <Input
                    iconbg={true}
                    Icon={BsPercent}
                    value={formDetails.cancelationRate}
                    onChange={(e) =>
                      setFormDetails({ ...formDetails, cancelationRate: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">
                  {" "}
                  Driver's Score
                  <small className="text-textColor/70 ">(in percentage)</small>{" "}
                </p>
                <div className="">
                  <Input
                    iconbg={true}
                    Icon={BsPercent}
                    value={formDetails.driverScore}
                    onChange={(e) =>
                      setFormDetails({ ...formDetails, driverScore: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="col-span-1">
                {" "}
                <p className="text-sm text-textColor mb-4">Select Status</p>
                <Select
                  data={["Active", "Inactive"]}
                  style={"w-full p-2.5"}
                  positon={"p-4"}
                  value={status}
                  setValue={setStatus}
                  dropDownWidth={" w-full mt-1"}
                  color=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex my-7 justify-between ">
        <button
          onClick={() => router.back()}
          className="bg-white border min-w-[120px] md:min-w-[130px] hover:bg-slate-50 px-4 py-1 rounded-md text-sm  text-textColor mr-2"
        >
          Back
        </button>
        <Button
          loading={loading}
          disabled={disable}
          onClick={driverPromoToEdit.id === null ? createPromo : updatePromo}
          text={driverPromoToEdit.id === null ? "Publish Promo" : "Update Promo"}
        />
      </div>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2"> Promo {successAction}.</p>
            <p className="text-sm text-center text-textColor mt-2">
              Promo has been {successAction.toLowerCase()} successfully.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
add_promo.getLayout = Layout;
export default add_promo;
export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}vehicle-types`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const stateRes = await fetch(`${BASE_URL}locations`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const vehicle_type = await res.json();
  const locations = await stateRes.json();

  if (
    (vehicle_type?.statusCode !== undefined && vehicle_type?.statusCode === 401) ||
    locations.statusCode !== undefined
  ) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      vehicle_type,
      locations
    }
  };
}
