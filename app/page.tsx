import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <ul>
        <li><Link href='/demos/webgl_postprocessing'>webgl_postprocessing</Link></li>
      </ul>
    </div>
  );
}
