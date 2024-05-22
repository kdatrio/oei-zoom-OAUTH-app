"use client";
import Image from "next/image";
import styles from "./page.module.css";
import MeetingSettingsForm from "../form.js";

export default function ClientView() {
  const OnStartMeeting = async (meetingSettings) => {};
  const OnJoinMeeting = async (meetingSettings) => {};

  return (
    <main className={styles.main}>
      <p>Client View</p>
      <MeetingSettingsForm OnStartMeeting={OnStartMeeting} OnJoinMeeting={OnJoinMeeting} />
      <Image className={styles.image} alt="Zoom Products" src="/zoom-products.png" width={600} height={300} />
    </main>
  );
}
