"use client"

import styles from "./HomeBox.module.scss";
import Link from "next/link";
import {useEffect} from "react";
import {FollowCursor} from "@/component/Demos/CustomCursorSwitch/cursor/Cursor";
import '@/component/Demos/CustomCursorSwitch/cursor/cursor.scss'
export default function HomeBox(){
    useEffect(() => {
        new FollowCursor(document.getElementById("home-box") as HTMLElement);
    }, []);
    return (
        <div className={styles.page} id="home-box">
            <div className={styles.scrollBox}>
                <ul className={`${styles['list-body']} ${styles['list-project']}`}>
                    <li className={styles['list-title']}>Project</li>
                    <li className={styles['list-item']}><Link href='/demos/webgl_multiple_elements'>webgl_multiple_elements
                        多场景多物体展示</Link></li>
                    <li className={styles['list-item']}><Link href='/demos/postprocessing_create_typing'>postprocessing_create_typing
                        特效背景+lottie</Link></li>
                    <li className={styles['list-item']}><Link href='/demos/lottie_interact_test'>lottie_interact_test
                        lottie交互效果测试</Link></li>
                    <li className={styles['list-item']}><Link href='/demos/custom_dot_cursor'>custom_dot_cursor
                        自定义鼠标效果</Link></li>
                    <li className={styles['list-item']}><Link href='/demos/custom_cursor_switch'>custom_cursor_switch
                        自定义鼠标效果2.0</Link></li>
                </ul>

                <ul className={`${styles['list-body']} ${styles['list-project']}`}>
                    <li className={styles['list-title']}>Reference</li>
                    <li className={styles['list-item']}><Link href='/reference/webgl_effect_stereo'>webgl_effect_stereo threejs StereoEffect</Link></li>
                    <li className={styles['list-item']}><Link href='/reference/jiejoe/poke'>jiejoe/poke JIEJOE 如何做一个扑克牌轮播图</Link></li>
                    <li className={styles['list-item']}><Link href='/reference/jiejoe/glitch'>jiejoe/glitch JIEJOE 文字故障效果</Link></li>
                </ul>

            </div>
        </div>
    )
}
