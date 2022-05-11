import axios from "axios";
import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = useCallback(async (requestConfig, applyDataFunc) => {
    setIsLoading(true);
    setError(null);
    console.log("requestConfig: ", requestConfig);

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
        console.log("inside custom hook data: ", res);
      })
      .catch((error) => {
        setError(error.message || "Something went wrong!");
      });

    setIsLoading(false);
  }, []);
  return { isLoading, error, sendRequest };
};
export default useHttp;
