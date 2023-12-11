import axios from "axios";
import { BASE_URL } from "../../api/base";
import Cookies from "js-cookie";

export const priceCalcutor = async (pickup, destination, arr) => {
  try {
    const token = Cookies.get("accessToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.get["Content-Type"] = "application/json";
    let res;
    let endpoints = [];
    for (let i = 0; i < arr.length; i++) {
      endpoints.push({
        pickup: {
          latitude: pickup.lat,
          longitude: pickup.lng
        },
        destination: {
          latitude: 4.8601836,
          longitude: 6.9665476
        },
        vehicle_type_id: arr[i]
      });
    }

    axios
      .all(
        endpoints.map((e) => {
          axios.post(`${BASE_URL}fare/calculate`, e);
        })
      )
      .then(
        axios.spread((data) => {
          console.log(data);
        })
      );

    return res;
  } catch (err) {}
};

// priceCalcutor().then((res) => console.log(res));
