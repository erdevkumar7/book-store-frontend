import { LoginHeader } from "@/common/authToken";
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export const BASE_URL = "http://localhost:8080";

export const HandleRegister = async (reqData: any) => {
  return await axios({
    method: "POST",
    url: `${BASE_URL}/user`,
    data: reqData,
  }).then((request) => {
    console.log('request',request)
    if (request.data) {
      toast.success("Registration Successfully")
    }
    return request;
  }).catch((error) => {
    if (error.response.status === 400) {
      toast.error("Email already exists")
    } else if (error.response.status === 401) {
      console.log('LOGOUT USER')
      HandleLogout()
    } else {
      toast.error("User added failed")
    }
    return error;
  })
}


export const HandleLogin = async (reqData: any) => {
  return await axios({
    method: "POST",
    url: `${BASE_URL}/login`,
    data: reqData,
  }).then((request) => {
    return request;
  }).catch((error) => {
    if (error.response.status === 400) {
      toast.error(error.response.data)
    } else if (error.response.status === 404) {
      toast.error(error.response.data)
    } else if (error.response.status === 401) {
      HandleLogout()
    } else {
      toast.error("User added failed")
    }
    return error;
  })

}

export const HandleProfile = async (userId: any) => {
  return await axios({
    method: "GET",
    url: `${BASE_URL}/getuser/${userId}`,
    headers: LoginHeader(),
  })
    .then((request) => {
      return request;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        HandleLogout();
      } else {
        toast.error("Something went wrong");
      }
      return error;
    });
};


export const HandleLogout = () => {
  localStorage.clear()
  window.location.replace("/login");
  // GenerateToken()

};