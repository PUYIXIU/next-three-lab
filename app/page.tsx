import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <ul>
        <li><Link href='/demos/webgl_multiple_elements'>webgl_multiple_elements 多场景多物体展示</Link></li>
        <li><Link href='/demos/postprocessing_create_typing'>postprocessing_create_typing 特效背景+lottie</Link></li>
      </ul>
    </div>
  );
}
