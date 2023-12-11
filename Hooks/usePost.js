import React from "react";
import axios from "axios";

function usePost({ url, body }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function postdata() {
      try {
        await axios.post(url, body).then((res) => {
          setData(res);
        });
      } catch (error) {
        console.log(error);
      }
    }
    postdata();
  }, [url, body]);

  return { data };
}

export default usePost;
