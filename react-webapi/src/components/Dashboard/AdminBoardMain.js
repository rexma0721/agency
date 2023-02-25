import * as React from 'react';

import { Route, Routes } from 'react-router-dom';

import AdminHeader from '../Layouts/AdminHeader';
import Blogs from './AdminBoard/Blogs';
import CreateBlog from './AdminBoard/CreateBlog';
import Manage from './AdminBoard/Manage';
import Settings from './AdminBoard/Settings';
import States from './AdminBoard/States';

import { ContentView } from './styled/Common.styled';

const AdminBoardMain = () => {
    return (
        <>
            <AdminHeader />
            <ContentView>
                <Routes>
                    <Route path="/*" element={<States />}/>
                    <Route path="/manage" element={<Manage />}/>
                    <Route path="/settings" element={<Settings />}/>
                    <Route path="/blogs" element={<Blogs />}/>
                    <Route path="/create-blog" element={<CreateBlog />} />
                </Routes>
            </ContentView>
        </>
    )
}

export default AdminBoardMain ;