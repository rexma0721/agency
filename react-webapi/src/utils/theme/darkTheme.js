import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import * as locale from '@mui/material/locale';

const black = "#222222" ;
const dark = "#282828";
const main = "#313131";
const light = "#3A3A3A" ;
const bright = "#4D4D4D" ;

const secondary = "#C72127";
const background = '#313131';

const borderWidth = 1;

// spacing
const spacing = 8;

const darkTheme = createTheme({
    layout: {
        header : 50 ,
        footer : 40 ,
        breadcumb : 45,
        status : 50,
    },
    palette: {
        primary: { main: main, dark: dark, light : light, bright : bright, black: black },
        secondary: { main: secondary },
        common: {
        },
        tonalOffset: 0.2,
        background: {
            default: background,
            gray: '#f1f1f170'
        },
        spacing
    },
    border: {
        borderWidth: borderWidth,
    },
    overrides: {

    },
    typography: {
        // fontFamily: "Montserrat",

        useNextVariants: true
    }
}, locale['enUS']);

export default responsiveFontSizes(darkTheme);