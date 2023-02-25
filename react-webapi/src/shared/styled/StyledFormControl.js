import {
    FormControl,
    styled
} from '@mui/material';

export default styled(FormControl)`
    & .MuiOutlinedInput-root {
        svg {
            color : white;
        }
        
        background : #4D4D4D !important;
        border-radius : 10px;

        & fieldset {
            border-color: none;
        }

        &:hover fieldset {
            border-color: none;
        }

        &.Mui-focused fieldset {
            border : none !important;
        }

    }

    & .MuiInputBase-input {
        background : #4D4D4D !important;
        color : white !important;
        border-radius : 10px;
        padding : 15px !important;
    }
`