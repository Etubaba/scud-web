import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function RoutesMap({origin,destination}) {
  // dummy route generated from google maps

  const [routes, setRoutes] = useState({
    geocoded_waypoints: [
      {
        geocoder_status: "OK",
        place_id: "ChIJ8wT0lrzPaRARonIddO1K_9g",
        types: [
          "establishment",
          "food",
          "grocery_or_supermarket",
          "point_of_interest",
          "store",
          "supermarket",
        ],
      },
      {
        geocoder_status: "OK",
        place_id:
          "EiZOVEEgUmQsIDUwMDEwMiwgUG9ydCBIYXJjb3VydCwgTmlnZXJpYSIuKiwKFAoSCYk-a_8UzmkQEUYKpY5D6_UfEhQKEgnjSCyfo85pEBHbMoh93StWUw",
        types: ["route"],
      },
    ],
    routes: [
      {
        bounds: {
          northeast: {
            lat: 4.8645541,
            lng: 6.975432199999999,
          },
          southwest: {
            lat: 4.842529799999999,
            lng: 6.964750599999999,
          },
        },
        copyrights: "Map data ©2022",
        legs: [
          {
            distance: {
              text: "5.1 km",
              value: 5094,
            },
            duration: {
              text: "11 mins",
              value: 674,
            },
            end_address: "NTA Rd, 500102, Port Harcourt, Nigeria",
            end_location: {
              lat: 4.8558192,
              lng: 6.9717758,
            },
            start_address:
              "9 Ada-George Road, Mgbuoba 500272, Port Harcourt, Nigeria",
            start_location: {
              lat: 4.8477473,
              lng: 6.9739907,
            },
            steps: [
              {
                distance: {
                  text: "45 m",
                  value: 45,
                },
                duration: {
                  text: "1 min",
                  value: 12,
                },
                end_location: {
                  lat: 4.848063,
                  lng: 6.974241699999999,
                },
                html_instructions:
                  "Head \u003cb\u003enortheast\u003c/b\u003e toward \u003cb\u003eAda-George Road\u003c/b\u003e",
                polyline: {
                  points: "myq\\mbqi@i@[IIIK",
                },
                start_location: {
                  lat: 4.8477473,
                  lng: 6.9739907,
                },
                travel_mode: "DRIVING",
              },
              {
                distance: {
                  text: "0.6 km",
                  value: 629,
                },
                duration: {
                  text: "1 min",
                  value: 80,
                },
                end_location: {
                  lat: 4.842529799999999,
                  lng: 6.975311199999999,
                },
                html_instructions:
                  'Turn \u003cb\u003eright\u003c/b\u003e at Callus Miller onto \u003cb\u003eAda-George Road\u003c/b\u003e\u003cdiv style="font-size:0.9em"\u003ePass by Peritoneum Global Services Limited (on the right)\u003c/div\u003e',
                maneuver: "turn-right",
                polyline: {
                  points: "k{q\\_dqi@BAlAc@hA[TEx@MlAMjAI`BMjAK`CQxFc@RClCS",
                },
                start_location: {
                  lat: 4.848063,
                  lng: 6.974241699999999,
                },
                travel_mode: "DRIVING",
              },
              {
                distance: {
                  text: "1.2 km",
                  value: 1168,
                },
                duration: {
                  text: "2 mins",
                  value: 113,
                },
                end_location: {
                  lat: 4.852492,
                  lng: 6.9752565,
                },
                html_instructions:
                  'Make a \u003cb\u003eU-turn\u003c/b\u003e at Quality Mark Furniture &amp; Interior Limited\u003cdiv style="font-size:0.9em"\u003ePass by Thescenthood (on the left)\u003c/div\u003e',
                maneuver: "uturn-left",
                polyline: {
                  points:
                    "yxp\\ujqi@CW{@FwAJyCTeEZkBNy@F{BPcAFk@FWDE@OBaA\\kA^C@aAZ]J[NSDi@Ha@DQ@U?i@CUCc@Ie@Ki@QOGoDkA_A]eEwA",
                },
                start_location: {
                  lat: 4.842529799999999,
                  lng: 6.975311199999999,
                },
                travel_mode: "DRIVING",
              },
              {
                distance: {
                  text: "1.7 km",
                  value: 1696,
                },
                duration: {
                  text: "3 mins",
                  value: 204,
                },
                end_location: {
                  lat: 4.863436099999999,
                  lng: 6.9651372,
                },
                html_instructions:
                  'Turn \u003cb\u003eleft\u003c/b\u003e at Joyceplap International School onto \u003cb\u003eNTA Rd\u003c/b\u003e/\u003cwbr/\u003e\u003cb\u003eRumuokwuta Rd\u003c/b\u003e/\u003cwbr/\u003e\u003cb\u003eRumuokwuta-Choba Road\u003c/b\u003e\u003cdiv style="font-size:0.9em"\u003eContinue to follow NTA Rd/\u003cwbr/\u003eRumuokwuta Rd\u003c/div\u003e\u003cdiv style="font-size:0.9em"\u003ePass by Location Junction Bus Stop (on the left)\u003c/div\u003e',
                maneuver: "turn-left",
                polyline: {
                  points:
                    "awr\\kjqi@SGKPABEFw@dAg@p@SR]X{@p@k@f@SP]\\yApAmA`AMNm@n@a@f@iAhBIPW`@]p@ILs@vACHk@`AO\\w@`BEFe@bAQ\\EH_@h@YXSRm@l@GFk@j@QNq@l@GDw@v@a@\\k@f@q@b@_B|@GBiBv@m@XgAb@sBv@iBp@mBv@gBt@",
                },
                start_location: {
                  lat: 4.852492,
                  lng: 6.9752565,
                },
                travel_mode: "DRIVING",
              },
              {
                distance: {
                  text: "0.1 km",
                  value: 126,
                },
                duration: {
                  text: "1 min",
                  value: 37,
                },
                end_location: {
                  lat: 4.8639842,
                  lng: 6.9661288,
                },
                html_instructions:
                  "Turn \u003cb\u003eright\u003c/b\u003e after CERAGEM PORT HARCOURT, MGBUOBA (on the right)",
                maneuver: "turn-right",
                polyline: {
                  points: "o{t\\ckoi@kBeE",
                },
                start_location: {
                  lat: 4.863436099999999,
                  lng: 6.9651372,
                },
                travel_mode: "DRIVING",
              },
              {
                distance: {
                  text: "76 m",
                  value: 76,
                },
                duration: {
                  text: "1 min",
                  value: 30,
                },
                end_location: {
                  lat: 4.8645541,
                  lng: 6.9657568,
                },
                html_instructions:
                  "Turn \u003cb\u003eleft\u003c/b\u003e at Workmood onto \u003cb\u003eBloombreed Road\u003c/b\u003e/\u003cwbr/\u003e\u003cb\u003eNwanuna Street\u003c/b\u003e",
                maneuver: "turn-left",
                polyline: {
                  points: "{~t\\iqoi@aB`AOF",
                },
                start_location: {
                  lat: 4.8639842,
                  lng: 6.9661288,
                },
                travel_mode: "DRIVING",
              },
              {
                distance: {
                  text: "0.1 km",
                  value: 123,
                },
                duration: {
                  text: "1 min",
                  value: 49,
                },
                end_location: {
                  lat: 4.8639535,
                  lng: 6.9648274,
                },
                html_instructions:
                  'Turn \u003cb\u003eleft\u003c/b\u003e at SanRich Edu\'Digital Consult onto \u003cb\u003eNTA Apara Link Rd\u003c/b\u003e\u003cdiv style="font-size:0.9em"\u003ePass by Hall of Fame (on the left)\u003c/div\u003e',
                maneuver: "turn-left",
                polyline: {
                  points: "mbu\\_ooi@vBxD",
                },
                start_location: {
                  lat: 4.8645541,
                  lng: 6.9657568,
                },
                travel_mode: "DRIVING",
              },
              {
                distance: {
                  text: "1.2 km",
                  value: 1231,
                },
                duration: {
                  text: "2 mins",
                  value: 149,
                },
                end_location: {
                  lat: 4.8558192,
                  lng: 6.9717758,
                },
                html_instructions:
                  'Turn \u003cb\u003eleft\u003c/b\u003e at Fab_electro onto \u003cb\u003eNTA Rd\u003c/b\u003e/\u003cwbr/\u003e\u003cb\u003eRumuokwuta Rd\u003c/b\u003e\u003cdiv style="font-size:0.9em"\u003ePass by Amafel Technologies (on the left)\u003c/div\u003e',
                maneuver: "turn-left",
                polyline: {
                  points:
                    "u~t\\eioi@FNd@W^Q`@SdBu@dAa@f@UjBs@nBw@JEjAe@^O~@c@^QFCbAk@b@Wp@c@~@w@dC{BRSj@i@HEPSNMX[\\_@FK\\m@Va@^y@DGN]|@eBZi@@ETe@BE\\o@HOn@qAJSFM",
                },
                start_location: {
                  lat: 4.8639535,
                  lng: 6.9648274,
                },
                travel_mode: "DRIVING",
              },
            ],
            traffic_speed_entry: [],
            via_waypoint: [],
          },
        ],
        overview_polyline: {
          points:
            "myq\\mbqi@s@e@IKBAvC_AnASfIq@|OmACW{@FqF`@gNdAoBN]FaDbAoC|@kANg@@_AGiAUiHcCyE_BMT}@lA{@dAyCdCsE`EoAvAsAzBsBxDwBjEcArBy@bAaA`AwBpB_A|@mAdAqC`BqBz@uB|@}EhBuElBkBeEaB`AOFvBxDFNd@W`Ae@jDwAnGgCjBu@~Au@jAo@tA{@dGqFdAcAd@k@t@oArBeEv@{AjBsD",
        },
        summary: "Ada-George Road and NTA Rd/Rumuokwuta Rd",
        warnings: [],
        waypoint_order: [],
      },
    ],
    status: "OK",
  });
  

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.MAPS_API_KEY3,
    libraries: ["places"],
  });
  const center = useSelector((state) => state.scud.origin);
  const routescalculated = useSelector((state) => state.scud.routescalculated);

  const containerStyle = {
    width: "100%",
    height: "40vh",
    borderRadius: "10px",
  };
  useEffect(() => {
    async function calculateRoute() {
      // eslint-disable-next-line no-undef
      const directionsService =
        typeof window.google !== "undefined" &&
        new google.maps.DirectionsService();

      const results = await directionsService?.route({
        origin: origin,
        destination: destination,
        // eslint-disable-next-line no-undef
        travelMode:
          typeof window.google !== "undefined" &&
          google.maps.TravelMode.DRIVING,
      });

      // console.log(results);
      setRoutes(results);
    }
    calculateRoute();
  }, [typeof window !== "undefined" && window.google, origin, destination]);

  if (!isLoaded) {
    return (
      <div className="w-full h-full animate-pulse">
        <div className="w-full h-[40vh] rounded-md bg-gray-300 animate-pulse flex justify-center items-center">
          <p>Calculating routes....</p>
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-md w-full">
      <GoogleMap
        options={{
          //   zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          //   fullscreenControl: false,
        }}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        // onLoad={(map) => setMap(map)}
      >
        <Marker
          position={{
            lat: 4.8645541,
            lng: 6.9657568,
          }}
          animation={window.google.maps.Animation.BOUNCE}
        />
        <DirectionsRenderer directions={routes} />
      </GoogleMap>
    </div>
  );
}

export default RoutesMap;
