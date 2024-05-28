"use client";
import styles from "./page.module.css";
import Image from "next/image";
import MeetingSettingsForm from "../form.js";
import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded'
import { useState, useEffect } from "react";
import { GenerateSignature, GetUserZak } from "@/server/Authenticate";




export default function ComponentView() {
  const [inMeeting, setInMeeting] = useState(false);
  const client = ZoomMtgEmbedded.createClient();

  useEffect(() => {
    //Runs on every render
    let meetingSDKElement = document.getElementById("meetingSDKElement");
    client.init({ zoomAppRoot: meetingSDKElement, language: "en-US" });
  });

  const OnStartMeeting = async (meetingSettings) => {
    const signature = await GenerateSignature(meetingSettings.meetingId, 1);
    const zakToken = await GetUserZak(sessionStorage.getItem("authToken"));

    client.join({
      sdkKey: process.env.NEXT_PUBLIC_CLIENT_ID,
      signature: signature, // role in SDK signature needs to be 1
      meetingNumber: meetingSettings.meetingId,
      password: meetingSettings.meetingPasscode,
      userName: meetingSettings.username,
      zak: zakToken // the host's zak token
    })

    setInMeeting(true);

    client.on("connection-change", (payload) => {
      if (payload.state === "Closed") setInMeeting(false);
    });
  };
  
  const OnJoinMeeting = async (meetingSettings) => {};
  return (
    <main className={styles.main}>
      <p>Component View</p>
      <MeetingSettingsForm OnStartMeeting={OnStartMeeting} OnJoinMeeting={OnJoinMeeting} />
      <div id="meetingSDKElement" />
      {!inMeeting && <Image className={styles.image} alt="Zoom Products" src="/zoom-products.png" width={600} height={300} />}
    </main>
  );
}
