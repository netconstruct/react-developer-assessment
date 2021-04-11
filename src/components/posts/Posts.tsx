import Grid from "@material-ui/core/Grid";
import React from "react";
import { IPost } from "../../utils/IPost";
import { PostCard } from "./PostCard";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";

const useStyles = makeStyles(() =>
    createStyles({
        gridItemStyle: {
            // makes post cards to be the same height
            display: 'flex',
        },
        postsStyle: {
            margin: '0px 10px 10px 10px',
            flexWrap: 'wrap',
        },
        loadMoreBtnStyle: {
            display: 'flex',
            justifyContent: 'center',
        },
    }),
);
interface IPostsProps {
    posts: IPost[];
    loadMorePosts: () => void;
    showMore: boolean;
}

export const Posts = ({ posts, loadMorePosts, showMore }: IPostsProps) => {
    const classes = useStyles();

    return (
        <Grid container spacing={3} className={classes.postsStyle}>
            {
                posts.map((post: IPost, postIndex: number) => {
                    return (
                        <Grid item xs={12} sm={6} md={3} key={postIndex} className={classes.gridItemStyle}>
                            <PostCard post={post} />
                        </Grid>
                    )
                })
            }

            {
                showMore &&
                <Grid item xs={12} sm={12} md={12} className={classes.loadMoreBtnStyle}>
                    <Button variant="outlined" color="primary" onClick={loadMorePosts}>
                        Load More
                    </Button>
                </Grid>
            }
        </Grid>
    );
}

