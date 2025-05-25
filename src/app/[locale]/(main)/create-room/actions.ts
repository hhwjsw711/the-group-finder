"use server";

import { createRoom } from "@/data-access/rooms";
import { Room } from "@/db/schema";
import { assertAuthenticated } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  const user = await assertAuthenticated();

  const room = await createRoom(roomData, user.id);

  revalidatePath("/browse-rooms");

  return room;
}
