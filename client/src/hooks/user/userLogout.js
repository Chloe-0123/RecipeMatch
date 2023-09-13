import { isAxiosError } from "axios";
import { axiosInstance } from "../../axios";

export const useUserLogout = async (url) => {
    try {
        const response  = await axiosInstance.get(url);
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