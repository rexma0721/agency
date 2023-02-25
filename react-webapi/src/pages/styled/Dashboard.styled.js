import tagStyled from 'styled-components';

export const DashboardMain = tagStyled.div`
    display : flex !important ;
    height : 100vh ;
`

export const ContentView = tagStyled.div`
    flex-grow : 1;
    width : calc(100vw - ${props => props.width + 5}px) ;
    position : relative ;
`