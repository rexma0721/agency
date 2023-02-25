import {
    styled,
    Button
} from '@mui/material';

export default styled(Button)`
    background : #0D6799;
    border-radius : 5px;
    padding: 10px 20px;
    color : white;
    text-transform : capitalize ;

    :hover {
        background : #0D6799; 
    }

    &:disabled {
        background : gray;
        cursor : not-allowed !important;
    }
`