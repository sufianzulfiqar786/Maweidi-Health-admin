import { toast } from "react-toastify";

export const CustomToast = ({type, message}) => {
    
    toast[type](<p style={{ fontSize: 16 }}>{message}</p>, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      className: "fullscreen-toast",
    });
  };
