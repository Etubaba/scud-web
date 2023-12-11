import React from "react";
import Layout from "../../../../components/Admin/Layout";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import { useRouter } from "next/router";
import { BASE_URL, STATE_URL } from "../../../../api/base";
import { validateToken } from "../../../../components/services/validateToken";
import { useState } from "react";
import Select from "../../../../components/common/Select";
import useFetch from "../../../../Hooks/useFetch";
import Input from "../../../../components/common/Input";
import Button from "../../../../components/common/Button";
import axios from "axios";
import { useSnackbar } from "notistack";
import Modal from "../../../../components/common/Modal";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Cookies from "js-cookie";

const AddAddress = ({ states }) => {
  const router = useRouter();
  const addressEdit = router.query;
  console.log(addressEdit);
  const [stateName, setStateName] = useState("");
  const [stateId, setStateId] = useState(null);
  const [cityId, setCityId] = useState(
    addressEdit.city !== undefined ? addressEdit?.city_id : null
  );
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [cityName, setCityName] = useState(addressEdit.city !== undefined ? addressEdit?.city : "");
  const [posterCode, setPosterCode] = useState(
    addressEdit.postal_code !== undefined ? addressEdit?.postal_code : ""
  );
  const [officeAddress, setOfficeAddress] = useState(
    addressEdit.address !== undefined ? addressEdit?.address : ""
  );
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //city list
  const { fetchData: cities } = useFetch(BASE_URL + `cities?state_id=${stateId}`, stateId, true);
  const cityList = stateId === null || stateId === undefined ? [] : cities;

  const handleAddAddress = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const formData = {
        postal_code: posterCode,
        address: officeAddress,
        city_id: cityId
      };

      const { data } = await axios.post(`${BASE_URL}office-address`, formData);
      if (data) {
        setSuccessModal(true);
        setOfficeAddress("");
        setPosterCode("");
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
      }
    }
  };
  const updateAddress = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const formData = {
        postal_code: posterCode,
        address: officeAddress,
        city_id: cityId
      };
      cityId == addressEdit.city_id && delete formData.city_id;
      posterCode == addressEdit.postal_code && delete formData.postal_code;

      const { data } = await axios.patch(`${BASE_URL}office-address/${addressEdit.id}`, formData);
      if (data) {
        setSuccessModal(true);
        setOfficeAddress("");
        setPosterCode("");
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
      }
    }
  };

  //remove success modal matter
  if (successModal) {
    setTimeout(() => {
      setSuccessModal(false);
    }, 3000);
  }
  return (
    <div>
      {" "}
      <BreadCrumbs
        indexPath={"/admin/support/company_address"}
        index={"Address"}
        secondItem={addressEdit.address !== undefined ? "Update Address" : "Add Address"}
      />
      <div className="md:mt-10 mt-8 w-full space-y-5 bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div>
          <p className=" text-title font-semibold text-sm leading-[27px] mb-7">Address Details</p>
          <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
            <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
              <div className="col-span-1 ">
                <p className="text-sm text-textColor mb-2">States</p>
                <Select
                  setItemId={setStateId}
                  data={[...states]}
                  search={true}
                  style={"w-full p-2"}
                  positon={"p-4"}
                  value={stateName}
                  setValue={setStateName}
                  dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                  color=""
                />
              </div>
              <div className="col-span-1 ">
                <p className="text-sm text-textColor mb-2">City</p>
                <Select
                  setItemId={setCityId}
                  data={cityList}
                  search={true}
                  style={"w-full p-2"}
                  positon={"p-4"}
                  value={cityName}
                  setValue={setCityName}
                  dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                  color=""
                />
              </div>

              <div className="col-span-1">
                <p className="text-sm text-textColor mb-2">Postal Code</p>
                <div className="">
                  <Input value={posterCode} onChange={(e) => setPosterCode(e.target.value)} />
                </div>
              </div>
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-2"> Office Address </p>
                <div className="">
                  <Input value={officeAddress} onChange={(e) => setOfficeAddress(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex my-7 justify-between ">
        <button
          onClick={() => router.back()}
          className=" border border-red-600 min-w-[120px] md:min-w-[150px] hover:bg-slate-50 px-4 py-1 rounded-md text-sm  text-red-600 mr-2"
        >
          Back
        </button>
        <Button
          loading={loading}
          disabled={posterCode === "" || cityId === null || officeAddress === "" ? true : false}
          onClick={addressEdit.address !== undefined ? updateAddress : handleAddAddress}
          text={"Save Change"}
        />
      </div>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">
              Address {addressEdit.address !== undefined ? "updated" : "Added"} .
            </p>
            <p className="text-sm text-center text-textColor mt-2">
              Address has been {addressEdit.address !== undefined ? "Updated" : "added"}{" "}
              successfully.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
AddAddress.getLayout = Layout;
export default AddAddress;

export async function getServerSideProps({ req: { cookies } }) {
  const token = cookies.adminAccessToken || "";

  const stateRes = await fetch(STATE_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const states = await stateRes.json();

  if (states?.statusCode !== undefined && states?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }
  return {
    props: {
      states
    }
  };
}
