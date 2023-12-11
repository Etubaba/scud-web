import { AiOutlineMail } from "react-icons/ai";

const EmtyMessage = () => {
  return (
    <div className="border rounded-md p-10 flex justify-center items-center">
      <div className="space-y-2 flex justify-center items-center flex-col">
        <div className="rounded-full flex justify-center items-center h-12 w-12 bg-[#F2F5FF] p-3">
          <AiOutlineMail className="text-scudGreen text-xl" />
        </div>
        <div className=" flex justify-center items-center flex-col">
          <p className="font-semibold text-title mb-3">No Recent Messages</p>
          <p className=" text-textColor text-center">
            Select any of the managers to view or start a conversation
          </p>
        </div>
      </div>
    </div>
  );
};
export default EmtyMessage;
