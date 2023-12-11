import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { BsPersonPlus } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import Layout from "../../../../components/Admin/Layout";
import AcctOfficersList from "../../../../components/admincomponents/AcctOfficersList";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import Button from "../../../../components/common/Button";
// import { account_officers } from '../../../../dummy';
import Select2 from "../../../../components/admincomponents/Select2";
import SearchInput from "../../../../components/admincomponents/SearchInput";
import { AiOutlineCheck, AiOutlineCheckCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { handleOfficerCheck } from "../../../../features/scudSlice";
import { BASE_URL, STATE_URL } from "../../../../api/base";
import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { getToken } from "../../../../components/services/refresh";
import Modal from "../../../../components/common/Modal";
import { useEffect } from "react";
import { validateToken } from "../../../../components/services/validateToken";

const Assign_officer = ({ data, state }) => {
  const [showOfficers, setShowOfficers] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [selectedAcctOfficer, setSelectedAcctOfficer] = useState(null);
  const [checked_acct_officers, setChecked_acct_officers] = useState([]);

  const [location, setLocation] = useState("Location");
  const [all, setAll] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const states = state?.map((item) => item.name);
  const users = data.data;

  const supervisors = users.filter((user) => user?.roles.includes("supervisor"));

  const account_officers = users.filter((user) => user?.roles.includes("account-officer"));

  const all_id = account_officers.map((item) => item.id);

  const assignAcctOfficers = async () => {
    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.post(`${BASE_URL}supervisors/assign`, {
        supervisor_id: selectedOfficer?.id,
        account_managers: checked_acct_officers
      });

      if (data) {
        setChecked_acct_officers([]);
        setSuccessModal(true);
        dispatch(handleOfficerCheck(false));
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

  useEffect(() => {
    getToken(true);
  }, []);

  if (successModal) setTimeout(() => setSuccessModal(false), 4000);

  return (
    <div>
      {" "}
      <BreadCrumbs
        indexPath={"/admin/support/officer_manager/officer_mgt"}
        index={"Officer Manager"}
        secondItem="Assign Account Officers"
      />
      <div
        onClick={() => setShowOfficers(true)}
        className="bg-white p-2 md:p-3 border rounded-md mb-3"
      >
        <div className="w-full flex justify-between items-center">
          <div className="flex space-x-2 items-center">
            {" "}
            <div className="bg-scudGreen rounded-full p-2">
              <BsPersonPlus className="text-white" />
            </div>
            <p className="text-textColor text-sm">Select Officer's Manager</p>
          </div>

          <IoIosArrowDown
            onClick={() => setShowOfficers(false)}
            className={showOfficers ? "text-scudGreen" : "text-[#E7E7E8]"}
          />
        </div>

        {showOfficers && (
          <div className="  md:mx-10 mt-7 rounded-lg px-2 py-1 md:py-4 md:px-6 bg-adminbg">
            <p className="text-textColor mb-2 text-xs">Select Officer's Manager</p>

            <div className=" relative">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdown(!dropdown);
                }}
                className="w-full border rounded-md p-2 flex items-center justify-between"
              >
                {selectedOfficer === null ? (
                  <p className="text-xs text-textColor">Select</p>
                ) : (
                  <div className="flex space-x-2 items-center">
                    <img
                      src={
                        selectedOfficer?.picture === null || selectedOfficer?.picture === undefined
                          ? "/user.png"
                          : selectedOfficer?.picture
                      }
                      className=" w-5 h-5 md:w-7 md:h-7 rounded-full"
                    />
                    <p className="md:text-sm text-[8px] text-textColor">
                      {selectedOfficer?.first_name.charAt(0).toUpperCase() +
                        selectedOfficer?.first_name.slice(1) +
                        " " +
                        selectedOfficer?.last_name.charAt(0).toUpperCase() +
                        selectedOfficer?.last_name.slice(1)}
                    </p>
                  </div>
                )}
                <IoIosArrowDown className="text-[#E7E7E8]" />
              </div>

              {dropdown && (
                <div onClick={() => setDropdown(false)} className="shadow rounded-md p-2">
                  {supervisors?.map((item) => (
                    <AcctOfficersList setOfficer={setSelectedOfficer} key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {selectedOfficer !== null && (
        <>
          <p className="text-sm mb-4 mt-7 text-textColor">Assign Account Officers to Manager</p>
          <div className="bg-white p-2 md:p-5 border rounded-md mb-3">
            <div className="flex md:flex-row flex-col md:justify-between md:items-center">
              <div className="flex space-x-4 items-center">
                <Select2
                  data={states}
                  Icon={MdOutlineLocationOn}
                  setValue={setLocation}
                  value={location}
                  position={"mt-[20rem]"}
                />
                {!all ? (
                  <div
                    onClick={() => {
                      setAll(!all);
                      dispatch(handleOfficerCheck(true));
                      setChecked_acct_officers(all_id);
                    }}
                    className="border p-1 rounded-md border-scudGreen flex space-x-1"
                  >
                    <AiOutlineCheck className="text-scudGreen" />
                    <p className="text-scudGreen text-xs">Select All</p>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setAll(!all);
                      dispatch(handleOfficerCheck(false));
                      setChecked_acct_officers([]);
                    }}
                    className="bg-scudGreen rounded-md space-x-1 flex p-1 "
                  >
                    <AiOutlineCheck className="text-white" />
                    <p className="text-white text-xs">Unselect All</p>
                  </div>
                )}
              </div>

              <SearchInput style={"mt-6 md:mt-0"} />
            </div>
            <div className="mt-5">
              {account_officers?.map((item) => (
                <AcctOfficersList
                  acct_check={checked_acct_officers}
                  setAcct_Check={setChecked_acct_officers}
                  withChechbox={true}
                  setOfficer={setSelectedAcctOfficer}
                  key={item.id}
                  item={item}
                />
              ))}
            </div>
          </div>
        </>
      )}
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Account Officer Assigned</p>
            <p className="text-sm text-center text-textColor mt-2">
              Selected Officers have been successfully assined to
              {selectedOfficer?.first_name.charAt(0).toUpperCase() +
                selectedOfficer?.first_name.slice(1) +
                " " +
                selectedOfficer?.last_name.charAt(0).toUpperCase() +
                selectedOfficer?.last_name.slice(1)}
            </p>
          </div>
        </div>
      </Modal>
      <div className="flex  mt-20 my-7 justify-between ">
        <button
          onClick={() => router.push("/admin/payment_mgt/currency")}
          className="border-red-600 border min-w-[80px] md:min-w-[90px] hover:bg-slate-50 px-4 py-1.5 rounded-md text-sm  text-red-600"
        >
          Back
        </button>
        <Button
          //    loading={loading}
          disabled={checked_acct_officers.length === 0 ? true : false}
          onClick={assignAcctOfficers}
          text={"Submit"}
        />
      </div>
    </div>
  );
};

Assign_officer.getLayout = Layout;
export default Assign_officer;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}users`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const stateRes = await fetch(`${STATE_URL}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  const state = await stateRes.json();

  if (
    (data?.statusCode !== undefined && data?.statusCode === 401) ||
    (state.statusCode !== undefined && state.statusCode === 401)
  ) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      data,
      state
    }
  };
}
