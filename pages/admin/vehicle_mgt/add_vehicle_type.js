import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Layout from "../../../components/Admin/Layout";
import BreadCrumbs from "../../../components/common/BreadCrumbs";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Modal from "../../../components/common/Modal";
import Select from "../../../components/common/Select";
import { carYear } from "../../../dummy";
import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { BASE_URL } from "../../../api/base";
import { useSelector } from "react-redux";
import { getYearsArray } from "../../../components/services/yearList";

const AddVehicleType = () => {
  const vehicleTypeToEdit = useSelector((state) => state.edit.vehicle_type);
  const [fromYear, setFromYear] = useState(vehicleTypeToEdit.minimum_year);
  const [toYear, setToYear] = useState(vehicleTypeToEdit.maximum_year);

  const [typeName, setTypeName] = useState(vehicleTypeToEdit.name);
  const [status, setStatus] = useState(vehicleTypeToEdit.is_active);

  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const statusList = ["Active", "inactive"];

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //change button from disable to able
  const disabled =
    status === '"Select Status"' || fromYear === "From" || typeName === "" ? true : false;

  const createType = async () => {
    setLoading(true);
    try {
      const formData = {
        name: typeName,
        minimum_year: String(fromYear),
        maximum_year: String(toYear),
        is_active: status === "Active" ? true : false
      };
      toYear === "To (Optional)" && delete formData.maximum_year;

      const token = Cookies.get("adminAccessToken");

      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.post(`${BASE_URL}vehicle-types`, formData);
      if (data) {
        setSuccessModal(true);
        setLoading(false);
        setFromYear("From");
        setTypeName("");
        setToYear("To (Optional)");
        setStatus("Select Status");
      }
    } catch (err) {
      if (err.response) {
        const msg = err.response.data.message;
        setLoading(false);
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

  const updateVehicleType = async () => {
    setLoading(true);
    const formData = {
      name: vehicleTypeToEdit.name,
      minimum_year: String(fromYear),
      maximum_year: String(toYear),
      is_active: vehicleTypeToEdit.is_active === "Active" ? true : false
    };

    toYear == "To (Optional)" && delete formData.maximum_year;
    fromYear == "From" && delete formData.maximum_year;
    try {
      const token = Cookies.get("adminAccessToken");

      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.patch(
        `${BASE_URL}vehicle-types/${vehicleTypeToEdit.id}`,
        formData
      );
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
      }
    }
  };

  return (
    <div>
      {" "}
      <BreadCrumbs
        indexPath={"/admin/vehicle_mgt/vehicle_type"}
        index={"Vehicle Types"}
        secondItem="Create Vehicle Type"
      />
      <div className="md:mt-10 mt-8 w-full space-y-5 bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div>
          <p className="text-sm text-title mb-7">Enter Vehicle Type details</p>
          <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
            <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4"> Vehicle Type Name</p>
                <Input
                  value={typeName}
                  onChange={(e) => setTypeName(e.target.value)}
                  placeholder={"Vehicle name"}
                  // Icon={AiOutlineMail}
                />
              </div>
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">Select Vehicle Year </p>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                  <Select
                    data={getYearsArray("2000")}
                    style={"w-full p-2"}
                    positon={"p-4"}
                    value={fromYear}
                    setValue={setFromYear}
                    dropDownWidth={" w-full mt-1"}
                    color=""
                  />
                  <Select
                    data={getYearsArray("2000")}
                    style={"w-full p-2"}
                    positon={"p-4"}
                    value={toYear}
                    setValue={setToYear}
                    dropDownWidth={"w-full mt-1"}
                    color=""
                  />
                </div>
              </div>

              <div className="col-span-1">
                {" "}
                <p className="text-sm text-textColor mb-4">Select Status</p>
                <Select
                  data={statusList}
                  style={"w-full p-2"}
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
          disabled={disabled}
          onClick={vehicleTypeToEdit.id === null ? createType : updateVehicleType}
          text={vehicleTypeToEdit.id === null ? "Add Type" : "update Type"}
        />
      </div>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">
              Vehicle Type {vehicleTypeToEdit.id === null ? "Added" : "Update"}
            </p>
            <p className="text-sm text-center text-textColor mt-2">
              Vehicle type has been added successfully.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

AddVehicleType.getLayout = Layout;
export default AddVehicleType;
