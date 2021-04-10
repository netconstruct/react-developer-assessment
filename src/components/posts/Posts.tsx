import Grid from "@material-ui/core/Grid";
import React from "react";
import { IPost } from "../../utils/IPost";
import { PostCard } from "./PostCard";
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        gridItemStyle: {
            display: 'flex',
        },
        postsStyle: {
            margin: '0px 10px 10px 10px',
        },
    }),
);
interface IPostsProps {
    posts: IPost[];
}

export const Posts = ({ posts }: IPostsProps) => {
    const classes = useStyles();
    const myposts = posts ? [...posts] : [];

    return (
        <Grid container spacing={3} className={classes.postsStyle}>
            {
                myposts.map((post: IPost, postIndex: number) => {
                    return (
                        <Grid item xs={12} sm={6} md={3} key={postIndex} className={classes.gridItemStyle}>
                            <PostCard post={post} />
                        </Grid>
                    )
                })
            }
        </Grid>
    );
}
