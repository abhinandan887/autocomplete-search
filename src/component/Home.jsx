import React, {useState, useRef} from 'react';
import {BrowserRouter} from 'react-router-dom';
import Footer from "./Footer";
import Header from "./Header";
import SearchComponent from "./SearchComponent";

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { flexbox } from '@mui/system';
// import { createStyles, makeStyles } from '@mui/styles';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@material-ui/core'
import { pink } from '@material-ui/core/colors'

const theme = createTheme({
    palette: {
        primary: {
            main: '#fefefe'
        },
        secondary: pink
    },
    typography: {
        fontFamily: 'Exo+2',
        fontWeightLight: 300,
        fontWeightRegular: 500,
        fontWeightMedium: 700,
        fontWeightBold: 900,
    }
});



export default function Home() {


    return (
        <React.Fragment>
            <BrowserRouter basename="/">
                <div className="overflow-x-hidden full-view home flex">

                        <Header/>

                    <div className="w-inherit align-center">
                        <SearchComponent/>
                    </div>
                    {/*####Contact*/}
                    <div className="align-center footer">
                        <Footer/></div>

                </div>
            </BrowserRouter>
        </React.Fragment>
    );
}
