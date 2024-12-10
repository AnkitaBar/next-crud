import { MutationFunction } from "@tanstack/react-query";
import { endpoints } from "../endPoints/endPoints";
import {  registerProps } from "@/typeScript/auth.interface";
import axiosInstance from "../axios/axios";

export const registerFn: MutationFunction<registerProps> = async payload => {
  const res = await axiosInstance.post<registerProps>(
    endpoints.auth.register,
    payload
  );

  return res.data;
};
