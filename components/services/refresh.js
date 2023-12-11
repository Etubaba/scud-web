import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../api/base";

export const getToken = async (admin) => {
  try {
    const refreshToken = admin ? Cookies.get("adminRefreshToken") : Cookies.get("refreshToken");
    const url = BASE_URL + "auth/refresh";
    const { data } = await axios.post(url, { refreshToken });
    if (data) {
      if (admin) {
        Cookies.set("adminAccessToken", data?.accessToken, {
          expires: 1
        });
        Cookies.set("adminRefreshToken", data?.refreshToken, {
          expires: 30
        });
      } else {
        Cookies.set("accessToken", data?.accessToken, { expires: 1 });
        Cookies.set("refreshToken", data?.refreshToken, {
          expires: 30
        });
      }
    }
  } catch (err) {
    console.log("// expired");
    // localStorage.clear();

    if (err.status === 403 || err.status === 401) {
      // localStorage.clear();
      if (admin) {
        Cookies.remove("adminRefreshToken");
        Cookies.set("isAdminLoggedIn", false, { expires: 30 });
        localStorage.removeItem("adminScud");
      } else {
        Cookies.set("isDriverLoggedIn", false, { expires: 30 });
        Cookies.set("isRiderLoggedIn", false, { expires: 30 });
        Cookies.remove("refreshToken");
        localStorage.removeItem("user");
      }
    }
    console.log("Error Refreshing Token", err);
  }
};
