import React from "react";
import Layout from "../../../../components/Admin/Layout";
import Button from "../../../../components/common/Button";
import { useRouter } from "next/router";
import { AiOutlineCheckCircle, AiOutlinePlus } from "react-icons/ai";
import SearchInput from "../../../../components/admincomponents/SearchInput";
import { useState } from "react";
import { BASE_URL } from "../../../../api/base";
import { validateToken } from "../../../../components/services/validateToken";
import EmptyTable from "../../../../components/common/EmptyTable";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "../../../../components/common/Modal";
import { MdErrorOutline } from "react-icons/md";
import Cookies from "js-cookie";
import axios from "axios";
import { useSnackbar } from "notistack";

const AddressList = ({ address }) => {
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addressId, setAddressId] = useState(null);
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const addressList = address.data;
  const deleteAddress = async () => {
    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const { data } = await axios.delete(`${BASE_URL}office-address/${addressId}`);
      if (data) {
        setSuccessModal(true);
        setDeleteModal(false);
        refreshData();
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

  if (successModal) {
    setTimeout(() => setSuccessModal(false), 3000);
  }

  function refreshData() {
    return router.replace(router.asPath);
  }

  return (
    <div>
      <div className="flex mb-5 md:mb-10  flex-row    justify-between items-center">
        <p className="md:text-xl text-lg  text-title font-semibold">Address</p>
        <Button
          onClick={() => router.push("/admin/support/company_address/add_address")}
          custom={"px-2 py-2"}
          social={true}
          SocialIcon={AiOutlinePlus}
          text={"Add Address"}
        />
      </div>

      {addressList.length > 0 && (
        <div className="flex justify-end mb-5 items-end">
          <SearchInput setValue={setSearch} value={search} />
        </div>
      )}

      {addressList?.length === 0 ? (
        <div className="mt-4">
          <EmptyTable Icon={HiOutlineOfficeBuilding} title="No Address Added" name="address" />
        </div>
      ) : (
        <div className="border bg-white rounded-md p-3 space-y-2">
          {addressList
            .filter((el) => {
              if (search === "") return el;
              else if (el.city.name.toLowerCase().includes(search.toLowerCase())) return el;
            })
            .map((item, idx) => (
              <div
                key={idx}
                className="border bg-white p-3  flex items-center justify-between rounded-md"
              >
                <div className="flex space-x-1 items-center">
                  <div className="p-1 bg-[#F2F5FF] rounded-full">
                    <div
                      className={`bg-scudGreen p-1 flex justify-center items-center rounded-full text-white`}
                    >
                      <HiOutlineOfficeBuilding className="text-xl" />
                    </div>
                  </div>

                  <p className="text-textColor text-sm">{item.city?.name}</p>
                </div>

                <div className="flex  space-x-8  justify-between items-center">
                  <span className="flex space-x-3 justify-center">
                    <button
                      onClick={() => {
                        router.push({
                          pathname: "/admin/support/company_address/add_address",
                          query: item
                        });
                      }}
                      className="bg-scudGreen border flex space-x-2 hover:to-blue-500   rounded-md p-1"
                    >
                      <FiEdit className="text-white" />
                    </button>
                    <button
                      onClick={() => {
                        setDeleteModal(true);
                        setAddressId(item.id);
                      }}
                      className="bg-red-600 border flex space-x-2 hover:to-red-300   rounded-md p-1"
                    >
                      <RiDeleteBin6Line className="text-white" />
                    </button>
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* delete modal start here  */}
      <Modal onClose={() => setDeleteModal(false)} open={deleteModal}>
        <div className="w-[18rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <MdErrorOutline className="text-red-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Delete Address</p>
            <p className="text-sm text-textColor mt-2">
              Are you sure you want to delete this address
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              Cancel
            </button>
            <Button loading={loading} onClick={deleteAddress} text={"Delete"} />
          </div>
        </div>
      </Modal>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Address deleted</p>
            <p className="text-sm text-center text-textColor mt-2">
              Address has been deleted successfully.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
AddressList.getLayout = Layout;
export default AddressList;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}office-address`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const address = await res.json();

  if (address?.statusCode !== undefined && address?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      address
    }
  };
}
