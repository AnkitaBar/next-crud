import { CommentProps } from "@/typeScript/cms.interface";
import axiosInstance from "../axios/axios";
import { endpoints } from "../endPoints/endPoints";

export const allCommentsAPICall = async (id:string) => {
    const res = await axiosInstance.get<CommentProps>(`${endpoints.blogs.showcomment}/${id}`)
    console.log('allCommentsAPICall res',res)
    return res.data;
}