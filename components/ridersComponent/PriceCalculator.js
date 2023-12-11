import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../api/base";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { Loader } from "../common/Loader";

const PriceCalculator = ({ id }) => {
  const [price, setPrice] = useState("999");
  const [loading, setLoading] = useState(false);
  const center = useSelector((state) => state.scud.origin);
  const destination = useSelector((state) => state.scud.destination);

  const getPrice = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("accessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const { data } = await axios.post(BASE_URL + "fare/calculate", {
        pickup: {
          longitude: center.lng,
          latitude: center.lat
        },
        destination: {
          longitude: destination.lng,
          latitude: destination.lat
        },
        vehicle_type_id: id
      });
      if (data) {
        // console.log(data);
        setLoading(false);
        setPrice(data.price.price);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getPrice();
  }, [price]);

  if (loading) return <Loader />;

  return <p className="font-semibold text-sm md:text-base">{price}</p>;
};

export default PriceCalculator;
