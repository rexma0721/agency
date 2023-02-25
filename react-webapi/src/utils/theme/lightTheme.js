import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import * as locale from '@mui/material/locale';

const black = "#222222" ;
const dark = "#282828";
const main = "#313131";
const light = "#3A3A3A" ;
const bright = "#4D4D4D" ;

// spacing
const spacing = 8;

const darkTheme = createTheme({
    layout: {
        header : 50 ,
        footer : 40 ,
    },
    palette: {
        color : {
            
        },
        primary: { main: main, dark: dark, light : light, bright : bright, black: black },
        tonalOffset: 0.2,
        spacing
    },
    overrides: {

    },
    typography: {
        // fontFamily: "Montserrat",

        useNextVariants: true
    }
}, locale['enUS']);

export default responsiveFontSizes(darkTheme);