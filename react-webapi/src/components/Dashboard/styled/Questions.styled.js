import tagStyled from 'styled-components';

export const QuestionTitle = tagStyled.p`
    margin : 0px;
    font-size : 30px;
    text-align : center;
    color : white;
    padding-bottom : 30px;
`
export const ProjectCard = tagStyled.div`
    background : #3A3A3A;
    border-radius : 10px;
    min-height : 500px;

    padding : 20px;
`

export const ProjectCardTitle = tagStyled.p`
    margin : 0px;
    color : white;
    font-weight : bold;
    font-size : 20px;
`

export const ButtonDiv = tagStyled.div`
    padding-top : 20px;
    display : flex;
    justify-content : flex-end;
`