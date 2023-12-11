import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineCheckCircle, AiOutlinePlus, AiOutlineQuestionCircle } from "react-icons/ai";
import { BsClock } from "react-icons/bs";
import { FiEdit, FiEye } from "react-icons/fi";
import { MdErrorOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../../api/base";
import Layout from "../../../../components/Admin/Layout";
import SearchInput from "../../../../components/admincomponents/SearchInput";
import Button from "../../../../components/common/Button";
import Modal from "../../../../components/common/Modal";
import { useSnackbar } from "notistack";
import { validateToken } from "../../../../components/services/validateToken";

const Index = ({ data }) => {
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.auth.adminDetails);
  const router = useRouter();
  const [questions, setQuestions] = useState(data);
  const [search, setSearch] = useState("");
  const [deletemodal, setDeleteModal] = useState(false);
  const [successmodal, setSuccessModal] = useState(false);
  const [activequestion, setActiveQuestion] = useState(null);
  const [loading, setLoading] = useState(false);

  const refreshData = async () => {
    await router.replace(router.asPath);
  };

  const deleteQuestion = async () => {
    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      await axios
        .delete(BASE_URL + `support-categories/${activequestion.id}`)
        .then((res) => {
          if (res) {
            refreshData();
            setSuccessModal(true);
            setDeleteModal(false);
            setActiveQuestion(null);
          }
        })
        .catch((err) => {
          if (err.response.message === "Unauthorized" || err.response.statusCode == 401) {
            getToken(true);
            enqueueSnackbar(`Try again something happened`, {
              variant: "info"
            });
          }
        });
    } catch (err) {
      // refresh token adn reload page
      console.log(err);
      enqueueSnackbar(err.message, {
        variant: "error"
      });
    }
  };
  return (
    <div>
      {" "}
      <div className="flex mb-5 md:mb-10 justify-between items-center">
        <p className="text-lg tracking-wide font-semibold">Support questions</p>
        <span className="">
          <Button
            onClick={() => router.push("/admin/support/manage_support/add_question")}
            text={"Add questions"}
            social={true}
            SocialIcon={AiOutlinePlus}
          />
        </span>
      </div>
      {questions?.length > 0 && (
        <div className="flex md:mb-6 mb-4 md:flex-row flex-col justify-between">
          <p className="text-textColor text-sm">
            All Support Questions <small className="text-textColor/50">({questions?.length})</small>
          </p>
          <SearchInput value={search} setValue={setSearch} style={"mt-5 md:mt-0"} />
        </div>
      )}
      <div className="bg-white w-full border rounded-lg p-2 md:p-4 ">
        {questions?.length > 0 ? (
          <div className=" bg-adminbg p-3 md:p-6 rounded-md">
            {questions
              ?.filter((it) => {
                if (search === "") return it;
                else if (it.name.toLowerCase().includes(search.toLowerCase())) {
                  return it;
                }
              })
              .map((item) => (
                <div
                  onClick={(e) => {
                    router.push(`/admin/support/manage_support/issues/${item.id}`),
                      e.stopPropagation();
                  }}
                  key={item.id}
                  className="border bg-white hover:shadow-md cursor-pointer mb-2 p-4 space-y-3 sm:space-y-0 sm:flex items-center justify-between rounded-md"
                >
                  <div>
                    <p className="text-textColor mb-1 text-sm">{item.name}</p>
                    <p className="text-[#90939C] text-xs">
                      {item.support_questions.length} questions
                    </p>
                  </div>
                  <div className="flex space-x-8 items-center">
                    {/* <span className="flex space-x-2 text-textColor/50 items-center">
                    <BsClock className="text-xs" />
                    <p className="text-xs">
                      {new Date(item.created_at).toLocaleDateString("en-us", {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                      })}
                    </p>
                  </span> */}
                    <span className="flex space-x-3 justify-center">
                      <button
                        onClick={() =>
                          router.push(`/admin/support/manage_support/issues/${item.id}`)
                        }
                        className="bg-scudGreen border flex space-x-2 hover:to-blue-500   rounded-md p-1"
                      >
                        <FiEye className="text-white" />
                      </button>
                      <button
                        onClick={(e) => {
                          setDeleteModal(true), setActiveQuestion(item), e.stopPropagation();
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
        ) : (
          <div className="flex flex-col bg-adminbg space-y-3 p-5 md:p-20 justify-center items-center rounded-md">
            <div className=" bg-[#F2F5FF]  border rounded-full p-2">
              <AiOutlineQuestionCircle className="text-scudGreen text-lg" />
            </div>

            <p className="text-[#1E202B] my-2 text-lg font-semibold">No Support Quesstions </p>

            <p className="text-sm  text-textColor  text-center">
              Hi {`${user?.first_name}, `}you have not created any support questions.
              <br className="hidden md:block" /> Click on the button above to add questions
            </p>

            <Button
              onClick={() => router.push("/admin/support/manage_support/add_question")}
              text={"Add questions"}
              social={true}
              SocialIcon={AiOutlinePlus}
            />
          </div>
        )}
      </div>
      <Modal onClose={() => setDeleteModal(false)} open={deletemodal}>
        <div className="w-[18rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <MdErrorOutline className="text-red-600 text-5xl" />
            <>
              <p className="text-lg font-semibold mt-2">Delete support question</p>
              <p className="text-sm text-textColor mt-2">You are about to delete this question</p>
            </>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              No,Cancel
            </button>

            <Button loading={loading} onClick={deleteQuestion} text={"Yes, Delete"} />
          </div>
        </div>
      </Modal>
      <Modal onClose={() => setSuccessModal(false)} open={successmodal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2"> deleted successfully</p>
            <p className="text-sm text-center text-textColor mt-2">
              Question category has been deleted
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Index.getLayout = Layout;
export default Index;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}support-categories`, {
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
