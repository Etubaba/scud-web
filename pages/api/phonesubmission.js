import { BASE_URL } from "../../api/base";
import axios from "axios";

const handlePostPhone = async (req, res) => {
  const url = `${BASE_URL}auth/register`;

  try {
    await axios.post(url, req.body).then((response) => {
      console.log("try", response);
      return res.json({ data: response?.data });
    });
  } catch (err) {
    const { data } = err;
    console.log("catch", err);
    return res.send({ error: err });
  }
};

export default handlePostPhone;
