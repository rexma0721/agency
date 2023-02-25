export const routeData = {
    home : {
        key : 'home',
        breadcumb : '',
        label : "Home",
        link : "/home"
    },
    my_dashboard : {
        key : 'my_dashboard',
        link : "/my-dashboard",
        label : "My Dashboard",
        breadcumb : '',
        children : {
            my_dashboard_aaa : {
                key : 'my_dashboard_aaa',
                link : '/my-dashboard/aaa',
                label : 'AAA',
                breadcumb : 'My Dashboard /'
            },
            my_dashboard_bbb : {
                key : "my_dashboard_bbb",
                link : '/my-dashboard/bbb',
                label : 'BBB',
                breadcumb : 'My Dashboard /'
            }
        }
    }
}