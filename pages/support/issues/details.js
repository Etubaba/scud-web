import React from "react";
import BreadCrumbs from "../../../components/common/BreadCrumbs";
import { useRouter } from "next/router";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import LastSection from "../../../components/homeComponents/sections/LastSection";
import MobileLastsection from "../../../components/homeComponents/sections/MobileLastsection";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BASE_URL } from "../../../api/base";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

const details = ({ data }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [search, setSearch] = useState("");
  const [helpfulno, setHelpfulNo] = useState(false);
  const [helpfulyes, setHelpfulYes] = useState(false);
  const [question, setQuestion] = useState({
    id: 4,
    name: "Technical Issue",
    support_questions: [
      {
        id: 5,
        question: "How to delete my ride history?",
        answer: "<p>To do this you be thief.</p>",
        created_at: "2023-04-13T11:15:48.601Z",
        updated_at: "2023-04-13T11:15:48.601Z"
      },
      {
        id: 4,
        question: "How can i report a bug here?",
        answer: "<p>You can report a bug by contacting us now </p>",
        created_at: "2023-04-13T10:19:53.247Z",
        updated_at: "2023-04-13T11:53:27.838Z"
      }
    ]
  });
  const router = useRouter();
  const pageDetails = router.query;

  const checkDriverIsloggedIn = useSelector((state) => state.auth.isDriverLoggedIn);
  const checkRiderIsloggedIn = useSelector((state) => state.auth.isRiderLoggedIn);
  const checkAdminIsloggedIn = useSelector((state) => state.auth.isAdminIn);

  useEffect(() => {
    setQuestion(data);
  }, []);

  const getdate = (date) => {
    const datestring = new Date(date);
    return datestring.toUTCString();
  };

  const handleYes = () => {
    if (
      checkAdminIsloggedIn !== false ||
      checkDriverIsloggedIn !== false ||
      checkRiderIsloggedIn !== false
    ) {
      setHelpfulYes(false);
      setHelpfulNo(!helpfulno);
      router.push("/support/issues/ticket");
    } else {
      enqueueSnackbar("you must be logged in to create a ticket");
      router.push("/signin/rider-signin");
    }
  };
  return (
    <div className="md:pt-10 pt-5 bg-adminbg md:px-6">
      {" "}
      <div className="flex   flex-col md:flex-row md:ml-5 justify-between items-center">
        <BreadCrumbs index={"Support"} indexPath={"/support"} secondItem={pageDetails.name} />

        <div className="shadow-md mt-3 md:mt-0  mx-4 md:mx-0 md:w-[18rem] flex px-3 py-1.5 rounded-lg bg-white">
          <div className="bg-scudGreen p-2 mr-2 rounded-full flex justify-center items-center">
            <BsSearch className="text-white text-sm" />
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search"
            className=" outline-none bg-white w-full"
            type={"text"}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row my-4 md:my-8">
        <div className="md:w-3/4 px-3 md:px-5 rounded-md py-4 md:py-8 ">
          <p className="text-xl font-semibold text-title">
            {question.support_questions[pageDetails.index].question}
          </p>
          <p className="text-textColor text-sm mt-1 mb-5">
            Posted {getdate(question.support_questions[pageDetails.index].created_at)}
          </p>

          <div className="bg-white border rounded-md p-4 md:p-10 space-y-2 text-sm text-textColor">
            <p>
              <p
                dangerouslySetInnerHTML={{
                  __html: question.support_questions[pageDetails.index].answer
                }}
              />
            </p>
          </div>

          <div className="flex text-textColor space-x-4 mt-2 text-sm">
            <p>Did you find this helpful? </p>
            <span
              onClick={() => {
                setHelpfulYes(!helpfulyes);
                setHelpfulNo(false);
              }}
              className="flex cursor-pointer transition-all space-x-1 items-center"
            >
              <AiOutlineLike className={helpfulyes ? "text-lg text-scudGreen " : ""} />
              <p>Yes</p>
            </span>
            <span onClick={handleYes} className="flex cursor-pointer space-x-1 items-center">
              <AiOutlineLike className={helpfulno ? "text-lg text-scudGreen " : ""} />
              <p>No</p>
            </span>
          </div>
        </div>
        <div className="md:w-1/4 bg-white rounded-md border mx-4 md:mx-0 p-4 mb-14 md:mb-0 md:p-6">
          <p className=" font-semibold text-center">Related Support</p>
          <div className="mt-4">
            {question.support_questions.map((i, index) => (
              <div
                onClick={() =>
                  router.push({
                    pathname: "/support/issues/details",
                    query: { id: question.id, index: index, name: question.name }
                  })
                }
                key={index}
                className="border mb-2 rounded-md shadow-figma py-3 nd:py-2 px-4"
              >
                <p className="text-xs text-textColor ">{i.question}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <LastSection />
      <MobileLastsection />
    </div>
  );
};

export default details;
export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const { id } = context.query;

  const res = await fetch(`${BASE_URL}support-categories/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();

  return {
    props: {
      data
    }
  };
}
