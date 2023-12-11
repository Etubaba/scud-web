import React from "react";
import { Loader } from "../../common/Loader";
import Modal from "../../common/Modal";
import { handleLoadingModal, handleReasonModal } from "../../../features/bookRideSlice";
import { useDispatch } from "react-redux";
import { TbCarOff } from "react-icons/tb";
import { useState } from "react";
import Button from "../../common/Button";
import useSocket from "../../../Hooks/useSocket";
import { RIDE_REQUEST_URL } from "../../../api/base";

const LoadingModal = ({ onClose, open, driverFound }) => {
  const [confirmModal, setConfirmModal] = useState(false);
  const socket = useSocket(RIDE_REQUEST_URL, "rider");
  if (open) {
    setTimeout(() => onClose(), 90000);
  }
  const dispatch = useDispatch();

  //when driver is found
  const cancel = () => {
    onClose();
    dispatch(handleReasonModal(true));
  };

  const handleClose = (e) => {
    e.stopPropagation();
    if (driverFound) return cancel();
    setConfirmModal(true);
  };

  return (
    <Modal removeClose={true} onClose={onClose} open={open}>
      <div className=" w-[18rem] md:w-[24rem] md:py-5 h-auto">
        <div className="flex flex-col space-y-3 justify-center items-center">
          <div className="my-5">
            {" "}
            <Loader secondary={true} />
          </div>

          {/* <AiOutlineCheckCircle className="text-green-600 text-5xl" /> */}
          <p className="text-lg font-semibold mt-2">
            {driverFound ? "Found a nearby driver" : "Searching for drivers"}
          </p>
          <p className="text-sm text-center text-textColor mt-2">
            {driverFound
              ? "Hold on, we're preparing the driver's informations"
              : "We are searching for drivers in your pick-up location"}
          </p>

          <button
            onClick={(e) => handleClose(e)}
            className="w-full py-1.5 md:py-2 text-center text-white rounded-md bg-[#FF2D2D]"
          >
            Cancel
          </button>
        </div>
      </div>

      <Modal onClose={() => setConfirmModal(false)} open={confirmModal}>
        <div className="w-[18rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <TbCarOff className="text-red-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Cancel ride request</p>
            <p className="text-sm text-textColor mt-2">
              You are about to cancel this ride request?
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setConfirmModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              No
            </button>
            <Button
              onClick={() => {
                setConfirmModal(false);
                onClose();
                socket.emit("cancelRequest");
              }}
              text={"Yes"}
            />
          </div>
        </div>
      </Modal>
    </Modal>
  );
};

export default LoadingModal;
