import * as React from "react";

import { Routes , Route } from "react-router-dom";

import { connect } from 'react-redux' ;

import Auth from "./Auth";
import Dashboard from "./Dashboard";
import Public from "./Public";

import { MainLayout } from "./styled/Layout.styled";

import 'react-circular-progressbar/dist/styles.css';
import 'react-phone-number-input/style.css';

const Layout = (props) => {
    return (
        <MainLayout>
            <Routes>
                <Route path='/auth/*' element={<Auth />} /> 
                <Route path='/dashboard/*' element={<Dashboard />} />
                <Route path="/*" element={<Public />} />
                {/* <Route element={<ProtectedRoute />}>
                    <Route path='/solstice/*' element={<Solstice />} />
                </Route>  */}
                {/* <Route path="/*" element={<NotFound />}/> */}
            </Routes>
        </MainLayout>
    );
}
const mapStateToProps = state => ({
 
}) ;
const mapDispatchToProps = {

} ;
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
