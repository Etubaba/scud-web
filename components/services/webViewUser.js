import axios from "axios";
import { BASE_URL } from "../../api/base";

export const webViewUser = async (token) => {
  //check for valid token
  const regex = /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/gm;
  const isMatch = regex.test(token);
  if (!isMatch) return "Invalid token";

  //fetch user details

  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  axios.defaults.headers.get["Content-Type"] = "application/json";
  const { data, status } = await axios.get(`${BASE_URL}auth/profile`);
  if (status > 399 || !data) {
    return "Invalid token";
  } else {
    const userDetails = {
      profile: data?.picture !== null && data?.first_name !== null ? true : false,
      license: data?.license !== null ? true : false,
      vehicle: data?.vehicles.length !== 0 ? true : false,
      bankDetails: data?.bank_account !== null ? true : false
    };
    return userDetails;
  }
};
