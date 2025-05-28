import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRooms } from "@/data-access/rooms";
import { SearchBar } from "./search-bar";
import { RoomCard } from "./room-card";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/page-header";
import { pageTitleStyles, pageWrapperStyles } from "@/styles/common";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const t = await getTranslations("browseRooms");
  unstable_noStore();
  const params = await searchParams;
  const rooms = await getRooms(params.search);

  return (
    <>
      <PageHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <div className="flex flex-col gap-4 sm:gap-8 flex-grow">
            <h1
              className={`${pageTitleStyles} text-2xl sm:text-3xl md:text-4xl`}
            >
              {t("title")}
            </h1>
            <SearchBar />
          </div>
        </div>
      </PageHeader>

      <div className={`${pageWrapperStyles} px-4 sm:px-6`}>
        {rooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-8 dark:bg-slate-900 rounded-xl">
            <Image
              src="/no-data.svg"
              width="200"
              height="200"
              alt="no data image"
              className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64"
            />

            <h2 className="text-xl sm:text-2xl text-center">{t("noRoomsYet")}</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {rooms.map((room) => {
              return <RoomCard key={room.id} room={room} />;
            })}
          </div>
        )}
      </div>
    </>
  );
}
