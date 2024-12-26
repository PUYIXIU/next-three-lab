"use client"

import './scroll.scss'

import layer1 from './img/layer (1).png'
import layer2 from './img/layer (2).png'
import layer3 from './img/layer (3).png'
import layer4 from './img/layer (4).png'
import layer5 from './img/layer (5).png'
import layer6 from './img/layer (6).png'
import layer7 from './img/layer (7).png'
import {useEffect} from "react";

export default function JIEJOEScrollComp() {
    useEffect(() => {
        return ()=>{
        }
    }, []);
    return (
        <div className="wrapper viewbox">
            <div className="scrollbox">
                <img src={layer1.src} alt=""/>
                <img src={layer2.src} alt=""/>
                <img src={layer3.src} alt=""/>
                <img src={layer4.src} alt=""/>
                <img src={layer5.src} alt=""/>
                <img src={layer6.src} alt=""/>
                <img src={layer7.src} alt=""/>
            </div>
        </div>
    )
}
