import React, { useState } from "react";
import { reasons } from "../../../dummy";
import Button from "../../common/Button";
import Modal from "../../common/Modal";
import { useSelector } from "react-redux";

function CancelModal({ open, onClose, cancelRideRequest }) {
  const reasonsArr = useSelector((state) => state.bookride.cancelReason);
  const [reason, setReason] = useState(null);

  return (
    <Modal title={"Reason for cancelling"} onClose={onClose} open={open}>
      <div className="md:w-[24rem]  h-auto">
        <hr className="my-4" />
        <div className="flex flex-col space-y-3 justify-center items-center">
          <div className="w-full">
            {reasonsArr?.map((reasn, index) => (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setReason(reasn.id);
                }}
                key={index}
                className="w-full flex space-x-3 mb-4"
              >
                <input name={"reasons"} type={"radio"} />
                <label className={reason === reasn ? "text-scudGreen" : "text-black"}>
                  {reasn.reason}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => onClose()}
            className="bg-white border hover:bg-slate-50 px-4 text-scudGreen border-scudGreen py-1 rounded-md text-sm font-semibold  mr-2"
          >
            Back
          </button>
          <Button
            onClick={() => cancelRideRequest(reason)}
            disabled={reason !== null ? false : true}
            text={"Submit"}
          />
        </div>
      </div>
    </Modal>
  );
}

export default CancelModal;
