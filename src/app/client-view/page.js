"use client";
import Image from "next/image";
import styles from "./page.module.css";
import MeetingSettingsForm from "../form.js";
import { ZoomMtg } from "@zoom/meetingsdk";
import { GenerateSignature, GetUserZak } from "@/server/Authenticate";

// loads Zoom WebAssembly assets
ZoomMtg.preLoadWasm()
ZoomMtg.prepareWebSDK()


export default function ClientView() {
  const OnStartMeeting = async (meetingSettings) => {
    const signature = await GenerateSignature(meetingSettings.meetingId, 1);
    const zakToken = await GetUserZak(sessionStorage.getItem("authToken"));

    ZoomMtg.init({
      leaveUrl: process.env.NEXT_PUBLIC_REDIRECT_URL + "/client-view",
      success: (success) => {
        ZoomMtg.join({
          sdkKey: process.env.NEXT_PUBLIC_CLIENT_ID,
          signature: signature, // role in SDK signature needs to be 1
          meetingNumber: meetingSettings.meetingId,
          passWord: meetingSettings.meetingPasscode,
          userName: meetingSettings.username,
          zak: zakToken, // the host's ZAK token
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
        const zoomMeetingSDK = document.getElementById("zmmtg-root");
        zoomMeetingSDK.style.display = "block";
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  const OnJoinMeeting = async (meetingSettings) => {
    const signature = await GenerateSignature(meetingSettings.meetingId, 0);

    ZoomMtg.init({
      leaveUrl: process.env.NEXT_PUBLIC_REDIRECT_URL + "/client-view",
      success: (success) => {
        ZoomMtg.join({
          sdkKey: process.env.NEXT_PUBLIC_CLIENT_ID,
          signature: signature,
          meetingNumber: meetingSettings.meetingId,
          passWord: meetingSettings.meetingPasscode,
          userName: meetingSettings.username,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });

        const zoomMeetingSDK = document.getElementById("zmmtg-root");
        zoomMeetingSDK.style.display = "block";
        
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <main className={styles.main}>
      <p>Client View</p>
      <MeetingSettingsForm OnStartMeeting={OnStartMeeting} OnJoinMeeting={OnJoinMeeting} />
      <Image className={styles.image} alt="Zoom Products" src="/zoom-products.png" width={600} height={300} />
    </main>
  );
}
