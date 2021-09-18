import React, {useEffect, useState} from "react";
import {useInterval} from "react-use";
import styled, {keyframes} from "styled-components";

export default function TextAnimation() {
    const capitalArray = "Capitals".split("");
    const countryArray = "Countries".split("");
    const [items,setItems] = useState(countryArray);
    const [count,setCount] = useState(0);
    const [play,setPlay] = useState(false);

    useInterval(() => {
        setItems(countryArray);
        setCount(count+1);
        if(count %2 ==1){
            setCount(count+1);
            setItems(capitalArray);
        }
    }, play ? 6000 : null)

    useEffect(() => {
        const timer =setTimeout(() => {
            setItems(capitalArray);
            setPlay(true)
        },4000)
        return () => clearTimeout(timer)
    }, [])

    return <Wrapper>{items.map((item, index) => (
        <span key ={index}>{item}</span>
        ))}</Wrapper>
}

const animation = keyframes`
    0% {opacity: 0; transform: translateX(100px); skew(10deg) skewX(10deg); rotateZ(30deg); filter: blur(10px)}
    25% {opacity: 1;transform: translateY(0px); skew(0deg) skewX(0deg); rotateZ(0deg); filter: blur(0px)}
    // 50% {opacity: 1;transform: translateY(0px);}
    75% {opacity: 1;transform: translateY(0px); skew(0deg) skewX(0deg); rotateZ(0deg); filter: blur(0px)}
    100% {opacity: 0; transform: translateX(100px); skew(10deg) skewX(10deg); rotateZ(30deg); filter: blur(10px)}
`

const Wrapper = styled.span`
    display: inline-block;
    span{
        opacity: 0;
        display: inline-block;
        animation-name: ${animation};
        animation-duration: 6s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-timing-function: cubic-bezier(0.075, 0.82, 0.165,1);
    } 
    span: nth-child(1) {
        animation-delay: 2.4s;
    }
    span: nth-child(2) {
        animation-delay: 2.1s;
    }
    span: nth-child(3) {
        animation-delay: 1.8s;
    }
    span: nth-child(4) {
        animation-delay: 1.5s;
    }
    span: nth-child(5) {
        animation-delay: 1.2s;
    }
    span: nth-child(6) {
        animation-delay: 0.9s;
    }
    span: nth-child(7) {
        animation-delay: 0.6s;
    }
    span: nth-child(8) {
        animation-delay: 0.3s;
    }
`