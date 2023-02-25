import * as React from 'react' ;

import { Grid } from '@mui/material';

import { ButtonDiv, ProjectCard, ProjectCardTitle, QuestionTitle } from '../styled/Questions.styled';
import { StyledButton } from 'src/shared/styled';

const Questions = (props) => {
    const [step, setStep] = React.useState(0);

    const FirstQuestion = () => {
        return (
            <>
                <QuestionTitle>What kind of project do you want to make?</QuestionTitle>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <ProjectCard>
                            <ProjectCardTitle>Website</ProjectCardTitle>
                        </ProjectCard>
                    </Grid>
                    <Grid item xs={4}>
                        <ProjectCard>
                            <ProjectCardTitle>Webshop</ProjectCardTitle>
                        </ProjectCard>
                    </Grid>
                    <Grid item xs={4}>
                        <ProjectCard>
                            <ProjectCardTitle>Webapp</ProjectCardTitle>
                        </ProjectCard>
                    </Grid>
                </Grid>
            </>
        )
    }

    const SecondQuestion = () => {
        return (
            <>
                <QuestionTitle>Question 2</QuestionTitle>
            </>
        )
    }

    const ThirdQuestion = () => {
        return (
            <>
                <QuestionTitle>Question 3</QuestionTitle>
            </>
        )
    }

    const LastQuestion = () => {
        return (
            <>
                <QuestionTitle>Question 4</QuestionTitle>
            </>
        )
    }

    const onChangeStep = () => {
        if(step === 3) props.completeQuestion() ;
        setStep(step + 1) ;
    }
    return (
        <>
            { step === 0 && <FirstQuestion /> } 
            { step === 1 && <SecondQuestion /> } 
            { step === 2 && <ThirdQuestion /> } 
            { step === 3 && <LastQuestion /> } 
            
            <ButtonDiv>
                <StyledButton
                    onClick={onChangeStep}
                >
                    Continue
                </StyledButton>
            </ButtonDiv>
        </>
    )
}

export default Questions;