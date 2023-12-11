import React from "react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import Pagination from "../../../components/common/Pagination";
import LastSection from "../../../components/homeComponents/sections/LastSection";
import MobileLastsection from "../../../components/homeComponents/sections/MobileLastsection";
import { useRouter } from "next/router";
import { BASE_URL } from "../../../api/base";
import { useEffect } from "react";

const category = ({ data }) => {
  const [search, setSearch] = useState("");
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
  useEffect(() => {
    setQuestion(data);
  }, []);

  const { support_questions } = question;
  return (
    <div>
      <p className="text-title text-center md:hidden block text-sm font-bold">{question.name}</p>
      <div className="flex flex-col md:flex-row justify-between px-5 md:px-12 md:my-10 md:items-center">
        <div className="bg-white hidden md:block shadow-md px-6 py-2 mb-4 md:mb-0 rounded-md">
          <p className="text-textColor text-sm">{question.name}</p>
        </div>
        <div className="shadow-md mb-4 md:mb-0  mx-4 md:mx-0 md:w-[18rem] flex px-3 py-1.5 rounded-lg bg-white">
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

      <div className="md:px-28 px-4 mb-16">
        <div className="flex justify-center md:justify-between items-center mb-4">
          <p className="md:text-lg text-sm  text-title tracking-wider">
            What would you like to know?
          </p>
          <div className="hidden md:block">
            <Pagination noText={true} />
          </div>
        </div>

        <div className="rounded-md border  px-4  md:px-8 py-6 bg-white">
          {support_questions.map((item,index) => (
            <div
              onClick={() =>
                router.push({
                  pathname: "/support/issues/details",
                  query: { id:question.id, index: index, name: question.name }
                })
              }
              key={item.id}
              className="flex border w-full rounded-md justify-between items-center px-4 py-3 mb-2"
            >
              <p className="text-textColor text-xs md:text-sm ">{item.question}</p>
              <AiOutlinePlus />
            </div>
          ))}
        </div>

        <div className="md:hidden mt-6 flex justify-center items-center">
          <Pagination noText={true} />
        </div>
      </div>

      <LastSection />
      <MobileLastsection />
    </div>
  );
};

export default category;

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
