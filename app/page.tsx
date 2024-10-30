"use client"
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
      <>
          <title>Next Three Lab</title>
          <div className={styles.page}>
              <ul style={{paddingTop: '50px'}}>
                  <li><Link href='/demos/webgl_multiple_elements'>webgl_multiple_elements 多场景多物体展示</Link></li>
                  <li><Link href='/demos/postprocessing_create_typing'>postprocessing_create_typing
                      特效背景+lottie</Link></li>
                  <li><Link href='/demos/lottie_interact_test'>lottie_interact_test lottie交互效果测试</Link></li>
                  <li><Link href='/demos/custom_dot_cursor'>custom_dot_cursor 自定义鼠标效果</Link></li>
                  <li><Link href='/demos/custom_cursor_switch'>custom_cursor_switch 自定义鼠标效果2.0</Link></li>
              </ul>
              {/*<ul style={{paddingTop: '20px'}}>*/}
              {/*    <li><Link href='/reference/curzr_cursor'>curzr_cursor curzr自定义光标效果</Link></li>*/}
              {/*</ul>*/}
          </div>
      </>
  );
}
