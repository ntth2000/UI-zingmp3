import axios from "axios";
import { useCallback, useState } from "react";

const useHttp = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = useCallback(async (requestConfig, applyDataFunc) => {
    setIsFetching(true);
    setError(null);

    // {
    //       method: requestConfig.method ? requestConfig.method : "get",
    //       header: requestConfig.headers ? requestConfig.header : {},
    //       body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
    //     })
    axios
      .get(requestConfig.url)
      .then((res) => {
        const { data } = res;
        applyDataFunc(data);
      })
      .catch((error) => {
        setError(error.message || "Something went wrong!");
      });

    setIsFetching(false);
  }, []);
  return { isFetching, error, sendRequest };
};
export default useHttp;
