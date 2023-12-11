import { useRouter } from "next/router";
import React from "react";
import { AiOutlineCheckCircle, AiOutlinePlus, AiOutlineQuestionCircle } from "react-icons/ai";
import { BsClock } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../../../components/Admin/Layout";
import SearchInput from "../../../../../components/admincomponents/SearchInput";
import BreadCrumbs from "../../../../../components/common/BreadCrumbs";
import Button from "../../../../../components/common/Button";
import { faq } from "../../../../../dummy";
import { BASE_URL } from "../../../../../api/base";
import axios from "axios";
import Modal from "../../../../../components/common/Modal";
import { MdErrorOutline } from "react-icons/md";
import { useState } from "react";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { handleEditQuestion } from "../../../../../features/editSlice";
import { validateToken } from "../../../../../components/services/validateToken";

const Index = ({ category }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [question_id, setQuestion_id] = useState(null);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const user = useSelector((state) => state.auth.adminDetails);
  const router = useRouter();
  const { id, name, support_questions } = category;
  const dispatch = useDispatch();

  //refresh serverside fetching
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const deleteQuestion = async () => {
    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const { data } = await axios.delete(`${BASE_URL}support-questions/${question_id}`);

      if (data) {
        setSuccessModal(true);
        refreshData();
        setDeleteModal(false);
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
      } else {
        enqueueSnackbar("Something went wrong", {
          variant: "error"
        });
      }
    }
  };

  //   const faq = [];

  return (
    <div>
      <BreadCrumbs
        index={"Manage support questions  "}
        indexPath={"/admin/support/manage_support"}
        secondItem={name}
      />
      <div className="bg-white w-full border rounded-lg p-2 md:p-4 ">
        <div className="flex mb-3 md:mb-5 justify-between items-center">
          <p className="text-xs md:text-base tracking-wide font-semibold">{name}</p>
          <span className="flex space-x-2 md:space-x-6 justify-between ">
            <div className="flex justify-center items-center">
              <button
                onClick={() =>
                  router.push({
                    pathname: "/admin/support/manage_support/issues/edit_category_heading",
                    query: { id, name }
                  })
                }
                className="border-scudGreen border flex space-x-2 hover:to-blue-500   rounded-md p-1"
              >
                <FiEdit className="text-scudGreen" />
              </button>
            </div>
            <Button
              onClick={() =>
                router.push({
                  pathname: "/admin/support/manage_support/issues/new_question",
                  query: { id, name }
                })
              }
              text={"Add questions"}
              social={true}
              SocialIcon={AiOutlinePlus}
            />
          </span>
        </div>
        {faq?.length > 0 && (
          <div className="flex md:mb-6 mb-4 md:flex-row flex-col justify-between">
            <p className="text-textColor text-sm">
              {name} <small className="text-textColor/50">({support_questions?.length})</small>
            </p>
          </div>
        )}
        {support_questions?.length > 0 ? (
          <div className=" bg-adminbg p-3 md:p-6 rounded-md">
            {support_questions?.map((item) => (
              <div
                key={item.id}
                className="border bg-white mb-2 p-4 space-y-3 sm:space-y-0 sm:flex items-center justify-between rounded-md"
              >
                <div>
                  <p className="text-textColor mb-1 text-sm">{item.question}</p>
                </div>
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
                        router.push({
                          pathname: "/admin/support/manage_support/issues/new_question",
                          query: { id, name }
                        });
                        dispatch(
                          handleEditQuestion({
                            id: item.id,
                            question: item.question,
                            answer: item.answer
                          })
                        );
                      }}
                      className="bg-scudGreen border flex space-x-2 hover:to-blue-500   rounded-md p-1"
                    >
                      <FiEdit className="text-white" />
                    </button>
                    <button
                      onClick={() => {
                        setDeleteModal(true);
                        setQuestion_id(item.id);
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
      {/* delete confirmation */}
      <Modal onClose={() => setDeleteModal(false)} open={deleteModal}>
        <div className="w-[18rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <MdErrorOutline className="text-red-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Delete Quesstion</p>
            <p className="text-sm text-textColor mt-2">You are about to delete a Queston.</p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              Cancel
            </button>
            <Button onClick={deleteQuestion} text={"Delete"} />
          </div>
        </div>
      </Modal>

      {/* success modal */}
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Question deleted successfully.</p>
            <p className="text-sm text-center text-textColor mt-2">
              Question has been deleted successfully.
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

  const { id } = context.query;

  const res = await fetch(`${BASE_URL}support-categories/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const category = await res.json();

  if (category?.statusCode !== undefined && category?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }
  return {
    props: {
      category
    }
  };
}
