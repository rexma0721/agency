import * as React from 'react' ;

import { useMeasure } from 'react-use';

import { ContentView } from '../styled/Dashboard.styled';

import AdminBoardMain from 'src/components/Dashboard/AdminBoardMain';
import SideBar from 'src/components/Layouts/SideBar';

import User3Image from 'src/assets/menu/3-User.svg' ;
import CartImage from 'src/assets/menu/Cart.svg' ;
import HomeImage from 'src/assets/menu/Home.svg' ;
import ProductImage from 'src/assets/menu/Product.svg' ;

const AdminDashboard = (props) => {

    const menuList = [
        {
          label : "States",
          icon : HomeImage,
          link : "/dashboard/admin/states"
        },
        {
          label : "Manage",
          icon : ProductImage,
          link : "/dashboard/admin/manage"
        },
        {
          label : "Settings",
          icon : CartImage,
          link : "/dashboard/admin/settings"
        },
        {
          label : "Blogs",
          icon : User3Image,
          link : "/dashboard/admin/blogs"
        }
    ]

    const [open, setOpen] = React.useState(true);
    const sideMenuCtrl = React.useRef() ;

    const [ setSideMenuCtrl, {width} ] = useMeasure() ;

    React.useEffect(() => {
        setSideMenuCtrl(sideMenuCtrl.current) ;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) ;

    return (
        <>
            <div ref={sideMenuCtrl}>
                <SideBar 
                    open={open}
                    setOpen={setOpen}
                    menuList={menuList}
                />
            </div>
            <ContentView
                width={width}
            >
                <AdminBoardMain/>
            </ContentView>
        </>
    )
}

export default AdminDashboard;