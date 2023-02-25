import * as React from 'react' ;

import useStyles from 'src/shared/hooks/useStyles';

import { StyledButton, StyledTextField, StyledTableContainer } from 'src/shared/styled';

import tagStyled from 'styled-components';

import { Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';

const Manage = () => {
    const headList = [
        "Logo",
        "Name",
        "Business name",
        "E-mail",
        "Phone",
        "Registration date",
        "Actions"
    ];

    const classes = useStyles() ;

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <FilterDiv>
                <Label>Filter</Label>
                <FormGroup>
                    <TextFieldGroup>
                        <StyledTextField />
                        <StyledTextField />
                        <StyledTextField />
                        <StyledTextField />
                    </TextFieldGroup>
                    <StyledButton>Apply</StyledButton>
                </FormGroup>
            </FilterDiv>

            <StyledTableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                headList.map((head, index) => (
                                    <TableCell key={index}>
                                        {head}
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            [...Array(10)].map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell></TableCell>
                                    <TableCell>John Doe</TableCell>
                                    <TableCell>My Brand</TableCell>
                                    <TableCell>devstar0703@gmail.com</TableCell>
                                    <TableCell>+1 914 265 2104</TableCell>
                                    <TableCell>21 Feburuary 2023 at 17:32</TableCell>
                                    <TableCell>
                                        <StyledButton>
                                            View User
                                        </StyledButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10]}
                                labelRowsPerPage={"Users per page"}
                                count={
                                    10
                                }
                                SelectProps={{
                                    MenuProps : {
                                        classes : {
                                            paper :  classes.selectPaper
                                        }
                                    }
                                }}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />    
                        </TableRow>
                    
                    </TableFooter>
                </Table>
            </StyledTableContainer>
        </>
    )
}

export default Manage ;

const FilterDiv = tagStyled.div`
    padding: 20px;
    background : #3A3A3A;

    border-radius : 10px;
`

const Label = tagStyled.p`
    margin : 0px;
    color : white;
    font-size : 20px;
    padding-left : 10px;
    padding-bottom : 5px;
`

const FormGroup = tagStyled.div`
    display : flex;
    justify-content : space-between;
    align-items : center;
`

const TextFieldGroup = tagStyled.div`
    display : flex;
    gap : 20px;
    align-items : center;
`