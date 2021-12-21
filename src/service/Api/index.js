import { axiosInstance } from "service/axiosInstance";
import { endpoints } from "service/endpoints";

export const getAllProducts = () => {
  return axiosInstance({
    method: "get",
    url: endpoints.GET_ALL_PRODUCTS,
  });
};
