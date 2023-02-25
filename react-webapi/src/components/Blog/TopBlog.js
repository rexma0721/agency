import * as React from 'react';

import tagStyled from 'styled-components';

const TopBlog = () => {
    return (
        <>
            <BlogTitle>This is the blog title</BlogTitle>
            <BlogDescription>This is the blog text</BlogDescription>
            <BlogMedia></BlogMedia>
        </>
    )
}

export default TopBlog;

const BlogTitle = tagStyled.p`
    margin : 0px;
    font-size : 35px;
    color : white;
`

const BlogDescription = tagStyled.p`
    margin : 0px;
    font-size : 25px;
    color : white;
`

const BlogMedia = tagStyled.div`
    width : 400px;
    height : 400px; 
    background : #3A3A3A;

    margin-top : 20px;
`