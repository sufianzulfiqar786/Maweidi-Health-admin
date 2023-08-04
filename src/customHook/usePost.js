import { useState } from "react";
import axios from "axios";
import { CustomToast } from "../atoms/toastMessage";

const usePost = () => {
  const BaseURL = process.env.REACT_APP_BASE_URL;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = "45|uRCrjPfZCMNc7D9F3Ln8XTpmjC1u1kh30NaQQ5YR";
  const postData = async (url, postData, cb) => {
    setIsLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(`${BaseURL}/${url}`, postData, config);
      // if (response?.data?.success === true) {
        if (response?.data) {
        cb();
      } else {
        CustomToast({
          type: "error",
          message: "SomeThing Went Wrong Please try Again !",
        });
      }
      setData(response.data);
    } catch (error) {
      setError(error);
      CustomToast({
        type: "error",
        message: "SomeThing Went Wrong Please try Again !",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, postData };
};

export default usePost;
