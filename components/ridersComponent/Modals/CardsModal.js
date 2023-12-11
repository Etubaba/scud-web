import React, { useState } from "react";
import Divider from "../../common/Divider";
import Modal from "../../common/Modal";
import { RiDeleteBin5Line } from "react-icons/ri";
import Switch from "../../common/Switch";
import Button from "../../common/Button";
import { MdErrorOutline } from "react-icons/md";
import EmptyTable from "../../common/EmptyTable";
import { BsCreditCard2BackFill } from "react-icons/bs";
import axios from "axios";
import { BASE_URL } from "../../../api/base";
import Cookies from "js-cookie";
import useFetch from "../../../Hooks/useFetch";
import { useSnackbar } from "notistack";

const CardsModal = ({ open, onClose, cards, setCardList }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [deleteModal, setDeleteModal] = useState(false);
  const [iframe, setIframe] = useState(false);
  const [url, setUrl] = useState("");
  const [cardtodelete, setCardToDelete] = useState(null);
  const [card, setCard] = useState([...cards]);
  const token = Cookies.get("accessToken");
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  axios.defaults.headers.get["Content-Type"] = "application/json";
  const addCard = async () => {
    const { data } = await axios.post(BASE_URL + "payments/cards");
    if (data.success) {
      setUrl(data.url);
      setIframe(true);
    }
  };

  const handleclose = async () => {
    const { data } = await axios.get(BASE_URL + `payments/cards`);
    setCard(data.data);
    setCardList(data.data);
    setIframe(false);
  };

  const handleSetDefault = async (id) => {
    const { data } = await axios.patch(BASE_URL + `payments/cards/${id}`);
    if (data) {
      handleclose();
      enqueueSnackbar("default card added", {
        variant: "success"
      });
    }
  };

  const handleDeleteCard = async () => {
    const { data } = await axios.delete(BASE_URL + `payments/cards/${cardtodelete}`);
    console.log(data, "here..");
    if (data) {
      handleclose();
      enqueueSnackbar("card deleted", {
        variant: "success"
      });
      setDeleteModal(false);
    }
  };

  return (
    <Modal title={"Added Cards"} open={open} onClose={onClose}>
      <div className="w-[18rem] h-full  md:w-[28rem]  md:h-auto">
        <Divider />

        <p className="text-xs text-textColor mb-6 ">Select your default card for payment</p>
        {card.length == 0 ? (
          <EmptyTable Icon={BsCreditCard2BackFill} title={"Cards"} name={"card"} user />
        ) : (
          card.map((item) => (
            <div key={item.id} className="cursor-pointer">
              <div className="bg-adminbg mb-2 p-2 rounded-md w-full   flex justify-between items-center">
                <div className="flex space-x-1 items-center">
                  <img
                    className="w-10 h-4"
                    src={item.brand == "visa" ? "/visa.png" : "/masterscard.png"}
                    alt=""
                  />
                  <p className="text-xs text-textColor">Card............{item.last_four_digits}</p>
                </div>

                <div className="flex space-x-1  items-center">
                  <div
                    onClick={() => {
                      setDeleteModal(true);
                      setCardToDelete(item.id);
                    }}
                    className="bg-[#FF2D2D]   items-center justify-center text-white p-1 rounded-md"
                  >
                    <RiDeleteBin5Line />
                  </div>

                  <Switch
                    onChange={(e) => {
                      handleSetDefault(item.id);
                    }}
                    value={item.default}
                  />
                </div>
              </div>
            </div>
          ))
        )}

        <div className="flex justify-between   ">
          <button
            // onClick={() => setDeleteModal(false)}
            className="bg-white md:min-w-[140px] border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
          >
            Cancel
          </button>
          <Button custom={"py-1 px-4"} onClick={addCard} text={"Add Card"} />
        </div>

        <Modal onClose={() => setDeleteModal(false)} open={deleteModal}>
          <div className="md:w-[24rem]  h-auto">
            <div className="flex flex-col space-y-3 justify-center items-center">
              <MdErrorOutline className="text-red-600 text-5xl" />
              <p className="text-lg font-semibold mt-2">Delete Card?</p>
              <p className="text-sm text-textColor mt-2">You are about to delete your Card?</p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setDeleteModal(false)}
                className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
              >
                Cancel
              </button>
              <Button onClick={handleDeleteCard} text={" Delete"} />
            </div>
          </div>
        </Modal>
        <Modal title={"Add  card"} onClose={handleclose} open={iframe}>
          <iframe id="rider" src={url} className=" md:w-[28rem]  h-[400px]"></iframe>
        </Modal>
      </div>
    </Modal>
  );
};

export default CardsModal;
