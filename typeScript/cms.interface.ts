////////////// All Blogs ////////////


interface Photo{
    data: string,
    contentType: string,
}

export interface IallBlogsProps {
    _id: number,
    title: string,
    postText: string,
    photo: Photo,
    comments: string[],
    category: string,
    createdAt: string,
    comment_count: number,
    
}
export interface allBlogsProps extends IallBlogsProps {
    data: IallBlogsProps
}

///////////////////////// for blogs ///////////////
export interface IblogDetailsProps {
    _id: number,
    title: string,
    postText: string,
    photo: Photo,
    comments: string[] | null | undefined,
    category: string,
    createdAt: string | number | Date,
    updatedAt:string | number | Date,
    unlikes: number,
    likes: number,
    
}
export interface blogDetailsProps extends IblogDetailsProps {
    data: IblogDetailsProps
}


///////////////////////// show comments ///////////////
export interface ICommentProps {
    comment : object,
    post: {
        comment: {
            _id: string,
            title: string,
            postText: string,
            status : boolean,
            likes: number,
            category: string,
            comments : [
                {
                    comment: string,
                    createdAt:string,
                    email:string,
                    name: string,
                    updatedAt: string,
                    _id:string
                }

            ],
            createdAt: string,
            updatedAt:string,
            unlikes:number,

        }
    }
}
export interface CommentProps extends ICommentProps {
    data: ICommentProps
}

//////////////// add comments 

export interface IaddCommentProps {
    name: string,
    email: string,
    comment: string,
    blog: string,
    _id: string,
     createdAt: string,
     updatedAt: string,
     status: number,
     message: string,
     user:{
        name: string,
        email: string,
     }
}
export interface addCommentProps extends IaddCommentProps  {
    data: IaddCommentProps 
}

/////////// add likes ///////////

// export interface IaddLikesProps {
//     _id: number,
//     title: string,
//     postText: string,
//     photo: Photo,
//     comments: string[] | null | undefined,
//     category: string,
//     createdAt: string | number | Date,
//     updatedAt:string | number | Date,
//     unlikes: number,
//     likes: number,
// }
// export interface addLikeProps extends IaddLikesProps  {
//     data: IaddLikesProps 
// }

export interface IAddLikesProps extends blogDetailsProps {
    data : blogDetailsProps;
  }