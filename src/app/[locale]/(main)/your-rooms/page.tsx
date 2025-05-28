import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserRooms } from "@/data-access/rooms";
import { UserRoomCard } from "./user-room-card";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import { assertAuthenticated } from "@/lib/session";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/page-header";
import { cn } from "@/lib/utils";
import { pageTitleStyles } from "@/styles/common";

export default async function YourRoomsPage() {
  unstable_noStore();
  const user = await assertAuthenticated();
  const rooms = await getUserRooms(user.id);
  const t = await getTranslations("yourRooms");

  return (
    <>
      <PageHeader>
        <h1
          className={cn(
            pageTitleStyles,
            "flex justify-between items-center flex-wrap gap-4"
          )}
        >
          {t("title")}
          <Button asChild>
            <Link href="/create-room">{t("createRoomButton")}</Link>
          </Button>
        </h1>
      </PageHeader>
      <div className={cn("space-y-8 container mx-auto py-12 min-h-screen")}>
        {rooms.length === 0 && (
          <div className="flex flex-col gap-4 justify-center items-center mt-24">
            <Image
              src="/no-data.svg"
              width="200"
              height="200"
              alt="no data image"
            />

            <h2 className="text-2xl">{t("noRooms")}</h2>

            <Button asChild>
              <Link href="/create-room">{t("createRoomButton")}</Link>
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {rooms.map((room) => {
            return <UserRoomCard key={room.id} room={room} />;
          })}
        </div>
      </div>
    </>
  );
}
