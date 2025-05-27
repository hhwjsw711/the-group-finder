import { getRoom } from "@/data-access/rooms";
import { EditRoomForm } from "./edit-room-form";
import { unstable_noStore } from "next/cache";
import { RoomId } from "@/use-cases/types";
import { getTranslations } from "next-intl/server";

export default async function EditRoomPage({
  params,
}: {
  params: Promise<{ roomId: RoomId }>;
}) {
  unstable_noStore();
  const routeParams = await params;
  const room = await getRoom(routeParams.roomId);
  const t = await getTranslations("editRoom");

  if (!room) {
    return <div>{t("roomNotFound")}</div>;
  }

  return (
    <div className="container mx-auto flex flex-col gap-8 pt-12 pb-24">
      <h1 className="text-4xl font-bold">{t("editRoom")}</h1>

      <EditRoomForm room={room} />
    </div>
  );
}
