import * as React from 'react';

import tagStyled from 'styled-components';

import { Grid } from '@mui/material';

import MiniBlog from 'src/components/Blog/MiniBlog';
import TopBlog from 'src/components/Blog/TopBlog';

const Blog = () => {
    return (
        <>
            <TopBlog />
            <BlogList>
                <Grid container spacing={2}>
                {
                    [...Array(10)].map((blog, index) => (
                        <Grid item xs={2} key={index}>
                            <MiniBlog />
                        </Grid>
                    ))
                }
                </Grid>
                
            </BlogList>
        </>
    )
}

export default Blog ;

const BlogList = tagStyled.div`
    margin-top : 30px;

    box-sizing : border-box;

    width : 100%;
    overflow-x : hidden;

    & .MuiGrid-root {
        & .MuiGrid-item {
            display : flex;
            justify-content : center;
        }
    }
`