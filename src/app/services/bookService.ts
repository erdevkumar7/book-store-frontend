// import { LoginHeader, authHeader } from "@/common/Tokens/authToken";
// import { HandleLogout } from "./auth";
import { API } from "@/config/config";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const HandleGetBooks = async (searchData: any, filterData: any) => {

    const API_URL = searchData
        ? `${API.getBooks}/${searchData}`
        : `${API.getBooks}`;

    return await axios({
        method: "POST",
        url: API_URL,
        //   headers: authHeader(),
        data: filterData,
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