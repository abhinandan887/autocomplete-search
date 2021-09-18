import React, {useState, useRef} from 'react';
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import Button from "@material-ui/core/Button";
import { Divider } from '@mui/material';
import {Github, LinkedinSquare, StackOverflow} from "@styled-icons/boxicons-logos";
import {Hackerearth, Hackerrank, Leetcode} from "@styled-icons/simple-icons";
import {Email} from "@styled-icons/evaicons-solid";
import {PhoneCallOutline} from "@styled-icons/evaicons-outline";
import {Copyright} from "@styled-icons/boxicons-regular";
import urlConfig from "../common/urlConfig";


export default function Footer() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [body, setBody] = useState('');

    return (
        <React.Fragment>
                <div className="flex-row padding-lr-5">
                    <StackOverflow className="flex-child" size='32px' onClick={() => window.open(urlConfig.stackOverFlowUrl, "_blank")}/>
                    <Github className="flex-child" size='32px' onClick={() => window.open(urlConfig.gitHubUrl, "_blank")}/>
                    <LinkedinSquare className="flex-child" size='32px' onClick={() => window.open(urlConfig.linkedinUrl, "_blank")}/>
                    <Leetcode className="flex-child" size='32px' onClick={() => window.open( urlConfig.leetCodeURl, "_blank")}/>
                    <Hackerearth className="flex-child" size='32px' onClick={() => window.open(urlConfig.hackerEarthUrl, "_blank")}/>
                    <Hackerrank className="flex-child" size='32px' onClick={() => window.open( urlConfig.hackerrankUrl, "_blank")}/>
                    <Email className="flex-child" size='32px' onClick={() => window.open("mailto:" + urlConfig.emailId, "_blank")}/>
                    <PhoneCallOutline className="flex-child" size='32px' onClick={() => window.open( urlConfig.contactNo, "_blank")}/>
                </div>
                <div style={{backgroundColor: 'grey'}}>
                        <span> Abhinandan Prasad <Copyright size="20px"
                                                            style={{verticalAlign: 'top'}}/>{new Date().getFullYear()}</span>
                </div>
        </React.Fragment>
    );
}