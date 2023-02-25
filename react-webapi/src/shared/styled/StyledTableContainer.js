import {
    styled,
    TableContainer
} from '@mui/material' ;

export default styled(TableContainer)`
    margin-top: 20px;
    background : #3A3A3A ;

    border-radius : 5px ;

    &::-webkit-scrollbar-thumb {
        background-color : #538f815c ;
        border-radius : 5px;
    }
    &::-webkit-scrollbar-track {
        background-color : #538f815c ;
        -webkit-box-shadow: inset 0 0 6px rgba(0000.00);
    }

    &::-webkit-scrollbar:{
        width : 10px;
        height : 10px;
        cursor : pointer !important;
    }

    & .MuiTable-root {
        min-width : 800px;
        border-collapse: separate !important;
        border-spacing: 0 0px;

        & .MuiTableCell-root {
            color : white;
            padding-top : 10px;
            padding-bottom : 10px;
            text-align : center;
        }
    }

    & .MuiTableHead-root {
        & .MuiTableCell-root {
            font-size : 15px ;
            font-weight : bold;
            padding-top : 20px;
            padding-bottom : 20px;
            border-bottom : 1px solid #4F4F4F !important; 
        }
    }

    & .MuiTableBody-root {
        & .MuiTableRow-root {
            cursor : pointer;
            transition : 0.2s;
            &:hover {
            }
        }
        & .MuiTableCell-root {
            border-left : 1px solid #4F4F4F !important;
            border-bottom : 1px solid #4F4F4F !important;
            margin-bottom : 5px !important;
            font-size : 13px;

            &:last-child {
                border-right : 1px solid #4F4F4F !important;
            }
        }
    }
    & .MuiTableFooter-root {
        & .MuiTablePagination-root {
            & svg {
                color : white;
            }

           
        }
        & .MuiTableCell-root {
            border-bottom : none !important; 
        }
        & .MuiTablePagination-spacer {
            -webkit-flex : none !important;
            flex : none !important ;
        }
    }
    }
`