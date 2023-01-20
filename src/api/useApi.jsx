import axios from "axios";
import CryptoJS from "crypto-js";
const useApi = () => {
  const sendRequest = axios.create();
  const generateToken = async () => {
    const uri = "https://authservice.priaid.ch/login";
    const api_key = "sikirurazak1@gmail.com";
    const secret_key = "s2L8Xzk3RJm4i5ZPw";
    const computedHash = CryptoJS.HmacMD5(uri, secret_key);
    const computedHashString = computedHash.toString(CryptoJS.enc.Base64);
    const AUTH_TOKEN = `Bearer sikirurazak1@gmail.com:yMqzKeKsvsI/aiyrU8+Rag==`;
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const res = await axios
      .post("https://sandbox-authservice.priaid.ch/login")
      .then((res) => sessionStorage.setItem("token", res.data.Token));
  };
  sendRequest.interceptors.response.use(undefined, function (err) {
    const originalRequest = err.config;
    if (err.response.status === 400 && !originalRequest._retry) {
      generateToken();
      const newRequest = { ...originalRequest, _retry: true };
      return sendRequest(newRequest);
    }
    return Promise.reject(err);
  });
  return { sendRequest };
};
export default useApi;
