import { allBlogsAPICall } from "@/api/functions/allBlogs.api";
import { allCommentsAPICall } from "@/api/functions/allComments.api";
import { blogDetailsAPICall } from "@/api/functions/blogDetails.api";
import { addCommentProps, IallBlogsProps, IblogDetailsProps, ICommentProps } from "@/typeScript/cms.interface";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { useGlobalHooks } from "./globalHooks/globalHooks";
import { addCommentsAPICall } from "@/api/functions/addComments.api";
import { addLikesFn } from "@/api/functions/addLikes.api";

////// allBlogs ////////////////

export const allBlogsQuery = (): UseQueryResult<IallBlogsProps, unknown> => {
    return useQuery({
      queryKey: ["BLOGS"],
      queryFn: allBlogsAPICall
    });
  };

  //////////// blogs details ///////////////////

export const blogDetailsQuery = (id:string): UseQueryResult<IblogDetailsProps, unknown> => {
    return useQuery({
      queryKey: ["BLOGS-DETAILS",id],
      queryFn : () =>  blogDetailsAPICall(id),
    });
  };

  //////////////// show comments ///////////////////

  export const allCommentsQuery = (id:string): UseQueryResult<ICommentProps , unknown> => {
    return useQuery({
      queryKey: ["BLOGS-DETAILS", id ,"COMMENTS"],
      queryFn : () => allCommentsAPICall(id)
    });
  };


  /////////////// add comments ////////////////

 
export const addCommentMutation = (id: string) => {
  const {queryClient} = useGlobalHooks();
  return useMutation({
    mutationFn: (payload: addCommentProps) => addCommentsAPICall(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ADD-COMMENT"] });
      console.log("data", data);
    },
  });
};


////////////// like

export const addLikesMutation = (id: string) => {
  const { queryClient } = useGlobalHooks();
  return useMutation({
    mutationFn: () => addLikesFn(id),
    onSuccess: data => {
      // queryClient.invalidateQueries({ queryKey: ["BLOGS"] });
      queryClient.invalidateQueries({ queryKey: ["ADD-LIKES"] });
      console.log(data.likes, "data of comments adding");
    }
  });
};



