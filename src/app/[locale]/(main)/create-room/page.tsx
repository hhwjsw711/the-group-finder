import { CreateRoomForm } from "./create-room-form";
import { useTranslations } from "next-intl";

export default function CreateRoomPage() {
  const t = useTranslations("createRoom");

  return (
    <div className="container mx-auto flex flex-col gap-8 pt-12 pb-24">
      <h1 className="text-4xl font-bold">{t("title")}</h1>

      <CreateRoomForm />
    </div>
  );
}
