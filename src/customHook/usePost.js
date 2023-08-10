import { useState } from "react";
import axios from "axios";
import { CustomToast } from "../atoms/toastMessage";
import { useParams } from "react-router-dom";

const usePost = () => {
  const BaseURL = process.env.REACT_APP_BASE_URL;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = "50|gja8w9naaHdp7aK75ukMrbw5SXQ0BRG1hmAqiQb8";
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
        cb(response?.data);
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
