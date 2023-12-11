import React from "react";
import { BsCheck2Circle } from "react-icons/bs";
import Modal from "../../common/Modal";

function SuccessModal({ open, onClose }) {
  return (
    <Modal
      // congrat={true}
      onClose={onClose}
      open={open}
    >
      <div className="w-[24rem]  h-auto">
        <div className="flex flex-col space-y-3 my-5 justify-center items-center">
          <BsCheck2Circle className="text-green-600 text-5xl" />
          <p className="text-lg font-semibold mt-2">Reason submitted </p>
          <p className="text-sm text-textColor mt-2">
            Thank you for your feedback{" "}
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default SuccessModal;
