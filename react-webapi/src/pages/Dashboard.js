import { Route, Routes } from 'react-router-dom';

import { DashboardMain } from './styled/Dashboard.styled';

import UserDashboard from 'src/pages/Dashboard/UserDashboard';
import AdminDashboard from 'src/pages/Dashboard/AdminDashboard';

import { ProtectAdminRoute, ProtectUserRoute } from 'src/utils/helper/routerHelper';

const Dashboard = (props) => {

    return (
        <DashboardMain>
            <Routes>
                <Route element={<ProtectUserRoute />}>
                    <Route path='/*' element={<UserDashboard />}/>
                </Route>
                <Route element={<ProtectAdminRoute />}>
                    <Route path='/admin/*' element={<AdminDashboard/>} />
                </Route>
            </Routes> 
        </DashboardMain>
    )
}

export default Dashboard;