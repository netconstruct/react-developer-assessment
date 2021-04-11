import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import { IPost } from "../../utils/IPost";
import { PostCard } from "./PostCard";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Button, Fab, Grow } from "@material-ui/core";

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

    // for post card transition animation on Load more
    const [showGrowEffect, setShowGrowEffect] = useState(false);

    useEffect(() => { setShowGrowEffect(true) }, [posts]);

    return (
        <Grid container spacing={3} className={classes.postsStyle}>
            {
                posts.map((post: IPost, postIndex: number) => {
                    return (
                        <Grow in={showGrowEffect}>
                            <Grid item xs={12} sm={6} md={3} key={postIndex} className={classes.gridItemStyle}>
                                <PostCard post={post} />
                            </Grid>
                        </Grow>
                    )
                })
            }

            {
                showMore ?
                    <Grid item xs={12} sm={12} md={12} className={classes.loadMoreBtnStyle}>
                        <Button variant="outlined" color="primary" onClick={loadMorePosts}>
                            Load More
                        </Button>
                    </Grid> :
                    <Grid item xs={12} sm={12} md={12} className={classes.loadMoreBtnStyle}>
                        <Fab variant="extended" color="secondary" aria-label="scroll-to-top" onClick={() => window.scrollTo(0, 0)}>
                            Scroll to the top
                        </Fab>
                    </Grid>
            }
        </Grid>
    );
}

