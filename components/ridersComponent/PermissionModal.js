import React from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { useDispatch } from "react-redux";
import { handleOrigin } from "../../features/scudSlice";

const PermissionModal = ({ open, setOpen }) => {
  // const [open,setOpen]=useState()

  const dispatch = useDispatch();

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch(
        handleOrigin({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      );
      setOpen(false);
    });
  };
  return (
    <Modal onClose={() => setOpen(false)} open={open}>
      <div className=" w-[18rem] md:w-[24rem] py-7  h-60">
        <div className="flex mb-10 flex-col space-y-3 justify-center items-center">
          <img src="/marker.svg" alt="" className="h-14 mb-4 w-14" />

          <p className="text-base  max-w-[240px] text-center text-textColor mt-2">
            Allow scud to automatically set your pick up location
          </p>
        </div>
        <div className="flex justify-between ">
          <button
            onClick={() => setOpen(false)}
            className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-medium text-textColor mr-2"
          >
            No,Don't Allow
          </button>
          <Button onClick={getUserLocation} text={"Yes,Allow"} />
        </div>
      </div>
    </Modal>
  );
};

export default PermissionModal;
