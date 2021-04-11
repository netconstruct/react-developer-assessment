import { Avatar, Card, CardActions, CardContent, CardHeader, Chip, Grid, Typography } from "@material-ui/core";
import React from "react";
import { IPost } from "../../utils/IPost";
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        pos: {
            marginBottom: '10px',
        },
        categoryChipStyle: {
            marginBottom: '5px',
            marginRight: '5px',
        },
        cardActionsPosition: {
            marginLeft: '10px',
        },
        categoriesTitleStyle: {
            marginLeft: '15px',
        },
    }),
);

interface IPostCardProps {
    post: IPost;
}

export const PostCard = ({ post }: IPostCardProps) => {
    const classes = useStyles();
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="author-avatar">
                        <img src={post.author.avatar} alt="Author's avatar" />
                    </Avatar>
                }
                title={post.author.name}
                subheader={post.publishDate}
            />
            <CardContent>
                <Typography className={classes.pos} variant={'subtitle1'} color="textSecondary">
                    <b>{post.title}</b>
                </Typography>

                <Typography variant="body2" color="textSecondary" component="p">
                    <i>{post.summary}</i>
                </Typography>
            </CardContent>
            <Typography variant="subtitle1" color="textSecondary" component="p" className={classes.categoriesTitleStyle}>
                Categories
            </Typography>
            <CardActions className={classes.cardActionsPosition}>
                <Grid container spacing={1}>
                    {post.categories.map((category, categoryIndex) => {
                        return (
                            <Chip
                                label={category.name}
                                variant="outlined"
                                className={classes.categoryChipStyle}
                                key={categoryIndex}
                            />
                        );
                    })}
                </Grid>
            </CardActions>
        </Card>
    );
}

