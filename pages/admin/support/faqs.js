import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineCheckCircle, AiOutlinePlus, AiOutlineQuestionCircle } from "react-icons/ai";
import { BsClock } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdErrorOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../../api/base";
import Layout from "../../../components/Admin/Layout";
import SearchInput from "../../../components/admincomponents/SearchInput";
import Button from "../../../components/common/Button";
import EmptyTable from "../../../components/common/EmptyTable";
import Modal from "../../../components/common/Modal";
import { getToken } from "../../../components/services/refresh";
import { editFaq } from "../../../features/editSlice";
import { validateToken } from "../../../components/services/validateToken";
// import { faq } from "../../../dummy";

const Faqs = ({ data }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [search, setSearch] = useState("");
  const [faq_id, setFaq_id] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const faq = data?.data;

  useEffect(() => {
    const admin = true;
    getToken(admin);
    dispatch(editFaq(null));
  }, []);

  //refresh serverside fetching
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const deleteFAQ = async () => {
    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const { data } = await axios.delete(`${BASE_URL}faqs/${faq_id}`);
      if (data) {
        setSuccessModal(true);
        setDeleteModal(false);
        refreshData();
      }
    } catch (err) {
      console.log(err);
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
  return (
    <div>
      {" "}
      <div className="flex mb-5 md:mb-10 justify-between items-center">
        <p className="text-lg tracking-wide font-semibold">Manage FAQs</p>
        <span className="">
          <button
            onClick={() => router.push("/admin/support/add_faq")}
            className="bg-scudGreen flex space-x-2 hover:to-blue-500 text-[14px] text-white rounded-md p-2 "
          >
            <AiOutlinePlus className="text-xl" />
            &nbsp;Add FAQs
          </button>
        </span>
      </div>
      <div className="flex mb-5 justify-between">
        <p className="text-textColor text">All FQAs</p>
        {faq?.length !== 0 && <SearchInput value={search} setValue={setSearch} />}
      </div>
      {faq?.length === 0 ? (
        <div className="mt-4">
          <EmptyTable Icon={AiOutlineQuestionCircle} title="No FAQ added" name="FAQ" />
        </div>
      ) : (
        <div className="border bg-white rounded-md p-5">
          {faq
            ?.filter((item) => {
              if (search === "") {
                return item;
              } else if (item.question.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                return item;
              }
            })
            .map((item) => (
              <div
                key={item.id}
                className="border bg-white mb-4 p-4 space-y-3 sm:space-y-0 sm:flex items-center justify-between rounded-md"
              >
                <p className="text-textColor text-sm">{item.question}</p>

                <div className="flex space-x-8 items-center">
                  <span className="flex space-x-2 text-textColor/50 items-center">
                    <BsClock className="text-xs" />
                    <p className="text-xs ">
                      {new Date(item.created_at).toLocaleDateString("en-us", {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                      })}
                    </p>
                  </span>
                  <span className="flex space-x-3 justify-center">
                    <button
                      onClick={() => {
                        router.push("/admin/support/add_faq");
                        dispatch(editFaq(item));
                      }}
                      className="bg-scudGreen border flex space-x-2 hover:to-blue-500   rounded-md p-1"
                    >
                      <FiEdit className="text-white" />
                    </button>
                    <button
                      onClick={() => {
                        setDeleteModal(true);
                        setFaq_id(item.id);
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
            <p className="text-lg font-semibold mt-2">Delete FAQ</p>
            <p className="text-sm text-textColor mt-2">You are about to delete an FAQ.</p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              No,Cancel
            </button>
            <Button onClick={deleteFAQ} text={"Yes, Delete"} />
          </div>
        </div>
      </Modal>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">FAQ deleted successfully.</p>
            <p className="text-sm text-center text-textColor mt-2">
              Faq has been deleted successfully.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Faqs.getLayout = Layout;
export default Faqs;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}faqs`, {
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
