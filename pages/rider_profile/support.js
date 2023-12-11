import { useRouter } from "next/router";
import React from "react";
import { AiFillStar, AiOutlineMail } from "react-icons/ai";
import { BsChatLeftDotsFill, BsChatLeftText } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import Faq from "../../components/drivepageComponents/Faq";
import Layout from "../../components/riderLayout/Layout";

function support() {
  const router = useRouter();
  return (
    <p></p>
    // <div className="p-5">
    //   <div className="flex mb-10 justify-between items-center">
    //     <p className="text-lg tracking-wide font-semibold">Account Officer</p>
    //   </div>
    //   <div className="rounded-md shadow-sm   md:flex md:justify-between  p items-center p-8 my-4 border w-full">
    //     <div className="flex flex-col justify-center items-center md:flex space-x-2">
    //       <div className="flex flex-col justify-center items-center">
    //         {/* profile upload section ################################## */}
    //         <img
    //           className="rounded-full h-24 w-24"
    //           src="/user.png"
    //           alt="profile_img"
    //         />
    //       </div>
    //       <div className="flex flex-col justify-center items-center">
    //         <div className="my-1">
    //           <p className="font-semibold">James Anderson</p>
    //         </div>
    //         <div className="my-1">
    //           <p className="">Account Officer</p>
    //         </div>
    //         <div className="flex  my-2">
    //           {" "}
    //           {[0, 1, 2, 3, 4].map((_, index) => (
    //             <AiFillStar
    //               className={
    //                 4 > index
    //                   ? "text-yellow-400 mt-1 mr-1"
    //                   : "text-slate-500 mr-1 mt-1"
    //               }
    //               // key={index}
    //             />
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //     <div className=" flex justify-center items-center w-full md:w-1/3">
    //       <div
    //         onClick={() => router.push("/rider_profile/chats/callpage")}
    //         className="flex hover:bg-[#CCD6FF] rounded-md px-1.5 cursor-pointer"
    //       >
    //         <FiPhoneCall className="mt-1 text-scudGreen" />
    //         <p className="ml-2">Call</p>
    //       </div>
    //       <div
    //         onClick={() => router.push("/rider_profile/chats/Admin453002566")}
    //         className="flex hover:bg-[#CCD6FF] rounded-md px-1.5 cursor-pointer "
    //       >
    //         <BsChatLeftText className="mt-1 text-scudGreen" />
    //         <p className="ml-2">Message</p>
    //       </div>
    //       <div className="flex hover:bg-[#CCD6FF] rounded-md px-1.5 cursor-pointer">
    //         <AiOutlineMail className="mt-1 text-scudGreen" />
    //         <p className="ml-2">Email</p>
    //       </div>
    //     </div>
    //   </div>

    //   {/* faq section ################################################################## */}

    //   <div>
    //     <Faq />
    //   </div>
    // </div>
  );
}

support.getLayout = Layout;
export default support;

export async function getServerSideProps(context) {
  return { redirect: { destination: `/support`, permanent: false } };
}
