import { MutationFunction } from "@tanstack/react-query";
import { endpoints } from "../endPoints/endPoints";
import { loginProps } from "@/typeScript/auth.interface";
import axiosInstance from "../axios/axios";

export const loginFn: MutationFunction<loginProps> = async payload => {
  const res = await axiosInstance.post<loginProps>(
    endpoints.auth.login,
    payload
  );

  return res.data;
};
