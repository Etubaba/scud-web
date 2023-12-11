import { BASE_URL } from "../../api/base";
import axios from "axios";

const handleOTP = async (req, res) => {
  const url = `${BASE_URL}auth/verify`;
  try {
    const { token, otp, otp_type } = req.body;

    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.get["Content-Type"] = "application/json";

    await axios.post(url, { otp, otp_type }).then((response) => {
      console.log("res==>", response);
      return res.json({ data: response?.data });
    });
  } catch (err) {
    console.log("error occor", err);
    return res.end(JSON.stringify({ error: err.message }));
  }
};

export default handleOTP;
