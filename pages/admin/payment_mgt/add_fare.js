import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineCheckCircle, AiOutlineClockCircle, AiOutlinePlus } from "react-icons/ai";
import { GiPathDistance } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlinePaid } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbCurrencyNaira } from "react-icons/tb";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../api/base";
import Layout from "../../../components/Admin/Layout";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Modal from "../../../components/common/Modal";
import Select from "../../../components/common/Select";
import { time, location } from "../../../dummy";
import { validateToken } from "../../../components/services/validateToken";

const Add_fare = ({ cityList, vehicle_type }) => {
  // console.log(cityList);
  const [open1, setOpen1] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const [locationValue, setLocationValue] = useState("Select Location");
  const [Vehicle, setVehicle] = useState("Select Vehicle");
  const [capacity, setCapacity] = useState("Vehicle capacity");
  const [peakFare, setPeakFare] = useState("Peak Fare");
  const [NightFare, setNightFare] = useState("Night Fare");
  const [base, setBase] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [waiting_time, setWaiting_time] = useState("");
  const [waiting_charge, setWaiting_charge] = useState("");
  const [per_min, setPer_min] = useState("");
  const [per_km, setPer_km] = useState("");

  //add peak fare
  const [day, setDay] = useState("Select");
  const [peakFareStart, setPeakFareStart] = useState("Select");
  const [peakFareEnd, setPeakFareEnd] = useState("Select");
  const [peakFareX, setPeakFareX] = useState("Select");

  //add night peak

  const [nightStart, setNightStart] = useState("Select");
  const [nightEnd, setNightEnd] = useState("Select");
  const [nightFareX, setNightFareX] = useState("Select");

  // for adding peak  or night peak
  const [addPeak, setAddpeak] = useState(false);
  const [fare_id, setFare_id] = useState(null);

  const [peakFareList, setPeakFareList] = useState([]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter();

  //peak fare matters
  const handlePeakFare = async () => {
    if (
      day !== "Select" &&
      peakFareStart !== "Select" &&
      peakFareEnd !== "Select" &&
      peakFareX !== "Select"
    ) {
      try {
        //for api
        const formData = {
          fare_id,
          day: day,
          start_time: peakFareStart,
          end_time: peakFareEnd,
          multiplier: +peakFareX
        };

        const token = Cookies.get("adminAccessToken");
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.defaults.headers.get["Content-Type"] = "application/json";
        const { data } = await axios.post(`${BASE_URL}peak-fare`, formData);

        if (data) {
          enqueueSnackbar("Peak fare added successfully", {
            variant: "success"
          });

          // for ui
          const timeSettings = {
            day: day,
            peakFareStart: peakFareStart,
            peakFareEnd: peakFareEnd,
            peakFareX: peakFareX
          };

          setPeakFareList((prev) => [...prev, timeSettings]);

          setDay("Select");
          setPeakFareEnd("Select");
          setPeakFareStart("Select");
          setPeakFareX("Select");
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
        }

        console.log(err);
      }
    }
  };

  // night fare
  const handleNightFare = async () => {
    if (nightStart === "Select" || nightEnd === "Select" || nightFareX === "Select")
      return enqueueSnackbar("Please select time and multiplier", {
        variant: "error"
      });

    try {
      const formData = {
        fare_id,
        start_time: nightStart,
        end_time: nightEnd,
        multiplier: +nightFareX
      };

      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.post(`${BASE_URL}night-fare`, formData);

      if (data) {
        enqueueSnackbar("Night fare added successfully", {
          variant: "success"
        });
        setNightEnd("Select");
        setNightStart("Select");
        setNightFareX("Select");
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
      }
    }
  };

  const handleDelete = (idx) => {
    const newList = peakFareList.filter((_, i) => idx !== i);
    setPeakFareList(newList);
  };

  const cities = cityList?.map((state) => state.name);
  const selectedLocation = cityList?.filter((item) => item.name == locationValue)[0]?.id;

  const vehicleTypeId = vehicle_type?.filter((item) => item.name === Vehicle)[0]?.id;

  console.log("id", vehicleTypeId);

  const createFare = async () => {
    if (
      locationValue === "Select Location" ||
      Vehicle === "Select Vehicle" ||
      capacity === "Select capacity" ||
      base === "" ||
      min === "" ||
      waiting_charge === "" ||
      waiting_time === "" ||
      per_min === "" ||
      per_km === ""
    )
      return enqueueSnackbar("Please, all fields are require", {
        variant: "error"
      });

    const formData = {
      location_id: selectedLocation,
      vehicle_type_id: vehicleTypeId,
      base_fare: +base,
      capacity: +capacity,
      minimum_fare: +min,
      maximum_fare: +max,
      per_minutes: +per_min,
      per_kilometer: +per_km,
      waiting_time_limit: +waiting_time,
      waiting_time_charges: +waiting_charge,
      apply_peak_fare: peakFare == "Yes" ? true : false,
      apply_fares: true
    };
    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.post(`${BASE_URL}fare`, formData);
      console.log(data);
      if (data) {
        setSuccessModal(true);
        setAddpeak(true);
        setFare_id(data.id);
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
      }

      console.log(err);
    }
  };

  if (successModal) {
    setTimeout(() => setSuccessModal(false), 3000);
  }

  //edit fare
  const fareToEdit = useSelector((state) => state.edit.fare_edit);

  useEffect(() => {
    if (fareToEdit !== null) {
      setLocationValue(fareToEdit?.location?.name);
      setVehicle(fareToEdit?.vehicle_type?.name);
      setBase(fareToEdit?.base_fare);
      setCapacity(fareToEdit?.capacity);
      setMin(fareToEdit?.minimum_fare);
      // setMax(fareToEdit?.maximum_fare);
      setWaiting_time(fareToEdit?.waiting_time_limit);
      setWaiting_charge(fareToEdit?.waiting_charges);
      setPer_km(fareToEdit?.per_kilometer);
      setPer_min(fareToEdit?.per_minute);
      setAddpeak(true);
    }
  }, [fareToEdit]);

  const handleFareEdit = async () => {
    const formdata = {
      location_id: locationValue,
      vehicle_type_id: vehicleTypeId,
      base_fare: +base,
      capacity: +capacity,
      minimum_fare: +min,
      maximum_fare: +max,
      per_minutes: +per_min,
      per_kilometer: +per_km,
      waiting_time_limit: +waiting_time,
      waiting_time_charges: +waiting_charge,
      apply_peak_fare: peakFare == "Yes" ? true : false,
      apply_fares: true
    };

    //check which value is editted

    if (formdata.location == locationValue) delete formdata.location;
    if (formdata.base_fare == +base) delete formdata.base_fare;
    if (formdata.capacity == capacity) delete formdata.capacity;
    if (formdata.vehicle_type === Vehicle) delete formdata.vehicle_type;
    if (formdata.minimum_fare == +min) delete formdata.maximum_fare;
    if (formdata.per_kilometer == +per_km) delete formdata.per_kilometer;
    if (formdata.per_minutes == +per_min) delete formdata.per_minutes;
    if (formdata.waiting_time_limit == +waiting_time) delete formdata.waiting_time_limit;
    if (formdata.waiting_time_charges == +waiting_charge) delete formdata.waiting_time_charges;
    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.patch(`${BASE_URL}fare/${fareToEdit.id}`, formdata);

      if (data) {
        setSuccessModal(true);
        setAddpeak(true);
        setFare_id(data.id);
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
      }
    }
  };

  return (
    <div>
      {" "}
      <span className="text-lg flex space-x-2  cursor-pointer font-semibold">
        <p
          className="text-gray-500/60 tracking-wide hover:underline"
          onClick={() => router.push("/admin/payment_mgt/fares")}
        >
          Manage Fares
        </p>{" "}
        &nbsp; &gt; <p className="tracking-wide">Add New Fare</p>
      </span>
      <div className="md:mt-10 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
          <p className="text-sm font-semibold text-textColor mb-7">Fare Details</p>
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">Location</p>
              <Select
                search={true}
                data={cities}
                style={"w-full p-[10px]"}
                positon={"p-4"}
                value={locationValue}
                setValue={setLocationValue}
                dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                color=""
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">Vehicle Type</p>
              <Select
                data={vehicle_type.map((item) => item.name)}
                style={"w-full p-[10px]"}
                positon={"p-4"}
                value={Vehicle}
                setValue={setVehicle}
                dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                color=""
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">Capacity</p>
              <Select
                data={["4", "5", "6"]}
                style={"w-full p-[10px]"}
                positon={"p-4"}
                value={capacity}
                setValue={setCapacity}
                dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                color=""
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">Base Fare</p>
              <Input
                value={base}
                onChange={(e) => setBase(e.target.value)}
                placeholder={""}
                Icon={MdOutlinePaid}
                iconbg={true}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">Minimum Fare</p>
              <Input
                value={min}
                onChange={(e) => setMin(e.target.value)}
                placeholder={""}
                Icon={MdOutlinePaid}
                iconbg={true}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">Maximum Fare</p>
              <Input
                value={max}
                onChange={(e) => setMax(e.target.value)}
                placeholder={""}
                Icon={MdOutlinePaid}
                iconbg={true}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">Per Minute</p>
              <Input
                value={per_min}
                onChange={(e) => setPer_min(e.target.value)}
                placeholder={""}
                Icon={AiOutlineClockCircle}
                iconbg={true}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">Per Kilometer</p>
              <Input
                value={per_km}
                onChange={(e) => setPer_km(e.target.value)}
                placeholder={""}
                Icon={GiPathDistance}
                iconbg={true}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm  text-textColor  mb-2">
                Waiting Time Limit <small className="text-textColor/50">(in minutes)</small>
              </p>
              <Select
                data={["4", "5", "6"]}
                style={"w-full p-[10px]"}
                positon={"p-3"}
                value={waiting_time}
                setValue={setWaiting_time}
                dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                color=""
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">
                Waiting Charges <small className="text-textColor/50">(Per Minute)</small>
              </p>
              <Input
                value={waiting_charge}
                onChange={(e) => setWaiting_charge(e.target.value)}
                placeholder={""}
                Icon={AiOutlineClockCircle}
                iconbg={true}
              />
            </div>

            {/* <div className="col-span-1">
              <p className="text-sm  text-textColor  mb-2">Status</p>
              <Select
                data={["Active", "Inactive"]}
                style={"w-full p-[10px]"}
                positon={"p-3"}
                value={start}
                setValue={setStart}
                dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                color=""
              />
            </div> */}

            <div className="col-span-1">
              <p className="text-sm  text-textColor  mb-2">Apply Peak Fare</p>
              <Select
                data={["Yes", "No"]}
                style={"w-full p-[10px]"}
                positon={"p-4"}
                value={peakFare}
                setValue={setPeakFare}
                dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                color=""
              />

              {addPeak && (
                <div className="h-auto p-3 border w-full mt-2 rounded-md border-scudGreen">
                  <p className="text-textColor mb-6 text-sm">Peak Fare details</p>

                  {peakFareList.length !== 0 && (
                    <div>
                      {peakFareList.map((item, idx) => (
                        <div key={idx} className="p-[10px] mb-6 rounded-md bg-[#f4f4fd]">
                          <div className="grid grid-cols-1  md:grid-cols-2 gap-5 md:gap-6">
                            <div className="col-span-1">
                              <p className="text-xs  text-textColor  mb-2">Select Day</p>
                              <Select
                                data={[
                                  "Monday",
                                  "Tuesday",
                                  "Wednesday",
                                  "Thursday",
                                  "Friday",
                                  "Saturday",
                                  "Sunday"
                                ]}
                                style={"w-full p-[10px]"}
                                positon={"p-4"}
                                value={item.day}
                                setValue={setDay}
                                dropDownWidth={" w-[16.5rem] md:w-[12rem] mt-1"}
                                color=""
                              />
                            </div>
                            <div className="col-span-1">
                              <p className="text-xs  text-textColor  mb-2">Start Time</p>
                              <Select
                                data={["4", "5", "6"]}
                                style={"w-full p-[10px]"}
                                positon={"p-4"}
                                value={item.peakFareStart}
                                setValue={setPeakFareStart}
                                dropDownWidth={" w-[16.5rem] md:w-[12rem] mt-1"}
                                color=""
                              />
                            </div>
                            <div className="col-span-1">
                              <p className="text-xs  text-textColor  mb-2">End Time</p>
                              <Select
                                data={["4", "5", "6"]}
                                style={"w-full p-[10px]"}
                                positon={"p-4"}
                                value={item.peakFareEnd}
                                setValue={setPeakFareEnd}
                                dropDownWidth={" w-[16.5rem] md:w-[12rem] mt-1"}
                                color=""
                              />
                            </div>
                            <div className="col-span-1">
                              <p className="text-xs  text-textColor  mb-2">Peak Fare X</p>
                              <Select
                                data={["4", "5", "6"]}
                                style={"w-full p-[10px]"}
                                positon={"p-4"}
                                value={item.peakFareX}
                                setValue={setPeakFareX}
                                dropDownWidth={" w-[16.5rem] md:w-[12rem] mt-1"}
                                color=""
                              />
                            </div>
                          </div>

                          <div className="w-full mt-5 flex justify-end ">
                            <button
                              onClick={() => handleDelete(idx)}
                              className="text-red-600  justify-end flex space-x-2"
                            >
                              {" "}
                              <RiDeleteBin6Line />
                              <p className="text-sm"> Delete Fare</p>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 p-[10px]  md:grid-cols-2 gap-5 md:gap-6">
                    <div className="col-span-1">
                      <p className="text-xs  text-textColor  mb-2">Select Day</p>
                      <Select
                        data={[
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday",
                          "Sunday"
                        ]}
                        style={"w-full p-[10px]"}
                        positon={"p-4"}
                        value={day}
                        setValue={setDay}
                        dropDownWidth={" w-[16.5rem] md:w-[12rem] mt-1"}
                        color=""
                      />
                    </div>
                    <div className="col-span-1">
                      <p className="text-xs  text-textColor  mb-2">Start Time</p>
                      <Select
                        data={time}
                        style={"w-full p-[10px]"}
                        positon={"p-4"}
                        value={peakFareStart}
                        setValue={setPeakFareStart}
                        dropDownWidth={" w-[16.5rem] md:w-[12rem] mt-1"}
                        color=""
                      />
                    </div>
                    <div className="col-span-1">
                      <p className="text-xs  text-textColor  mb-2">End Time</p>
                      <Select
                        data={time}
                        style={"w-full p-[10px]"}
                        positon={"p-4"}
                        value={peakFareEnd}
                        setValue={setPeakFareEnd}
                        dropDownWidth={" w-[16.5rem] md:w-[12rem] mt-1"}
                        color=""
                      />
                    </div>
                    <div className="col-span-1">
                      <p className="text-xs  text-textColor  mb-2">Peak Fare X</p>
                      <Select
                        data={["2", "3", "4"]}
                        style={"w-full p-[10px]"}
                        positon={"p-4"}
                        value={peakFareX}
                        setValue={setPeakFareX}
                        dropDownWidth={" w-[16.5rem] md:w-[12rem] mt-1"}
                        color=""
                      />
                    </div>
                  </div>
                  <div className="w-full mt-5 flex justify-end ">
                    <button
                      onClick={handlePeakFare}
                      className="text-scudGreen  justify-end flex space-x-1"
                    >
                      {" "}
                      <AiOutlinePlus />
                      <p className="text-sm"> Add Peak</p>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="col-span-1">
              <p className="text-sm  text-textColor  mb-2">Apply Night Fare</p>
              <Select
                data={["Yes", "No"]}
                style={"w-full p-[10px]"}
                positon={"p-4"}
                value={NightFare}
                setValue={setNightFare}
                dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                color=""
              />

              {addPeak && (
                <div className="h-auto pt-4 pb-7 px-4 border w-full mt-2 rounded-md border-scudGreen">
                  <p className="text-textColor mb-6 text-sm">Night Fare details</p>
                  <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-6">
                    <div className="col-span-1">
                      <p className="text-xs  text-textColor  mb-2">Start Time</p>
                      <Select
                        data={time}
                        style={"w-full p-[10px]"}
                        positon={"p-4"}
                        value={nightStart}
                        setValue={setNightStart}
                        dropDownWidth={" w-[16.5rem] md:w-[12rem] mt-1"}
                        color=""
                      />
                    </div>
                    <div className="col-span-1">
                      <p className="text-xs  text-textColor  mb-2">End Time</p>
                      <Select
                        data={time}
                        style={"w-full p-[10px]"}
                        positon={"p-4"}
                        value={nightEnd}
                        setValue={setNightEnd}
                        dropDownWidth={" w-[16.5rem] md:w-[12rem] mt-1"}
                        color=""
                      />
                    </div>
                    <div className="col-span-1">
                      <p className="text-xs  text-textColor  mb-2">Night Fare</p>
                      <Select
                        data={["2", "3", "4"]}
                        style={"w-full p-[10px]"}
                        positon={"p-4"}
                        value={nightFareX}
                        setValue={setNightFareX}
                        dropDownWidth={" w-[16.5rem] md:w-[12rem] mt-1"}
                        color=""
                      />
                    </div>
                  </div>
                  <div className="w-full mt-5 flex justify-end ">
                    <button
                      onClick={handleNightFare}
                      className="text-scudGreen  justify-end flex space-x-1"
                    >
                      {" "}
                      <AiOutlinePlus />
                      <p className="text-sm"> Add Peak</p>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex my-7 justify-between ">
        <button
          onClick={() => router.push("/admin/payment_mgt/currency")}
          className="bg-white border min-w-[120px] md:min-w-[150px] hover:bg-slate-50 px-4 py-1 rounded-md text-sm  text-textColor mr-2"
        >
          Back
        </button>
        <Button
          //   disabled={disabled}
          onClick={fareToEdit === null ? createFare : handleFareEdit}
          text={"Add details"}
        />
      </div>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Fare Added successfully.</p>
            <p className="text-sm text-center text-textColor mt-2">
              {locationValue} fare has been added successfully
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
Add_fare.getLayout = Layout;
export default Add_fare;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}locations`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const vehicleRes = await fetch(`${BASE_URL}vehicle-types`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const cityList = await res.json();
  const vehicle_type = await vehicleRes.json();

  if (
    (cityList?.statusCode !== undefined && cityList?.statusCode === 401) ||
    (vehicle_type.statusCode !== undefined && vehicle_type.statusCode === 401)
  ) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      cityList,
      vehicle_type
    }
  };
}
