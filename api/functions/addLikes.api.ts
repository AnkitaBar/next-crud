import { IAddLikesProps } from "@/typeScript/cms.interface";
import axiosInstance from "../axios/axios";
import { endpoints } from "../endPoints/endPoints";

export const addLikesFn = async (id: string) => {
    const res = await axiosInstance.put<IAddLikesProps>(`${endpoints.blogs.like}/${id}`);
    return res.data;
};