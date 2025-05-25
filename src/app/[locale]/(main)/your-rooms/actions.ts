"use server";

import { deleteRoom, getRoom } from "@/data-access/rooms";
import { assertAuthenticated } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { RoomId } from "@/use-cases/types";

export async function deleteRoomAction(roomId: RoomId) {
  const user = await assertAuthenticated();

  const room = await getRoom(roomId);

  if (room?.userId !== user.id) {
    throw new Error("User not authorized");
  }

  await deleteRoom(roomId);

  revalidatePath("/your-rooms");
}
