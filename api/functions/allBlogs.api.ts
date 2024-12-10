import { allBlogsProps } from "@/typeScript/cms.interface";
import axiosInstance from "../axios/axios";
import { endpoints } from "../endPoints/endPoints";

export const allBlogsAPICall = async () => {
    const res = await axiosInstance.get<allBlogsProps>(endpoints.blogs.allBlogs)
    console.log('allBlogsAPICall res', res);
    return res.data.data
}


// import { allBlogsProps } from "@/typeScript/cms.interface";
// import axiosInstance from "../axios/axios";
// import { endpoints } from "../endPoints/endPoints";

// export const allBlogsAPICall = async () => {
//     try {
//         const res = await axiosInstance.get<allBlogsProps>(endpoints.blogs.allBlogs);
//         console.log('allBlogsAPICall response:', res);
//         return res.data.data;
//     } catch (error) {
//         console.error('Error in allBlogsAPICall:', error);
//         throw error; // Rethrow the error if needed for further handling
//     }
// };
