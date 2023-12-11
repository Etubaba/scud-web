import React, { useEffect, useRef, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { BiCurrentLocation } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { geocodeByAddress, getLatLng, geocodeByLatLng } from "react-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { handleOrigin, handleDestination, handleRoute } from "../../features/scudSlice";
import "animate.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function LocationInput({ onClick }) {
  const originAutoFill = useSelector((state) => state.scud.origin);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [close, setClose] = useState(false);
  const [originplaceholder, setOriginPlaceHolder] = useState("Enter your pick up");

  console.log("origin", origin);
  // console.log("destination", destination);

  const dispatch = useDispatch();
  useEffect(() => {
    geocodeByAddress(origin?.label)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => dispatch(handleOrigin({ lat, lng })));
  }, [origin]);

  useEffect(() => {
    geocodeByLatLng({ lat: originAutoFill.lat, lng: originAutoFill.lng })
      .then((results) => {
        setOriginPlaceHolder(results[0].formatted_address), console.log(results, "results");
        setOrigin(results[2].formatted_address);
      })

      .catch((error) => console.error(error));
  }, [originAutoFill]);

  useEffect(() => {
    geocodeByAddress(destination?.label)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => dispatch(handleDestination({ lat, lng })));
  }, [destination]);

  useEffect(() => {
    async function calculateRoute() {
      if (origin === null || destination === null) {
        return;
      }
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: origin?.label ? origin?.label : origin,
        destination: destination?.label,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING
      });
      console.log(`${results}`);
      dispatch(handleRoute(results));
      // console.log(results);
      // setDirectionsResponse(results);
      // setDistance(results.routes[0].legs[0].distance.text);
      // setDuration(results.routes[0].legs[0].duration.text);
    }
    calculateRoute();
  }, [origin !== null && destination !== null]);

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
  }
  return (
    <div id="adminbox" className="flex  justify-center  items-center">
      <div
        id="adminbox"
        className={"rounded-md bg-white shadow-md w-[95%] md:w-[60%] fixed top-[5rem] py-1 px-4"}
      >
        {!close && (
          <div className="animate__animated animate__fadIn">
            <p className="text-[#9E9FA3] text-sm">Pick up Location</p>
            <div className="flex  w-full space-x-3 my-4">
              <img src="/marker.svg" alt="icon" className="w-7" />
              <div className="w-full">
                <GooglePlacesAutocomplete
                  apiKey={process.env.MAPS_API_KEY3}
                  onPlaceSelected={(place) => {
                    console.log(place);
                  }}
                  selectProps={{
                    placeholder: originplaceholder.substring(0, 70) + "...",
                    origin,
                    onChange: setOrigin
                  }}
                  autocompletionRequest={{
                    componentRestrictions: {
                      country: ["ng"]
                    }
                  }}
                  apiOptions={{
                    region: "NG",

                    types: ["establishment", "geocode", "address", "regions", "cities"]
                  }}
                />
              </div>
              <span
                onClick={onClick}
                class="flex cursor-pointer h-5 w-5 justify-center mt-2 items-center "
              >
                <span class="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-[#78a0f5] opacity-75"></span>
                <BiCurrentLocation class="relative inline-flex  h-5 w-5 text-scudGreen" />
              </span>
            </div>
            <hr className="" />
          </div>
        )}
        <p className="text-[#9E9FA3] text-sm">Destination</p>
        <div className="flex  w-full space-x-3 my-4">
          <div className="flex justify-center items-center">
            <IoLocationOutline class="relative inline-flex  text-3xl text-red-600" />
          </div>
          <div className="w-[90%]">
            <GooglePlacesAutocomplete
              apiKey={process.env.MAPS_API_KEY3}
              selectProps={{
                placeholder: "Enter your destination",
                destination,
                onChange: setDestination
              }}
              autocompletionRequest={{
                bounds: [
                  { lat: 5.589251272219182, lng: 6.7346508718337805 },

                  { lat: 5.075130067507026, lng: 6.3391430593337805 },

                  { lat: 4.3963071262330065, lng: 6.5588696218337805 },

                  { lat: 4.505839039570371, lng: 7.6245434499587805 },

                  { lat: 5.042299463420466, lng: 7.8662426687087805 },

                  { lat: 5.5564480679801305, lng: 7.4707348562087805 }
                ],
                componentRestrictions: {
                  country: ["ng"]
                }
              }}
              apiOptions={{
                region: "ng",
                types: ["establishment", "geocode", "address", "regions", "cities"]
              }}
            />
          </div>
          <span
            onClick={() => setClose(!close)}
            class="flex cursor-pointer h-5 w-5 justify-center mt-2 items-center "
          >
            <span class=" absolute inline-flex h-7 w-7  rounded-full bg-[#78a0f5]/20"></span>
            {close ? (
              <IoIosArrowUp class="relative inline-flex  h-5 w-5 text-scudGreen" />
            ) : (
              <IoIosArrowDown class="relative inline-flex  h-5 w-5 text-scudGreen" />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default LocationInput;
