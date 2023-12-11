import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { AiOutlineCheck, AiOutlineCheckCircle, AiOutlinePercentage } from "react-icons/ai";
import { TbCurrencyNaira } from "react-icons/tb";
import Layout from "../../../components/Admin/Layout";
import Button from "../../../components/common/Button";
import DatePicker from "../../../components/common/DatePicker";
import Input from "../../../components/common/Input";
import Select from "../../../components/common/Select";
import "animate.css";
import { searchDetails } from "../../../dummy";
import { RiArrowDownSFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { BASE_URL } from "../../../api/base";
import Pagination from "../../../components/common/Pagination";
import axios from "axios";
import Cookies from "js-cookie";
import Modal from "../../../components/common/Modal";
import { useSnackbar } from "notistack";
import { getToken } from "../../../components/services/refresh";
import { useDispatch, useSelector } from "react-redux";
import { editPromo } from "../../../features/editSlice";
import { validateToken } from "../../../components/services/validateToken";

const Create_promo = ({ data }) => {
  const [amount, setAmount] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [description, setDescription] = useState("");
  const [rideNum, setRideNum] = useState("");
  const [status, setStatus] = useState("Select Status");
  const [allRider, setAllRiders] = useState(true);
  const [promotype, setPromoType] = useState("Select Promo Type");
  const [city, setCity] = useState("Select City");
  const [date, setDate] = useState("Expiry");
  const [successModal, setSuccessModal] = useState(false);

  const router = useRouter();

  const riders = data?.data?.filter((item) => item.roles[0]?.role?.name === "rider");

  // console.log('filtered', riders);

  const statusList = ["Active", "Inactive"];
  const promotypes = ["Percentage", "Amount"];

  const [searching, setSearching] = useState("");
  const [recieversarray, setRecieversArray] = useState([]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const rows = riders
    ?.filter((element) => {
      return (
        element.first_name?.toLowerCase()?.includes(searching.toLowerCase()) ||
        element?.email?.toLowerCase()?.includes(searching.toLowerCase())
      );
    })
    .map((element) => (
      <tr
        onClick={() => {
          setRecieversArray([...recieversarray, element]);
        }}
        className=" text-center hover:shadow-sm  hover:bg-slate-100 rounded-md text-sm bg-white  text-textColor"
        key={element.id}
      >
        <td className="md:text-base text-xs p-3 flex space-x-2">
          <img src={element.image} className="rounded-full h-7 w-7" alt="" />
          <p>{element.first_name}</p>
        </td>
        <td className="md:text-base text-xs p-3">{element.first_name}</td>
        <td className="md:text-base text-xs p-3">{element.last_name}</td>
        <td className="md:text-base text-xs p-3">{element.email}</td>
      </tr>
    ));

  const filterSelected = (id) => {
    const newArr = recieversarray.filter((item) => item.id !== id);
    setRecieversArray(newArr);
  };

  //send promo
  const receivers_id =
    recieversarray.length === 0 ? undefined : recieversarray.map((item) => item.id);

  const createPromo = async () => {
    try {
      const formData = {
        code: promoCode,
        promo_payment_type: promotype.toLocaleLowerCase(),
        amount: +amount,
        city_id: 2,
        expiry: date,
        is_active: status === "Active" ? true : false,
        description: description,
        number_of_rides: +rideNum,
        user_ids: receivers_id
      };
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const { data } = await axios.post(`${BASE_URL}promos`, formData);

      if (data) {
        setSuccessModal(true);
        setPromoCode("");
        setAllRiders(true);
        setAmount("");
        setCity("Select City");
        setDate("Expiry");
        setPromoType("Select Promo Type");
        setStatus("Select Status");
        setDescription("");
        setRideNum("");
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
      setPromoCode(promoToEdit.code);
      setAllRiders(promoToEdit.users.length === 0 ? true : false);
      setAmount(promoToEdit.amount);
      setCity(promoToEdit.city.name); // edit when city is fixed
      setDate(promoToEdit.expiry);
      setPromoType(promoToEdit.payment_type);
      setDescription(promoToEdit.description);
      setRideNum(promoToEdit.number_of_rides);

      const arrangrArr = promoToEdit.users?.map((user) => user.user);
      setRecieversArray(arrangrArr);
    }
  }, [promoToEdit]);

  const updatePromo = async () => {
    const beneficials =
      promoToEdit.users.length !== 0 ? promoToEdit.users.map((item) => item.user_id) : [];

    const receivers_id_updated = [...beneficials, ...receivers_id].filter(Boolean);
    const formData = {
      code: promoCode,
      promo_payment_type: promotype.toLocaleLowerCase(),
      amount: +amount,
      city_id: 2,
      expiry: date,
      is_active: status === "Active" ? true : false,
      description: description,
      number_of_rides: +rideNum,
      user_ids: receivers_id_updated
    };
    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const { data } = await axios.patch(`${BASE_URL}promos/${promoToEdit.id}`, formData);

      if (data) {
        setSuccessModal(true);
        setPromoCode("");
        setAllRiders(true);
        setAmount("");
        setCity("Select City");
        setDate("Expiry");
        setPromoType("Select Promo Type");
        setStatus("Select Status");
        setDescription("");
        setRideNum("");
        dispatch(editPromo(null));
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
    <div>
      {" "}
      <span className="text-lg flex space-x-2 mb-6 cursor-pointer font-semibold">
        <p
          className="text-gray-500/60 tracking-wide hover:underline"
          onClick={() => router.push("/admin/rider_mgt/promo")}
        >
          Rider's Promo
        </p>{" "}
        &nbsp; &gt; <p className="tracking-wide">Create Promo</p>
      </span>
      <div className="md:mt-10 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="bg-adminbg rounded-md mb-6 md:h-auto p-3 md:p-6">
          <p className="text-sm text-textColor mb-3">This promo is for:</p>
          <div className=" flex space-x-3 mb-3">
            <div className="flex space-x-2 items-center">
              <div
                onClick={() => setAllRiders(!allRider)}
                className={`border w-3.5 h-3.5  flex items-center justify-center rounded ${
                  allRider ? "border-scudGreen " : "p-1.5"
                } `}
              >
                {allRider && <AiOutlineCheck className="text-scudGreen text-lg" />}
              </div>
              {/* <input type={'checkbox'} /> */}
              <label className="text-sm tracking-wider text-[#3D4151] my-2">All Riders</label>
            </div>
            <div className="flex space-x-2 items-center">
              <div
                onClick={() => setAllRiders(!allRider)}
                className={`border w-3.5 h-3.5  flex items-center justify-center rounded ${
                  !allRider ? "border-scudGreen " : "p-1.5"
                } `}
              >
                {!allRider && <AiOutlineCheck className="text-scudGreen text-lg" />}
              </div>
              {/* <input type={'checkbox'} /> */}
              <label className="text-sm tracking-wider text-[#3D4151] my-2">
                Specific Rider(s)
              </label>
            </div>
          </div>
          {!allRider && (
            <div className="relative block mb-8">
              <span class="absolute inset-y-0 right-0 flex items-center pr-2">
                <span onClick={() => setSearching("")}>
                  <RiArrowDownSFill />
                </span>
              </span>
              <div className="flex border-[1px] rounded-md outline-0 w-full     border-gray-300">
                <div className="flex flex-wrap space-x-2p-1 max-w-[600px]">
                  {recieversarray.map((itm, indx) => (
                    <div
                      key={indx}
                      className="flex justify-center py-1.5 px-2 m-1 mx-2 items-center space-x-2 w-24 rounded-md  bg-slate-300"
                    >
                      {/* <img
                                    src={itm.image}
                                    className="rounded-full h-5 w-5"
                                    alt=""
                                 /> */}
                      <p className="text-xs">{itm.first_name}</p>
                      <span
                        className="cursor-pointer"
                        onClick={() => {
                          filterSelected(itm.id);
                        }}
                      >
                        <IoMdClose className="text-textColor text-sm" />
                      </span>
                    </div>
                  ))}
                </div>
                <input
                  type={"text"}
                  onChange={(e) => setSearching(e.target.value)}
                  placeholder="Search by email / name / user"
                  className=" pl-2 placeholder:text-xs  rounded-md outline-0 w-auto  p-1"
                />
              </div>

              {searching && (
                <div className="shadow-md animate__animated animate__fadeIn rounded-md w-full max-h-[500px] pb-14 bg-white mb-3 absolute overflow-y-scroll md:overflow-x-hidden z-50">
                  <table className="w-full min-w-[820px] rounded-md overflow-y-scroll md:overflow-x-hidden">
                    <thead className="border-b  bg-[#ffffff] w-full rounded-t-lg">
                      <tr className="border-b ">
                        <td className=""></td>
                        <td className=""></td>
                        <td className=" "></td>
                        <td className=" text-left"></td>
                      </tr>
                    </thead>

                    <tbody className="mx-4 ">{rows}</tbody>
                  </table>
                  <div className="mx-6 mt-4">{/* <Pagination total={10} /> */}</div>
                </div>
              )}
            </div>
          )}
          <p className="text-sm text-textColor mb-7">Enter promo details</p>
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <Input
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder={"Enter promo code"}
                // Icon={BsPerson}
              />
            </div>
            <div className="col-span-1">
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={"Description"}
                // Icon={BsPerson}
              />
            </div>
            <div className="col-span-1">
              <Input
                value={rideNum}
                onChange={(e) => setRideNum(e.target.value)}
                placeholder={"Number of rides"}
                // Icon={BsPerson}
                type={"number"}
              />
            </div>

            <div className="col-span-1">
              <Select
                data={statusList}
                style={"w-full p-2"}
                positon={"p-2"}
                value={city}
                setValue={setCity}
                dropDownWidth={
                  " w-[16.5rem] md:w-[27rem] bottom-[-6rem] md:bottom-[7rem] lg:bottom-[-5rem]"
                }
                color=""
              />
            </div>
            <div className="col-span-1">
              <Select
                data={promotypes}
                style={"w-full p-2"}
                positon={"p-2"}
                value={promotype}
                setValue={setPromoType}
                dropDownWidth={
                  " w-[16.5rem] md:w-[27rem] bottom-[-6rem] md:bottom-[7rem] lg:bottom-[-5rem]"
                }
                color=""
              />
            </div>
            {promotype == "Amount" ? (
              <div className="col-span-1">
                {" "}
                <Input
                  type={"number"}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={"Amount"}
                  Icon={TbCurrencyNaira}
                />
              </div>
            ) : (
              <div className="col-span-1">
                {" "}
                <Input
                  type={"number"}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={"Percentage"}
                  Icon={AiOutlinePercentage}
                />
              </div>
            )}

            <div className="col-span-1">
              <DatePicker value={date} onChange={(e) => setDate(e.target.value)} min={min} />
            </div>
            <div className="col-span-1">
              <Select
                data={statusList}
                style={"w-full p-2"}
                positon={"p-2"}
                value={status}
                setValue={setStatus}
                dropDownWidth={
                  " w-[16.5rem] md:w-[27rem] bottom-[-6rem] md:bottom-[7rem] lg:bottom-[-5rem]"
                }
                color=""
              />
            </div>
          </div>
        </div>
      </div>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">
              Promo
              {promoToEdit !== null ? "Updated" : "Created"} .
            </p>
            <p className="text-sm text-center text-textColor mt-2">
              Promo has been
              {promoToEdit !== null ? "updated" : "created"}
              successfully.
            </p>
          </div>
        </div>
      </Modal>
      <div className="flex justify-between mt-8">
        <button
          onClick={() => router.push("/admin/rider_mgt/promo")}
          className="bg-white border-red-600 text-red-600 border hover:bg-slate-50 px-4 py-1 rounded-md text-sm  mr-2"
        >
          Cancel
        </button>
        <Button onClick={promoToEdit === null ? createPromo : updatePromo} text={"Submit"} />
      </div>
    </div>
  );
};
Create_promo.getLayout = Layout;
export default Create_promo;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}users`, {
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
