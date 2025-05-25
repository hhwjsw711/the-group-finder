"use server";

import { assertAuthenticated } from "@/lib/session";
import { StreamChat } from "stream-chat";

export async function generateTokenAction() {
  const user = await assertAuthenticated();

  const api_key = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;
  const api_secret = process.env.GET_STREAM_SECRET_KEY!;
  const serverClient = StreamChat.getInstance(api_key, api_secret);
  const token = serverClient.createToken(String(user.id));
  console.log("token", token);
  return token;
}
