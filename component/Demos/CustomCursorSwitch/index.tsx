"use client"
// https://codepen.io/fuzionix/pen/PoRWVRg
import styles from './custom_cursor_switch.module.scss'
import './cursor/cursor.scss'
import {useEffect} from "react";
import {FollowCursor} from "@/component/Demos/CustomCursorSwitch/cursor/Cursor";
import {ArrowPointer} from "@/utils/cursor/ArrowPointer";
import {MotionBlur} from "@/utils/cursor/MotionBlur";
import {GlitchEffect} from "@/utils/cursor/GlitchEffect";
import {CircleAndDot} from "@/utils/cursor/CircleAndDot";
import {RingDot} from "@/utils/cursor/RingDot";
import {BigCircle} from "@/utils/cursor/BigCircle";

export default function CustomCursorSwitch(){
    return (
        <div className={styles['canvas-page']}>
            <div className={styles['canvas-body']}>
                <div className={styles['catcher-wrapper']}>
                    <MouseCatcher id={"follow-canvas"} type={"follow"}></MouseCatcher>
                </div>
                <div className={styles['catcher-wrapper']}>
                    <MouseCatcher id={"arrow-canvas"} type={"arrow"}></MouseCatcher>
                </div>
                <div className={styles['catcher-wrapper']}>
                    <MouseCatcher id={"rgb-canvas"} type={"rgb"}></MouseCatcher>
                </div>
                <div className={styles['catcher-wrapper']}>
                    <MouseCatcher id={"motion-canvas"} type={"motion"}></MouseCatcher>
                </div>
                <div className={styles['catcher-wrapper']}>
                    <MouseCatcher id={"circleAndDot-canvas"} type={"circleAndDot"}></MouseCatcher>
                </div>
                <div className={styles['catcher-wrapper']}>
                    <MouseCatcher id={"ringDot-canvas"} type={"ringDot"}></MouseCatcher>
                </div>
            </div>
        </div>
    )
}

/**
 * 光标触发
 * @constructor
 */
function MouseCatcher({id, type}: {
    id: string,
    type: string
}) {
    useEffect(() => {
        switch (type) {
            case "follow":
                // new BigCircle(document.getElementById(id) as HTMLElement);
                new FollowCursor(document.getElementById(id) as HTMLElement);
                break;
            case "rgb":
                new GlitchEffect(document.getElementById(id) as HTMLElement);
                break;
            case "arrow":
                new ArrowPointer(document.getElementById(id) as HTMLElement)
                break
            case "motion":
                new MotionBlur(document.getElementById(id) as HTMLElement)
                break
            case "circleAndDot":
                new CircleAndDot(document.getElementById(id) as HTMLElement)
                break
            case "ringDot":
                new RingDot(document.getElementById(id) as HTMLElement)
                break
        }
    },[])
    return (
        <div id={id} className={styles['catcher-content']}>
            <a href="#" className={styles['href-a']}>Click Me</a>
        </div>
    )
}


