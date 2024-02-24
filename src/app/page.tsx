import Image from "next/image";
import styles from "./page.module.css";
import Login from "./login/page";
import Registration from "./registration/page";


export default function Home() {
  return (
    <main className={styles.main}>

      <Registration />

    </main>
  );
}
