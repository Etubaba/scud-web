import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerClusterer,
  StreetViewPanorama,
  StreetViewService,
  DirectionsRenderer,
  useJsApiLoader
} from "@react-google-maps/api";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/riderLayout/Layout";
import LocationInput from "../../components/ridersComponent/LocationInput";
import PermissionModal from "../../components/ridersComponent/PermissionModal";
import SeleteRide from "../../components/ridersComponent/SeleteRide";
import { io, Socket } from "socket.io-client";
import { BASE_URL, RIDE_REQUEST_URL } from "../../api/base";
import { useSnackbar } from "notistack";
import {
  getConnectedUser,
  handleCancelReason,
  handleDriverArriver,
  handleLoadingModal,
  handleReasonModal,
  handleSelectionComponent,
  handleVehicleType,
  setTripEnded,
  setTripStarted
} from "../../features/bookRideSlice";
import useSocket from "../../Hooks/useSocket";
import { validateToken } from "../../components/services/validateToken";
import RateDriverModal from "../../components/ridersComponent/Modals/RateDriverModal";

const Home = ({ reasons, vehicle_type }) => {
  const center = useSelector((state) => state.scud.origin);
  const destination = useSelector((state) => state.scud.destination);
  const routescalculated = useSelector((state) => state.scud.routescalculated);
  const reviewModal = useSelector((state) => state.bookride.tripEnded);

  const [getLocationModal, setGetLocationModal] = useState(true);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  // const [delaySelection, setDelaySelection] = useState(false);
  const [connectedDriver, setConnectedDriver] = useState(null);

  const [allOnlineDrivers, setAllOnlineDrivers] = useState([]);
  const paymentMethod = useSelector((state) => state.bookride.paymentMethod);
  const vehicleTypeId = useSelector((state) => state.bookride.vehicleTypeId);

  // const [reviewModal, setReviewModal] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const socket = useSocket(RIDE_REQUEST_URL, "rider");

  console.log("connected", socket.connected);

  const [connectedToSocket, setConnectedToSocket] = useState(socket.connected);

  //cancelreason and vehicle type to store
  useEffect(() => {
    dispatch(handleCancelReason(reasons.data));
    dispatch(handleVehicleType(vehicle_type));

    //calculate price for each vehicle type and get waiting time
  }, []);

  //update user location
  const updateLocation = () => {
    //if the location has not changed from default
    if (center.lat === 4.77149 && center.lng === 7.01435) return;
    const userLocation = {
      latitude: center.lat,
      longitude: center.lng
    };
    socket.emit("updateLocation", userLocation);
  };

  const requestRide = () => {
    if (destination === null) return;
    const requestData = {
      pickup: {
        latitude: center.lat,
        longitude: center.lng
      },
      dropoff: {
        latitude: destination.lat,
        longitude: destination.lng
      },
      mode: paymentMethod.toLowerCase(),
      vehicle_type_id: vehicleTypeId
    };
    socket.emit("requestRides", requestData);
  };

  const cancelRideRequest = async (id) => {
    socket.emit("cancelRide", id);
    dispatch(handleReasonModal(false));
  };

  useEffect(() => {
    updateLocation();
  }, [center]);

  useEffect(() => {
    socket.emit("subscribeToFindAllDrivers");

    socket.on("connect", () => {
      setConnectedToSocket(true);
    });
    socket.on("disconnect", () => {
      setConnectedToSocket(false);
    });
    socket.on("connect_error", (err) => {
      console.log(err);
      enqueueSnackbar(err.message, {
        variant: "error",
        id: 1
      });
    });
    socket.on("updateLocation", (data) => {
      //if user location changes
      console.log("user location", data);
    });

    socket.on("exception", (err) => {
      enqueueSnackbar(err.message, {
        variant: "error"
      });
    });

    socket.on("connectSuccess", (data) => {
      dispatch(getConnectedUser(data.driver));

      setConnectedDriver(data.driver);
      // console.log("connected success", data);
    });

    socket.on("allDrivers", (data) => {
      setAllOnlineDrivers(data?.data?.online);
    });
    socket.on("tripEnded", () => {
      dispatch(setTripEnded(true));
      dispatch(setTripStarted(false));
      dispatch(handleSelectionComponent(false));
    });
    socket.on("driverHasArrived", () => {
      dispatch(handleDriverArriver(true));
    });
    socket.on("tripStarted", () => {
      dispatch(setTripStarted(true));
      dispatch(handleDriverArriver(false));
    });

    socket.on("connectFailed", (err) => {
      enqueueSnackbar(err.message, {
        variant: "error"
      });
    });

    return () => {};
  }, []);

  // console.log("online", allOnlineDrivers);
  // console.log("socket", socket.connected);

  const delaySelection = useSelector((state) => state.bookride.showSelection);

  useEffect(() => {
    if (routescalculated) {
      setTimeout(() => {
        dispatch(handleSelectionComponent(true));
        // setDelaySelection(true);
      }, 5000);
    }
  }, [routescalculated]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.MAPS_API_KEY3,
    libraries: ["places"]
  });

  const containerStyle = {
    width: "auto",
    height: "100vh"
  };

  const onLoad = (streetViewService) => {
    streetViewService.getPanorama(
      {
        location: center,
        radius: 50
      },
      (data, status) => console.log("StreetViewService results", { data, status })
    );
  };

  // marker locations

  function createKey(location) {
    return location.lat + location.lng;
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full animate-pulse">
        <div className="w-full h-screen bg-gray-300 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="">
      <GoogleMap
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false
        }}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={(map) => setMap(map)}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <>
          {" "}
          <LocationInput
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          />
          <PermissionModal setOpen={setGetLocationModal} open={getLocationModal} />
          {routescalculated && delaySelection && (
            <div className="flex justify-center   items-center">
              <SeleteRide
                driver={connectedDriver}
                cancelRideRequest={cancelRideRequest}
                rideRequest={requestRide}
              />
            </div>
          )}
          {/* drivers position,  */}
          {allOnlineDrivers.map((item, idx) => {
            <Marker position={item.location} icon={"/driverIcon.png"} key={idx} />;
          })}
          {/* there rider position */}
          <Marker position={center} animation={window.google.maps.Animation.BOUNCE} />
          {routescalculated && <DirectionsRenderer directions={routescalculated} />}
        </>
      </GoogleMap>

      {/* review modal   ########################################################### */}
      <RateDriverModal open={reviewModal} />
    </div>
  );
};

Home.getLayout = Layout;
export default Home;
export async function getServerSideProps(context) {
  const token = context.req.cookies.accessToken || "";

  const reasonRes = await fetch(`${BASE_URL}cancel-reasons`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const vehicleRes = await fetch(`${BASE_URL}vehicle-types`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const reasons = await reasonRes.json();
  const vehicle_type = await vehicleRes.json();

  if (
    (reasons?.statusCode !== undefined && reasons?.statusCode === 401) ||
    (vehicle_type.statusCode !== undefined && vehicle_type.statusCode === 401)
  ) {
    try {
      await validateToken(context);
    } catch (err) {
      return { redirect: { destination: `/signin/rider-signin`, permanent: false } };
    }
  }

  return {
    props: {
      reasons,
      vehicle_type
    }
  };
}
