import React from "react";
import { useState } from "react";
import { FiCheck, FiEdit } from "react-icons/fi";
import Layout from "../../../components/Admin/Layout";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";

const Notifications = () => {
  const [emailOnly, setEmailOnly] = useState(false);
  const [emailphone, setEmailphone] = useState(false);
  const [receivedNote, setReceivedNote] = useState(false);
  const [paidNote, setPaidNote] = useState(false);
  return (
    <div>
      <p className="tracking-wide font-semibold mb-5 text-sm md:text-lg">
        Payment Notification
      </p>

      <div className="flex mb-10 space-x-5">
        <p className="text-sm text-textColor">Send to :</p>
        <span className="flex text-sm space-x-2">
          <input
            checked={emailOnly}
            onChange={(e) => {
              setEmailOnly(e.currentTarget.checked);
              setEmailphone(false);
            }}
            type={"checkbox"}
          />
          <p className={emailOnly ? "text-scudGreen" : "text-textColor"}>
            Email Only
          </p>
        </span>
        <span className="flex text-sm space-x-2">
          <input
            checked={emailphone}
            onChange={(e) => {
              setEmailOnly(false);
              setEmailphone(e.currentTarget.checked);
            }}
            type={"checkbox"}
          />
          <p className={emailphone ? "text-scudGreen" : "text-textColor"}>
            Email and Phone{" "}
          </p>
        </span>
      </div>

      <div className="rounded-lg mb-6 bg-white border transition-all p-2 md:p-6">
        <div className="md:flex justify-between space-y-5 md:space-y-0 ">
          <div className="flex space-x-4">
            <div className="h-7 w-7 rounded-full bg-blue-200 flex justify-center items-center ">
              <div className="h-5 w-5 rounded-full bg-scudGreen "></div>
            </div>

            <p className="mt-1 text-textColor">Request Received Notification</p>
          </div>
          <div>
            {receivedNote ? (
              <button
                onClick={() => setReceivedNote(false)}
                className=" justify-center items-center  text-scudGreen flex space-x-2 hover:to-blue-500 text-[14px]  rounded-md p-1 px-3"
              >
                <FiCheck /> &nbsp;&nbsp; Done
              </button>
            ) : (
              <button
                onClick={() => setReceivedNote(true)}
                className=" justify-center items-center  text-scudGreen flex space-x-2 hover:to-blue-500 text-[14px]  rounded-md p-1 px-3"
              >
                <FiEdit /> &nbsp;&nbsp; Edit
              </button>
            )}
          </div>
        </div>

        {receivedNote && (
          <div className="animate__animated animate__fadeIn bg-adminbg p-5 mx-5 rounded-lg mt-10">
            <div className="col-span-1 mb-4 md:px-10">
              <p className="text-sm text-textColor mb-4">Heading</p>
              <Input
                type={"email"}
                inputbg={"bg-white"}
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                placeholder={"Enter  title..."}
              />
            </div>
            {/* adding aditional heading tags ##################################################3 */}
            <div className="col-span-1 mb-4 md:px-10">
              <p className="text-sm text-textColor mb-4">Message Body</p>
              <Input
                inputbg={"bg-white"}
                textArea={true}
                rows={100}
                cols={100}
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                placeholder={"Write your message..."}
              />
            </div>
          </div>
        )}
      </div>
      <div className="rounded-lg mb-6 bg-white border transition-all p-2 md:p-6">
        <div className="md:flex justify-between space-y-5 md:space-y-0 ">
          <div className="flex space-x-4">
            <div className="h-7 w-7 rounded-full bg-green-200 flex justify-center items-center ">
              <div className="h-5 w-5 rounded-full bg-green-700 "></div>
            </div>

            <p className="mt-1 text-textColor">Paid Notification</p>
          </div>
          <div>
            {paidNote ? (
              <button
                onClick={() => setPaidNote(false)}
                className=" justify-center items-center  text-scudGreen flex space-x-2 hover:to-blue-500 text-[14px]  rounded-md p-1 px-3"
              >
                <FiCheck /> &nbsp;&nbsp; Done
              </button>
            ) : (
              <button
                onClick={() => setPaidNote(true)}
                className=" justify-center items-center  text-scudGreen flex space-x-2 hover:to-blue-500 text-[14px]  rounded-md p-1 px-3"
              >
                <FiEdit /> &nbsp;&nbsp; Edit
              </button>
            )}
          </div>
        </div>

        {paidNote && (
          <div className="animate__animated animate__fadeIn bg-adminbg p-5 mx-5 rounded-lg mt-10">
            <div className="col-span-1 mb-4 md:px-10">
              <p className="text-sm text-textColor mb-4">Heading</p>
              <Input
                type={"email"}
                inputbg={"bg-white"}
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                placeholder={"Enter  title..."}
              />
            </div>
            {/* adding aditional heading tags ##################################################3 */}
            <div className="col-span-1 mb-4 md:px-10">
              <p className="text-sm text-textColor mb-4">Message Body</p>
              <Input
                inputbg={"bg-white"}
                textArea={true}
                rows={100}
                cols={100}
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                placeholder={"Write your message..."}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex my-7 justify-between ">
        <button className="bg-white border min-w-[120px] md:min-w-[150px] hover:bg-slate-50 px-4 py-1 rounded-md text-sm  text-textColor mr-2">
          Cancel
        </button>
        <Button
          //   disabled={disabled}
          onClick={() => {
            // setSuccessModal(true);
            // setOpen(false);
          }}
          text={"Save Changes"}
        />
      </div>
    </div>
  );
};
Notifications.getLayout = Layout;
export default Notifications;
