import React, { useEffect, useState } from "react";
import { BsCreditCard2Back } from "react-icons/bs";
import Layout from "../../components/riderLayout/Layout";
import Modal from "../../components/common/Modal";
import Divider from "../../components/common/Divider";
import Switch from "../../components/common/Switch";
import { useDispatch, useSelector } from "react-redux";
import { handlePaymentMethod } from "../../features/bookRideSlice";
import CardsModal from "../../components/ridersComponent/Modals/CardsModal";
import { BASE_URL } from "../../api/base";
import { validateToken } from "../../components/services/validateToken";

const Payment = ({ data }) => {
  const [card, setCard] = useState(false);
  const [cash, setCash] = useState(false);
  const [cardlist, setCardList] = useState([...data.data]);
  const [cardModal, setCardModal] = useState(false);
  const paymentMethod = useSelector((state) => state.bookride.paymentMethod);
  const dispatch = useDispatch();

  useEffect(() => {
    if (paymentMethod === "Cash") {
      setCash(true);
      setCard(false);
    } else {
      setCard(true);
      setCash(false);
    }
  }, [paymentMethod]);

  return (
    <div className="p-2   md:p-5">
      <div>
        <p className="md:text-lg text-base mb-1 tracking-wider font-semibold">Payment</p>
        <p className="md:text-sm text-xs tracking-wider text-textColor">
          Select Your default payment method
        </p>
      </div>

      <div className="bg-white border rounded-md mt-6 p-2 md:p-4">
        <div className="bg-adminbg mb-2 flex p-3 justify-between items-center rounded-md">
          <div className="flex space-x-3">
            <div
              className={`bg-scudyellow p-3 flex justify-center items-center rounded-full text-white`}
            >
              <BsCreditCard2Back className="text-lg" />
            </div>
            <div>
              <p className="text-textColor font-semibold">Card Payment</p>
              <p
                onClick={() => setCardModal(true)}
                className="text-xs mt-1 text-textColor/80 hover:text-textColor/60 "
              >
                Add your card details
              </p>
            </div>
          </div>

          <Switch
            onChange={(e) => {
              setCard(e.target.checked);
              dispatch(handlePaymentMethod("Card"));
            }}
            value={card}
          />
        </div>
        <div className="bg-adminbg flex p-3 justify-between items-center rounded-md">
          <div className="flex space-x-3">
            <div
              className={`bg-scudGreen p-3 flex justify-center items-center rounded-full text-white`}
            >
              <BsCreditCard2Back className="text-lg" />
            </div>
            <div>
              <p className="text-textColor font-semibold">Cash Payment</p>
              <p className="text-xs mt-1 text-textColor/80">Pay with cash</p>
            </div>
          </div>

          <Switch
            onChange={(e) => {
              setCash(e.target.checked);
              dispatch(handlePaymentMethod("Cash"));
            }}
            value={cash}
          />
        </div>
      </div>
      {/* card modal (success modal)  */}
      <CardsModal
        cards={cardlist}
        open={cardModal}
        setCardList={setCardList}
        onClose={() => setCardModal(false)}
      />

      {/* result modal (success modal)  */}
      {/* <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className="md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3  justify-center items-center">
            <BsCheck2Circle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Card {action}</p>
            <p className="text-sm text-center text-textColor mt-2">
              Your card has been {action} successfully
            </p>
          </div>
        </div>
      </Modal> */}

      {/* delete modal start here  */}
    </div>
  );
};

Payment.getLayout = Layout;
export default Payment;

export async function getServerSideProps(context) {
  const query = context.query;

  const token = context.req.cookies.accessToken || "";

  const res = await fetch(`${BASE_URL}payments/cards`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const data = await res.json();

  if (data?.statusCode !== undefined && data?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/signin/rider-signin`, permanent: false } };
    }
  }

  return {
    props: {
      data
    }
  };
}
