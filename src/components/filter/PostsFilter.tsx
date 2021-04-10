import { Card, CardContent, Chip, Grid, Typography } from "@material-ui/core";
import React from "react";
import { IPost } from "../../utils/IPost";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ICategory } from "../../utils/ICategory";

const useStyles = makeStyles(() =>
    createStyles({
        filterCardStyle: {
            margin: '20px',
        },
        filterTitleStyle: {
            marginBottom: '10px',
        }
    }),
);

interface IPostsFilterProps {
    posts: IPost[];
}

export const PostsFilter = ({ posts }: IPostsFilterProps) => {
    const classes = useStyles();

    // get all categories
    const categories: ICategory[] = posts.map(post => post.categories).flat();
    // get only unique category names
    const uniqueCategoryNames = Array.from(new Set(categories.map(category => category.name)));

    return (
        <Card className={classes.filterCardStyle}>
            <CardContent>
                <Typography variant={'subtitle1'} color="textSecondary" className={classes.filterTitleStyle}>
                    <b>Filter posts by categories:</b>
                </Typography>
                <Grid container spacing={1}>
                    {
                        uniqueCategoryNames.map((uniqueCategoryName: string, uniqueCategoryNameIndex: number) => {
                            return (
                                <Grid item xs={12} sm={6} md={2} lg={2} key={uniqueCategoryNameIndex}>
                                    <Chip
                                        label={uniqueCategoryName}
                                        variant="outlined"
                                    />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </CardContent>
        </Card>
    );
}

