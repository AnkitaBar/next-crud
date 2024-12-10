
import { addCommentProps } from "@/typeScript/cms.interface";
import axiosInstance from "../axios/axios";
import { endpoints } from "../endPoints/endPoints";

export const addCommentsAPICall = async (id: string, payload: addCommentProps) => {
    const res = await axiosInstance.post<addCommentProps >(`${endpoints.blogs.addComment}/${id}/comment/create`, payload);
    console.log('addComments res', res);
    return res.data
}