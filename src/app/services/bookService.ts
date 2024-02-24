// import { LoginHeader, authHeader } from "@/common/Tokens/authToken";
// import { API } from "@/config/config";
// import { HandleLogout } from "./auth";
import { API } from "@/config/config";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const HandleGetBooks = async () => {
    const API_URL = `${API.getBooks}`
    return await axios({
      method: "POST",
      url: API_URL,
    //   headers: authHeader(),
    })
      .then((request) => {
        return request;
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
        //   HandleLogout();
        } else {
          toast.error("Something went wrong");
        }
        return error;
      });
  };