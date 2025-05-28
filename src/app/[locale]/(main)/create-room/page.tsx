import { CreateRoomForm } from "./create-room-form";
import { getTranslations } from "next-intl/server";
import { assertAuthenticated } from "@/lib/session";

export default async function CreateRoomPage() {
  const t = await getTranslations("createRoom");
  const user = await assertAuthenticated();

  return (
    <div className="container mx-auto flex flex-col gap-8 pt-12 pb-24">
      <h1 className="text-4xl font-bold">{t("title")}</h1>

      <CreateRoomForm />
    </div>
  );
}
