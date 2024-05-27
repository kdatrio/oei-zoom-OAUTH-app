"use server";
import axios from "axios";
import { KJUR } from "jsrsasign";

async function GetAccessToken(code) {
    let _headers = {
        Authorization: `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.NEXT_PUBLIC_CLIENT_SECRET}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
    };
    let payload = {
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL,
    };
    let response = await axios({
        url: `https://zoom.us/oauth/token`,
        method: "POST",
        headers: _headers,
        params: payload,
    });
    return response.data.access_token;
};

async function GenerateSignature(meetingNumber, role) {
    const iat = Math.round((new Date().getTime() - 30000) / 1000);
    const exp = iat + 60 * 60 * 2;

    const payload = {
    sdkKey: process.env.NEXT_PUBLIC_CLIENT_ID,
    appKey: process.env.NEXT_PUBLIC_CLIENT_ID,
    mn: meetingNumber,
    role: role,
    iat: iat,
    exp: exp,
    tokenExp: exp,
    };
    const header = { alg: "HS256", typ: "JWT" };
    const signature = KJUR.jws.JWS.sign("HS256", JSON.stringify(header), JSON.stringify(payload), process.env.NEXT_PUBLIC_CLIENT_SECRET);
    return signature;
}

async function GetUserZak(token) {
    let _headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    
    let response = await axios({
        url: `https://api.zoom.us/v2/users/me/zak`,
        method: "GET",
        headers: _headers,
    });

    return response.data.token;
}

export { GetAccessToken, GenerateSignature, GetUserZak };
