import * as React from 'react' ;

import { Routes, Route } from 'react-router-dom';

import tagStyled from 'styled-components';

import MainHeader from 'src/components/Layouts/MainHeader';

import Home from './Home';
import Blog from './Blog';

const Public = () => {
    return (
        <>  
            <MainHeader />
            <PublicLayout>
                <Routes>
                    <Route path="/*" element={<Home/>} />
                    <Route path="/blog" element={<Blog />} />
                </Routes>
            </PublicLayout>
        </>
    )
}

export default Public ;

const PublicLayout = tagStyled.div`
    padding : 50px;
    box-sizing:  border-box;
    width : 100vw;
    overflow-x : hidden;
`