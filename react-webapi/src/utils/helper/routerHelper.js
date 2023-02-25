import { Navigate, Outlet } from "react-router-dom" ;
import { ADMIN_ROLE, USER_ROLE } from "../static" ;
import { visitorRole } from "./tokenHelper" ;

export const ProtectUserRoute = () => {
    return visitorRole() === USER_ROLE ? <Outlet /> :  <Navigate to="/" />  ;
}

export const ProtectAdminRoute = () => {
    return visitorRole() !== ADMIN_ROLE ? <Outlet /> : <Navigate to="/" />;
}