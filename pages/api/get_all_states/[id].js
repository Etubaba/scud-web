import axios from "axios";
import { BASE_URL } from "../../../api/base";

const getAllStates = async (req, res) => {

  const AUTH_TOKEN =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6bnVsbCwic3ViIjoyNywiaWF0IjoxNjczOTY3NTM3LCJleHAiOjE2NzM5ODkxMzd9._WQO0ERQocV_XCgx-sJNJhnBUwh8wZjB8EhBwIcD_eY";
  try {
    const { id } = req.query;
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    axios.defaults.headers.get["Content-Type"] = "application/json";
    await axios.get(BASE_URL + `states?country_id=${id}`).then((response) => {
      return res.send({ data: response?.data });
    });
  } catch (error) {
    return res.send(error);
  }
};

export default getAllStates;
