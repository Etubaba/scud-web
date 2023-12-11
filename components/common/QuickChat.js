import React from "react";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";

function QuickChat({ onClose, open, onChange, value }) {
  return (
    <Modal title={"Add phase title"} onClose={onClose} open={open}>
      <div onClick={(e) => e.stopPropagation()} className=" w-[20rem] md:w-[24rem]  h-auto">
        <div className=" my-2">
            <Input
            col={2}
            row={2}
            textArea={true}
            value={value}
            onChange={onChange}
            placeholder={"Enter message here"}
            // Icon={TbCurrencyNaira}
            type={"text"}
          />
        </div>
        <div className=" mt-8 w-full">
          <Button
            // onClick={promoToEdit === null ? createPromo : updatePromo}
            text={"Send Message"}
          />
        </div>
      </div>
    </Modal>
  );
}

export default QuickChat;
