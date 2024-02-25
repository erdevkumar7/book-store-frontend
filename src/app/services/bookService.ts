// import { HandleLogout } from "./auth";
import { authHeader } from "@/common/authToken";
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
        data: filterData,
        headers: authHeader(),
    })
        .then((request) => {
            return request;
        })
        .catch((error) => {
            if (error?.response?.status === 401) {
            } else {
                toast.error("Something went wrong");
            }
            return error;
        });
};

export const HandleGetBookById = async (bookId: any) => {
    const API_URL = `${API.getBookByBookId}/${bookId}`
    return await axios({
        method: "GET",
        url: API_URL,
        headers: authHeader(),
    })
        .then((request) => {
            return request;
        })
        .catch((error) => {
            if (error?.response?.status === 401) {
            } else {
                toast.error("Something went wrong");
            }
            return error;
        });
}