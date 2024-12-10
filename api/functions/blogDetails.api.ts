import { blogDetailsProps } from "@/typeScript/cms.interface"
import axiosInstance from "../axios/axios"
import { endpoints } from "../endPoints/endPoints"

export const blogDetailsAPICall = async (id:string) => {
    const res = await axiosInstance.get<blogDetailsProps>(`${endpoints.blogs.blogDetails}/${id}`)
    console.log('blogDetailsAPICall res',res)
    return res.data.data;
}