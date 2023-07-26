import { useState } from "react";
import axios from "axios";
import { CustomToast } from "../atoms/toastMessage";

const usePost = () => {
  const BaseURL = process.env.REACT_APP_BASE_URL;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = "11|FJiHC6mUorgxUbttyr8WSIcX4qtLPicZCL3BOHXX";
  const postData = async (url, postData, cb) => {
    setIsLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(`${BaseURL}/${url}`, postData, config);
      console.log(response, "API response?.data?.success");
      if (response?.status === 200) {
        CustomToast({
          type: "success",
          message: "Success",
        });
        // cb()
      } else {
        CustomToast({
          type: "error",
          message: "Successfully Updated",
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
