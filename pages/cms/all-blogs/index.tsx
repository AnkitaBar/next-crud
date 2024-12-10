// // import { all } from 'axios'

import { allBlogsQuery } from '@/customHooks/cms.query.hooks';
import { allBlogsProps } from '@/typeScript/cms.interface';
import { Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react'

const  allBlogs = () => {
    const { data, isPending } = allBlogsQuery();

  return (
    <>
      <div
      style={{
        marginTop: "4rem",
        marginBottom: "4rem",
        backgroundColor: "#f5f5f5",
        padding: "2rem",
        borderRadius: "10px"
      }}
    >
      <Container maxWidth="lg">
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          style={{ textAlign: "center", padding: "2rem" }}
        >
          <Typography
            variant="h6"
            gutterBottom
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#000"
            }}
          >
            Blog Posts
          </Typography>
        </Grid>
        <Grid
          container
          spacing={1} // Increase the spacing value
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: "20px" }}
        >
          {Array.isArray(data) && data.length > 0
            ? data.map((item: allBlogsProps) =>
                <Grid
                  className="card"
                  item
                  xs={12}
                  sm={4} // Corrected ms to sm
                  md={4}
                  key={item._id} // Corrected key to use item._id
                  style={{
                    gap: "20px"
                  }}
                >
                  <Card
                    sx={{
                      maxWidth: 345,
                      borderRadius: "10px",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                      height: "450px",
                      backgroundColor: "#f5f5f5"
                    }}
                  >
                    <CardMedia
                      sx={{ height: 200, objectFit: "contain" }}
                      image={`data:${item.photo.contentType};base64,${item.photo
                        .data}`}
                      title={item.title}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{
                          fontSize: "1.5rem",
                          color: "#000",
                          fontFamily: "Roboto",
                          fontWeight: "100"
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{
                          fontSize: "10px",
                          color: "#000",
                          fontWeight: "100"
                        }}
                      >
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}{" "}
                        {new Date(item.createdAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{
                          textAlign: "justify",
                          lineHeight: "1.5rem",
                          color: "#000"
                        }}
                        dangerouslySetInnerHTML={{
                          __html:
                            item.postText.replace(/<\/?[^>]+(>|$)/g, "")
                              .length > 100
                              ? `${item.postText
                                  .replace(/<\/?[^>]+(>|$)/g, "")
                                  .slice(0, 100)}...`
                              : item.postText
                        }}
                      />
                    </CardContent>
                    <CardActions
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        padding: "16px"
                      }}
                    >
                      <Link
                         href={`/cms/all-blogs/${item._id}`}
                       
                        style={{ color: "#000", textDecoration: "none" }}
                      >
                        Read More
                      </Link>
                    </CardActions>
                    <Typography style={{ textAlign: "end", marginTop: "10px" }}>
                        Total Comments: {item.comment_count}
                    </Typography>
                  </Card>
                </Grid>
              )
            : <p>No blogs available</p>}
        </Grid>
      </Container>
    </div>
    </>
  )
}

export default allBlogs;





