import { database } from "@/db";
import { Room, room } from "@/db/schema";
import { eq } from "drizzle-orm";
import { like } from "drizzle-orm";
import { UserId, RoomId } from "@/use-cases/types";

export async function getRooms(search: string | undefined) {
  const where = search ? like(room.tags, `%${search}%`) : undefined;
  const rooms = await database.query.room.findMany({
    where,
  });
  return rooms;
}

export async function getUserRooms(userId: UserId) {
  const rooms = await database.query.room.findMany({
    where: eq(room.userId, userId),
  });

  return rooms;
}

export async function getRoom(roomId: RoomId) {
  return await database.query.room.findFirst({
    where: eq(room.id, roomId),
  });
}

export async function deleteRoom(roomId: RoomId) {
  await database.delete(room).where(eq(room.id, roomId));
}

export async function createRoom(
  roomData: Omit<Room, "id" | "userId">,
  userId: UserId
) {
  const inserted = await database
    .insert(room)
    .values({ ...roomData, userId })
    .returning();
  return inserted[0];
}

export async function editRoom(roomData: Room) {
  const updated = await database
    .update(room)
    .set(roomData)
    .where(eq(room.id, roomData.id))
    .returning();
  return updated[0];
}
