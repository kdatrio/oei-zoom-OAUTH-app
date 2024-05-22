"use client";
import styles from "./page.module.css";
import Image from "next/image";

export default function ComponentView() {
  return (
    <main className={styles.main}>
      <p>Component View</p>
      <Image className={styles.image} alt="Zoom Products" src="/zoom-products.png" width={600} height={300} />
    </main>
  );
}
