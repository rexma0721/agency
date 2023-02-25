import * as React from 'react' ;

import { useNavigate } from 'react-router-dom';
import useStyles from 'src/shared/hooks/useStyles';

import { StyledButton, StyledTextField, StyledTableContainer } from 'src/shared/styled';

import tagStyled from 'styled-components';

import { Button, ButtonGroup, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';

const Blogs = () => {
    const headList = [
        "Blog Name",
        "Category",
        "Views",
        "Created at",
        "Actions"
    ];

    const navigate = useNavigate() ;

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
                        <StyledTextField placeholder='Name'/>
                        <StyledTextField placeholder='Category'/>
                        <StyledTextField placeholder='Creation Date'/>
                    </TextFieldGroup>
                    <StyledButton>Apply</StyledButton>
                </FormGroup>
            </FilterDiv>

            <ButtonDiv>
                <StyledButton onClick={() => navigate('/dashboard/admin/create-blog')}>Create new blog</StyledButton>
            </ButtonDiv>
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
                                    <TableCell>First Blog</TableCell>
                                    <TableCell>HTML</TableCell>
                                    <TableCell>25</TableCell>
                                    <TableCell>21 Feburuary 2023 at 17:32</TableCell>
                                    <TableCell>
                                        <ButtonGroup>
                                            <Button variant='contained'>
                                                Edit
                                            </Button>
                                            <Button variant="contained" color='error'>
                                                Delete
                                            </Button>
                                        </ButtonGroup>
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

export default Blogs ;

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
const ButtonDiv = tagStyled.div`
    padding-top : 20px;
    display : flex;
    justify-content: flex-end;
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