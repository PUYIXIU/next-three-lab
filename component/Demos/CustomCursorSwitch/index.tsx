"use client"
// https://codepen.io/fuzionix/pen/PoRWVRg
import styles from './custom_cursor_switch.module.scss'
import './cursor/cursor.scss'
import {useEffect} from "react";
import {ArrowCursor, FollowCursor, RGBSplitCursor} from "@/component/Demos/CustomCursorSwitch/cursor/Cursor";

export default function CustomCursorSwitch(){
    return (
        <div className={styles['canvas-page']}>
            <div className={styles['canvas-body']}>
                <div className={styles['catcher-wrapper']}>
                    <MouseCatcher id={"follow-canvas"} type={"follow"} ></MouseCatcher>
                </div>
                <div className={styles['catcher-wrapper']}>
                    <MouseCatcher id={"arrow-canvas"} type={"arrow"}></MouseCatcher>
                </div>
                <div className={styles['catcher-wrapper']}>
                    <MouseCatcher id={"rgb-canvas"} type={"rgb"}></MouseCatcher>
                </div>
                <div className={styles['catcher-wrapper']}>
                    <MouseCatcher id={""} type={""}></MouseCatcher>
                </div>
            </div>
        </div>
    )
}

/**
 * 光标触发
 * @constructor
 */
function MouseCatcher({id, type}:{
    id:string,
    type:string
}) {
    useEffect(()=>{
        switch(type){
            case "follow":
                new FollowCursor(document.getElementById(id) as HTMLElement);
                break;
            case "rgb":
                new RGBSplitCursor(document.getElementById(id) as HTMLElement);
                break;
            case "arrow":
                new ArrowCursor(document.getElementById(id) as HTMLElement)
                break
        }
    },[])
    return (
        <div id={id} className={styles['catcher-content']}>
            <a href="#" className={styles['href-a']}>Click Me</a>
        </div>
    )
}


