import { AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios";
import axios from "axios";

export const usePostUserSignUp = async (url, body) => {
    try {
        const response = await axios.post(url, body);
        console.log(response.data)
        console.log("response status is: ", response.status);
        return response;
    } catch (err) {
        if (isAxiosError(err)) {
            console.log("Axios error: ", err);
            return null;
        } else {
            console.log("unexpected error: ", err);
      return null;
        }
        
    }
}