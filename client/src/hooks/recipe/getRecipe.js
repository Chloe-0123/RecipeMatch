import { isAxiosError } from "axios";
import { axiosInstance } from "../../axios";

export const useGetRecipe = async (url, body) => {
    console.log('body', body)
    try {
        const response  = await axiosInstance.get(url, {params: body});
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