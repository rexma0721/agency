import * as React from 'react' ;

import tagStyled from 'styled-components';

const MiniBlog = () => {
    return (
        <BlogCard>
            <BlogMedia></BlogMedia>
            <BlogTitle>This is the blog title</BlogTitle>
            <BlogDescription>This is the blog description</BlogDescription>
        </BlogCard>
    )
}

export default MiniBlog;

const BlogCard = tagStyled.div`
    width : 250px;
    padding-bottom : 10px;
    background : #3A3A3A;
`

const BlogTitle = tagStyled.p`
    font-size : 20px;
    color : white;
    font-weight : bold;
    margin : 0px;
    padding-top : 10px;
    padding-left : 10px;
`

const BlogDescription = tagStyled.p`
    margin : 0px;
    font-size : 18px;
    margin : 0px;
    color : white;
    padding-left : 10px;
`

const BlogMedia = tagStyled.div`
    width : 100%;
    height : 250px;
`
