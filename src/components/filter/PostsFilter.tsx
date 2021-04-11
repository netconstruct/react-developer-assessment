import { Card, CardContent, Chip, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
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
    filterPostsByCategories: (selectedCategories: string[]) => void;
}

export const PostsFilter = ({ posts, filterPostsByCategories }: IPostsFilterProps) => {
    const classes = useStyles();
    const [selectedCategories] = useState<string[]>([]);

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
                            // get the index of the unique category name in the selectedCategories array
                            const selectedCategoryNameIndex = selectedCategories.findIndex(selectedCategory => selectedCategory === uniqueCategoryName);

                            return (
                                <Grid item xs={12} sm={6} md={2} lg={2} key={uniqueCategoryNameIndex}>
                                    <Chip
                                        label={uniqueCategoryName}
                                        // change the variant type, depending on whether uniqueCategoryName is in selectedCategories or not
                                        variant={selectedCategoryNameIndex !== -1 ? "default" : "outlined"}
                                        onClick={() => {
                                            //if the unique category name is already in selectedCategories
                                            if (selectedCategoryNameIndex !== -1) {
                                                // remove the category from selectedCategories
                                                selectedCategories.splice(selectedCategoryNameIndex, 1);
                                            } else {
                                                // add the unique category to selectedCategories
                                                selectedCategories.push(uniqueCategoryName)
                                            }

                                            filterPostsByCategories(selectedCategories);
                                        }}
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

