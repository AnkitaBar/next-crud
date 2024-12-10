import { addCommentMutation, addLikesMutation, allCommentsQuery, blogDetailsQuery } from '@/customHooks/cms.query.hooks';
import { Box, Button, Card, CardContent, Chip, Container, Divider, Grid, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import { useRouter } from 'next/router';
import React from 'react'
import { useForm } from 'react-hook-form';
import { addCommentProps } from '@/typeScript/cms.interface';
import { QueryClient } from '@tanstack/react-query';

const BlogDetails = () => {

    const router = useRouter();
    const { slug } = router.query;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<addCommentProps>();

    const { data: blogData, isPending: isBlogPending, refetch: blogsRefetch } = blogDetailsQuery(slug as string);
    const { data: commentsData, isPending: isCommentsPending, refetch: commentsRefetch } = allCommentsQuery(slug as string);
    // console.log('Fetched Comments Data:', commentsData);
    // console.log('Fetched blog Data:', blogData);

    const { mutate : commentMutation } = addCommentMutation(slug as string);
    const { mutate : likesMutation } = addLikesMutation(slug as string);

    

    // const onSubmit = (e: addCommentProps) => {
    //     const payload: Partial<addCommentProps> = {
    //         name: e.name || localStorage.getItem('name') || '',
    //         email: e.email || localStorage.getItem('email') || '', 
    //         comment: e.comment
    //     }



    const onSubmit = (e: addCommentProps) => {
        if(localStorage.getItem("user")!=null   ){
            let user: {
                name: string;
                email: string;
              } = JSON.parse(localStorage.getItem("user") as string);
            let email = user.email??"";
            let name = user.name?? "";
            let comment = e.comment;
    
            const payload: Partial<addCommentProps> = {
                name: name,
                email: email,
                comment: e.comment,
            }
            console.log(payload, "payload");
            commentMutation(payload as addCommentProps, {
                onSuccess: () => {
                    blogsRefetch();
                    commentsRefetch();
                },
            })
      }}
    

    
    const onLikesAdd = (p:void) => {
        likesMutation(p,{
            onSuccess: () => {
                blogsRefetch();
            }
        })
    }
    if (isBlogPending || isCommentsPending) {
        return <p>Loading blog details...</p>;
    }
    // console.log(data, "data");

    const imageSrc = blogData?.photo
        ? `data:${blogData.photo.contentType};base64,${Buffer.from(blogData.photo.data).toString("base64")}`
        : null;

  return (

    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card variant="outlined" sx={{ p: 2 }}>
        {imageSrc && (
            <img
                src={imageSrc}
                alt="Blog"
                style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
            />
        )}
        <CardContent>
            <Grid 
                container 
                spacing={2} 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
                <Grid item>
                    <Typography variant="h4" gutterBottom>
                        {blogData?.title}
                    </Typography>
                </Grid>

                {/* <Grid item>
                </Grid> */}

                <Grid 
                    item 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', gap: '16px' }}  // Adjust 'gap' as needed
                >
                    <Box style={{ display: 'flex', alignItems: 'center', gap: '4px' }}> 
                        <ThumbUpIcon onClick={()=>onLikesAdd} />
                        <Typography variant="subtitle2" color="text.secondary">
                            {blogData?.likes}
                        </Typography>
                    </Box>
                    <Box style={{ display: 'flex', alignItems: 'center', gap: '4px' }}> 
                        <ThumbDownIcon />
                        <Typography variant="subtitle2" color="text.secondary">
                            {blogData?.unlikes}
                        </Typography>
                    </Box>

                    <Box style={{ display: 'flex', alignItems: 'center', gap: '4px' }}> 
                        <CommentIcon />
                        <Typography variant="h6" gutterBottom>
                            {blogData?.comments?.length}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Created At: {blogData?.createdAt ? (
                            <>
                            {new Date(blogData.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })}
                            {" "}
                            {new Date(blogData.createdAt).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                            </>
                        ) : (
                            "N/A"
                        )}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Updated At: {blogData?.updatedAt ? (
                            <>
                            {new Date(blogData.updatedAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })}
                            {" "}
                            {new Date(blogData.updatedAt).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                            </>
                        ) : (
                            "N/A"
                        )}
          </Typography>
          <Divider sx={{ my: 2 }} />
          
            <Typography
                variant="body1"
                gutterBottom
                dangerouslySetInnerHTML={{
                    __html: blogData?.postText
                      ? blogData.postText.replace(/<\/?[^>]+(>|$)/g, "")
                      : "N/A"
                  }}
            />


          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Add a Comment
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <form>
                {/* <TextField
                    fullWidth
                    label="Email"
                    // name="email"
                    type="email"
                    margin="normal"
                    // defaultValue={userEmail}
                    // disabled={!!userEmail}
                    {...register('email', {
                    required: 'Email is required',
                
                    })}
                /> */}

                {/* <TextField
                    fullWidth
                    label="name"
                    // name="email"
                    type="name"
                    // margin="name"
                    // defaultValue={userName}
                    // disabled={!!userName}
                    {...register('name', {
                    required: 'name is required',
                
                    })}
                /> */}

                
                <TextField
                    fullWidth
                    label="comment"
                    // name="email"
                    type="comment"
                    // margin="name"
                    {...register('comment', {
                    required: 'name is required',
                
                    })}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleSubmit(onSubmit)}
                >
                    Submit
                </Button>
            </form>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* <Typography variant="h6" gutterBottom>
            Total Comments : {data?.comments?.length}
          </Typography> */}
          
            <List>
                {commentsData?.post?.comment?.comments && commentsData.post.comment.comments.length > 0 ? (
                    commentsData.post.comment.comments.map((comment, index) => (
                        <ListItem key={comment._id || index}>
                            <ListItemText 
                                primary={comment.comment}  // The text of the comment
                                secondary={`By: ${comment.name} | Email: ${comment.email}`}  // The name and email of the commenter
                            />
                        </ListItem>
                    ))
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        No comments yet.
                    </Typography>
                )}
            </List>

        </CardContent>
      </Card>
    </Container>
  )
}

export default BlogDetails