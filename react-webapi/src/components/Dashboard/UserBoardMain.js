import * as React from 'react';

import { Routes } from 'react-router-dom';

import Questions from './AdminBoard/Questions';
import UserHeader from '../Layouts/UserHeader';

import { ContentView } from './styled/Common.styled';

const UserBoardMain = () => {
    const [completedQuestion, setCompleteQuestion] = React.useState(false) ;

    const onChangeCompletedQuestion = () => { setCompleteQuestion(!completedQuestion) ; }

    return (
        <>
            <UserHeader />
            <ContentView>
            { !completedQuestion ? <Questions completeQuestion={onChangeCompletedQuestion}/>
                : <Routes>
                    
                </Routes>
            }
            </ContentView>
        </>
    )
}

export default UserBoardMain ;