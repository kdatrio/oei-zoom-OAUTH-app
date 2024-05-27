"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useEffect } from "react";
import { GetAccessToken } from "@/server/Authenticate";

export default function Home() {
  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    if (!authToken) AuthenticateUser();
  });

  const AuthenticateUser = async () => {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const code = urlParams.get("code");

    if (!code) {
      window.location.assign("https://zoom.us/oauth/authorize?client_id=FthYLVpRXCeNOPiNCUw&response_type=code&redirect_uri=https%3A%2F%2Ff349-192-135-142-199.ngrok-free.app");
    } //Send to your Authorization URL
    else {
      //Get the Access token
      const access_token = await GetAccessToken(code);
      sessionStorage.setItem("authToken", access_token);
    }

  }

  
  return (
    <main className={styles.main}>
      <Image alt="Zoom Products" src="/zoom-products.png" width={600} height={300} />
      <p>Zoom Developer Ecosystem</p>
      <p>
        <Link href="/client-view" className={styles.button}>
          Client View
        </Link>
        <Link href="/component-view" className={styles.button}>
          Component View
        </Link>
      </p>
    </main>
  );
}
