import * as React from 'react' ;

import tagStyled from 'styled-components';

import { StyledTextField } from 'src/shared/styled';
import { BeautyEditor } from 'src/shared/ui';

const CreateBlog = () => {
    const [content, onChangeContent] = React.useState('');

    return (
        <>
            <TitleContainer>
                <Title>Title</Title>
                <StyledTextField 
                    fullWidth
                />
            </TitleContainer>
            
            <BlogEditorContainer>
                <Title>Text/Content</Title>
                <BeautyEditor
                    name="description"
                    content={content}
                    onChange={(content) => onChangeContent(content)}
                    id={1}
                />
            </BlogEditorContainer>
        </>
    )
}

export default CreateBlog ;

const BlogEditorContainer = tagStyled.div`
    margin-top : 30px;

    width : 1000px;
    
    padding: 20px;
    background : #4D4D4D!important;

    border-radius : 10px;

    & .ck-content {
        min-height : 500px;
    }

    & .ck-toolbar {
        padding : 0px;
        width : 100%;

        & .ck-button:hover {
            background : #4D4D4D;
        }

        & .ck-on {
            background : #4D4D4D;
        }

        & .ck-toolbar__items {
            background : #3A3A3A !important;
            color : white;
            svg {
                color : white;
            }
    
            span {
                color :white;
            }

            & .ck-dropdown__panel {
                & .ck-list {
                    background : #222222 !important;

                    & .ck-button:hover {
                        background : #3A3A3A !important;
                    }
                }
            }
        }
    }
    
    & .ck-content {
        background : #3A3A3A !important;
        color : white;    
        p {
            margin : 0px;
        }
    }
    
`

const Title = tagStyled.p`
    margin : 0px;
    font-size : 20px;
    color : white;
    padding-bottom : 5px;
    padding-left : 10px;
`

const TitleContainer = tagStyled.div`
    width : 50%;
`