import React, { useEffect, useState } from "react";
import Layout from "../../../components/Admin/Layout";
import SearchInput from "../../../components/admincomponents/SearchInput";
import ProgressCompo from "../../../components/admincomponents/ProgressCompo";
import Pagination from "../../../components/common/Pagination";
import { BASE_URL } from "../../../api/base";
import { validateToken } from "../../../components/services/validateToken";
import EmptyTable from "../../../components/common/EmptyTable";
import DiscountProgress from "../../../components/admincomponents/DiscountProgress";
import { BsPeople } from "react-icons/bs";
import { getTimeAgo } from "../../../components/services/getTimeAgo";

const promo_progress = ({ participants }) => {
  // const [filter, setFilter] = useState("All");
  const [participantsList, setParticipantList] = useState(participants);
  const [search, setSearch] = useState("");
  const [expired, setExpired] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);

  const getStatusLength = (target) => {
    if (target === "completed") {
      const arr = participants.filter(
        (item) => item.last_offer_trips >= item.discount.last_stage_no_of_trips
      );
      return arr.length;
    }

    const arr = participants.filter(
      (item) => item.last_offer_trips < item.discount.last_stage_no_of_trips
    );

    return arr.length;
  };

  const fiterParticipant = (element) => {
    if (element === "All") {
      setParticipantList(participants);
    }

    if (element === "completed") {
      const arr = participants.filter(
        (item) => item.last_offer_trips >= item.discount.last_stage_no_of_trips
      );

      setParticipantList(arr);
    }

    if (element === "ongoing") {
      const arr = participants.filter(
        (item) => item.last_offer_trips < item.discount.last_stage_no_of_trips
      );
      setParticipantList(arr);
    }
  };
  const expirationDate =
    participants.length === 0 ? new Date() : new Date(participants[0].discount.end_date);
  useEffect(() => {
    function count() {
      if (participants > 0) {
        const countdownInterval = setInterval(() => {
          const currentTime = new Date();
          const timeDiff = expirationDate.getTime() - currentTime.getTime();

          // Check if the discount has already expired
          if (timeDiff <= 0) {
            clearInterval(countdownInterval);
            setExpired(true);
            return;
          }

          // Convert time difference to days, hours, and minutes
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hrs = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

          setDays(days);
          setHours(hrs);
          setMins(minutes);
          setExpired(false);
        }, 1000);
      }
    }
    count();
  }, []);

  return (
    <div>
      <div className="flex  flex-row mb-6  md:mb-6 justify-between items-center">
        <p className="md:text-lg text-title  text-sm tracking-wide font-semibold">
          Rider Promotion
        </p>
        {participants.length > 0 && (
          <span className="">
            {!expired ? (
              <p className="md:text-sm text-xs">
                Expires:{" "}
                <b className="text-scudGreen ">
                  {days}days : {hours}hrs : {mins}mins
                </b>
              </p>
            ) : (
              <p className="md:text-sm text-xs text-[#FF2D2D]">
                Expired: <b className="text-textColor/40">{getTimeAgo(expirationDate)}</b>
              </p>
            )}
          </span>
        )}
      </div>

      <div className="mb-6">
        <p className="text-textColor  text-sm">Participants</p>
      </div>

      {participants.length > 0 && (
        <div className="flex mb-6 flex-col-reverse md:flex-row justify-between items-center">
          <div className="flex space-x-2">
            <div
              onClick={() => fiterParticipant("All")}
              className=" min-w-[6rem] flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1"
            >
              <p className="text-xs text-textColor/60 font-thin">All ({participants.length})</p>
            </div>
            <div
              onClick={() => fiterParticipant("completed")}
              className=" min-w-[6.5rem] flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1"
            >
              <p className="text-xs text-textColor/60 font-thin">
                Completed ({getStatusLength("completed")})
              </p>
            </div>
            <div
              onClick={() => fiterParticipant("ongoing")}
              className=" min-w-[6rem] flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1"
            >
              <p className="text-xs text-textColor/60 font-thin">Ongoing ({getStatusLength("")})</p>
            </div>
          </div>
          <SearchInput value={search} setValue={setSearch} style={"mb-4 w-full md:w-40 md:mb-0"} />
        </div>
      )}

      {participants.length === 0 ? (
        <EmptyTable
          Icon={BsPeople}
          title={"No Participant For This Discount"}
          name={"participant"}
        />
      ) : (
        <div className="bg-white p-2 mb-6 rounded-md border">
          {participantsList
            .filter((item) => {
              if (search === "") {
                return item;
              } else if (item.first_name.toLowerCase().includes(search.toLowerCase())) {
                return item;
              }
            })
            .map((el, idx) => (
              <DiscountProgress item={el} key={idx} />
            ))}
        </div>
      )}

      {/* <Pagination /> */}
    </div>
  );
};

promo_progress.getLayout = Layout;
export default promo_progress;
export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const id = Object.keys(context.query)[0];

  const res = await fetch(`${BASE_URL}discount-progress/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const participants = await res.json();

  if (participants?.statusCode !== undefined && participants?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      participants
    }
  };
}
