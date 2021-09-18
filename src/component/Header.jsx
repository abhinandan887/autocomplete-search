import React, {useState, useRef} from 'react';
import Typography from '@material-ui/core/Typography'
import TextAnimation from "../animation/TextAnimation";

export default function Header(props) {
    return(
        <Typography className="hdr flex-child align-center" variant="h4" >Let's know more about the <TextAnimation/> </Typography>
    );
}
