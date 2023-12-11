import { useRouter } from "next/router";
import React, { useCallback, useRef } from "react";
import { useState, useEffect } from "react";
import { GoogleMap, Marker, Polygon, DrawingManager, LoadScript } from "@react-google-maps/api";
import { AiOutlineCheckCircle } from "react-icons/ai";

import Layout from "../../../../components/Admin/Layout";
import Button from "../../../../components/common/Button";
import Input from "../../../../components/common/Input";
import Modal from "../../../../components/common/Modal";
import Select from "../../../../components/common/Select";
import AddLocationInp from "../../../../components/admincomponents/AddLocationInp";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL, STATE_URL } from "../../../../api/base";
import useFetch from "../../../../Hooks/useFetch";
import { validateToken } from "../../../../components/services/validateToken";
import { handleOrigin } from "../../../../features/scudSlice";

const Add_location = ({ states }) => {
  const dispatch = useDispatch();
  const [stateName, setStateName] = useState("Select");
  const [cityName, setCityName] = useState("Select");
  const [locationName, setLocationName] = useState("");

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [status, setStatus] = useState("Select Status");
  const [disabled, setDisabled] = useState(true);
  const [successModal, setSuccessModal] = useState(false);
  const [successAction, setSuccessAction] = useState("");
  const [zoomlevel, setZoomLevel] = useState(12);

  const [activeindex, setActiveIndex] = useState();
  const [activecursor, setActiveCursor] = useState("grab");
  const [path, setPath] = useState([]);
  const [state_id, setState_id] = useState(null);
  const [city_id, setCity_id] = useState(null);
  const [state, setState] = useState({
    drawingMode: "polygon"
  });

  //states list
  // const stateList = states?.map((item) => item.name);
  const stateList = [...states];
  // const state_id = states?.filter((item) => item.name === stateName)[0]?.id;

  //city list
  const { fetchData: cities } = useFetch(BASE_URL + `cities?state_id=${state_id}`, state_id, true);
  const cityList = state_id === null || state_id === undefined ? [] : cities;
  // const city_id = cities?.filter((item) => item.name === cityName)[0]?.id;

  const center = useSelector((state) => state.scud.origin);

  const locationToEdit = useSelector((state) => state.edit.location);
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // map config #########################################
  const statusList = ["Active", "inactive"];

  const libraries = ["drawing"];
  const options = {
    drawingControl: true,
    drawingControlOptions: {
      drawingMode: ["Polygon"]
    },
    polygonOptions: {
      fillColor: "#2196F3",
      strokeColor: "#2196F3",
      fillOpacity: 0.5,
      strokeWeight: 2,
      clickable: true,
      editable: true,
      draggable: true,
      zindex: 1
    }
  };

  const containerStyle = {
    width: "auto",
    height: typeof window !== "undefined" ? (window.innerWidth < 450 ? "65vh" : "100vh") : "100vh",
    borderRadius: "10px",
    cursor: "pointer"
  };

  // ______________________________##########################################_________________________

  //change button from disable to able
  useEffect(() => {
    if (locationName !== "" && status !== "Select Status") {
      setDisabled(false);
    }
  }, [status, locationName]);

  useEffect(() => {
    if (locationToEdit !== null) {
      setLocationName(locationToEdit.name);
      setStatus(locationToEdit.is_active ? "Active" : "Inactive");
      setStateName(locationToEdit.state.name);
      setState_id(locationToEdit.state.id);
      setCity_id(locationToEdit.city_id);

      cityList !== null &&
        cityList.filter((item) => {
          item.id === locationToEdit.city_id ? (setCityName(item.name), setCity_id(item.id)) : null;
        });

      const path = [];
      const cords = locationToEdit.coordinates;
      cords.forEach(function (paths) {
        path.push({ lat: Number(paths.latitude), lng: Number(paths.longitude) });
      });
      setPath(path);
      dispatch(handleOrigin(path[0]));
      setZoomLevel(9);
    }
  }, [locationToEdit !== null && cityList !== null]);
  //create Location

  const createLocation = async () => {
    if (path.length === 0) {
      return enqueueSnackbar("You need to select location area with the map", {
        variant: "error"
      });
    }

    const formattedPaths = [];

    path.forEach(function (paths) {
      formattedPaths.push({ latitude: String(paths.lat), longitude: String(paths.lng) });
    });

    const token = Cookies.get("adminAccessToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.get["Content-Type"] = "application/json";

    const formData = {
      name: locationName,
      is_active: status === "Active" ? true : false,
      coordinates: formattedPaths,
      city_id
    };
    try {
      const { data } = await axios.post(`${BASE_URL}locations`, formData);

      if (data) {
        setSuccessModal(true);
        setPath([]);
        setLocationName("");
        setStatus("Select Status");
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        const msg = err.response.data.message;
        if (typeof msg === "string") {
          enqueueSnackbar(msg, {
            variant: "error"
          });
        } else {
          for (let i = 0; i < msg.length; i++) {
            enqueueSnackbar(msg[i], {
              variant: "error"
            });
          }
        }
      }
    }
  };

  //update location

  const updateLocation = async () => {
    const formattedPaths = [];

    path.forEach(function (paths) {
      formattedPaths.push({ latitude: String(paths.lat), longitude: String(paths.lng) });
    });

    const formData = {
      name: locationName,
      is_active: status === "Active" ? true : false,
      coordinates: formattedPaths,
      city_id
    };

    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.patch(`${BASE_URL}locations/${locationToEdit.id}`, formData);

      if (data) {
        setSuccessModal(true);
      }
    } catch (err) {
      if (err.response) {
        const msg = err.response.data.message;
        if (typeof msg === "string") {
          enqueueSnackbar(msg, {
            variant: "error"
          });
        } else {
          for (let i = 0; i < msg.length; i++) {
            enqueueSnackbar(msg[i], {
              variant: "error"
            });
          }
        }
      }
    }
  };

  //remove success modal matter
  if (successModal) {
    setTimeout(() => {
      setSuccessModal(false);
    }, 3000);
  }

  const onPolygonComplete = useCallback((poly) => {
    const polyArray = poly.getPath().getArray();
    let paths = [];
    polyArray.forEach(function (path) {
      paths.push({ lat: path.lat(), lng: path.lng() });
    });
    setPath(paths);
    // poly.setMap(null);
  }, []);

  //define refs for Polygon instance and listeners
  const polygonRef = useRef(null);
  const listenerRef = useRef([]);

  //call setpath with new edited paths
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((latlng) => {
          return { lat: latlng.lat(), lng: latlng.lng() };
        });
      setPath(nextPath);
      point(nextPath);
    }
  }, [setPath, path]);

  const onLoad = useCallback(
    (polygon) => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenerRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );

  const onUnmount = useCallback(() => {
    listenerRef.current.forEach((lis) => lis.remove());
    polygonRef.current = null;
  }, []);

  return (
    <div>
      <span className="text-lg flex space-x-2   cursor-pointer font-semibold">
        <p
          className="text-gray-500/60 tracking-wide hover:underline"
          onClick={() => router.push("/admin/location/locations")}
        >
          Manage Location
        </p>
        &nbsp; &gt; <p className="tracking-wide">Add Location</p>
      </span>
      <div className="md:mt-10 mt-8 w-full space-y-5  border shadow-sm rounded-md p-3 md:p-6">
        <div>
          <p className="text-sm text-black mb-7">Enter Location details</p>
          <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
            <div className="grid grid-cols-1   md:grid-cols-2 gap-5 ">
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">Location name</p>
                <Input
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder={"Type here..."}
                  // Icon={AiOutlineMail}
                />
              </div>
              <div className="col-span-1 ">
                <p className="text-sm text-textColor mb-4">States</p>
                <Select
                  setItemId={setState_id}
                  data={stateList}
                  search={true}
                  style={"w-full p-2"}
                  positon={"p-4"}
                  value={stateName}
                  setValue={setStateName}
                  dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                  color=""
                />
              </div>
              <div className="col-span-1 ">
                <p className="text-sm text-textColor mb-4">City</p>
                <Select
                  setItemId={setCity_id}
                  data={cityList}
                  search={true}
                  style={"w-full p-2"}
                  positon={"p-4"}
                  value={cityName}
                  setValue={setCityName}
                  dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                  color=""
                />
              </div>

              <div className="col-span-1 ">
                <p className="text-sm text-textColor mb-4">Status</p>
                <Select
                  data={statusList}
                  style={"w-full p-2"}
                  positon={"p-4"}
                  value={status}
                  setValue={setStatus}
                  dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                  color=""
                />
              </div>
              {/* ############################## */}
            </div>
          </div>
        </div>

        {/* map polyline selector ####################################### */}

        <div>
          <LoadScript
            id="script-loader"
            googleMapsApiKey={process.env.MAPS_API_KEY3}
            libraries={libraries}
            language="en"
            region="us"
          >
            <GoogleMap
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: true,
                fullscreenControl: false,
                disableDoubleClickZoom: true
              }}
              mapContainerStyle={containerStyle}
              center={center}
              zoom={zoomlevel}
            >
              {path.length === 0 || path.length === 1 || path.length === 2 ? (
                <DrawingManager
                  drawingMode={state.drawingMode}
                  options={options}
                  editable
                  draggable
                  onPolygonComplete={onPolygonComplete}
                  onMouseUp={onEdit}
                  onDragEnd={onEdit}
                />
              ) : (
                <Polygon
                  options={{
                    fillColor: "#2196F3",
                    strokeColor: "#2196F3",
                    fillOpacity: 0.5,
                    strokeWeight: 2
                  }}
                  editable
                  // paths={path}
                  path={path}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                  onMouseUp={onEdit}
                  onDragEnd={onEdit}
                />
              )}
              <div className="   relative  md:w-[60%] mt-16 ml-2.5 mr-3 md:ml-[35%] flex justify-end md:mt-3 ">
                <AddLocationInp setPath={setPath} path={path} />
              </div>

              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
      <div className="flex my-7 justify-between ">
        <button
          onClick={() => router.back()}
          className="bg-white border min-w-[120px] md:min-w-[150px] hover:bg-slate-50 px-4 py-1 rounded-md text-sm  text-textColor mr-2"
        >
          Back
        </button>
        <Button
          disabled={disabled}
          onClick={locationToEdit !== null ? updateLocation : createLocation}
          text={"Save Change"}
        />
      </div>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">
              Location {locationToEdit !== null ? "updated" : "Added"} .
            </p>
            <p className="text-sm text-center text-textColor mt-2">
              {locationName} has been {locationToEdit !== null ? "Updated" : "added"} successfully.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Add_location.getLayout = Layout;
export default Add_location;

export async function getServerSideProps({ req: { cookies } }) {
  const token = cookies.adminAccessToken || "";

  const stateRes = await fetch(STATE_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const states = await stateRes.json();

  if (states?.statusCode !== undefined && states?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }
  return {
    props: {
      states
    }
  };
}
