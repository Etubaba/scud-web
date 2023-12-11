import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { getToken } from "../components/services/refresh";
import { useSnackbar } from "notistack";

const useFetch = (url, dependent = 1, isAdmin) => {
  const [fetchData, setFetchData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    let cleaner = true;

    const getData = async () => {
      try {
        const AUTH_TOKEN = isAdmin ? Cookies.get("adminAccessToken") : Cookies.get("accessToken");
        axios.defaults.headers.common["Authorization"] = "Bearer " + AUTH_TOKEN;
        axios.defaults.headers.get["Content-Type"] = "application/json";
        if (cleaner) {
          const { data } = await axios.get(url);
          setFetchData(data);
          setLoading(false);
        }
      } catch (e) {
        if (e.status === 401 || e.response?.data?.message === "Unauthorized") {
          await getToken();
          enqueueSnackbar("Please, try again", {
            variant: "info"
          });
        } else {
          console.log(e);
        }
      }
    };

    getData();

    return () => {
      cleaner = false;
    };
  }, [url, dependent]);

  return { fetchData, loading };
};

export default useFetch;
