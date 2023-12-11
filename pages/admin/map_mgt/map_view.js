import React from "react";
import Layout from "../../../components/Admin/Layout";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
import { userPosition } from "../../../dummy";
import UserInfo from "../../../components/admincomponents/UserInfo";
import useSocket from "../../../Hooks/useSocket";
import { All_USERS_POSITION_URL } from "../../../api/base";
import { useEffect } from "react";

const Map_view = () => {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [riders, setRiders] = useState([]);
  const [onlineDrivers, setOnlineDrivers] = useState([]);
  const [offlineDrivers, setOfflineDrivers] = useState([]);

  const socket = useSocket(All_USERS_POSITION_URL, "admin", true);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.emit("subscribeToFindAllDrivers");
    socket.on("allUsers", (data) => {
      const allRiders = [...data?.riders?.offline_riders, ...data?.riders.online_riders];
      const allOnlineDrivers = [...data?.drivers.online_drivers];
      const allOfflineDrivers = [...data?.drivers.offline_drivers];
      setOfflineDrivers(allOfflineDrivers);
      setOnlineDrivers(allOnlineDrivers);
      setRiders(allRiders);
    });
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.MAPS_API_KEY3,
    libraries: ["places"]
  });

  const center = {
    lat: 9.082,
    lng: 8.6753
  };

  const containerStyle = {
    width: "auto",
    height: "73vh",
    borderRadius: "10px",
    display: "relative"
  };

  const compinedUsers = [...riders, ...onlineDrivers, ...offlineDrivers];

  //change property from longitude to lng and latitude to lat
  const allUsers = compinedUsers.map((obj) => ({
    ...obj,
    location: {
      lng: obj.location?.longitude,
      lat: obj.location?.latitude
    }
  }));

  return (
    <div>
      {" "}
      <p className="tracking-wide mb-5 font-semibold text-lg">Map view</p>
      <div className="bg-white rounded-md border mb-5 w-full md:p-5 h-[80vh]">
        {isLoaded ? (
          <div className="rounded-md w-full">
            <GoogleMap
              options={{
                // zoomControl: false,
                streetViewControl: false,
                mapTypeControl: true,
                fullscreenControl: true
              }}
              mapContainerStyle={containerStyle}
              center={center}
              zoom={5}
              onLoad={(map) => setMap(map)}
            >
              {open && (
                <div className=" ml-5  absolute w-[16.9rem] h-auto mt-28">
                  <UserInfo setOpen={setOpen} userDetails={user} />
                </div>
              )}
              {allUsers.map((item, idx) => (
                <Marker
                  onClick={() => {
                    setUser(item);
                    setTimeout(() => {
                      setOpen(true);
                    }, 1000);
                  }}
                  key={idx}
                  icon={
                    item.role === "rider"
                      ? "/ridericon.svg"
                      : item.role === "driver" && item.is_online === true
                      ? "/drivericon.svg"
                      : "/offlinedriver.svg"
                  }
                  position={item.location}
                />
              ))}
            </GoogleMap>
          </div>
        ) : (
          <div className="w-full h-full animate-pulse">
            <div className="w-full h-screen bg-gray-300 animate-pulse"></div>
          </div>
        )}
      </div>
      <div className="rounded-md bg-white border justify-center items-center flex flex-col md:flex-row  md:flex space-x-6 p-4 h-auto w-full">
        <div className="bg-[#FBFBFF] md:w-1/3 rounded-md px-7 py-3 flex justify-center items-center space-x-2   ">
          <img className="h-4 w-3" src="/ridericon.svg" alt="" />
          <p className="text-textColor tracking-wider text-sm">Rider</p>
          <p className="text-textColor font-bold md:text-3xl">{riders.length}</p>
        </div>
        <div className="bg-[#FBFBFF] md:w-1/3 rounded-md px-7 py-3 flex justify-center items-center space-x-2   ">
          <img className="h-4 w-3" src="/offlinedriver.svg" alt="" />
          <p className="text-textColor tracking-wider text-sm">Offline Driver</p>
          <p className="text-textColor font-bold md:text-3xl">{offlineDrivers.length}</p>
        </div>
        <div className="bg-[#FBFBFF] md:w-1/3 rounded-md px-7 py-3 flex justify-center items-center space-x-2   ">
          <img className="h-4 w-3" src="/drivericon.svg" alt="" />
          <p className="text-textColor tracking-wider text-sm">Online Driver</p>
          <p className="text-textColor font-bold md:text-3xl">{onlineDrivers.length}</p>
        </div>
      </div>
    </div>
  );
};

Map_view.getLayout = Layout;
export default Map_view;
