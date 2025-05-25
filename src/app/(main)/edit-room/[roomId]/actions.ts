"use server";

import { editRoom, getRoom } from "@/data-access/rooms";
import { Room } from "@/db/schema";
import { assertAuthenticated } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editRoomAction(roomData: Omit<Room, "userId">) {
  const user = await assertAuthenticated();

  const room = await getRoom(roomData.id);

  if (room?.userId !== user.id) {
    throw new Error("User not authorized");
  }

  await editRoom({ ...roomData, userId: room.userId });

  revalidatePath("/your-rooms");
  revalidatePath(`/edit-room/${roomData.id}`);
  redirect("/your-rooms");
}
