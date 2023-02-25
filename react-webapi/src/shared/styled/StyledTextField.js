import {
    TextField,
    styled
} from '@mui/material';

export default styled(TextField)`

    & .MuiFormHelperText-root {
        font-size : 14px;
        font-weight : bold;
        color : red;
        text-align : left;
        width : 100%;
    }

    &.success {
        & .MuiFormHelperText-root {
            color : #18bd18;
        }
    }

    &.error {
        & .MuiFormHelperText-root {
            color : red;
        }
    }

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