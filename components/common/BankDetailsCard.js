import React from "react";
import Input from "./Input";
import { useState } from "react";
import { BsBank, BsPerson } from "react-icons/bs";
import Select from "./Select";
import { banks } from "../../dummy";
import { Loader } from "./Loader";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../api/base";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { handleDriverLogin } from "../../features/authSlice";
import { useRouter } from "next/router";
import { goBackSignupLevel, handleDriverSignupLevel } from "../../features/scudSlice";
import Button from "./Button";
import useFetch from "../../Hooks/useFetch";
import { useEffect } from "react";

const BankDetailsCard = () => {
  const [accountName, setAccountName] = useState("");
  const [accountNum, setAccountNum] = useState("");
  const [bankName, setBankName] = useState("Select Bank");
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const user = useSelector((state) => state.auth.userDetails);
  const dispatch = useDispatch();
  const router = useRouter();
  const query = router?.query;

  const { fetchData } = useFetch(BASE_URL + "payments/banks");
  const bankList = fetchData?.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  bankList?.map((item) => item.name);

  const bank_id = fetchData?.filter((item) => item.name === bankName)[0]?.id;

  //for android device using webview

  // const onSuccess = () => {
  //   if (typeof window !== "undefined") {
  //     if (typeof window?.Android !== "undefined") {
  //       window?.Android?.success();
  //     }
  //   }
  // };
  // const onError = (msg) => {
  //   if (typeof window !== "undefined") {
  //     if (typeof window?.Android !== "undefined") {
  //       window?.Android?.failure(msg);
  //     }
  //   }
  // };

  const addAccountDetails = async () => {
    setLoading(true);
    try {
      const user_id =
        user?.id === undefined || user?.id === null ? Number(Cookies.get("user_id")) : user?.id;
      const token = Cookies.get("accessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } =
        query.resubmission_step !== undefined
          ? await axios.patch(`${BASE_URL}payments/bank-accounts/${Number(query.doc_id)}`, {
              bank_id,
              account_number: accountNum,
              account_name: accountName,
              user_id: user.id
            })
          : await axios.post(`${BASE_URL}payments/bank-accounts`, {
              bank_id,
              account_number: accountNum,
              account_name: accountName,
              user_id: user_id
            });
      if (data && query.resubmission_step !== undefined) {
        enqueueSnackbar("submitted", {
          variant: "success"
        });
        router.push("/");
      } else if (data) {
        //to b updated to count down page
        dispatch(handleDriverLogin(true));
        router.push("/driver_profile");
        setLoading(false);
        dispatch(handleDriverSignupLevel(1));

        // if (typeof window?.Android !== "undefined") {
        //   onSuccess();
        // }
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addAccountDetails();
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.addEventListener("keydown", handleKeyPress);
    }
    // Add event listener when the component mounts

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const disable =
    bankName === "Select Bank" || accountName === "" || accountNum === "" ? true : false;

  return (
    <div className="bg-white -mt-4 md:mb-7 animate__fadeIn animate__animated shadow-figma rounded-md w-full md:w-[470px] p-3 md:p-5 ">
      <p className="text-center mb-2 text-lg text-[#1e202a] font-semibold">Sign up as driver</p>
      <p className="text-center text-[#7c7f8a] text-xs mb-5">Enter your bank detials</p>

      <div className="grid gap-4">
        <div className=" col-span-2">
          <p className="text-xs text-textColor/70 mb-1.5">Account Number</p>
          <Input
            value={accountNum}
            onChange={(e) => setAccountNum(e.target.value)}
            // placeholder={"First Name"}
            Icon={BsBank}
            inputbg="bg-white"
            type={"number"}
          />
        </div>
        <div className=" col-span-2">
          <p className="text-xs text-textColor/70 mb-1.5">Account Name</p>
          <Input
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            // placeholder={"First Name"}
            Icon={BsPerson}
            inputbg="bg-white"
            type={"text"}
          />
        </div>
        <div className="col-span-2">
          <p className="text-xs text-textColor/70 mb-1.5">Bank Name</p>
          <Select
            data={bankList}
            style={"w-full p-3"}
            positon={"p-4 "}
            value={bankName}
            setValue={setBankName}
            dropDownWidth={"w-full mt-1"}
            search={true}
            color=""
          />
        </div>
      </div>

      {query.resubmission_step !== undefined ? (
        <div className="flex justify-center mt-3 items-center">
          <Button
            style={"w-full"}
            loading={loading}
            onClick={addAccountDetails}
            disabled={disable}
            text={"Submit"}
          />
        </div>
      ) : (
        <div className="w-full mt-3 flex space-x-4">
          <button
            onClick={() => dispatch(goBackSignupLevel("driversignup"))}
            className="py-2 hover:bg-gray-100 w-full text-textColor bg-[#f2f5ff] rounded-md"
          >
            Back
          </button>

          <Button
            style={"w-full"}
            loading={loading}
            onClick={addAccountDetails}
            disabled={disable}
            text={"Submit"}
          />
        </div>
      )}
    </div>
  );
};

export default BankDetailsCard;
