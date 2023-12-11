import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { AiOutlineCheck, AiOutlineCheckCircle, AiOutlinePercentage } from "react-icons/ai";
import { TbCurrencyNaira, TbPercentage } from "react-icons/tb";
import Layout from "../../../components/Admin/Layout";
import Button from "../../../components/common/Button";
import DatePicker from "../../../components/common/DatePicker";
import Input from "../../../components/common/Input";
import Select from "../../../components/common/Select";
import "animate.css";
import { searchDetails } from "../../../dummy";
import { RiArrowDownSFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { BASE_URL, STATE_URL } from "../../../api/base";
import Pagination from "../../../components/common/Pagination";
import axios from "axios";
import Cookies from "js-cookie";
import Modal from "../../../components/common/Modal";
import { useSnackbar } from "notistack";
import { getToken } from "../../../components/services/refresh";
import { useDispatch, useSelector } from "react-redux";
import { editPromo } from "../../../features/editSlice";
import { FaPercentage } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import { validateToken } from "../../../components/services/validateToken";
import useFetch from "../../../Hooks/useFetch";

const add_promo = ({ data }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const [searching, setSearching] = useState("");
  const [recieversarray, setRecieversArray] = useState([]);
  const [amount, setAmount] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [description, setDescription] = useState("");
  const [rideNum, setRideNum] = useState("");
  const [status, setStatus] = useState("Select Status");
  const [name, setName] = useState("");
  const [allRider, setAllRiders] = useState(true);
  const [promotype, setPromoType] = useState("Select Promo Type");
  const [city, setCity] = useState("Select City");
  const [cityid, setCityId] = useState(null);
  const [state, setState] = useState("Select State");
  const [stateid, setStateId] = useState(null);
  const [location, setLocation] = useState([]);
  const [locationid, setLocationId] = useState([1]);
  const [promo, setPromo] = useState("Default promo");
  const [date, setDate] = useState("Expiry");
  const [movement, setMovement] = useState("");
  const [discount, setDiscount] = useState(0);
  const [noofrides, setNoOfRides] = useState(0);
  const [offers, setOffers] = useState("Discount offer");
  const [cash, setCash] = useState(0);
  const [successModal, setSuccessModal] = useState(false);
  const [addphaseModal, setAddPhaseModal] = useState(false);
  const [first_stage_total, setfirst_stage_total] = useState(0);
  const [first_stage_percentage, setfirst_stage_percentage] = useState(0);
  const [first_stage_no_of_trips, setfirst_stage_no_of_trips] = useState(0);
  const [second_offer_total, setsecond_offer_total] = useState(0);
  const [last_stage_total, setlast_stage_total] = useState(0);
  const [last_stage_percentage, setlast_stage_percentage] = useState(0);
  const [last_stage_no_of_trips, setlast_stage_no_of_trips] = useState(0);

  const router = useRouter();

  const validate = name == "" || city == "Select City" || date == "Expiry";
  status == "" ||
    location == "Select Location" ||
    state == "Select State" ||
    cash == 0 ||
    discount == 0 ||
    noofrides == 0 ||
    (offers == "Location based promo"
      ? movement == "" ||
        first_stage_total == 0 ||
        first_stage_percentage == 0 ||
        first_stage_no_of_trips == 0 ||
        last_stage_total == 0 ||
        last_stage_percentage == 0 ||
        last_stage_no_of_trips ||
        0 ||
        second_offer_total == 0
      : null);

  const statusList = ["Active", "Inactive"];
  const promotypes = [
    "Default promo",
    "Active rider promo",
    "Inactive rider promo",
    "Location based promo"
  ];
  const movementType = ["Moving IN", "Moving OUT"];
  const offerTypes = ["Discount offer"];

  const statelist = [...data];

  const { fetchData: cities } = useFetch(BASE_URL + `cities?state_id=${stateid}`, stateid, true);

  const { fetchData: locations } = useFetch(
    BASE_URL + `locations/?city_id=${cityid}`,
    cityid,
    true
  );

  const cityList = stateid === null || stateid === undefined ? [] : cities;
  const locationList = cityid === null || cityid === undefined ? [] : locations;

  let startdate = new Date();
  let enddate = new Date(date == "Expiry" ? null : date);

  startdate.toISOString();
  enddate.toISOString();

  const createPromo = async () => {
    try {
      if (validate) {
        enqueueSnackbar("all fields are required", {
          variant: "error"
        });
      } else {
        const formdata = {
          location_ids: locationid,
          is_active: status == "Active" ? true : false,
          name: name,
          type:
            promo == "Default promo"
              ? "default"
              : promo == "Active rider promo"
              ? "active"
              : promo == "Inactive rider promo"
              ? "inactive"
              : promo == "Location based promo" &&
                (movement == "Moving IN" ? "event" : "dangerzone"),
          total: +cash,
          percentage: +discount,
          no_of_trips: +noofrides,
          start_date: startdate,
          end_date: enddate,
          first_stage_total: +first_stage_total,
          first_stage_percentage: +first_stage_percentage,
          first_stage_no_of_trips: +first_stage_no_of_trips,
          last_stage_total: +last_stage_total,
          last_stage_percentage: +last_stage_percentage,
          last_stage_no_of_trips: +last_stage_no_of_trips,
          second_offer_total: +second_offer_total
        };
        const token = Cookies.get("adminAccessToken");
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.defaults.headers.get["Content-Type"] = "application/json";

        const { data } = await axios.post(`${BASE_URL}discount`, formdata);

        if (data) {
          setSuccessModal(true);
          setAmount("");
          setCity("Select City");
          setDate("Expiry");
          setPromoType("Select Promo Type");
          setStatus("Select Status");
          setsecond_offer_total(0);
          setfirst_stage_no_of_trips(0);
          setfirst_stage_percentage(0);
          setfirst_stage_total(0);
          setlast_stage_no_of_trips(0);
          setlast_stage_percentage(0);
          setlast_stage_total(0);
          setCash(0);
        }
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

  //edit promo
  const promoToEdit = useSelector((state) => state.edit.promo);

  useEffect(() => {
    if (promoToEdit !== null) {
      setStatus(promoToEdit?.is_active ? "Active" : "Inactive");
      setPromo(
        promoToEdit.type == "default"
          ? "Default promo"
          : promoToEdit.type == "active"
          ? "Active rider promo"
          : promoToEdit.type == "inactive"
          ? "Inactive rider promo"
          : promoToEdit.type == "event"
          ? "Location based promo"
          : "Location based promo"
      );
      setCash(promoToEdit.total);
      setDiscount(promoToEdit.percentage);
      setNoOfRides(promoToEdit.no_of_trips); // edit when city is fixed
      setDate(promoToEdit.end_date);
      setfirst_stage_total(promoToEdit.first_stage_total);
      setfirst_stage_percentage(promoToEdit.first_stage_percentage);
      setfirst_stage_no_of_trips(promoToEdit.first_stage_no_of_trips);
      setlast_stage_total(promoToEdit.last_stage_total);
      setlast_stage_no_of_trips(promoToEdit.last_stage_no_of_trips);
      setsecond_offer_total(promoToEdit.second_offer_total);
    }
  }, [promoToEdit]);

  const updatePromo = async () => {
    try {
      if (validate) {
        enqueueSnackbar("all fields are required", {
          variant: "error"
        });
      } else {
        const formdata = {
          location_ids: locationid,
          is_active: status == "Active" ? true : false,
          name: name,
          type:
            promo == "Default promo"
              ? "default"
              : promo == "Active rider promo"
              ? "active"
              : promo == "Inactive rider promo"
              ? "inactive"
              : promo == "Location based promo" &&
                (movement == "Moving IN" ? "event" : "dangerzone"),
          total: +cash,
          percentage: +discount,
          no_of_trips: +noofrides,
          start_date: startdate,
          end_date: enddate,
          first_stage_total: +first_stage_total,
          first_stage_percentage: +first_stage_percentage,
          first_stage_no_of_trips: +first_stage_no_of_trips,
          last_stage_total: +last_stage_total,
          last_stage_percentage: +last_stage_percentage,
          last_stage_no_of_trips: +last_stage_no_of_trips,
          second_offer_total: +second_offer_total
        };
        const token = Cookies.get("adminAccessToken");
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.defaults.headers.get["Content-Type"] = "application/json";

        const { data } = await axios.patch(`${BASE_URL}discount/${promoToEdit.id}`, formdata);

        if (data) {
          setSuccessModal(true);
          setAmount("");
          setCity("Select City");
          setDate("Expiry");
          setPromoType("Select Promo Type");
          setStatus("Select Status");
          setsecond_offer_total(0);
          setfirst_stage_no_of_trips(0);
          setfirst_stage_percentage(0);
          setfirst_stage_total(0);
          setlast_stage_no_of_trips(0);
          setlast_stage_percentage(0);
          setlast_stage_total(0);
          setCash(0);
        }
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

  //remove success modal matter
  if (successModal) {
    setTimeout(() => {
      setSuccessModal(false);
    }, 3000);
  }

  //to prevent past date click
  const dateObj = new Date().toISOString();
  const min = dateObj.slice(0, 10);

  return (
    <div className=" transition-transform">
      <span className="text-lg flex space-x-2 mb-6 cursor-pointer font-semibold">
        <p
          className="text-gray-500/60 tracking-wide hover:underline"
          onClick={() => router.push("/admin/rider_promo_setting")}
        >
          Riders Promo
        </p>
        &nbsp; &gt;
        {promoToEdit == null ? (
          <p className="tracking-wide">Create Promo</p>
        ) : (
          <p className="tracking-wide">Update Promo</p>
        )}
      </span>
      <div className="md:mt-10 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="bg-adminbg rounded-md mb-6 md:h-auto p-3 md:p-6">
          <p className="text-sm text-textColor mb-7">Enter promo details</p>
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <label className="text-xs text-textColor">Promo Name</label>

              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={""}
                // Icon={TbCurrencyNaira}
                type={"text"}
              />
            </div>
            <div className="col-span-1">
              <label className="text-xs text-textColor">Promo Type</label>
              <Select
                data={promotypes}
                style={"w-full p-2"}
                position={"p-2"}
                value={promo}
                setValue={setPromo}
                dropDownWidth={
                  " w-[16.5rem] md:w-[27rem] bottom-[-6rem] md:bottom-[7rem] lg:bottom-[-5rem]"
                }
                color=""
              />
            </div>
            <div className="col-span-1 w-full">
              <label className="text-xs text-textColor">Offer Type</label>
              <Select
                data={offerTypes}
                style={"w-full p-2"}
                position={"p-2"}
                value={offers}
                setValue={setOffers}
                dropDownWidth={
                  " w-[16.5rem] md:w-full bottom-[-6rem] md:bottom-[7rem] lg:bottom-[-5rem]"
                }
                color=""
              />
            </div>
            {promo == "Location based promo" && (
              <div className="col-span-1 w-full">
                <label className="text-xs text-textColor">Movement Type</label>
                <Select
                  data={movementType}
                  style={"w-full p-2"}
                  position={"p-2"}
                  value={movement}
                  setValue={setMovement}
                  dropDownWidth={
                    " w-[16.5rem] md:w-full bottom-[-6rem] md:bottom-[7rem] lg:bottom-[-5rem]"
                  }
                  color=""
                />
              </div>
            )}

            {/* {offers == "Discount offer" ? null : ( */}
            <div className="col-span-1">
              <label className="text-xs text-textColor">Cash/amount</label>

              <Input
                value={cash}
                onChange={(e) => setCash(e.target.value)}
                placeholder={"Cash/amount"}
                Icon={TbCurrencyNaira}
                type={"number"}
              />
            </div>
            {/* )} */}
            {offers == "Discount offer" && (
              <div className="col-span-1">
                <label className="text-xs text-textColor">Ride Discount (in percentage)</label>

                <Input
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder={"0.0"}
                  Icon={TbPercentage}
                  type={"number"}
                />
              </div>
            )}
            {offers == "Discount offer" && (
              <div className="col-span-1">
                <label className="text-xs text-textColor">
                  Number of Rides (No of rides to use this discount for)
                </label>

                <Input
                  value={noofrides}
                  onChange={(e) => setNoOfRides(e.target.value)}
                  placeholder={"Enter here"}
                  //   Icon={TbPercentage}
                  type={"number"}
                />
              </div>
            )}
            {offers == "Discount offer" ? null : (
              <div className="col-span-1">
                <label className="text-xs text-textColor">Minimum Rides to Complete</label>

                <Input
                  value={cash}
                  onChange={(e) => setCash(e.target.value)}
                  placeholder={"Enter here"}
                  //   Icon={TbCurrencyNaira}
                  type={"number"}
                />
              </div>
            )}
            {offers == "Discount offer" ? null : (
              <div className="col-span-1">
                <label className="text-xs text-textColor">Cancellation rate (in percentage)</label>

                <Input
                  value={cash}
                  onChange={(e) => setCash(e.target.value)}
                  placeholder={"0.0"}
                  Icon={FaPercentage}
                  type={"number"}
                />
              </div>
            )}

            <div className="col-span-1 w-full">
              <label className="text-xs text-textColor">Select State</label>
              <Select
                // checkbox={true}
                data={statelist}
                style={"w-full p-2"}
                position={"p-2"}
                value={state}
                setValue={setState}
                setItemId={setStateId}
                dropDownWidth={
                  " w-[16.5rem] md:w-full bottom-[-6rem] md:bottom-[7rem] lg:bottom-[-5rem]"
                }
                color=""
              />
            </div>

            <div className="col-span-1">
              <label className="text-xs text-textColor">City</label>
              <Select
                setItemId={setCityId}
                data={cityList}
                style={"w-full p-2"}
                position={"p-2"}
                value={city}
                setValue={setCity}
                dropDownWidth={
                  " w-[16.5rem] md:w-[27rem] bottom-[-6rem] md:bottom-[7rem] lg:bottom-[-5rem]"
                }
                color=""
              />
            </div>

            <div className="col-span-1 w-full">
              <label className="text-xs text-textColor">Select specific Locations (s)</label>
              <Select
                itemid={locationid}
                checkbox={true}
                setItemId={setLocationId}
                data={locationList}
                style={"w-full p-2"}
                position={"p-2"}
                value={location}
                setValue={setLocation}
                dropDownWidth={
                  " w-[16.5rem] md:w-full bottom-[-6rem] md:bottom-[7rem] lg:bottom-[-5rem]"
                }
                // color=""
              />
            </div>

            <div className="col-span-1">
              <label className="text-xs text-textColor">Expiring date</label>
              <DatePicker value={date} onChange={(e) => setDate(e.target.value)} min={min} />
            </div>
            <div className="col-span-1">
              <label className="text-xs text-textColor">Select Status</label>

              <Select
                data={statusList}
                style={"w-full p-2"}
                position={"p-2"}
                value={status}
                setValue={setStatus}
                dropDownWidth={
                  " w-[16.5rem] md:w-[27rem] bottom-[-6rem] md:bottom-[7rem] lg:bottom-[-5rem]"
                }
                color=""
              />
            </div>
          </div>
          {promo == "Default promo" && (
            <>
              <div className="flex justify-between">
                <p className="text-sm text-textColor my-7">First Offer Settings</p>
              </div>
              <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
                <div className="col-span-1">
                  <label className="text-xs text-textColor">Discount percentage</label>

                  <Input
                    value={first_stage_percentage}
                    onChange={(e) => setfirst_stage_percentage(e.target.value)}
                    placeholder={"0.0"}
                    Icon={FaPercentage}
                    type={"number"}
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-xs text-textColor">Maximum discount amount</label>

                  <Input
                    value={first_stage_total}
                    onChange={(e) => setfirst_stage_total(e.target.value)}
                    placeholder={"0.0"}
                    Icon={TbCurrencyNaira}
                    type={"number"}
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-xs text-textColor">Number of rides</label>

                  <Input
                    value={first_stage_no_of_trips}
                    onChange={(e) => setfirst_stage_no_of_trips(e.target.value)}
                    placeholder={"0.0"}
                    type={"number"}
                  />
                </div>
              </div>
            </>
          )}
          {promo == "Default promo" && (
            <>
              <div className="flex justify-between">
                <p className="text-sm text-textColor my-7">Second Offer Settings</p>
              </div>
              <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
                <div className="col-span-1">
                  <label className="text-xs text-textColor">Total Cash/amount</label>

                  <Input
                    value={second_offer_total}
                    onChange={(e) => setsecond_offer_total(e.target.value)}
                    placeholder={"0.0"}
                    Icon={TbCurrencyNaira}
                    type={"number"}
                  />
                </div>
              </div>
            </>
          )}
          {promo == "Default promo" && (
            <>
              <div className="flex justify-between">
                <p className="text-sm text-textColor my-7">Third Offer Settings</p>
              </div>
              <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
                <div className="col-span-1">
                  <label className="text-xs text-textColor">Discount percentage</label>

                  <Input
                    value={last_stage_percentage}
                    onChange={(e) => setlast_stage_percentage(e.target.value)}
                    placeholder={"0.0"}
                    Icon={FaPercentage}
                    type={"number"}
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-xs text-textColor">Maximum discount amount</label>

                  <Input
                    value={last_stage_total}
                    onChange={(e) => setlast_stage_total(e.target.value)}
                    placeholder={"0.0"}
                    Icon={TbCurrencyNaira}
                    type={"number"}
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-xs text-textColor">Number of rides</label>

                  <Input
                    value={last_stage_no_of_trips}
                    onChange={(e) => setlast_stage_no_of_trips(e.target.value)}
                    placeholder={"0.0"}
                    type={"number"}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <button
          onClick={() => router.push("/admin/rider_mgt/promo")}
          className="bg-white border-red-600 text-red-600 border hover:bg-slate-50 px-4 py-1 rounded-md text-sm  mr-2"
        >
          Cancel
        </button>
        <Button
          onClick={promoToEdit == null ? createPromo : updatePromo}
          text={promoToEdit == null ? "Publish promo" : "Update promo"}
        />
      </div>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Promo created </p>
            <p className="text-sm text-center text-textColor mt-2">
              Promo has been {promoToEdit !== null ? "Updated" : "created"} successfully.
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

  const res = await fetch(`${STATE_URL}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
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
